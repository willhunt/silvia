#include "silvia_temperature_controller.h"

TemperatureController::TemperatureController(
    double* Input, double* Output, double* Setpoint,
    double Kp, double Ki, double Kd, int POn, int ControllerDirection,
    int relay_pin
)   // Call base class constructor
    : PID(Input, Output, Setpoint, Kp, Ki, Kd, POn, ControllerDirection)
{
    relay_pin_ = relay_pin;
    tpc_window_start_ = millis();
    tpc_window_size_ = 5000;
    // Store this again as have no access to provate member variable in base class
    output_ = Output;
}

void TemperatureController::Setup() {
    pinMode(relay_pin_, OUTPUT);
    SetOutputLimits(0, tpc_window_size_);
}

void TemperatureController::RelayControl() {
    unsigned long now = millis();
    // Time to shift the Relay Window
    if (now - tpc_window_start_ > tpc_window_size_) {
        // Increment in step of window size
        tpc_window_start_ += tpc_window_size_;
    }
    if (*output_ > now - tpc_window_start_)
        digitalWrite(relay_pin_, HIGH);
    else
        digitalWrite(relay_pin_, LOW);
}