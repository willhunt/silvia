#ifndef SILVIA_SCALE_WIFI_H
#define SILVIA_SCALE_WIFI_H

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "wifi_details.h"  // Wifi SSID & password
#include "silvia_scale_display.h"


ESP8266WebServer* scaleWifiSetup(IPAddress ip, IPAddress subnet, IPAddress gateway, IPAddress dns);
void handleRoot();
void handleGetMass();
void handleTare();

#endif  // SILVIA_SCALE_WIFI_H
