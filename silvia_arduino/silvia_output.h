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
    TemperatureController* heater_;
  
  public:
    PowerOutput(int pin, TemperatureController* heater);
    void on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode);
    void off();
};

class SwitchInput {
  private:
    int pin_;  // Pin number
    bool status_;  // Last recorded status
    void (*on_callback_)();
    void (*off_callback_)();

  public:
    SwitchInput(int pin, void (*on_callback)(), void (*off_callback)());
    void update();
    bool getStatus();
};

#endif // SILVIA_OUTPUT_H