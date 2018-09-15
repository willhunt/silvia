from django.utils import timezone
import random
from .simulation import sim_T_boiler
from .models import ResponseModel

def read_temperature_sensor(select="sensor"):
    """
    Read temperature sensor, can be actual, random or simulated response
    Inputs
        select (String): Choose responce method - "random", "sensor", "simulated"
    """
    if select is "sensor":
        print("sensor not yet implemented")
        return None, None
    elif select is "random":
        # Read sensor value
        T = random.randrange(60, 100)  # Dummy code
        t = timezone.now()
        return T, t
    elif select is "simulated":
        return sim_T_boiler(ResponseModel.objects.order_by('-t')[0])
