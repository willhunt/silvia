#include <cstdlib>
#include <ESP8266WiFi.h>
#include <IPAddress.h>
#include "silvia_scale_wifi.h"
#include "silvia_scale_display.h"
#include "silvia_scale_loadcell.h"
#include "silvia_scale_timer.h"

#define SCALE_DOUT_PIN 2 // D4
#define SCALE_CLK_PIN 3 // D9
#define TIMER_START_PIN 13     // D7
#define TIMER_RESET_PIN 12     // D6
#define LOADCELL_TARE_PIN 14  // D5

//Static IP address configuration
IPAddress ip(192, 168, 0, 12); // Static IP
IPAddress gateway(192, 168, 0, 1);  // IP Address of your WiFi Router (Gateway)
IPAddress subnet(255, 255, 255, 0);  //Subnet mask
IPAddress dns(192, 168, 0, 1);  // Domain name server

ESP8266WebServer* server;

double setpoint;
double mass;
unsigned long t;

void setup() {
  displaySetup();
  displayWelcome();
  
  server = scaleWifiSetup(ip, gateway, subnet, dns);

  loadcellSetup(SCALE_DOUT_PIN, SCALE_CLK_PIN, LOADCELL_TARE_PIN);

  timerSetup(TIMER_START_PIN, TIMER_RESET_PIN);

  setpoint = -1.0;
}

void loop() {
//  scale.spin();
  server->handleClient();

  mass = getMass();
  t = timerUpdate();
  displayStatus(mass, t);
  
//  delay(100);

  if (setpoint > 0 && mass >= setpoint) {  // setpoint<0 signifies mass control off
    // check also that enough time has passed
    if (t > 3000)
      sendBrewStop();
  }
}
