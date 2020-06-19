from __future__ import absolute_import, unicode_literals
from celery import shared_task
from celery_once import QueueOnce
from .sensors import read_temperature_sensor
from .models import StatusModel, ResponseModel, SettingsModel
from .control import pid_update
from .utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
from smbus2 import SMBus
import struct


# I2C variables
if django_settings.SIMULATE_MACHINE == False:
    i2c_addr = 0x8
    i2c_bus = SMBus(1)  # Indicates /dev/ic2-1

@shared_task(base=QueueOnce)
# @celery.task(base=QueueOnce)
def async_get_response():
    # Read temperature sensor
    if django_settings.SIMULATE_MACHINE == True:
        T, t = read_temperature_sensor("simulated")
    else:
        i2c_block = i2c_bus.read_i2c_block_data(i2c_addr, 0, 6)
        # debug_log(i2c_block)
        t = timezone.now()
        # Format '<2?2f' => Little endian, 2xbool, 2xfloat
        i2c_extract = struct.unpack('<2?1f', bytes(i2c_block))
        T = i2c_extract[2]
        debug_log(i2c_extract)
        
    # Get new PID
    duty, duty_pid = pid_update(T, t)
    # Record temperature if machine is on
    status = StatusModel.objects.get(id=1)
    if status.on:
        response = ResponseModel.objects.create(
            T_boiler=T,
            duty=duty,
            duty_p=duty_pid[0],
            duty_i=duty_pid[1],
            duty_d=duty_pid[2]
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
    settings = SettingsModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        # Send i2C data to arduino
        # Structure packed here and unpacked using 'union' on Arduino
        block_data = struct.pack('<2?4f', on, False, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
        debug_log( "Data to send: {}".format(list(block_data)) )
        i2c_bus.write_i2c_block_data(i2c_addr, 1, list(block_data))
        # i2c_bus.write_byte(i2c_addr, 0)

    debug_log("Celery machine on: %s" % on)
    status.on = on
    status.brew = False # Always turn off brew when powering machine on/off
    status.save()

@shared_task
def async_toggle_brew(brew):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
    status = StatusModel.objects.get(id=1)
    settings = SettingsModel.objects.get(id=1)

    if django_settings.SIMULATE_MACHINE == False:
        # Send i2C data to arduino
        # Structure packed here and unpacked using 'union' on Arduino
        block_data = struct.pack('<2b4f', status.on, brew, settings.T_set, settings.k_p, settings.k_i, settings.k_d)
        i2c_bus.write_i2c_block_data(i2c_addr, 0, block_data)

    debug_log("Celery machine brewing: %s" % brew)
    status.brewing = brew
    status.save()

