from django.core.management.base import BaseCommand, CommandError
from silviacontrol.tasks import async_power_machine, async_toggle_brew
from silviacontrol.models import StatusModel
from django.conf import settings as django_settings
from silviacontrol.utils import debug_log

def trigger_machine_on():
    # async_power_machine.delay(True)
    status = StatusModel.objects.get(pk=1)
    status.on = True
    status.save()

def trigger_machine_off():
    # async_power_machine.delay(False)
    status = StatusModel.objects.get(pk=1)
    status.on = False
    status.save()

def trigger_brew_start():
    # async_toggle_brew.delay(True)
    status = StatusModel.objects.get(pk=1)
    status.brew = True
    status.save()

def trigger_brew_stop():
    # async_toggle_brew.delay(False)
    status = StatusModel.objects.get(pk=1)
    status.brew = False
    status.save()


class Command(BaseCommand):
    help = 'Registers functions for GPIO interrupts on pi'

    def handle(self, *args, **options):
        if django_settings.SIMULATE_MACHINE == False:
            from gpiozero import Button
            from signal import pause

            # Machine on/off
            button_power = Button(17)  # GPIO17
            button_power.when_pressed = trigger_machine_on
            button_power.when_released = trigger_machine_off
            # Machine brew
            button_brew = Button(27)  # GPIO27
            button_brew.when_pressed = trigger_brew_start
            button_brew.when_released = trigger_brew_stop

            # Wait for events
            self.stdout.write(self.style.SUCCESS('Waiting for button press...'))
            pause()
        else:
            debug_log("Pi Interrupts not started as in simulation mode")