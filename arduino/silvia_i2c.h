#ifndef SILVIA_I2C_H
#define SILVIA_I2C_H

#ifndef DEBUG
#define DEBUG true
#endif  // DEBUG

#include <Arduino.h>
#include <Wire.h>
#include "silvia_output.h"
// #include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"

#define I2C_ADDR 0x8

struct responseFormat {
  bool power;
  bool brew;
  double T_boiler;
};
union responseData {
  responseFormat data;
  byte buffer[sizeof(responseFormat)];
};

struct receivedFormat {
  bool power;
  bool brew;
  double setpoint;
  double kp;
  double ki;
  double kd;
};
union receivedData {
  receivedFormat data;
  byte buffer[sizeof(receivedFormat)];
};

// Declare data stores here
// double* T_boiler_ref;

responseData response_data;
receivedData received_data;
int sizeof_received_data;

TemperatureSensor* temp_sensor_ref;
PowerOutput* power_output_ref;
RelayOutput* brew_output_ref;

void receiveEvent(int numBytes);
void requestEvent();

class PiCommunicator {
  private:
    int i2c_addr_;

  public:
    PiCommunicator(
      int i2c_addr, 
      PowerOutput* power_output,
      RelayOutput* brew_output,
      TemperatureSensor* temperature_sensor
    );
};


#endif // SILVIA_I2C_H