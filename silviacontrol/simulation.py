# Simulation of espresso machine response for development and testing
# Estimates boiler temperature based upon system model
from django.utils import timezone

def sim_T_boiler(response):
    """
    Simulates what the current temperature of the boiler is based upon quasi-steady state heating
    Inputs
        response (Object): Last ReponseModel databse entry
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
    Qdot_elec = Edot_max * duty * response.brewing
    Qdot_conv = h_conv * A * (T_amb - T_last)  # Positive into system
    t_new = timezone.now()
    T_new = (Qdot_elec + Qdot_conv) * (t_new - t_last).total_seconds() / (m * c_p) + T_last

    return T_new, t_new



