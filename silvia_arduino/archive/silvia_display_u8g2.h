#ifndef SILVIA_DISPLAY_H
#define SILVIA_DISPLAY_H

#ifndef ARDUINO
#define ARDUINO
#endif

#include <Arduino.h>
#include <Wire.h>
#include <U8g2lib.h>
#include "silvia_logo.h"
#include "silvia_output.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define SCREEN_PADDING 4 // Edge padding

class SilviaDisplay : public U8G2_SSD1306_128X64_NONAME_F_HW_I2C {
  public:
    unsigned long power_start_;  // Time machine was last turned on
    bool power_status_;
    SilviaDisplay();
    void showData(double* T, double* T_set, int* t);
    void showLogo();
    void showBlank();
    void update();
    void drawCentreStr(int x, int y, const char *buf);
};

extern RelayOutput power_output;
extern double T_measured;
extern double T_setpoint;
extern int brew_duration;

#endif // SILVIA_DISPLAY_H
