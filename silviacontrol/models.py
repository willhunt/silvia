from django.db import models
from django.utils import timezone
from datetime import datetime, time
from django_celery_beat.models import CrontabSchedule, PeriodicTask

class SettingsModel(models.Model):
    """
    PID settings for the temperature control system
    """
    # Gains
    k_p = models.FloatField(default=0)  # Proportional gain
    k_d = models.FloatField(default=0)  # Derivative gain
    k_i = models.FloatField(default=0)  # Integral gain
    # Setpoints
    T_set = models.FloatField(default=95)  # Temperature setpoint [degC]
    V = models.FloatField(default=200)  # Double espresso volume [ml]
    # Sampling times
    t_update = models.IntegerField(default=5)  # Time delay between client side updates [s]
    t_sample = models.IntegerField(default=5)  # Time delay between server side sampling [s]

    def __repr__(self):
        repr_str = ('Settings %d' % self.id)
        return repr_str


class StatusModel(models.Model):
    """
    Machine status model
    """
    on = models.BooleanField(default=False)  # Machine on or off
    brew = models.BooleanField(default=False)  # Machine currently brewing

    def __repr__(self):
        status = "On" if self.on else "Off"
        brewing = "Brewing" if self.brew else "Not brewing"
        repr_str = ('Status: %s, %s' % (status, brewing))
        return repr_str


class SessionModel(models.Model):
    """
    Reference session for each machine on/off cycle
    Holds all temperature records for session as database relationship
    """
    t_start = models.DateTimeField(default=timezone.now)  # Session start time
    t_end = models.DateTimeField(blank=True, null=True)  # Session end time
    active = models.BooleanField(default=True)  # Current session flag

    def set_end_time(self, t_end=None, active=False):
        """
        ARGUMENTS:
        t_end (DateTime): Session end time
        active (Bool): Session active flag
        """
        if t_end is None:
            self.t_end = timezone.now()
        else:
            self.t_end = t_end
        self.active = active

    @property
    def start_date(self):
        return timezone.localtime(self.t_start).strftime("%Y-%m-%d") 

    @property
    def start_time(self):
        return timezone.localtime(self.t_start).strftime("%H:%M")

    def __repr__(self):
        repr_str = ("Session %d - %s"  % (self.id, self.t_start.strftime("%Y-%m-%d %H:%M")))
        return repr_str


class ResponseModel(models.Model):
    """
    Machine temperature over time
    PID response over time
    """
    t = models.DateTimeField(auto_now=True)
    T_boiler = models.FloatField()
    T_amb = models.FloatField(blank=True, null=True)
    duty = models.FloatField(default=0)
    duty_p = models.FloatField(default=0)
    duty_i = models.FloatField(default=0)
    duty_d = models.FloatField(default=0)
    Vdot = models.FloatField(default=0)
    brewing = models.BooleanField(default=False)

    @classmethod
    def create(cls, T_boiler=None, t=None, T_amb=None, duty=None, duty_pid=[None, None, None], Vdot=None): 
        """
        ARUMENTS:
        T_boiler (Float): Boiler temperature [degC]
        t (datetime): Time of temperature reading
        duty (Float): Controller output duty (0-1)
        duty_pid (list of Float): Controller output breakdown (0-1) [duty_p, duty_i, duty_d]
        Vdot (Float): Pump flow rate [l/mim]
        """
        try:
            status = StatusModel.objects.filter(id=1)
            brewing = status.brew
        except:
            brewing = False
        if t is None:
            t = timezone.now()

        return cls(T_boiler=T_boiler, t=t, duty=duty, duty_pid=duty_pid, Vdot=Vdot)

    @property
    def response_date(self):
        return self.t.date()

    @property
    def response_time(self):
        return self.t.strftime("%H:%M:%S")

    def __repr__(self):
        repr_str = ("T=%d @ %s" % (self.T_boiler, self.t.strftime("%Y-%m-%d %H:%M:%S")))
        return repr_str


