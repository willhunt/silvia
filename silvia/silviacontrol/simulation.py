# Simulation of espresso machine response for development and testing
# Estimates boiler temperature based upon system model
from django.utils import timezone

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
    t_new = timezone.now()
    T_new = (Qdot_elec + Qdot_conv) * (t_new - t_last).total_seconds() / (m * c_p) + T_last

    return T_new, t_new



