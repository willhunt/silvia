from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .sensors import read_temperature_sensor
from .models import StatusModel, ResponseModel
from .control import pid_update
from .utils import debug_log
from django.conf import settings
from django.utils import timezone
from smbus2 import SMBus
import struct

# I2C variables
if settings.SIMULATE_MACHINE == False:
    i2c_addr = 0x8
    i2c_bus = SMBus(1)  # Indicates /dev/ic2-1

@shared_task
def async_get_response():
    # Read temperature sensor
    if settings.SIMULATE_MACHINE == True:
        T, t = read_temperature_sensor("simulated")
    else:
        # print("Real machine reading not yet implemented")
        # T = 20
        i2c_block = i2c_bus.read_i2c_block_data(i2c_addr, 0, 12)
        debug_log(i2c_block)
        t = timezone.now()
        i2c_extract = struct.unpack('<2?2f', bytes(i2c_block))
        T = i2c_extract[2]
        debug_log(i2c_extract)
        debug_log("Temperature read as: {}".format(T))
        
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
    debug_log(T)
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
    if settings.SIMULATE_MACHINE == False:
        if on:
            i2c_bus.write_byte(i2c_addr, 0) # switch it on
            i2c_bus.write_i2c_block_data(i2c_addr, 0, [0, 0])
        else:
            # i2c_bus.write_byte(i2c_addr, 1) # switch it off
            i2c_bus.write_i2c_block_data(i2c_addr, 0, [0, 1])

    debug_log("Celery machine on: %s" % on)
    status = StatusModel.objects.get(id=1)
    status.on = on
    status.save()

@shared_task
def async_toggle_brew(on):
    """
    Args
        on [Bool]: True = start brewing, False = stop brewing
    """
    if settings.SIMULATE_MACHINE == False:
        if on:
            # i2c_bus.write_byte(i2c_addr, 2) # switch it on
            i2c_bus.write_i2c_block_data(i2c_addr, 0, [0, 2])
        else:
            # i2c_bus.write_byte(i2c_addr, 1) # switch it off
            i2c_bus.write_i2c_block_data(i2c_addr, 0, [0, 1])

    debug_log("Celery machine brewing: %s" % on)
    status = StatusModel.objects.get(id=1)
    status.brewing = on
    status.save()

