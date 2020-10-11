from __future__ import absolute_import, unicode_literals
from celery import shared_task
from celery_once import QueueOnce
from .models import StatusModel, ResponseModel, SettingsModel
from .utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
import struct
# from celery.contrib import rdb

@shared_task(base=QueueOnce, once={'graceful': True}, queue='comms')
def async_comms_response():
    """
    Get sensor and PID data from microcontroller and wireless scale
    Simulations used for testing
    Avoid database calls in this task to speed up
    """
    if django_settings.SIMULATE_SCALE == True:
        m = simulated_mass_sensor("simulated")
    else:
        try:
            request_scale = requests.get("http://192.168.0.12/mass")
            # Decode data
            data_scale = request_scale.json()
            m = data_scale["mass"]
        except requests.exceptions.RequestException as e:
            m = None

    # Read simulated machine sensors
    if django_settings.SIMULATE_MACHINE == True:
        t = timezone.now()
        T = simulated_temperature_sensor("simulated")
        # Get new PID
        duty, duty_pid = pid_update(T, t)
        low_water = False
        mode = StatusModel.objects.get(pk=1).mode
        debug_log("Simulated response: {}C".format(T))
    else:
        # ARDUINO
        serial_arduino.reset_input_buffer()
        serial_arduino.reset_output_buffer()
        serial_arduino.write(struct.pack('<b', 0))
        data_block = serial_arduino.read(size=24)

        debug_log( "Data received: {}".format( list(data_block) ) )
        [power, brew, T, duty, low_water, mode, Kp, Ki, Kd] = struct.unpack('<2?2f?B3f', bytes(data_block))
        duty_pid = [None, None, None]  # Can't get these from Arduino PID library
        # Write to database in other queue
        async_update_status.delay(on=power, brew=brew, mode=mode, T=T, m=m, low_water=low_water)

    # Write to database in other queue
    async_save_response.delay(T, duty, mode, m, low_water, duty_pid)

    return T

@shared_task(queue='celery')
def async_update_status(on=None, brew=None, mode=None, T=None, m=None, low_water=None):
    """
    Update status in database
    """
    status = StatusModel.objects.get(pk=1)
    if on is not None:
        status.on = on
    if brew is not None:
        status.brew = brew
    if mode is not None and mode != 4: # 4 is MODE_OFF
        status.mode = mode
    if T is not None:
        status.T_boiler = T
    if m is not None:
        status.m = m
    if low_water is not None:
        status.low_water = low_water
    status.save()

@shared_task(queue='celery')
def async_save_response(T, duty, mode, m=None, low_water=False, duty_pid=[None,None,None]):
    """
    Save status in database
    """
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    # Check if autotune has finished, if so update gains
    # last_response = ResponseModel.objects.order_by('-t')[0]
    # if (mode !=2) and (last_response.mode == 2):
    #     # Update gains
    #     settings.k_p = Kp
    #     settings.k_i = Ki
    #     settings.k_d = Kd
    #     settings.save()
    #     # Save new status
    #     status.mode = mode
    #     status.save()

    if status.on:  # Record temperature if machine is on
        response = ResponseModel.objects.create(
            T_boiler=T,
            duty=duty,
            duty_p=duty_pid[0],
            duty_i=duty_pid[1],
            duty_d=duty_pid[2],
            k_p=settings.k_p,
            k_i=settings.k_i,
            k_d=settings.k_d,
            m=m,
            T_setpoint=settings.T_set,
            low_water=low_water,
            mode=mode,
            brewing=status.brew
        )
        response.save()

@shared_task(queue='comms')
def async_scale_update(brew, m):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
    debug_log("Scale update task, input: {}".format(brew))
    if django_settings.SIMULATE_SCALE == False:
        # Reset scale
        if brew:
            try:
                debug_log("Sending to scale at url:")
                request_scale = requests.put("http://192.168.0.12/brewstart", params={"setpoint": m})
                debug_log(request_scale.url)  # Check URL is correct
            except requests.exceptions.RequestException as e:
                debug_log("No connection to scale")
        else:
            try:
                request_scale = requests.put("http://192.168.0.12/brewstop")
                debug_log(request_scale.text)  # Check response
            except requests.exceptions.RequestException as e:
                debug_log("No connection to scale")

