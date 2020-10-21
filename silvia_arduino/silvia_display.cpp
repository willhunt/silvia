#include "silvia_display.h"

SilviaDisplay::SilviaDisplay(TwoWire* twi)
  : Adafruit_SSD1306(SCREEN_WIDTH, SCREEN_HEIGHT, twi, -1) {
  power_start_ = 0;
  power_status_ = false;
};

void SilviaDisplay::showData(double* T, double* T_set, unsigned int* t, unsigned char* mode, bool* heat_overridden_by_brew, int t_clean_remaining) {
  clearDisplay();

  setTextColor(SSD1306_WHITE);
  char buffer [6];  // Buffer for printing strings

  setTextSize(3);
  sprintf(buffer, "%d", (int)(*T + 0.5));    // 0.5 used for rounding correctly
  drawCentreString(buffer, 35, 6);
  setTextSize(1);
  cp437(true); write(167); print("C");  // Units

  drawRect(80, 7, 41, 20, WHITE);
  setTextSize(2);
  if (*heat_overridden_by_brew) {
    setCursor(83, 10);
    print("(B)");
  } else if (*mode == MODE_PID) {
    sprintf(buffer, "%d", (int)(*T_set + 0.5)); // 0.5 used for rounding correctly
    drawCentreString(buffer, 102, 10);
  } else if (*mode == MODE_CLEAN) {
    setCursor(83, 10);
    print("(C)");
  } else {
    setCursor(83, 10);
    print("(M)");
  }

  // Below line
  drawLine(0, 33, width()-1, 33, WHITE);
  if (*mode == MODE_MANUAL && !*heat_overridden_by_brew) { // show gains 
    setTextSize(1);
    setCursor(10, 40);
    print("K(");
    print(heater.GetKp(), 1); print(", "); print(heater.GetKi(), 3); print(", "); print(heater.GetKd(), 0);
    print(")");
    setCursor(10, 50);
    print("Set("); print(heater.getSetpoint(), 0); print(")");
  } else if (*mode == MODE_CLEAN) {  // Show cleaner time remaining
    setTextSize(3);
    int mins = *t / 60;
    int secs = *t % 60;
    sprintf(buffer, "%02d:%02d", mins, secs);
    setCursor(21, 40);
    print(buffer);
  } else { // Show brew time
    setTextSize(3);
    int mins = t_clean_remaining / 60;
    int secs = t_clean_remaining % 60;
    sprintf(buffer, "%02d:%02d", mins, secs);
    setCursor(21, 40);
    print(buffer);
  }
  
  display();
};

void SilviaDisplay::showLogo() {
  clearDisplay();
  drawBitmap(
    (width()  - LOGO_WIDTH ) / 2, (height() - LOGO_HEIGHT) / 2,
    bitmap_logo,
    LOGO_WIDTH, LOGO_HEIGHT,
    WHITE
  );
  display();
};

void SilviaDisplay::showBlank() {
  clearDisplay();
  display();
}

void SilviaDisplay::update() {
  if (power_output.getStatus()) {  // If machine on
    if (!power_status_) {  // If machine used to be off
      power_start_ = millis();
      showLogo();
    } else {
      if (millis() - power_start_ > 2000) {  // Only show temperature after 2 seconds, to leave welcome up
        showData(&T_measured, &T_setpoint, &brew_duration, &mode, &heat_overridden_by_brew, cleaner.get_time_remaining());
      }
    }
  } else {  // machine off
    if (power_status_) {  // If machine used to be on
      showBlank();
    }
  }
  power_status_ = power_output.getStatus();
}

void SilviaDisplay::drawCentreString(const char *buf, int x, int y) {
    int16_t x1, y1;
    uint16_t w, h;
    getTextBounds(buf, x, y, &x1, &y1, &w, &h); // Calc width of new string
    setCursor(x - w / 2, y);
    print(buf);
}
