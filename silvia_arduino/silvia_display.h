#ifndef SILVIA_DISPLAY_H
#define SILVIA_DISPLAY_H

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include "silvia_logo.h"
#include "silvia_output.h"
#include "silvia_modes.h"
#include "silvia_clean.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define SCREEN_PADDING 4 // Edge padding

class SilviaDisplay : public Adafruit_SSD1306 {
  public:
    unsigned long power_start_;  // Time machine was last turned on
    bool power_status_;
    SilviaDisplay(TwoWire* wire);
    void showData(
      double* T,
      double* T_set, 
      unsigned int* t,
      unsigned char* mode, 
      bool* heat_overridden_by_brew,
      int t_clean_remaining
    );
    void showLogo();
    void showBlank();
    void update();
    void drawCentreString(const char *buf, int x, int y);
};

extern RelayOutput power_output;
extern TemperatureController heater;
extern CleaningProcess cleaner;
extern double T_measured;
extern double T_setpoint;
extern unsigned int brew_duration;
extern unsigned char mode;
extern bool heat_overridden_by_brew;

#endif // SILVIA_DISPLAY_H
