from __future__ import absolute_import, unicode_literals
from celery import shared_task
from celery_once import QueueOnce
from .models import StatusModel, ResponseModel, SettingsModel
from .utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
import struct
import time

# For real machine
if django_settings.SIMULATE_MACHINE == False:
    import serial
    from.display_cp import SilviaDisplay
    import requests

    # I2C variables
    # i2c_addr_arduino = 0x8
    # i2c_bus = SMBus(1)  # Indicates /dev/ic2-1
    serial_arduino = serial.Serial('/dev/ttyACM0', 57600, timeout=1)
    serial_arduino.flush()

    i2c_addr_oled = 0x3C
    display = SilviaDisplay(i2c_addr_oled)

    # Delay required before updating screen otherwise it pushes image to bottom for some
    # reason possibly as it is usually updated just after an i2c call to the Arduino
    display_update_delay = 0.3  # [s]
# For testing
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
        # TEMPERATURE - from Microcontroller over I2C
        # data_block = i2c_bus.read_i2c_block_data(i2c_addr_arduino, 0, 11)
        serial_arduino.write("?".encode('utf-8'))
        data_block = serial_arduino.read(size=11)

        t = timezone.now()
        # Format '<2?2f' => Little endian, 2xbool, 2xfloat, 1xbool
        data_list = struct.unpack('<2?2f1?', bytes(data_block))
        T = data_list[2]
        duty = data_list[3]
        duty_pid = [0, 0, 0]  # Can't get these from Arduino PID library
        low_water = not data_list[4]

        settings = SettingsModel.objects.get(id=1)
        if status.on:
            time.sleep(display_update_delay)
            display.showTemperature(T, settings.T_set)
            # async_display_temperature.delay(T, settings.T_set)

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
    status = StatusModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        update_microcontroller_serial(on=on, brew=False)
        if on:
            time.sleep(display_update_delay)
            display.welcome()
            # async_display_welcome.delay()
        else:
            time.sleep(display_update_delay)
            display.off()
            # async_display_off.delay()

    debug_log("Celery machine on: %s" % on)
    status.on = on
    status.brew = False # Always turn off brew when powering machine on/off
    status.save()
    # Log response at this event
    async_get_response()

@shared_task
def async_toggle_brew(brew):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
    status = StatusModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        # Reset scale
        if brew:
            requests.get("http://192.168.0.12/brewstart")
        else:
            requests.get("http://192.168.0.12/brewstop")
        
        # Turn machine on
        update_microcontroller_serial(brew=brew)


    debug_log("Celery machine brewing: %s" % brew)
    status.brew = brew
    status.save()
    # Log response at this event
    async_get_response()

@shared_task
def async_update_microcontroller():
    if django_settings.SIMULATE_MACHINE == False:
        update_microcontroller_serial()

# def update_microcontroller_i2c(on=None, brew=None):
#     status = StatusModel.objects.get(id=1)
#     settings = SettingsModel.objects.get(id=1)
    
#     if on is None:
#         on = status.on
#     if brew is None:
#         brew = status.brew
#     # Send i2C data to arduino
#     # Structure packed here and unpacked using 'union' on Arduino
#     data_block = struct.pack('<2?4f', on, brew, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
#     debug_log( "Data to send: {}".format(list(data_block)) )
#     i2c_bus.write_i2c_block_data(i2c_addr_arduino, 1, list(data_block))

def update_microcontroller_serial(on=None, brew=None):
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    if on is None:
        on = status.on
    if brew is None:
        brew = status.brew
    # Send i2C data to arduino
    # Structure packed here and unpacked using 'union' on Arduino
    data_block = struct.pack('<1c2?4f', "x".encode('utf-8'), on, brew, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
    debug_log( "Data to send: {}".format(list(data_block)) )
    serial_arduino.write(list(data_block))

@shared_task
def async_display_welcome():
    time.sleep(display_update_delay)
    display.welcome()
    time.sleep(2)

@shared_task
def async_display_temperature(T, T_set):
    time.sleep(display_update_delay)
    display.showTemperature(T, T_set)

@shared_task
def async_display_off():
    time.sleep(display_update_delay)
    display.off()