/*
Author: Willaim Hunt
Date: June 2020
Project: Silvia

Description: Arduino files for Rancillio Silvia espresso machine control
Notes: 
*/

// Pre-compile definitions
#define DEBUG false
#define TEMP_SENSOR_PIN A0
#define WATER_SENSOR_PIN 7
#define HEAT_RELAY_PIN 13
#define POWER_RELAY_PIN 9
#define BREW_RELAY_PIN 12
#define POWER_SWITCH_PIN 3
#define BREW_SWITCH_PIN 4
#define I2C_ADDR 0x8
#define SAFETY_TEMPERATURE 120

// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"
#include "silvia_pi_comms.h"
#include "silvia_output.h"
#include "silvia_water_sensor.h"
#include "silvia_display.h"
#include "silvia_modes.h"
#include "silvia_function.h"

// Mode
unsigned char mode = MODE_OFF;

// Brew duration [s]
unsigned int brew_duration = 0;

// Sensors
TemperatureSensor temperature_sensor(TEMP_SENSOR_PIN);
WaterLevelSensor water_sensor(WATER_SENSOR_PIN);

// Temperature controller
double T_boiler;
double pid_output;
double pid_setpoint;
// PID gains set to zero/ or default as not known yet
TemperatureController pid = TemperatureController(&T_boiler, &pid_output, &pid_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, HEAT_RELAY_PIN);

// Relays
RelayOutput power_output = RelayOutput(POWER_RELAY_PIN);
RelayOutput brew_output = RelayOutput(BREW_RELAY_PIN);

// Display
SilviaDisplay display = SilviaDisplay(&Wire);

void setup(void) {
    // Comms to pi
    pi_comms_setup();
    
    // Switches
    pinMode(POWER_SWITCH_PIN, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(POWER_SWITCH_PIN), power_switch_on, FALLING);
    attachInterrupt(digitalPinToInterrupt(POWER_SWITCH_PIN), power_off, RISING);
    pinMode(BREW_SWITCH_PIN, INPUT_PULLUP);
    // attachInterrupt(digitalPinToInterrupt(BREW_SWITCH_PIN), brew_on, RISING);
    // attachInterrupt(digitalPinToInterrupt(BREW_SWITCH_PIN), brew_off, FALLING);

    // Display - Show logo
    if(display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        if (DEBUG) {
            Serial.println(F("SSD1306 allocation failed"));
        }
    }
    display.showLogo();
    delay(3000);
    display.showBlank();
    // Reset timer
    timerReset();
}

void loop(void)  {
    T_boiler = temperature_sensor.getTemperature();  // Method includes sampling time check
    // check brew switch, not on interrupt pin
    if (digitalRead(BREW_SWITCH_PIN) == LOW && brew_output.status == false) {
        brew_on();
    } else if (digitalRead(BREW_SWITCH_PIN) == HIGH && brew_output.status == true) {
        brew_off();
    }
    brew_duration = timerUpdate() / 1000;
    display.update();

    // Ensure temperature never goes above safety level
    if (T_boiler > SAFETY_TEMPERATURE) {
        pid_output = 0.0;
        if (DEBUG) {
            Serial.println("Over temperature limit");
        }
        pid.on(true);  // Reset to avoid windup
    } else if (power_output.getStatus() && mode == 0) { // PID mode
        pid.Compute();  // Method includes sampling time check
    } else if (mode == 2) { // autotune
        bool still_tuning = pid.tune();
        // When tuning is finished it will restart the PID with new gains
        if (!still_tuning) {
            mode = 0;
            if (DEBUG) {
                Serial.println("Tuning finished");
            }
        }
    }
    check_serial_calls();
    pid.relayControl();
}
