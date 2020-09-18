#ifndef SILVIA_PI_COMMS_H
#define SILVIA_PI_COMMS_H

#include <Arduino.h>
#include <Wire.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"
#include "silvia_water_sensor.h"
#include "silvia_timer.h"

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

struct responseFormat {
  bool power;
  bool brew;
  double T_boiler;
  double duty;
  bool water_level;
  unsigned char mode;
  double Kp;
  double Ki;
  double Kd;
  // int kp_mode;
};
union responseData {
  responseFormat data;
  byte buffer[sizeof(responseFormat)];
};

struct receivedFormat {
  bool power;
  bool brew;
  unsigned char mode;
  double setpoint;
  double kp;
  double ki;
  double kd;
  int kp_mode;
};
union receivedData {
  receivedFormat data;
  byte buffer[sizeof(receivedFormat)];
};

struct overrideFormat {
  double duty;
};
union overrideData {
  overrideFormat data;
  byte buffer[sizeof(overrideFormat)];
};

// Objects defined in silvia_main.ino
extern TemperatureSensor temperature_sensor;
extern WaterLevelSensor water_sensor;
extern RelayOutput power_output;
extern RelayOutput brew_output;
extern TemperatureController pid;
extern void timerStart();
extern void timerReset();

// Mode - defined in silvia_main.ino
#define MODE_OFF 4
#define MODE_PID 0
#define MODE_MANUAL 1
#define MODE_AUTOTUNE 2
extern unsigned char mode;
void change_mode(unsigned char new_mode);

void pi_comms_setup(int i2c_addr, TwoWire* wire);
void pi_comms_setup();
void update_data_buffer();
void response_actions();
void heater_on_request(double duty);
// Serial
void check_serial_calls();
void send_serial_response();
// I2C
void receiveEvent(int numBytes);
void requestEvent();

#endif // SILVIA_PI_COMMS_H