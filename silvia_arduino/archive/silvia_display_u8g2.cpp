#include "silvia_display.h"

SilviaDisplay::SilviaDisplay()
  : U8G2_SSD1306_128X64_NONAME_F_HW_I2C(U8G2_R0, /* reset=*/ U8X8_PIN_NONE) {
  power_start_ = 0;
  power_status_ = false;
  begin();
};

void SilviaDisplay::showData(double* T, double* T_set, int* t) {
  clearBuffer();

  char buffer [6];  // Buffer for printing strings
  int temp;  /// Temperature for printing

  setFont(u8g2_font_7x14_mn);
  temp = (int)(*T + 0.5);  // 0.5 used for rounding correctly
  sprintf(buffer, "%d", temp);
  drawCentreStr(35, 6, buffer);
  setFont(u8g2_font_4x6_mf);
  print(F("°C"));  // Units

  setFont(u8g2_font_5x8_mr);
  temp = (int)(*T_set + 0.5);  // 0.5 used for rounding correctly
  sprintf(buffer, "%d", temp);
  drawCentreStr(102, 10, buffer);
  drawFrame(80, 7, 41, 20);

  setFont(u8g2_font_7x14_mn);
  int mins = *t / 60;
  int secs = *t % 60;
  sprintf(buffer, "%02d:%02d", mins, secs);
  drawStr(21, 40, buffer),
  drawLine(0, 33, 127, 33);
  
  sendBuffer();
};

void SilviaDisplay::showLogo() {
  clearBuffer();
  // drawBitmap(
  //   (width()  - LOGO_WIDTH ) / 2, (height() - LOGO_HEIGHT) / 2,
  //   bitmap_logo,
  //   LOGO_WIDTH/8, LOGO_HEIGHT,
  //   WHITE
  // );
  drawXBM(
    (SCREEN_WIDTH  - LOGO_WIDTH ) / 2, (SCREEN_HEIGHT - LOGO_HEIGHT) / 2,
    LOGO_WIDTH/8, LOGO_HEIGHT,
    bitmap_logo
  );
  sendBuffer();
};

void SilviaDisplay::showBlank() {
  clearBuffer();
  sendBuffer();
}

void SilviaDisplay::update() {
  if (power_output.getStatus()) {  // If machine on
    if (!power_status_) {  // If machine used to be off
      power_start_ = millis();
      showLogo();
    } else {
      if (millis() - power_start_ > 2000) {  // Only show temperature after 2 seconds, to leave welcome up
        showData(&T_boiler, &pid_setpoint, &brew_duration);
      }
    }
  } else {  // machine off
    if (power_status_) {  // If machine used to be on
      showBlank();
    }
  }
  power_status_ = power_output.getStatus();
}

void SilviaDisplay::drawCentreStr(int x, int y, const char *buffer) {
    u8g2_uint_t w = getStrWidth(buffer);
    setCursor(x - w/2, y);
    // drawStr(x - w/2, y, buffer);
    print(buffer);
}