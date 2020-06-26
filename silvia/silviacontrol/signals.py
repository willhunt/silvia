from django.db.models.signals import post_init, pre_save, post_delete, post_save
from django.dispatch import receiver
from .models import ScheduleModel, ResponseModel, StatusModel, SettingsModel
from .tasks import async_get_response, async_update_microcontroller
from django_celery_beat.models import CrontabSchedule, PeriodicTask, IntervalSchedule


# @receiver(pre_save, sender=StatusModel)
# def update_status(sender, instance, raw, using, update_fields, **kwargs):
    # """
    # When updating status, turn th machine on or off
    # """


@receiver(pre_save, sender=ScheduleModel)
def save_schedule(sender, instance, raw, using, update_fields, **kwargs):
    """
    When creating schedule model also create linked django_celery_beat schedule entries
    """
    dow_crontype = ScheduleModel.convert_dow_to_crontype(instance.days)
    # ON SCHEDULE
    if instance.schedule_on is None:
        crontab_on = CrontabSchedule.objects.create(
            minute=instance.t_on.minute,
            hour=instance.t_on.hour,
            day_of_week=dow_crontype,
            day_of_month='*',
            month_of_year='*'
        )
        schedule_on = PeriodicTask.objects.create(
            crontab=crontab_on,
            name=('%s_on' % (instance.name)),  
            task='silviacontrol.tasks.async_power_machine',
            args='["True"]',
            enabled=instance.active
        )
        instance.schedule_on = schedule_on
    else:
        instance.schedule_on.crontab.minute = instance.t_on.minute
        instance.schedule_on.crontab.hour = instance.t_on.hour
        instance.schedule_on.crontab.day_of_week = dow_crontype
        instance.schedule_on.crontab.save()
        instance.schedule_on.enabled = instance.active
        instance.schedule_on.save()
    # OFF SCHEDULE
    if instance.schedule_off is None:
        crontab_off = CrontabSchedule.objects.create(
            minute=instance.t_off.minute,
            hour=instance.t_off.hour,
            day_of_week=dow_crontype,
            day_of_month='*',
            month_of_year='*'
        )
        schedule_off = PeriodicTask.objects.create(
            crontab=crontab_off,
            name=('%s_off' % (instance.name)),  
            task='silviacontrol.tasks.async_power_machine',
            args='["False"]',
            enabled=instance.active
        )
        instance.schedule_off = schedule_off
    else:
        instance.schedule_off.crontab.minute = instance.t_off.minute
        instance.schedule_off.crontab.hour = instance.t_off.hour
        instance.schedule_off.crontab.day_of_week = dow_crontype
        instance.schedule_off.crontab.save()
        instance.schedule_off.enabled = instance.active
        instance.schedule_off.save()


@receiver(post_delete, sender=ScheduleModel)
def delete_schedule(sender, instance, **kwargs):
    """
    When deleting schedule model also delete linked django_celery_beat schedule entries
    """
    try:
        instance.schedule_on.delete()
    except (AssertionError, AttributeError) as e:
        print('No on schedule')
    try:
        instance.schedule_off.delete()
    except (AssertionError, AttributeError) as e:
        print('No off schedule')
    try:
        instance.schedule_on.crontab.delete()
    except (AssertionError, AttributeError) as e:
        print('No Crontab on')
    try:
        instance.schedule_off.crontab.delete()
    except (AssertionError, AttributeError) as e:
        print('No Crontab off')


@receiver(pre_save, sender=ResponseModel)
def save_response(sender, instance, raw, using, update_fields, **kwargs):
    """
    When creating response model check brewing status and add
    """
    try:
        status = StatusModel.objects.filter(id=1)
        instance.brewing = status.brew
    except:
        instance.brewing = False


@receiver(post_save, sender=SettingsModel)
def save_settings(sender, instance, raw, using, update_fields, **kwargs):
    """
    When updating settings model update periodic task and arduino settings
    """
    # See if periodic temperature update task exists
    try:
        periodic_response = PeriodicTask.objects.get(name="Get Response")
        #  Update period if different
        if periodic_response.interval.every != instance.t_sample:
            periodic_response.interval.every = instance.t_sample
            periodic_response.interval.save()

    except PeriodicTask.DoesNotExist:
        # Create periodic task if it doesn't exist
        periodic_interval = IntervalSchedule.objects.create(
            every=instance.t_sample,
            period='seconds'
        )
        status = StatusModel.objects.get(pk=1)
        periodic_response = PeriodicTask.objects.create(
            name="Get Response",
            task="silviacontrol.tasks.async_get_response",
            enabled=status.on,
            interval=periodic_interval
        )

    # Send to Arduino
    async_update_microcontroller.delay()
