from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .sensors import read_temperature_sensor
from .models import StatusModel, ResponseModel
from .control import pid_update
from .utils import debug_log
from django.conf import settings
# from smbus import SMBus

# I2C variables
i2c_addr = 0x8
i2c_bus = SMBus(1)  # Indicates /dev/ic2-1

@shared_task
def async_get_response():
    # Read temperature sensor
    if settings.SIMULATE_MACHINE == True:
        T, t = read_temperature_sensor("simulated")
    else:
        print("Real machine reading not yet implemented")
        T = None
        t = 0
        
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
    Inputs
        on: True = machine on, False = machine off [Bool]
    """
    if on:
        i2c_bus.write_byte(i2c_addr, 0x1) # switch it on
    else:
        i2c_bus.write_byte(i2c_addr, 0x0) # switch it off

    debug_log("Celery machine on: %s" % on)
    status = StatusModel.objects.get(id=1)
    status.on = on
    status.save()

