#ifndef SILVIA_I2C_H
#define SILVIA_I2C_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#include <Arduino.h>
#include <Wire.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"
#include "silvia_water_sensor.h"


struct responseFormat {
  bool power;
  bool brew;
  double T_boiler;
  double duty;
  bool water_level;
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

responseData response_data;
receivedData received_data;
int sizeof_received_data;

TemperatureSensor* temp_sensor_ref;
WaterLevelSensor* water_sensor_ref;
PowerOutput* power_output_ref;
RelayOutput* brew_output_ref;
TemperatureController* temperature_controller_ref;

void receiveEvent(int numBytes);
void requestEvent();

void i2cSetup(
  int i2c_addr, 
  PowerOutput* power_output,
  RelayOutput* brew_output,
  TemperatureSensor* temperature_sensor,
  TemperatureController* temperature_controller,
  WaterLevelSensor* water_sensor
);


#endif // SILVIA_I2C_H