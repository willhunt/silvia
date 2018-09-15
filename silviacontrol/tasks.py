from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .sensors import read_temperature_sensor
from .models import StatusModel, ResponseModel
from .control import pid_update
from .utils import debug_log

@shared_task
def async_get_response():
    # Read temperature sensor
    T, t = read_temperature_sensor("simulated")
    # Get new PID
    duty, duty_pid = pid_update(T, t)
    # Record temperature if machine is on
    status = StatusModel.objects.get(id=1)
    if status.on:
        response = ResponseModel.create(T, t=t, duty=duty, duty_pid=duty_pid)
        response.save()
    debug_log(T)
    return T

@shared_task
def async_power_machine(on):
    """
    Inputs
        on: True = machine on, False = machine off [Bool]
    """
    # Turn machine on here
    debug_log("Celery machine on: %s" % on)
    status = StatusModel.objects.get(id=1)
    status.on = on
    status.save()

