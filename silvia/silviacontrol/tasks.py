from __future__ import absolute_import, unicode_literals
from celery import shared_task
from celery.contrib.abortable import AbortableTask
from celery_once import QueueOnce
from silvia.celery import app
from .models import StatusModel, ResponseModel, SettingsModel
from .utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
import struct

# For real machine
if django_settings.SIMULATE_MACHINE == False:
    from.display_cp import SilviaDisplay
    import time
    import requests

    if django_settings.ARDUINO_COMMS == "i2c":
        from smbus2 import SMBus

        # I2C variables
        i2c_addr_arduino = 0x8
        i2c_bus = SMBus(1)  # Indicates /dev/ic2-1
    elif django_settings.ARDUINO_COMMS == "serial":
        import os
        import serial

        for i in range(0, 3):
            serial_path = "/dev/ttyACM{}".format(i)
            if os.path.exists(serial_path) == True:
                serial_arduino = serial.Serial(serial_path, 9600, timeout=2)
                break
        if serial_arduino:
            serial_arduino.flush()
        else:
            raise serial.serialutil.SerialException("No serial connection to Arduino")    
        
    else:
        raise NotImplementedError("ARDUINO_COMMS not recognised")

    display = SilviaDisplay(0x3C)

# For testing without raspberry pi/espresso machine
else:
    from .simulation import simulated_temperature_sensor, simulated_mass_sensor, pid_update


@shared_task(base=QueueOnce)
def async_get_response():
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    # Read temperature sensor
    if django_settings.SIMULATE_MACHINE == True:
        t = timezone.now()
        T = simulated_temperature_sensor("simulated")
        m = simulated_mass_sensor("simulated")
        # Get new PID
        duty, duty_pid = pid_update(T, t)
        low_water = False
    else:
        if django_settings.ARDUINO_COMMS == "i2c":
            data_block = i2c_bus.read_i2c_block_data(i2c_addr_arduino, 0, 11)
        elif django_settings.ARDUINO_COMMS == "serial":
            serial_arduino.write("R".encode())
            data_block = serial_arduino.read(size=11)
        print(data_block)

        # t = timezone.now()
        # Format '<2?2f' => Little endian, 2xbool, 2xfloat, 1xbool
        data_list = struct.unpack('<2?2f1?', bytes(data_block))
        T = data_list[2]
        duty = data_list[3]
        duty_pid = [0, 0, 0]  # Can't get these from Arduino PID library
        low_water = not data_list[4]

        settings = SettingsModel.objects.get(id=1)

        # MASS - from Scale over HTTP
        try:
            request_scale = requests.get("http://192.168.0.12/mass")
            # Decode data
            data_scale = request_scale.json()
            m = data_scale["mass"]
        except:
            m = None

    # Check if when brewing, mass is met
    if status.brew:
        if m is not None and m >= settings.m:
            async_toggle_brew(False)


    # Record temperature if machine is on
    if status.on:
        response = ResponseModel.objects.create(
            T_boiler=T,
            duty=duty,
            duty_p=duty_pid[0],
            duty_i=duty_pid[1],
            duty_d=duty_pid[2],
            m=m,
            T_setpoint=settings.T_set,
            low_water=low_water
            # brewing=status.brew # This is done via signal
        )
        response.save()
    return T

@shared_task
def async_power_machine(on):
    """
    Args
        on [Bool]: True = machine on, False = machine off 
    I2C
    [Byte 1, Byte2, ...] = [Mode, Setting1, Setting2, ...]
    Modes: 0 Status, 1 Settings
    """
    # Purge celery queues
    # Without this the screen update has many problems causing flickering or image shift
    app.control.purge()

    # status = StatusModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        async_update_microcontroller(on=on, brew=False)
        if on:
            display.welcome()
        else:
            display.off()

    debug_log("Celery machine on: %s" % on)
    # status.on = on
    # status.brew = False # Always turn off brew when powering machine on/off
    # status.save()
    # Log response at this event
    # async_get_response()

@shared_task
def async_toggle_brew(brew):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
    # app.control.purge()

    # status = StatusModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        # Reset scale
        if brew:
            try:
                requests.get("http://192.168.0.12/brewstart")
            except requests.exceptions.RequestException as e:
                debug_log("No connection to scale")
        else:
            try:
                requests.get("http://192.168.0.12/brewstop")
            except requests.exceptions.RequestException as e:
                debug_log("No connection to scale")

        # Turn machine on
        async_update_microcontroller(brew=brew)


    debug_log("Celery machine brewing: %s" % brew)
    # status.brew = brew
    # status.save()
    # Log response at this event
    # async_get_response()

@shared_task
def async_update_microcontroller(on=None, brew=None):
    if django_settings.SIMULATE_MACHINE == False:
        if django_settings.ARDUINO_COMMS == "i2c":
            update_microcontroller_i2c(on, brew)
        elif django_settings.ARDUINO_COMMS == "serial":
            update_microcontroller_serial(on, brew)

def update_microcontroller_i2c(on=None, brew=None):
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)
    
    if on is None:
        on = status.on
    if brew is None:
        brew = status.brew
    # Send i2C data to arduino
    # Structure packed here and unpacked using 'union' on Arduino
    data_block = struct.pack('<2?4f', on, brew, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
    debug_log( "Data to send: {}".format( list(data_block) ) )
    i2c_bus.write_i2c_block_data(i2c_addr_arduino, 1, list(data_block))

def update_microcontroller_serial(on=None, brew=None):
    """
    For some reason the Arduino does not detect Serial.available() > 0 after reading first byte.
    """
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    if on is None:
        on = status.on
    if brew is None:
        brew = status.brew
    # Send i2C data to arduino
    # Structure packed here and unpacked using 'union' on Arduino
    data_block = struct.pack('<c2?4f', "X".encode(), on, brew, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
    debug_log( "Data to send: {}".format(data_block) )
    # serial_arduino.write(list(data_block))
    serial_arduino.write(data_block)
    response = serial_arduino.readline()
    debug_log("Response: {}".format(response))

@shared_task(base=AbortableTask)
def async_turn_display_on():
    if django_settings.SIMULATE_MACHINE == False:
        display.welcome()
        # Loop and update display
        while True:
            settings = SettingsModel.objects.get(id=1)
            latest_response = ResponseModel.objects.order_by('-t')[0]
            if (timezone.now() - latest_response.t).total_seconds() > 10:
                T = None
            else:
                T = latest_response.T_boiler
            display.showTemperature(T, settings.T_set)
            time.sleep(1)

