#ifndef SILVIA_I2C_H
#define SILVIA_I2C_H

#include <Arduino.h>
#include <Wire.h>
#include "sivlia_output.h"
#include "silvia_temperature_controller.h"

#define I2C_ADDR 0x8

struct responseFormat {
  bool* power;
  bool* brew;
  double* T_boiler;
};
union responseData {
  responseFormat data;
  byte buffer[sizeof(responseFormat)];
};

struct receivedFormat {
  bool power;
  bool brew;
  double* setpoint;
  double* kp;
  double* ki;
  double* kd;
};
union receivedData {
  receivedFormat data;
  byte buffer[sizeof(receivedFormat)];
};

// Declare data stores here
responseData response_data;
receivedData received_data;
int sizeof_received_data;

PowerOutput* power_output_ref;
RelayOutput* brew_output_ref;

void receiveEvent(int numBytes);
void requestEvent();

class PiCommunicator {
  private:
    // static responseData response_data_;
    // static receivedData received_data_;
    int i2c_addr_;
    // Pointers to data that can be requested
    // double* T_boiler_;
    // double* m_coffee_;
    // bool* power_;
    // bool* brew_;
    // static int sizeof_received_data_;

  public:
    PiCommunicator(
      int i2c_addr, 
      PowerOutput* power_output, RelayOutput* brew_output,
      double* T_boiler, double* m_coffee,
      double* kp, double* ki, double* kd);
    void setup();
};


#endif // SILVIA_I2C_H