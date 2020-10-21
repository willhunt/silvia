#include "silvia_function.h"
#include "silvia_modes.h"
#include "silvia_pi_comms.h"

bool heat_overridden_by_brew = false;

void change_mode(unsigned char new_mode) {
    if (new_mode == MODE_OFF) {
        if (mode = MODE_PID)
            heater.off();
        if (mode = MODE_MANUAL)
            heater.overrideOutput(0);
        if (mode = MODE_AUTOTUNE)
            heater.cancelTuner();
        mode = MODE_OFF;
    } else if (new_mode == MODE_PID) { // Change to PID or PID settings
        if (mode = MODE_AUTOTUNE)
            heater.cancelTuner();
        bool reset_heater = false;
        if (mode != MODE_PID)
            reset_heater = true;  // Reset PID if previously in a different mode
        mode = MODE_PID;
        heater.on(reset_heater);
    } else if (new_mode == MODE_MANUAL && mode != MODE_MANUAL) { // Change to manual
        if (mode = MODE_AUTOTUNE)
            heater.cancelTuner();
        if (mode = MODE_PID)
            heater.off();
        mode = MODE_MANUAL;
        heater.overrideOutput(0);
    } else if (new_mode == MODE_AUTOTUNE && mode != MODE_AUTOTUNE) { // Change to auto tune
        mode = MODE_AUTOTUNE;
        heater.setupTuner();
    }
}

void heater_on_request(double duty) {
  if (mode != MODE_MANUAL) {
    change_mode(MODE_MANUAL);
  }
  heater.overrideOutput(duty);
}

void power_on() {
    power_output.on();
    timerReset();
}
void power_on_switch() {
    change_mode(MODE_PID);
    power_on();
    send_serial_response();
}

void power_off() {
    change_mode(MODE_OFF);
    power_output.off();
    heater.off();
}
void power_off_switch() {
    power_off();;
    send_serial_response();
}

void brew_on() {
    // Not in off mode as well as in manual mode or water in tank
    if ( mode != MODE_OFF && ( (mode == MODE_MANUAL) || water_sensor.getLevel() ) ) {  
        brew_output.on();
        timerReset();
        timerStart();
        if (mode == MODE_PID) {
            // Change to manual mode to max power and no integral windup
            change_mode(MODE_MANUAL);
            heater.overrideOutput(100);
            heat_overridden_by_brew = true;
        }
    }
}
void brew_on_switch() {
    brew_on();
    send_serial_response();
}

void brew_off() {
    brew_output.off();
    if (heat_overridden_by_brew) {
        change_mode(MODE_PID);
        heat_overridden_by_brew = false;
    }
}
void brew_off_switch() {
    brew_off();
    send_serial_response();
}

void clean_cycle() {

}
