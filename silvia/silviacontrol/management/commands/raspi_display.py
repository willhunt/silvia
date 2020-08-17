from django.core.management.base import BaseCommand, CommandError
from silviacontrol.models import StatusModel, ResponseModel, SettingsModel, SessionModel
from silviacontrol.utils import debug_log
from django.conf import settings as django_settings
from django.utils import timezone
import time


class Command(BaseCommand):
    help = 'Controls OLED display'

    def handle(self, *args, **options):
        if django_settings.SIMULATE_MACHINE == False:
            from silviacontrol.display_cp import SilviaDisplay

            display = SilviaDisplay(0x3C)

            # Loop and update display
            while True:
                status = StatusModel.objects.get(id=1)
                if status.on:
                    # Display welcome screen if only just turned on
                    t_now = timezone.now()
                    session = SessionModel.objects.filter(active=True).order_by('-t_start')[0]
                    if (t_now - session.t_start).total_seconds() < 2:
                        display.showWelcome()
                    else:
                        # Otherwise display temperature
                        settings = SettingsModel.objects.get(id=1)
                        latest_response = ResponseModel.objects.order_by('-t')[0]
                        if (t_now - latest_response.t).total_seconds() > 10:
                            T = None
                        else:
                            T = latest_response.T_boiler
                        display.showTemperature(T, settings.T_set)
                else:  # Off
                    display.showBlank()
                time.sleep(1)
        else:
            debug_log("Pi display not used as in simulation mode")