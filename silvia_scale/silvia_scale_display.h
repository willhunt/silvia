#ifndef SILVIA_SCALE_DISPLAY_H
#define SILVIA_SCALE_DISPLAY_H

//#include <Adafruit_SSD1306.h>
//#include <Adafruit_GFX.h>
#include <brzo_i2c.h>
#include <SSD1306Brzo.h>

// Images
#include "silvia_logo_128x64.h"
//#include "checked_circle.h"
#include "check_circle_outline.h"

void displaySetup();
void displayWelcome();
void displayWifiSetup(String ssid);
void displayWifiConnecting();
void displayWifiConnected(String ip);
void displayMass(float mass);
void displayTimer();
void displayStatus(float mass, int milliseconds);

#endif // SILVIA_SCALE_DISPLAY_H
