#ifndef SILVIA_PI_SERIAL_H
#define SILVIA_PI_SERIAL_H

#include <Arduino.h>
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

void pi_serial_setup(
  PowerOutput* power_output, RelayOutput* brew_output,
  TemperatureSensor* temperature_sensor, TemperatureController* temperature_controller,
  WaterLevelSensor* water_sensor
);
void check_serial_calls();
void send_serial_response();

#endif // SILVIA_PI_SERIAL_H