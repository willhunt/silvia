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
#define SCREEN_PADDING 4 // Edge padding

class SilviaDisplay : public Adafruit_SSD1306 {
  public:
    unsigned long power_start_;  // Time machine was last turned on
    bool power_status_;
    SilviaDisplay(TwoWire* wire);
    void showTemperature(double* T, double* T_set);
    void SilviaDisplay::showBrewTime(int* t);
    void showLogo();
    void showBlank();
    void update();
    void drawCentreString(const char *buf, int x, int y);
};

extern RelayOutput power_output;
extern double T_boiler;
extern double pid_setpoint;
extern int brew_duration;

#endif // SILVIA_DISPLAY_H
