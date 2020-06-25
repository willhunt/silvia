#include "silvia_display.h"

SilviaDisplayHelper::SilviaDisplayHelper(int sda_pin, int scl_pin) 
  : soft_wire_(sda_pin, scl_pin) {
  
};

SoftwareWire* SilviaDisplayHelper::getSoftwareWire() {
  return &soft_wire_;
};

SilviaDisplay::SilviaDisplay(int sda_pin, int scl_pin)
  : SilviaDisplayHelper(sda_pin, scl_pin),
    Adafruit_SSD1306(SCREEN_WIDTH, SCREEN_HEIGHT, getSoftwareWire(), -1) {
  begin(SSD1306_EXTERNALVCC, 0x3C);
};

void SilviaDisplay::updateTemperature(double* T, double* T_set) {
  clearDisplay();

  setTextSize(1);  // Normal 1:1 pixel scale
  setCursor(0, 0);
  print("Temperature:");
  setTextSize(2);
  setCursor(0, 10);
  print(*T, 1);  // Temperature to 1 decimal place
  print(" "); cp437(true); write(167); print("C");  // Units

  setTextSize(1);
  setCursor(0, 35);
  print("Target: ");
  setTextSize(2);
  setCursor(0, 10);
  print(*T_set, 1);  // Temperature to 1 decimal place
  print(" "); cp437(true); write(167); print("C");  // Units

  display();
};

void SilviaDisplay::showLogo() {
  clearDisplay();
  drawBitmap(
    (width()  - LOGO_WIDTH ) / 2, (height() - LOGO_HEIGHT) / 2,
    bitmap_logo,
    LOGO_WIDTH, LOGO_HEIGHT,
    1
  );
  display();
};