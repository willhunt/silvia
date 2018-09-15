from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import ScheduleModel


@receiver(post_delete, sender=ScheduleModel)
def delete_schedule(sender, instance, **kwargs):
    instance.schedule_on.delete()
    instance.schedule_off.delete()
    instance.schedule_on.crontab.delete()
    instance.schedule_off.crontab.delete()
    
