/*
Author: Willaim Hunt
Date: June 2020
Project: Silvia

Description: Arduino files for Rancillio Silvia espresso machine control
Notes: 
*/

// Pre-compile definitions
#define DEBUG true
// Pins
#define TEMP_SENSOR_PIN A0
#define WATER_SENSOR_PIN 7
#define HEAT_RELAY_PIN 13
#define POWER_RELAY_PIN 9
#define BREW_RELAY_PIN 12
// #define DISPLAY_SDA_PIN 2
// #define DISPLAY_SCL_PIN 3

// #define PI_COMMS_SERIAL
// #define PI_COMMS_I2C

#define I2C_ADDR 0x8

#define SAFETY_TEMPERATURE 120

// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"
#include "silvia_pi_comms.h"
#include "silvia_output.h"
#include "silvia_water_sensor.h"

// Mode
// 0 : PID
// 1 : Manual
// 2 : PID autotune
int mode = 0;

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
// PowerOutput power_output = PowerOutput(POWER_RELAY_PIN, &pid);
RelayOutput power_output = RelayOutput(POWER_RELAY_PIN);
RelayOutput brew_output = RelayOutput(BREW_RELAY_PIN);


void setup(void) {
    // pi_comms_setup(I2C_ADDR, &power_output, &brew_output, &temperature_sensor, &pid, &water_sensor, &mode);
    pi_comms_setup(I2C_ADDR);
}

void loop(void)  {
    T_boiler = temperature_sensor.getTemperature();  // Method includes sampling time check

    // Ensure temperature never goes above safety level
    if (T_boiler > SAFETY_TEMPERATURE) {
        digitalWrite(HEAT_RELAY_PIN, LOW);
    } else {
        if (power_output.getStatus() && mode == 0) { // PID mode
            pid.Compute();  // Method includes sampling time check
            pid.relayControl();
        } else if (mode == 2) { // autotune
            bool still_tuning = pid.tune();
            // When tuning is finished it will restart the PID with new gains
            if (!still_tuning) {
                mode = 0;
            }
        }
    }
    check_serial_calls();
}
