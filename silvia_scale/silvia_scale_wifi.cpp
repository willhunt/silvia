#include "silvia_scale_wifi.h"

ESP8266WebServer server_(80);

ESP8266WebServer* scaleWifiSetup(IPAddress ip, IPAddress subnet, IPAddress gateway, IPAddress dns) {
  
  // Display setup info
  Serial.begin(115200);
  Serial.println(); Serial.println(); Serial.println();
  Serial.println("Setup");
  Serial.print("    SSID: "); Serial.println(WIFI_SSID);
  Serial.print("    Password: "); Serial.println(WIFI_PASSWORD);
  Serial.println();

  // Setup WiFi
  WiFi.hostname("SilviaScale");
  WiFi.config(ip, subnet, gateway, dns);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Configuring access point...");
  displayWifiSetup(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    displayWifiConnecting();
  }
  Serial.println(""); Serial.println("WiFi connected");
  Serial.print("IP address: "); Serial.println(WiFi.localIP());
  displayWifiConnected( WiFi.localIP().toString().c_str() );

  // Setup API
  server_.on("/", handleRoot);
  server_.on("/mass", HTTP_GET, handleGetMass); 
  server_.on("/tare", HTTP_PUT, handleTare); 
  server_.on("/brewstart", HTTP_PUT, handleBrewStart);
  server_.on("/brewstop", HTTP_PUT, handleBrewStop);
  server_.begin();
  
  Serial.println("HTTP server started");

  return &server_;
}

void handleRoot() {
  Serial.println("Home request received");
  server_.send(200, "text/html", "<h1>Silvia Scale</h1><p>Get mass through GET request to /mass</p>");
}

void handleGetMass() {
  Serial.println("Mass get request received");
  char json[30];
  // String json = String("{\"mass\": " + String(mass, 2) + ", \"units\": \"g\"}");
  sprintf(json, "{\"mass\": %.2f, \"units\": \"g\"}", mass);  // have to escape all quotes
  server_.send(200, "application/json", json);
}

void handleTare() {
  Serial.println("Tare get request received");
  // Set to current mass reading
  server_.send(200, "application/json", "{tare: true}");
}

void handleBrewStart() {
  Serial.println("Brew request received");
  // Tare scale
  loadcellTare();
  // Start timer
  timerReset();
  timerStartStop();

  if(server_.hasArg("setpoint")) {
    //char* setpoint_str = server_.arg("setpoint");
    String setpoint_str = server_.arg("setpoint");
    //setpoint = atof(setpoint_str);
    setpoint = setpoint_str.toDouble();
  } else {
    setpoint = -1.0;
  }
  server_.send(200, "text/plain", "Brew started");
}

void handleBrewStop () {
  // Stop timer
  timerStartStop();
  char json[10];
  sprintf(json, "{\"t\": %d}", (int)(t/1000 + 0.5));  // have to escape all quotes
  server_.send(200, "application/json", json);
}

void sendBrewStop() {
 HTTPClient http;
 http.begin("http://192.168.0.6/api/v1/status/1/");
 http.addHeader("Content-Type", "application/json");
 http.addHeader("Authorization", AUTH_TOKEN);
 int httpResponseCode = http.PUT("{\"brew\": false}");
 if(httpResponseCode > 0){
   String response = http.getString();
   Serial.print("Response: "); Serial.print(httpResponseCode);
   Serial.print(" - "); Serial.println(response);
 }
 http.end();
}
