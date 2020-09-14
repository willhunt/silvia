#ifndef SILVIA_OUTPUT_H
#define SILVIA_OUTPUT_H

#include <Arduino.h>
#include "silvia_temperature_controller.h"

class RelayOutput {
  private:
    int pin_;  // Pin number
    bool status_;  // Output state
  
  public:
    RelayOutput(int pin);
    void on();
    void off();
    bool getStatus();
    bool& status = status_;
};

class PowerOutput : public RelayOutput {
  private:
    TemperatureController* pid_;
  
  public:
    PowerOutput(int pin, TemperatureController* pid);
    void on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode);
    void off();
};

#endif // SILVIA_OUTPUT_H