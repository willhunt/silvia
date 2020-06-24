/*
Author: Willaim Hunt
Date: June 2020
Project: Silvia

Description: Arduino files for Rancillio Silvia espresso machine control
Notes: 
*/

// Pre-compile definitions
#define TEMP_SENSOR_PIN A0
#define HEAT_RELAY_PIN 13
#define POWER_RELAY_PIN 9
#define BREW_RELAY_PIN 12
#define DISPLAY_SDA_PIN 2
#define DISPLAY_SCL_PIN 3


// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"
#include "silvia_i2c.h"
#include "silvia_output.h"

// Sensors
TemperatureSensor temperature_sensor(TEMP_SENSOR_PIN);

// Temperature controller
double T_boiler;
double pid_output;
double pid_setpoint;
// PID gains set to zero/ or default as not known yet
TemperatureController pid = TemperatureController(&T_boiler, &pid_output, &pid_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, HEAT_RELAY_PIN);

// Display
// Adafruit library doesn't seem to play with SoftwareWire. Implementing display from Pi side.
SilviaDisplay display = SilviaDisplay(DISPLAY_SDA_PIN, DISPLAY_SCL_PIN);

// Relays
PowerOutput power_output = PowerOutput(POWER_RELAY_PIN, &pid, &display);
RelayOutput brew_output = RelayOutput(BREW_RELAY_PIN);

// I2C communication
PiCommunicator pi_communicator = PiCommunicator(
    // I2C_ADDR, &power_output, &brew_output, &T_boiler, &kp, &ki, &kd
    I2C_ADDR, &power_output, &brew_output, &temperature_sensor
);


void setup(void) {
    // Setup serial
    if (DEBUG) {
        Serial.begin(9600);
    }

    // display.showLogo();
    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.setCursor(0, 10);
    // Display static text
    display.println("Hello, world!");
    delay(1000);
    display.clearDisplay();
}

void loop(void)  {
    T_boiler = temperature_sensor.getTemperature();  // Method includes sampling time check

    if (power_output.getStatus()) {
        pid.Compute();  // Method includes sampling time check
        pid.relayControl();
        display.updateTemperature(&T_boiler, &pid_setpoint);
    }
    
}