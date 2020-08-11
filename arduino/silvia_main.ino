/*
Author: Willaim Hunt
Date: June 2020
Project: Silvia

Description: Arduino files for Rancillio Silvia espresso machine control
Notes: 
*/

// Pre-compile definitions
#define TEMP_SENSOR_PIN A0
#define WATER_SENSOR_PIN 7
#define HEAT_RELAY_PIN 13
#define POWER_RELAY_PIN 9
#define BREW_RELAY_PIN 12
// #define DISPLAY_SDA_PIN 2
// #define DISPLAY_SCL_PIN 3
// #define I2C_ADDR 0x8

// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"
// #include "silvia_i2c.h"
#include "silvia_output.h"
#include "silvia_water_sensor.h"
#include "silvia_pi_serial.h"

// Sensors
TemperatureSensor temperature_sensor(TEMP_SENSOR_PIN);
WaterLevelSensor water_sensor(WATER_SENSOR_PIN);

// Temperature controller
double T_boiler;
double pid_output;
double pid_setpoint;
// PID gains set to zero/ or default as not known yet
TemperatureController pid = TemperatureController(&T_boiler, &pid_output, &pid_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, HEAT_RELAY_PIN);

// Display
// Adafruit library doesn't seem to play with SoftwareWire. Implementing display from Pi side.
// SilviaDisplay display = SilviaDisplay(DISPLAY_SDA_PIN, DISPLAY_SCL_PIN);

// Relays
PowerOutput power_output = PowerOutput(POWER_RELAY_PIN, &pid);
RelayOutput brew_output = RelayOutput(BREW_RELAY_PIN);


void setup(void) {
    // Setup serial
    if (DEBUG) {
        Serial.begin(9600);
    }

    // i2cSetup(I2C_ADDR, &power_output, &brew_output, &temperature_sensor, &pid, &water_sensor);
    pi_serial_setup(&power_output, &brew_output, &temperature_sensor, &pid, &water_sensor);
}

void loop(void)  {
    T_boiler = temperature_sensor.getTemperature();  // Method includes sampling time check

    check_serial_calls();

    if (power_output.getStatus()) {
        pid.Compute();  // Method includes sampling time check
        pid.relayControl();
    }
    
}