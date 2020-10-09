#ifndef SILVIA_FUNCTION_H
#define SILVIA_FUNCTION_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#include <Arduino.h>
#include "silvia_output.h"
#include "silvia_temperature_controller.h"
#include "silvia_water_sensor.h"
#include "silvia_timer.h"

void heater_on_request(double duty);
void change_mode(unsigned char new_mode);
void power_on();
void power_on_switch();
void power_off();
void power_off_switch();
void brew_on();
void brew_on_switch();
void brew_off();
void brew_off_switch();

// Defined in silvia_main.ino
extern unsigned char mode;
extern RelayOutput power_output;
extern RelayOutput brew_output;
extern WaterLevelSensor water_sensor;
extern TemperatureController pid;
extern void timerStart();
extern void timerReset();

#endif  // SILVIA_FUNCTION_H