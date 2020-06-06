from gpiozero import Button
from signal import pause
from django.core.management.base import BaseCommand, CommandError
from silviacontrol.tasks import async_power_machine

def trigger_celery_machine_on():
    # Add the code to create a new task here
    async_power_machine(True)

def trigger_celery_machine_off():
    # Add the code to create a new task here
    async_power_machine(False)

class Command(BaseCommand):
    help = 'Registers functions for GPIO'

    def handle(self, *args, **options):
        button = Button(7)

        button.when_pressed = trigger_celery_machine_on
        # button.when_released = trigger_celery_machine_off

        # Wait for events
        self.stdout.write(self.style.SUCCESS('Waiting for button press'))
        pause()
        