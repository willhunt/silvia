#include "silvia_temperature_controller.h"

TemperatureController::TemperatureController(
    double* Input, double* Output, double* Setpoint,
    double Kp, double Ki, double Kd, int POn, int ControllerDirection,
    int relay_pin
)   // Call base class constructor
    : PID(Input, Output, Setpoint, Kp, Ki, Kd, POn, ControllerDirection),
    relay_pin_(relay_pin),
    tpc_window_start_(millis()),
    output_(Output),
    setpoint_(Setpoint),
    tpc_window_size_(1000)
{
    pinMode(relay_pin_, OUTPUT);
    SetOutputLimits(0, tpc_window_size_);
    *setpoint_ = 100;  // Avoid display issues where NAN  

    // Autotuner not used
    // Autotuner
    // auto_tuner_ = new PID_ATune(Input, Output);
    // auto_tuner_->SetNoiseBand(ATUNE_NOISE);
    // auto_tuner_->SetOutputStep(ATUNE_STEP);
    // auto_tuner_->SetLookbackSec((int)ATUNE_LOOKBACK);
    // auto_tuner_->SetControlType(1); //PID 
    // SetNoiseBand(ATUNE_NOISE);
    // SetOutputStep(ATUNE_STEP);
    // SetLookbackSec((int)ATUNE_LOOKBACK);
    // SetControlType(1);
}

void TemperatureController::relayControl() {
    unsigned long now = millis();
    // Time to shift the Relay Window
    if (now - tpc_window_start_ > tpc_window_size_) {
        // Increment in step of window size
        tpc_window_start_ += tpc_window_size_;
    }
    if (*output_ >= now - tpc_window_start_) {
        digitalWrite(relay_pin_, HIGH);
    } else {
        digitalWrite(relay_pin_, LOW);
    }
}

void TemperatureController::on(double Setpoint, double Kp, double Ki, double Kd) {
    SetTunings(Kp, Ki, Kd);
    *setpoint_ = Setpoint;
    SetMode(AUTOMATIC);
    
    if (DEBUG) {
        Serial.print(F("PID on, target: "));
        Serial.println(*setpoint_);
    }
}

void TemperatureController::resume() {
    SetMode(AUTOMATIC);
}

void TemperatureController::off() {
    SetMode(MANUAL);
}

double TemperatureController::getSetpoint() {
    return *setpoint_;
}

double TemperatureController::getDuty() {
    return 100 * *output_ / tpc_window_size_;
}

int TemperatureController::getRelayPin() {
    return relay_pin_;
}

void TemperatureController::overrideOutput(double duty) {
    *output_ = tpc_window_size_ * duty / 100;
}

// Autotuner not used
void TemperatureController::setupTuner() {
    // Set output to a start guess
    // *output_ = ATUNE_OUTPUTSTART;
    // resume();
    *output_ = 0;
}

// Autotuner not used
void TemperatureController::cancelTuner() {
    // Set output to a start guess
    // auto_tuner_->Cancel();
    tuning_in_progress_ = false;
}

// Autotuner not used
bool TemperatureController::tune() {
    // int val = auto_tuner_->Runtime();
    // if (val == 1) {  // Autotune has finished
    //     // Turn heater back on with tuned values (and existing setpoint)
    //     on(getSetpoint(), auto_tuner_->GetKp(), auto_tuner_->GetKi(), auto_tuner_->GetKd());
    //     tuning_in_progress_ = false;
    // } else {
    //     tuning_in_progress_ = true;
    // }
    // return tuning_in_progress_;
    tuning_in_progress_ = true;
    return tuning_in_progress_;
}

bool TemperatureController::getTuningInProgress() {
    return tuning_in_progress_;
}
