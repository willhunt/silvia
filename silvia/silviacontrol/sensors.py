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
        responses = ResponseModel.objects.order_by('-t')
        # There  might not be any responses if the database is clean
        if responses:
            response = responses[0]
        else:
            response = ResponseModel(T_boiler=20, t=timezone.now())
        return sim_T_boiler(response)
