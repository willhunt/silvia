#ifndef SILVIA_PI_COMMS_H
#define SILVIA_PI_COMMS_H

#include <Arduino.h>
// #include <Wire.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_temperature_sensor.h"
#include "silvia_water_sensor.h"
#include "silvia_timer.h"
#include "silvia_modes.h"
#include "silvia_clean.h"
#include "silvia_pump_controller.h"

// Data to send when data is requested
struct responseFormat {
  bool power;
  bool brew;
  double T_measured;
  double heater_duty;
  bool water_level;
  unsigned char mode;
  double heater_Kp;
  double heater_Ki;
  double heater_Kd;
  double P_measured;
  double pump_duty;
};
union responseData {
  responseFormat data;
  byte buffer[sizeof(responseFormat)];
};
// Data to receive hen request to change made, eg machine on/off, brew
struct receivedFormat {
  bool power;
  bool brew;
  unsigned char mode;
  double setpoint;
  double heater_Kp;
  double heater_Ki;
  double heater_Kd;
  int heater_Kp_mode;
  int n_clean_cycles;
  int t_clean_on;
  int t_clean_off;
  int t_profile[PROFILE_STEPS];
  double P_profile[PROFILE_STEPS];
};
union receivedData {
  receivedFormat data;
  byte buffer[sizeof(receivedFormat)];
};
// Data to receive if override requested
struct overrideFormat {
  double heater_duty;
};
union overrideData {
  overrideFormat data;
  byte buffer[sizeof(overrideFormat)];
};
// Data to send when request to change made, eg machine on/off, brew
struct feedbackFormat {
  bool ok;
};
union feedbackData {
  feedbackFormat data;
  byte buffer[sizeof(feedbackFormat)];
};

// Objects defined in silvia_main.ino
extern TemperatureSensor temperature_sensor;
extern WaterLevelSensor water_sensor;
extern RelayOutput power_output;
extern RelayOutput brew_output;
extern TemperatureController heater;
extern CleaningProcess cleaner;
extern void timerStart();
extern void timerReset();

// Mode - defined in silvia_main.ino
extern unsigned char mode;

void pi_comms_setup();
void update_data_buffer();
void response_actions();

// Serial
void check_serial_calls();
void send_serial_response();

#endif // SILVIA_PI_COMMS_H