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
  displayWifiSetup(String(WIFI_SSID));
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    displayWifiConnecting();
  }
  Serial.println(""); Serial.println("WiFi connected");
  Serial.print("IP address: "); Serial.println(WiFi.localIP());
  displayWifiConnected( WiFi.localIP().toString() );

  // Setup API
  server_.on("/", handleRoot);
  server_.on("/mass", HTTP_GET, handleGetMass); 
  server_.on("/tare", HTTP_GET, handleTare); 
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
  float mass = random(0, 20);
  String json = String("{\"mass\": " + String(mass, 2) + ", \"units\": \"g\"}");
  server_.send(200, "application/json", json);
}

void handleTare() {
  Serial.println("Tare get request received");
  // Set to current mass reading
  server_.send(200, "application/json", "{tare: true}");
}
