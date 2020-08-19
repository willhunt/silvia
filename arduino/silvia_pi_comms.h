#ifndef SILVIA_PI_COMMS_H
#define SILVIA_PI_COMMS_H

#include <Arduino.h>
#include <Wire.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"
#include "silvia_water_sensor.h"

#ifndef DEBUG
#define DEBUG true
#endif  // DEBUG

struct responseFormat {
  bool power;
  bool brew;
  double T_boiler;
  double duty;
  bool water_level;
  char mode;
  double Kp;
  double Ki;
  double Kd;
};
union responseData {
  responseFormat data;
  byte buffer[sizeof(responseFormat)];
};

struct receivedFormat {
  bool power;
  bool brew;
  char mode;
  double setpoint;
  double kp;
  double ki;
  double kd;
};
union receivedData {
  receivedFormat data;
  byte buffer[sizeof(receivedFormat)];
};

// Objects defined in silvia_main.ino
extern TemperatureSensor temperature_sensor;
extern WaterLevelSensor water_sensor;
extern RelayOutput power_output;
extern RelayOutput brew_output;
extern TemperatureController pid;

// Mode - defined in silvia_main.ino
// 0 : PID
// 1 : Manual
// 2 : PID autotune
extern int mode;

void pi_comms_setup(int i2c_addr);
void update_data_buffer();
// Serial
void check_serial_calls();
void send_serial_response();
// I2C
void receiveEvent(int numBytes);
void requestEvent();

#endif // SILVIA_PI_COMMS_H