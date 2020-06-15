from gpiozero import Button, OutputDevice
from signal import pause
from django.core.management.base import BaseCommand, CommandError
from silviacontrol.tasks import async_power_machine, async_get_response

def trigger_celery_machine_on():
    async_power_machine.delay(True)

def trigger_celery_machine_off():
    async_power_machine.delay(False)

def trigger_celery_brew_start():
    pass

def trigger_celery_brew_stop():
    pass

def trigger_celery_response():
    async_get_response()

class Command(BaseCommand):
    help = 'Registers functions for GPIO interrupts on pi'

    def handle(self, *args, **options):
        # Machine on/off
        button_power = Button(4)  # GPIO4, pin 7
        button_power.when_pressed = trigger_celery_machine_on
        button_power.when_released = trigger_celery_machine_off
        # Machine brew
        button_brew = Button(0)  # GPIO0, pin 11
        button_brew.when_pressed = trigger_celery_brew_start
        button_brew.when_released = trigger_celery_brew_stop

        # Test function
        button_response = Button(14)
        button_response.when_pressed = trigger_celery_response

        # Wait for events
        self.stdout.write(self.style.SUCCESS('Waiting for button press...'))
        pause()
        