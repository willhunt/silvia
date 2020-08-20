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

void PowerOutput::on(double Setpoint, double Kp, double Ki, double Kd) {
  RelayOutput::on();
  pid_->on(Setpoint, Kp, Ki, Kd);
};

void PowerOutput::off() {
  RelayOutput::off();
  pid_->off();
};
