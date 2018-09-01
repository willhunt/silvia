from django.db import models
from datetime import datetime, time

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
    t_start = models.DateTimeField(auto_now=True)  # Session start time
    t_end = models.DateTimeField(blank=True, null=True)  # Session end time
    active = models.BooleanField()  # Current session flag

    def set_end_time(self, t_end=datetime.now(), active=False):
        """
        ARGUMENTS:
        t_end (DateTime): Session end time
        active (Bool): Session active flag
        """
        self.t_end = t_end
        self.active = active

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

    def add_response(self, T_boiler=None, t=datetime.now(), T_amb=None, duty=None, duty_pid=[None, None, None], Vdot=None): 
        """
        ARUMENTS:
        T_boiler (Float): Boiler temperature [degC]
        t (datetime): Time of temperature reading
        duty (Float): Controller output duty (0-1)
        duty_pid (list of Float): Controller output breakdown (0-1) [duty_p, duty_i, duty_d]
        Vdot (Float): Pump flow rate [l/mim]
        """
        self.t = t
        self.T_boiler = T_boiler
        self.T_amb = T_amb
        self.duty = duty
        self.duty_p = duty_pid[0]
        self.duty_i = duty_pid[1]
        self.duty_d = duty_pid[2]
        try:
            status = StatusModel.objects.filter(id=1)
            self.brewing = status.brew
        except:
            self.brewing = False

    def __repr__(self):
        repr_str = ("T=%d @ %s" % (self.T_boiler, self.t.strftime("%Y-%m-%d %H:%M:%S")))
        return repr_str


class ScheduleModel(models.Model):
    """
    Machine on/off schedule model
    """
    name = models.CharField(max_length=20, default='Schedule')  # Name of schedule (e.g. "Morning")
    days = models.CharField(max_length=7, default='0000000')  # Day scedule - string of 0 or 1's to indicate if active on weekday starting with Mon=0
    t_on = models.TimeField(default=time(hour=0, minute=0))  # Time to turn machine on
    t_off = models.TimeField(default=time(hour=0, minute=0))  # Time to turn machine off
    active = models.BooleanField()  # Schedule active [True] or not [False]
    key_task_on = models.IntegerField(blank=True, null=True)  # Celery task key/id
    key_task_off = models.IntegerField(blank=True, null=True)

    def get_weekdays(self):
        day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        schedule_days = []
        for active, name in zip(self.days, day_names):
            if active is '1':
                schedule_days.append(name)
        return schedule_days

    def __repr__(self):
        if self.active:
            active_text = "Active"
        else:
            active_text = "Not active"
        repr_str = ("Schedule: %s - %s (%s)"  % (self.t_on, self.t_off, active_text))
        return repr_str

