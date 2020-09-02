#include "silvia_display.h"

SilviaDisplay::SilviaDisplay()
  : Adafruit_SSD1306(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1) {
  begin(SSD1306_EXTERNALVCC, 0x3C);

  power_start_ = 0;
  brew_start_ = 0;

  power_status_ = false;
};

void SilviaDisplay::showTemperature(double* T, double* T_set) {
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

void SilviaDisplay::update() {
  if (power_output.getStatus()) {  // If machine on
    if (!power_status_) {  // If machine used to be off
      power_start_ = millis();
      showLogo();
    } else {
      if (millis() - power_start_ > 2000) {  // ONly show temperature after 2 seconds, to leave welcome up
        showTemperature(&T_boiler, &pid_setpoint);
      }
    }
  } else {  // machine off
    if (power_status_) {  // If machine used to be on
      clearDisplay();
    }
  }
  power_status_ = power_output.getStatus();
}