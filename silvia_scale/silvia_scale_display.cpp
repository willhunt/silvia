#include "silvia_scale_display.h"

SSD1306Brzo display(0x3c, 5, 4);  // ADDRESS, SDA, SCL
uint8_t progress = 0;
int display_update_interval = 100;  // millis
unsigned long display_last_update;

void displaySetup() {
  display.init();
  display.clear();
//  display.flipScreenVertically();
  display_last_update = millis();
}

void displayWelcome() {
  display.drawXbm(0, 0, LOGO_WIDTH, LOGO_HEIGHT, silvia_logo);
  display.display();
  delay(2000);

  display.clear();
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.setFont(ArialMT_Plain_16);
  display.drawString(64, 4, "Silvia Scale");
  display.display();
}

void displayWifiSetup(const char* ssid) {
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.setFont(ArialMT_Plain_10);
//  String connect_string = String("Connecting to " + ssid);
  display.drawString(64, 22, "Connecting to");
  display.drawString(64, 34, ssid);
  display.display();
}

void displayWifiConnecting() {
  if (progress <= 100) {
    display.drawProgressBar(14, 53, 100, 9, progress);
    progress += 5;
    
  } else {
    display.setColor(BLACK);
//    display.drawRect(0, 52, 128, 12);
    display.setTextAlignment(TEXT_ALIGN_CENTER);
    display.setFont(ArialMT_Plain_10);
    display.drawString(64, 52, "Try reset <-");
    display.setColor(WHITE);
  }
  
  display.display();
  
}

void displayWifiConnected(const char* ip) {
  display.clear();
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.setFont(ArialMT_Plain_16);
  display.drawString(64, 4, "Connected");
  display.drawXbm(52, 25, CHECK_CIRCLE_OUTLINE_WIDTH, CHECK_CIRCLE_OUTLINE_HEIGHT, check_circle_outline);
  display.setFont(ArialMT_Plain_10);
  display.drawString(64, 52, ip);
  display.display();
  delay(2000);
  display.clear();
}

void displayMass(float mass) {
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.setFont(ArialMT_Plain_24);
  display.drawString(64, 4, String(String(mass, 1) + "g"));
  display.display();
}

void displayTimer(int milliseconds) {
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.setFont(ArialMT_Plain_24);
  int seconds = (milliseconds / 1000) % 60;
  int minutes = milliseconds / 60000;
  char timer_str[6];
  sprintf(timer_str, "%02d:%02d", minutes, seconds);
  display.drawString(64, 32, timer_str);
//  display.drawString(64, 32, "00:00");
  display.display();

}

void displayStatus(float mass, int milliseconds) {
  unsigned long time_now = millis();
  if (time_now - display_last_update > display_update_interval) {
    display.clear();
    displayMass(mass);
    displayTimer(milliseconds);
    display_last_update = time_now;
  }
}