class ScheduleManager(models.Manager):
    """
    Overwite manager to perform custom create, update and deletions for related schedule models (django_cleery_beat)

    NB: pre-delete handled in signals.py file
    """
    def create_schedule(self, name='Schedule', t_on=time(hour=0, minute=0), t_off=time(hour=0, minute=0), days='0000000', active=False):
        """
        Create object
        Inputs
            t_on (Time): On time
            t_off (Time): Off time
            days (String): Days string 0/1 strarting SUnday
        """
        dow_crontype = ScheduleModel.convert_dow_to_crontype(days)
        if t_on:
            crontab_on = CrontabSchedule(
                minute = t_on.minute,
                hour = t_on.hour,
                day_of_week = dow_crontype,
                day_of_month = '*',
                month_of_year = '*'
            )
            crontab_on.save()
            schedule_on = PeriodicTask(
                crontab=crontab_on,
                name=('%s_cron[%d]_on' % (name, crontab_on.id)),  
                task='silviacontrol.tasks.async_power_machine',
                args='["True"]',
                enabled=active
            )
            schedule_on.save()
        else:
            schedule_on = None

        if t_off:
            crontab_off = CrontabSchedule(
                minute = t_off.minute,
                hour = t_off.hour,
                day_of_week = dow_crontype,
                day_of_month = '*',
                month_of_year = '*'
            )
            crontab_off.save()
            schedule_off = PeriodicTask(
                crontab=crontab_off,
                name=('%s_cron[%d]_on' % (name, crontab_off.id)),  
                task='silviacontrol.tasks.async_power_machine',
                args='["False"]',
                enabled=active
            )
            schedule_off.save()
        else:
            schedule_off = None

        schedule = self.create(name=name, days=days, schedule_on=schedule_on, schedule_off=schedule_off, active=active)
        return schedule


class ScheduleModel(models.Model):
    """
    Machine on/off schedule model
    """
    name = models.CharField(max_length=20, default='Schedule')  # Name of schedule (e.g. "Morning")
    days = models.CharField(max_length=7, default='0000000')  # Day schedule - string of 0 or 1's to indicate if active on weekday starting with Sun=0
    schedule_on = models.ForeignKey(PeriodicTask, on_delete=models.CASCADE, related_name='schedule_on', null=True)  # Time to turn machine on
    schedule_off = models.ForeignKey(PeriodicTask, on_delete=models.CASCADE, related_name='schedule_off', null=True)  # Time to turn machine off
    active = models.BooleanField(default=False)  # Schedule active [True] or not [False]

    objects = ScheduleManager()

    def get_weekdays(self):
        day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        schedule_days = []
        for active, name in zip(self.days, day_names):
            if active is '1':
                schedule_days.append(name)
        return schedule_days

    @staticmethod
    def convert_dow_to_crontype(dow):
        """
        Convert database day of the week to crontab list format
        """
        dow_cron = []
        for i, d in enumerate(dow):
            if d is "1":
                dow_cron.append(i)
        return dow_cron

    @staticmethod
    def convert_dow_from_crontype(dow):
        """
        Convert crontab style day of the week to database type
        """
        dow_cron = []
        for i, d in enumerate(dow):
            if d is "1":
                dow_cron.append(i)
        return dow_cron

    @staticmethod
    def four_digit_time_string(t):
        hour = str(t.hour)
        if len(hour) == 1:
            hour = "0" + hour
        minute = str(t.minute)
        if len(minute) == 1:
            minute = "0" + minute
        return ("%s:%s" % (hour, minute))

    @property
    def start_time(self):
        return self.four_digit_time_string(self.schedule_on.crontab)

    @property
    def end_time(self):
        return self.four_digit_time_string(self.schedule_off.crontab)

    def __repr__(self):
        if self.active:
            active_text = "Active"
        else:
            active_text = "Not active"
        repr_str = ("Schedule: %s - %s (%s)"  % (self.t_on, self.t_off, active_text))
        return repr_str

