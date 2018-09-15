from django.utils import timezone
from .models import ResponseModel, SettingsModel

def pid_update(T_boiler, t):
    """
    Get new output from PID controler
    u(t) = K_p e(t) + K_i \int_{0}^{t} e(t)dt + K_d {de}/{dt}
    """
    lim = (0, 100)
    setting = SettingsModel.objects.get(id=1)
    response = ResponseModel.objects.order_by('-t')[0]
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
    # Aplly limits
    if duty > lim[1]:
        duty = lim[1]
    elif duty < lim[0]:
        duty = lim[0]
    # !!! might be useful to change duty k & d for logging here

    return duty, [duty_p, duty_i, duty_d]
