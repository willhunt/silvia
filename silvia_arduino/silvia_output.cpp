#include "silvia_output.h"

// Basic relay output
RelayOutput::RelayOutput(int pin) 
  : pin_(pin), status_(false) {

  pinMode(pin_, OUTPUT);
};

bool RelayOutput::getStatus() {
  return status_;
};

void RelayOutput::on() {
  status_ = true;
  digitalWrite(pin_, HIGH);
};

void RelayOutput::off() {
  status_ = false;
  digitalWrite(pin_, LOW);
};

// Power ouput need to turn PID on and off
PowerOutput::PowerOutput(int pin, TemperatureController* pid)
  : RelayOutput(pin), pid_(pid) {

};

void PowerOutput::on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode) {
  RelayOutput::on();
  pid_->on(Setpoint, Kp, Ki, Kd, Kp_mode);
};

void PowerOutput::off() {
  RelayOutput::off();
  pid_->off();
};

SwitchInput::SwitchInput(int pin, void (*on_callback)(), void (*off_callback)()) {
  pin_ = pin;
  pinMode(pin, INPUT_PULLUP);
  on_callback_ = on_callback;
  off_callback_ = off_callback;
  status_ = getStatus();
}

bool SwitchInput::getStatus() {
  bool status = (digitalRead(pin_) == LOW) ? true : false;
  return status;
}

void SwitchInput::update() {
  bool this_status = getStatus();
  if (this_status != status_) {  // If switch is changed
    if (this_status) {  // On
      on_callback_();
    } else {
      off_callback_();
    }
    status_ = this_status;
  }
}

