#ifndef SILVIA_PI_I2C_H
#define SILVIA_PI_I2C_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#include <Arduino.h>
#include <Wire.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"
#include "silvia_water_sensor.h"
#include "silvia_pi_data.h"

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


#endif // SILVIA_PI_I2C_H