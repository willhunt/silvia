/*
Author: Willaim Hunt
Date: June 2020
Project: Silvia

Description: Arduino files for Rancillio Silvia espresso machine control
Notes: 
*/

// Pre-compile definitions
#define TEMP_SENSOR_PIN A0
#define HEAT_RELAY_PIN 7

// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"

// Variable definition
double boiler_temperature;
TemperatureSensor temperatureSensor(TEMP_SENSOR_PIN);
// Temperature controller
double pid_output;
double pid_setpoint;
// PID gains set to zero/ or default as not known yet
TemperatureController pid = TemperatureController(&boiler_temperature, &pid_output, &pid_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, HEAT_RELAY_PIN);


void setup(void)
{
    // Request settings from pi
    pid_setpoint = 90;
    double kp = 1.0;
    double ki = 1.0;
    double kd = 1.0;

    // PID control
    pid.SetTunings(kp, ki, kd);
    pid.Setup();

    // Turn the PID on
    pid.SetMode(AUTOMATIC);


}

void loop(void) 
{
    boiler_temperature = temperatureSensor.getTemperature();  // Method includes sampling time check
    pid.Compute();  // Method includes sampling time check
    pid.RelayControl();

}