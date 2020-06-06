from gpiozero import Button
from signal import pause
from tasks import async_power_machine

def trigger_celery_machine_on():
    # Add the code to create a new task here
    async_power_machine(True)

def trigger_celery_machine_off():
    # Add the code to create a new task here
    async_power_machine(False)

button = Button(7)

button.when_pressed = trigger_celery_machine_on
# button.when_released = trigger_celery_machine_off

# Wait for events
pause()