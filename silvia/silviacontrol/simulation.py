# Simulation of espresso machine response for development and testing
# Estimates boiler temperature based upon system model
from django.utils import timezone
import random
from .models import ResponseModel, SettingsModel


class espresso_simulator():
    def __init__(self):
        self.T_amb = 20  # degC
        self.h_conv = 10  # W/m^2/K
        self.T_boiler = 20  # degC
        self.m_boiler = 2  # kg
        self.A_boiler = 0.0001  # m^2
        self.cp_boiler = 375  # J/kg/K (Brass)
        self.P_heater = 3000  # W

        self.k_p = 1
        self.k_i = 0.001
        self.k_d = 1

    def step_forward(self, duty, dt):
        Qdot_heat = self.P_heater * duty
        Qdot_conv = self.h_conv * self.A_boiler * (self.T_amb - self.T_boiler)  # Convection, positive into system
        self.T_boiler = (Qdot_heat + Qdot_conv) * dt / (self.m_boiler * self.cp_boiler) + self.T_boiler


def sim_T_boiler(response):
    """
    Simulates what the current temperature of the boiler is based upon quasi-steady state heating
    Inputs
        response (Object): Last ResponseModel database entry
    """
    T_amb = 20  # [degC]
    h_conv = 10  # [W/m^2.K]
    Edot_max = 2000  # [W]
    c_p = 375  # [J/kg.K]
    m = 1.5  # [kg]
    A = 0.0001  # [m^2]

    t_last = response.t
    T_last = response.T_boiler
    if response.duty is None:
        duty = 0
    else:
        duty = response.duty
    Qdot_elec = Edot_max * duty / 100 #* response.brewing
    Qdot_conv = h_conv * A * (T_amb - T_last)  # Positive into system
    T_new = (Qdot_elec + Qdot_conv) * (timezone.now() - t_last).total_seconds() / (m * c_p) + T_last

    return T_new

def simulated_temperature_sensor(select="sensor"):
    """
    Simulated temperature sensor
    Inputs
        select (String): Choose responce method - "random", "simulated"
    """
    if select is "random":
        # Read sensor value
        return random.randrange(60, 100)  # Dummy code
    elif select is "simulated":
        responses = ResponseModel.objects.order_by('-t')
        # There  might not be any responses if the database is clean
        if responses:
            response = responses[0]
        else:
            response = ResponseModel(T_boiler=20, t=timezone.now())
        return sim_T_boiler(response)
    else:
        raise NotImplementedError

def simulated_mass_sensor(select="random"):
    """
    Simulated mass sensor
    Inputs
        select (String): Choose responce method - "random", "simulated", "off"
    """
    if select is "random":
        return random.randrange(0, 20)
    elif select is "simulated":
        last_response = ResponseModel.objects.order_by('-t')[0]
        if last_response.brewing:
            return last_response.m + 2
        else:
            return 0
    elif select is "off":
        return None
    else:
        raise NotImplementedError

def pid_update(T_boiler, t):
    """
    Get new output from PID controller
    u(t) = K_p e(t) + K_i \int_{0}^{t} e(t)dt + K_d {de}/{dt}
    """
    lim = (0, 100)
    setting = SettingsModel.objects.get(id=1)
    responses = ResponseModel.objects.order_by('-t')
    # There  might not be any responses if the database is clean
    if responses:
        response = responses[0]
    else:
        response = ResponseModel(T_boiler=20)

    error = setting.T_set - T_boiler
    t_delta = (timezone.now() - t).total_seconds()
    error_delta = error - (setting.T_set - response.T_boiler)

    duty_p = error * setting.k_p
    duty_i = (response.duty_i + error) * setting.k_i
    if duty_i > lim[1]:
        duty_i = lim[1]
    elif duty_i < lim[0]:
        duty_i = lim[0]
    # Only use new data for derivative term
    if t_delta > setting.t_sample:
        duty_d = 0
    else:
        duty_d = (error_delta / t_delta) * setting.k_d

    duty = duty_p + duty_i + duty_d
    # Apply limits
    if duty > lim[1]:
        duty = lim[1]
    elif duty < lim[0]:
        duty = lim[0]
    # !!! might be useful to change duty k & d for logging here

    return duty, [duty_p, duty_i, duty_d]
