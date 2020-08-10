from django.core.management.base import BaseCommand, CommandError
from django.conf import settings as django_settings
from silviacontrol.utils import debug_log

class Command(BaseCommand):
    help = 'Registers functions for GPIO interrupts on pi'

    def handle(self, *args, **options):
        if django_settings.SIMULATE_MACHINE == False:
            from silviacontrol.display_cp import SilviaDisplay

            display = SilviaDisplay(0x3C)
            display.welcome()
            display.showTemperature(20, 100)
        else:
            debug_log("Nothing to display in simulation mode")