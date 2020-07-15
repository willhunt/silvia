# Scale Setup

The scale uses the NodeMCU board with [ESP8266 Arduino Core library](https://github.com/esp8266/Arduino).

The Arduino libraries required are:
* [ESP8266 Arduino Core library](https://github.com/esp8266/Arduino)
* [Brzo I2C](https://github.com/pasko-zh/brzo_i2c)
* [ESP8266 and ESP32 OLED driver for SSD1306 displays](https://github.com/ThingPulse/esp8266-oled-ssd1306)

To use the code you will first need to create a `wifi_details.h` file in the /silvia_scale directory with the following  contents, replacing with your WiFi SSID and password:

```cpp
#ifndef WIFI_DETAILS_H
#define WIFI_DETAILS_H
#define WIFI_SSID "********"
#define WIFI_PASSWORD "********"
#endif // WIFI_DETAILS_H
```

You will need to install the board manager as described on the [Github page](https://github.com/esp8266/Arduino#installing-with-boards-manager).

Useful information about the board can be found here: [/oneguyoneblog.com](https://oneguyoneblog.com/2018/12/28/wemos-d1-esp-wroom-02-arduino-ide/)

To flash the Arduino select "WeMos D1 R1" as the board in the IDE board manager.

## Notes on pins
I had real trouble getting the HX711 library to work due to the selection of available pins on the board. Using the D8 (GPIO 15) worked but if connected the board would not start up. Most combinations of pins tried caused the board to constantly reset during the `setup()` stage. Int he end D4 (GPIO 2) which is connected to an on board LED and D9 (GPIO 3) worked.