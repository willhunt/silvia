#ifndef SILVIA_FUNCTION_H
#define SILVIA_FUNCTION_H

#include <Arduino.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_water_sensor.h"

void heater_on_request(double duty);
void change_mode(unsigned char new_mode);
void power_on();
void power_switch_on();
void power_off();
void brew_on();
void brew_off();

// Defined in silvia_main.ino
extern unsigned char mode;
extern RelayOutput power_output;
extern RelayOutput brew_output;
extern WaterLevelSensor water_sensor;
extern TemperatureController pid;
extern void timerStart();
extern void timerReset();

#endif  // SILVIA_FUNCTION_H