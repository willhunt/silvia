from django.db.models.signals import post_init, pre_save, post_delete, post_save
from django.dispatch import receiver
from django.conf import settings as django_settings
from .models import ScheduleModel, ResponseModel, StatusModel, SettingsModel, SessionModel
from .tasks import async_get_response, async_update_microcontroller, async_update_scale
from django_celery_beat.models import CrontabSchedule, PeriodicTask, IntervalSchedule

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
            name="on:{0} {1}".format(instance.id, instance.name),
            # name=('%s_on' % (instance.name)),  
            task='silviacontrol.tasks.async_power_machine',
            args='["True"]',
            enabled=instance.active
        )
        instance.schedule_on = schedule_on
    else:
        instance.schedule_on.name = "on:{0} {1}".format(instance.id, instance.name)
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
            name="off:{0} {1}".format(instance.id, instance.name),
            # name=('%s_off' % (instance.name)),  
            task='silviacontrol.tasks.async_power_machine',
            args='["False"]',
            enabled=instance.active
        )
        instance.schedule_off = schedule_off
    else:
        instance.schedule_off.name = "off:{0} {1}".format(instance.id, instance.name)
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
def pre_save_response(sender, instance, raw, using, update_fields, **kwargs):
    """
    When creating response model check brewing status and add
    """
    status = StatusModel.objects.get(id=1)
    # Set brewing in response
    instance.brewing = status.brew

    settings = SettingsModel.objects.get(id=1)
    # Check if brewing and mass target is reached
    if status.brew:
        if instance.m is not None and instance.m >= settings.m:
            status.brew = False
            status.save()

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

@receiver(pre_save, sender=StatusModel)
def save_status(sender, instance, raw, using, update_fields, **kwargs):
    """
    When saving status model turn temperature update on/off
    When saving status model create or end schedule as necessary
    """
    try:
        periodic_response = PeriodicTask.objects.get(name="Get Response")
        periodic_response.enabled = instance.on
        periodic_response.save()
    except:
        raise ValueError("Save sample time to create 'Get Response' periodic task")

    prior_status = StatusModel.objects.get(pk=1)
    # Fill in values not sent
    if not instance.on:
        instance.on = prior_status.on
    if not instance.brew:
        instance.brew = prior_status.brew
    if not instance.mode:
        instance.mode = prior_status.mode

    # Implement some rules on on/brew combinations
    if instance.on != prior_status.on:  # Ensure brew off if changing on/off
        instance.brew = False
    elif instance.brew != prior_status.brew:  # Ensure machine on if changing brew
        instance.on = True

    if instance.on and not prior_status.on:  # Turning machine on
        # Create a new session
        session = SessionModel()
        session.save()

        # If simulating, set temperature to 20degC
        if django_settings.SIMULATE_MACHINE:
            response = ResponseModel.objects.create(
                T_boiler=20,
                duty=0,
                duty_p=0,
                duty_i=0,
                duty_d=0
            )
            response.save()

    elif prior_status.on and not instance.on:  # If machine is being turned off
        # Get current session
        session = SessionModel.objects.filter(active=True).order_by('-id')[0]
        session.set_end_time()
        session.save()

    # Turn actual machine/brew on/off or mode change
    async_update_microcontroller.delay(instance.on, instance.brew, instance.mode)

    # Turn scale on/off
    if instance.brew != prior_status.brew:
        async_update_scale.delay(instance.brew)

    # Modes
    # Changing to autotune mode
    # if (instance.mode == 2) and (instance.mode != prior_status.mode):
    #     async_autotune_i2c.delay(autotuneOn=True)
    # # Changing out of autotune mode
    # elif (prior_status.mode == 2) and (instance.mode != prior_status.mode):
    #     # This will fire after Arduino has stopped autotuning but should not have a negative affect
    #     async_autotune_i2c.delay(autotuneOn=False)
    # # Changing to manual mode
    # elif (instance.mode == 1) and (instance.mode != prior_status.mode):

