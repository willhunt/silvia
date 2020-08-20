#ifndef SILVIA_DISPLAY_H
#define SILVIA_DISPLAY_H

#include <Arduino.h>
#include <SoftwareWire.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include "silvia_logo.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels


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
};

#endif // SILVIA_DISPLAY_H