from django.core.management.base import BaseCommand, CommandError
from silviacontrol.tasks import async_power_machine, async_get_response, async_toggle_brew
from .models import StatusModel, ResponseModel, SettingsModel
from.display_cp import SilviaDisplay
from django.conf import settings as django_settings
from django.utils import timezone
from silviacontrol.utils import debug_log
import time


class Command(BaseCommand):
    help = 'Controls OLED display'

    def handle(self, *args, **options):
        if django_settings.SIMULATE_MACHINE == False:
            display = SilviaDisplay(0x3C)

            # Loop and update display
            while True:
                status = StatusModel.objects.get(id=1)
                if status.on:
                    settings = SettingsModel.objects.get(id=1)
                    latest_response = ResponseModel.objects.order_by('-t')[0]
                    if (timezone.now() - latest_response.t).total_seconds() > 10:
                        T = None
                    else:
                        T = latest_response.T_boiler
                    display.showTemperature(T, settings.T_set)
                time.sleep(1)
        else:
            debug_log("Pi display not used as in simulation mode")