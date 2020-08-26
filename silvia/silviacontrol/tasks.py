from __future__ import absolute_import, unicode_literals
from celery import shared_task
from celery_once import QueueOnce
from .models import StatusModel, ResponseModel, SettingsModel
from .utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
import struct

# For real machine
if django_settings.SIMULATE_MACHINE == False:
    # Scale
    import requests
    from .simulation import simulated_mass_sensor
    # Arduino Comms
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

# For testing without raspberry pi/espresso machine
else:
    from .simulation import simulated_temperature_sensor, simulated_mass_sensor, pid_update


@shared_task(base=QueueOnce, once={'graceful': True})
def async_get_response():
    """
    Get sensor and PID data from microcontroller and wireless scale
    Simulations used for testing
    """
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    # Read simulated sesnors
    if django_settings.SIMULATE_MACHINE == True:
        t = timezone.now()
        T = simulated_temperature_sensor("simulated")
        m = simulated_mass_sensor("simulated")
        # Get new PID
        duty, duty_pid = pid_update(T, t)
        low_water = False
        mode = status.mode
        debug_log("Simulated response: {}C".format(T))
    else:
        # ARDUINO
        if django_settings.ARDUINO_COMMS == "i2c":
            # Read response, using register 0
            try:
                data_block = i2c_bus.read_i2c_block_data(i2c_addr_arduino, 0, 24)
            except Exception as e:
                debug_log("Cannot write to microcontroller - response")
                return False
        elif django_settings.ARDUINO_COMMS == "serial":
            serial_arduino.write(struct.pack('<b', 0))
            data_block = serial_arduino.read(size=24)
            serial_arduino.flush()

        debug_log( "Data received: {}".format( list(data_block) ) )
        data_list = struct.unpack('<2?2f?B3f', bytes(data_block))
        [power, brew, T, duty, low_water, mode, Kp, Ki, Kd] = data_list   
        duty_pid = [None, None, None]  # Can't get these from Arduino PID library

        # Check if autotune has finished, if so update gains
        last_response = ResponseModel.objects.order_by('-t')[0]
        if (mode !=2) and (last_response.mode == 2):
            # Update gains
            settings.k_p = Kp
            settings.k_i = Ki
            settings.k_d = Kd
            settings.save()
            # Save new status
            status.mode = mode
            status.save()

        # SCALE
        try:
            request_scale = requests.get("http://192.168.0.12/mass")
            # Decode data
            data_scale = request_scale.json()
            m = data_scale["mass"]
        except requests.exceptions.RequestException as e:
            m = None
            # m = simulated_mass_sensor("simulated")

    # Record temperature if machine is on
    if status.on:
    # if True:
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
            mode=mode
        )
        response.save()

    return T


@shared_task()
def async_update_scale(brew):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
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


@shared_task
def async_update_microcontroller(on=None, brew=None, mode=0):
    if django_settings.SIMULATE_MACHINE == False:
        if django_settings.ARDUINO_COMMS == "i2c":
            update_microcontroller_i2c(on, brew, mode)
        elif django_settings.ARDUINO_COMMS == "serial":
            update_microcontroller_serial(on, brew, mode)

def update_microcontroller_i2c(on=None, brew=None, mode=0):
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)
    
    if on is None:
        on = status.on
    if brew is None:
        brew = status.brew
    # Send i2C data to arduino
    # Structure packed here and unpacked using 'union' on Arduino
    data_block = struct.pack('<2?B4f', on, brew, mode, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
    debug_log( "Data to send: {}".format( list(data_block) ) )
    # Write to register 1
    try:
        i2c_bus.write_i2c_block_data(i2c_addr_arduino, 1, list(data_block))
    except Exception as e:
        debug_log("Cannot write to microcontroller - update")

def update_microcontroller_serial(on=None, brew=None, mode=0):
    """
    For some reason the Arduino does not detect Serial.available() > 0 after reading first byte.
    """
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    if on is None:
        on = status.on
    if brew is None:
        brew = status.brew
    # Send serial data to arduino
    # Structure packed here and unpacked using 'union' on Arduino
    data_block = struct.pack('<b2?B4f', 1, on, brew, mode, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
    debug_log( "Data to send: {}".format(data_block) )
    try:
        serial_arduino.write(data_block)
        response = serial_arduino.readline()
        serial_arduino.flush()
        debug_log("Response: {}".format(response))
    except Exception as e:
        debug_log("Cannot write to microcontroller - update")

@shared_task
def async_override_microcontroller(heaterOn=False):
    """
    Control override/manual mode of arduino
    """
    if django_settings.SIMULATE_MACHINE == False:
        if django_settings.ARDUINO_COMMS == "i2c":
            async_override_i2c(heaterOn)
        elif django_settings.ARDUINO_COMMS == "serial":
            async_override_serial(heaterOn)

def async_override_i2c(heaterOn=False):
    """
    Control override/manual mode of arduino
    """
    data_block = struct.pack('<?', heaterOn)
    debug_log( "Override data to send: {}".format( list(data_block) ) )
    # Write to register 2
    try:
        i2c_bus.write_i2c_block_data(i2c_addr_arduino, 2, list(data_block))
    except Exception as e:
        debug_log("Cannot write to microcontroller - override")
        
def async_override_serial(heaterOn=False):
    """
    Control override/manual mode of arduino
    """
    data_block = struct.pack('<b?', 2, heaterOn)
    debug_log( "Override data to send: {}".format( list(data_block) ) )
    try:
        serial_arduino.write(data_block)
        response = serial_arduino.readline()
        serial_arduino.flush()
        debug_log("Response: {}".format(response))
    except Exception as e:
        debug_log("Cannot write to microcontroller - override")
