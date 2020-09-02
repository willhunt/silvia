#ifndef SILVIA_DISPLAY_H
#define SILVIA_DISPLAY_H

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include "silvia_logo.h"
#include "silvia_output.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

class SilviaDisplay : public Adafruit_SSD1306 {
  public:
    unsigned long power_start_;  // Time machine was last turned on
    unsigned long brew_start_;  // Time brew was last turned on
    bool power_status_;
    SilviaDisplay();
    void showTemperature(double* T, double* T_set);
    void showLogo();
    void update();
};

extern RelayOutput power_output;
extern RelayOutput brew_output;
extern double T_boiler;
extern double pid_setpoint;

#endif // SILVIA_DISPLAY_H