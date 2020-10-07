#include "silvia_function.h"
#include "silvia_modes.h"

bool pid_overridden_by_brew = false;

void change_mode(unsigned char new_mode) {
    if (new_mode == MODE_OFF) {
        if (mode = MODE_PID)
            pid.off();
        if (mode = MODE_MANUAL)
            pid.overrideOutput(0);
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        mode = MODE_OFF;
    } else if (new_mode == MODE_PID) { // Change to PID or PID settings
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        bool reset_pid = false;
        if (mode != MODE_PID)
            reset_pid = true;  // Reset PID if previously in a different mode
        mode = MODE_PID;
        pid.on(reset_pid);
    } else if (new_mode == MODE_MANUAL && mode != MODE_MANUAL) { // Change to manual
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        if (mode = MODE_PID)
            pid.off();
        mode = MODE_MANUAL;
        pid.overrideOutput(0);
    } else if (new_mode == MODE_AUTOTUNE && mode != MODE_AUTOTUNE) { // Change to auto tune
        mode = MODE_AUTOTUNE;
        pid.setupTuner();
    }
}

void heater_on_request(double duty) {
  if (mode != MODE_MANUAL) {
    change_mode(MODE_MANUAL);
  }
  pid.overrideOutput(duty);
}

void power_on() {
    power_output.on();
    timerReset();
}

void power_off() {
    power_output.off();
    pid.off();
}

void brew_on() {
    if ( (mode == MODE_MANUAL) || water_sensor.getLevel() ) {  // In manual mode or water in tank
        brew_output.on();
        timerReset();
        timerStart();
        if (mode == MODE_PID) {
            // Change to manual mode to max power and no integral windup
            change_mode(MODE_MANUAL);
            pid.overrideOutput(100);
            pid_overridden_by_brew = true;
        }
    }
}

void brew_off() {
    brew_output.off();
    if (pid_overridden_by_brew) {
        change_mode(MODE_PID);
        pid_overridden_by_brew = false;
    }
}
