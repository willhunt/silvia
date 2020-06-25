#ifndef SILVIA_OUTPUT_H
#define SILVIA_OUTPUT_H

#include <Arduino.h>
#include <SoftwareWire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include "silvia_temperature_controller.h"
#include "silvia_logo.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Software wire
// SoftwareWire softWire(WIRE_SDA_PIN, WIRE_SCL_PIN);

class SilviaDisplayHelper {
  private:
    SoftwareWire soft_wire_;
  public:
    SilviaDisplayHelper(int sda_pin, int scl_pin);
    SoftwareWire* getSoftwareWire();
};

class SilviaDisplay : public SilviaDisplayHelper, public Adafruit_SSD1306 {
  public:
    SilviaDisplay(int sda_pin, int scl_pin);
    void updateTemperature(double* T, double* T_set);
    void showLogo();
    // SoftwareWire* initSoftwareWire(int sda_pin, int scl_pin);
};

class RelayOutput {
  private:
    int pin_;  // Pin number
    bool status_;  // Output state
  
  public:
    RelayOutput(int pin);
    void on();
    void off();
    bool getStatus();
    bool& status = status_;
};

class PowerOutput : public RelayOutput {
  private:
    TemperatureController* pid_;
  
  public:
    PowerOutput(int pin, TemperatureController* pid);
    void on(double Setpoint, double Kp, double Ki, double Kd);
    void off();
};


#endif // SILVIA_OUTPUT_H