#include "silvia_pump_controller.h"

PumpController::PumpController(
    double* Input, double* Output, double* Setpoint,
    double Kp, double Ki, double Kd, int POn, int ControllerDirection,
    int dimmer_pin
)   // Call base class constructor
    : PID(Input, Output, Setpoint, Kp, Ki, Kd, POn, ControllerDirection),
    dimmer_pin_(dimmer_pin),
    output_(Output),
    setpoint_(Setpoint),
    dimmer_(dimmer_pin)
{
    pinMode(dimmer_pin_, OUTPUT);
    SetOutputLimits(0, 100);
    *setpoint_ = 98;  // Avoid display issues where NAN  
    SetSampleTime(200);  // 200 (default)
    dimmer_.begin(NORMAL_MODE, OFF);
}

void PumpController::dimmerControl() {
    dimmer_.setPower(*output_);
}

void PumpController::on(bool reset) {
    if (reset) {
        SetMode(MANUAL); // Set to manual first to reset integral term
        overrideOutput(0);
    }
    SetMode(AUTOMATIC);
    dimmer_.setState(ON);
}
void PumpController::on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode, bool reset) {
    SetTunings(Kp, Ki, Kd, Kp_mode);
    *setpoint_ = Setpoint;
    // Pass to less loaded method
    on(reset);
    
    if (DEBUG) {
        Serial.print(F("PID on, target: "));
        Serial.println(*setpoint_);
    }
}

void PumpController::off() {
    SetMode(MANUAL);
    dimmer_.setState(OFF);
}

double PumpController::getSetpoint() {
    return *setpoint_;
}

void PumpController::setSetpoint(double pressure) {
    *setpoint_ = pressure;
}

double PumpController::getDuty() {
    return *output_;
}

int PumpController::getDimmerPin() {
    return dimmer_pin_;
}

void PumpController::overrideOutput(double duty) {
    *output_ = duty;
}

/*
    Get pressure at time t based upon given profile
    Assumes linear transitions
*/
double PumpController::getProfilePressure(double t) {
    for (int i = 1; i < PROFILE_STEPS; i++) {
        if (t >= (float)t_profile_[i-1] && t < (float)t_profile_[i]) {
            return P_profile_[i] + (P_profile_[i] - P_profile_[i-1]) / (double)(t_profile_[i] - t_profile_[i-1]) * (t - (double)t_profile_[i]);
        }
    }
    return 0.0;
}

/*
    Update target pressure based upon profile and compute pid
*/
void PumpController::update(double t) {
    *output_ = getProfilePressure(t);
    Compute();
}