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
#define POWER_SWITCH_PIN 4
#define BREW_SWITCH_PIN 3
#define DIMMER_PIN 5
#define I2C_ADDR 0x8
#define SAFETY_TEMPERATURE 120

// Imports
#include "silvia_temperature_sensor.h"
#include "silvia_temperature_controller.h"
#include "silvia_pi_comms.h"
#include "silvia_output.h"
#include "silvia_water_sensor.h"
#include "silvia_clean.h"
#include "silvia_display.h"
#include "silvia_modes.h"
#include "silvia_function.h"
#include "silvia_pump_controller.h"

// Mode
unsigned char mode = MODE_OFF;

// Brew duration [s]
unsigned int brew_duration = 0;

// Sensors
TemperatureSensor temperature_sensor(TEMP_SENSOR_PIN);
WaterLevelSensor water_sensor(WATER_SENSOR_PIN);

// Temperature controller
double T_measured;
double heat_output;
double T_setpoint;
// PID gains set to zero/ or default as not known yet
TemperatureController heater = TemperatureController(&T_measured, &heat_output, &T_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, HEAT_RELAY_PIN);

// Pump Contoller
double P_measured;
double pump_output;
double P_setpoint;
PumpController pump = PumpController(&P_measured, &pump_output, &P_setpoint, 1.0, 1.0, 1.0, P_ON_E, DIRECT, DIMMER_PIN);

// Relays
RelayOutput power_output = RelayOutput(POWER_RELAY_PIN);
RelayOutput brew_output = RelayOutput(BREW_RELAY_PIN);

// Switches
SwitchInput power_switch = SwitchInput(POWER_SWITCH_PIN, &power_on_switch, &power_off_switch);
SwitchInput brew_switch = SwitchInput(BREW_SWITCH_PIN, &brew_on_switch, &brew_off_switch);

// cleaner
CleaningProcess cleaner = CleaningProcess();

// Display
SilviaDisplay display = SilviaDisplay(&Wire);

void setup(void) {
    // Comms to pi
    pi_comms_setup();;
    // Display - Show logo
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
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
    T_measured = temperature_sensor.getTemperature();  // Method includes sampling time check
    // Check switches
    power_switch.update();
    brew_switch.update();
    // Timer
    brew_duration = timerUpdate() / 1000;
    // Display
    display.update();
    // Ensure temperature never goes above safety level
    if (T_measured > SAFETY_TEMPERATURE) {
        heat_output = 0.0;
        if (DEBUG) {
            Serial.println("Over temperature limit");
        }
        heater.on(true);  // Reset to avoid windup
    } else if (power_output.getStatus() && mode == 0) { // heater mode
        heater.Compute();  // Method includes sampling time check
    } else if (mode == MODE_AUTOTUNE) { // autotune - not used currently
        bool still_tuning = heater.tune();
        // When tuning is finished it will restart the PID with new gains
        if (!still_tuning) {
            mode = MODE_PID;
            if (DEBUG) {
                Serial.println("Tuning finished");
            }
        }
    } else if (mode == MODE_CLEAN) { // Cleaning
       unsigned char mode = cleaner.update();
        if (mode != MODE_CLEAN) {  // Cleaning finished
            mode = mode;
            if (DEBUG) {
                Serial.println("Cleaning finished");
            }
            send_serial_response();  // Update server
        }
    }
    check_serial_calls();
    heater.relayControl();
}