@shared_task(queue='comms')
def async_comms_update(on=None, brew=None, mode=None, status=None, settings=None):
    """
    For some reason the Arduino does not detect Serial.available() > 0 after reading first byte.
    """
    if django_settings.SIMULATE_MACHINE == False:
        if status is None:
            status = StatusModel.objects.get(pk=1)
        if settings is None:
            settings = SettingsModel.objects.get(pk=1)
        if on is None:
            on = status.on
        if brew is None:
            brew = status.brew
        if mode is None:
            mode = status.mode
        # Send serial data to arduino
        data_block = struct.pack(
            '<b2?B4f4i', 1, 
            on, brew, mode, 
            settings.T_set, settings.k_p, settings.k_i, settings.k_d, settings.k_p_mode,
            settings.n_clean_cycles, settings.t_clean_on, settings.t_clean_off
        )
        debug_log( "Data to send: {}".format(data_block) )
        try:
            serial_arduino.reset_input_buffer()
            serial_arduino.reset_output_buffer()
            serial_arduino.write(data_block)
            data_block = serial_arduino.read(size=1)
            [success] = struct.unpack('<?', bytes(data_block))
            debug_log( "Message received properly? {}".format(success) )
            # If OK, save to database
            if success:
                async_update_status.delay(on, brew, mode)
                # Update scale
                if brew != status.brew:
                    async_scale_update.delay(brew, settings.m)
            else:
                debug_log("Microcontroller not updated")
            
        except Exception as e:
            debug_log("Cannot write to microcontroller (comms update): " + str(e))
    else:  # In simulation mode just save to database
        async_update_status.delay(on, brew, mode)

@shared_task(queue='comms')
def async_comms_process():
    """
    Process data from microcontroller
    """
    if django_settings.SIMULATE_MACHINE == False:
        if (serial_arduino.in_waiting > 0): #if incoming bytes are waiting to be read from the serial input buffer
            data_block = serial_arduino.read(size=24)
            debug_log( "Data received: {}".format( list(data_block) ) )
            data_list = struct.unpack('<2?2f?B3f', bytes(data_block))
            [power, brew, T, duty, low_water, mode, Kp, Ki, Kd] = data_list
            # Update status
            async_update_status.delay(power, brew, mode)
            serial_arduino.reset_input_buffer()

@shared_task(queue='comms')
def async_comms_override(duty=0):
    """
    Control override/manual mode of arduino
    """
    if django_settings.SIMULATE_SCALE == False:
        data_block = struct.pack('<bf', 2, duty)
        debug_log( "Override data to send: {}".format( list(data_block) ) )
        try:
            serial_arduino.reset_input_buffer()
            serial_arduino.reset_output_buffer()
            serial_arduino.write(data_block)
            response = serial_arduino.readline()
            debug_log("Response to override: {}".format(response))
        except Exception as e:
            debug_log("Cannot write to microcontroller - override")        

@shared_task(queue='celery')
def async_machine_on():
    debug_log("Machine on using schedule")
    status = StatusModel.objects.get(pk=1)
    status.on = True
    status.save()

@shared_task(queue='celery')
def async_machine_off():
    debug_log("Machine off using schedule")
    status = StatusModel.objects.get(pk=1)
    status.on = False
    status.save()

# ------------------------------------------------------------
# Machine
if django_settings.SIMULATE_MACHINE == False:
    # Arduino Comms
    import os
    import serial
    for i in range(0, 3):
        serial_path = "/dev/ttyACM{}".format(i)
        if os.path.exists(serial_path) == True:
            serial_arduino = serial.Serial(serial_path, 57600, timeout=1)
            break
    if serial_arduino:
        serial_arduino.flush()
        # Update Arduino settings
        async_comms_update.delay(on=False, brew=False, mode=0)
    else:
        raise serial.serialutil.SerialException("No serial connection to Arduino")    
# For testing without raspberry pi/espresso machine
else:
    from .simulation import simulated_temperature_sensor, pid_update

# Scale
if django_settings.SIMULATE_SCALE == False:
    import requests
else:
    from .simulation import simulated_mass_sensor
    