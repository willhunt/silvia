from django.core.management.base import BaseCommand
from django_celery_beat.models import PeriodicTask, IntervalSchedule

TASK_NAME = "Check serial"
INTERVAL = 0.5 #s

class Command(BaseCommand):
    help = 'Creates periodic task to check for arduino serial comms'

    def handle(self, *args, **options):
       # See if periodic task exists
        try:
            periodic_check = PeriodicTask.objects.get(name=TASK_NAME)
            #  Update period if different
            if periodic_check.interval.every != INTERVAL:
                periodic_check.intervalL.every = INTERVAL
                periodic_check.interval.save()
        except PeriodicTask.DoesNotExist:
            # Create periodic task if it doesn't exist
            periodic_interval = IntervalSchedule.objects.create(
                every=INTERVAL,
                period='seconds'
            )
            periodic_check = PeriodicTask.objects.create(
                name=TASK_NAME,
                task="silviacontrol.tasks.async_comms_process",
                enabled=True,
                INTERVAL=periodic_interval
            )