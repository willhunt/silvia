#ifndef SILVIA_WATER_SENSOR_H
#define SILVIA_WATER_SENSOR_H

#ifndef DEBUG
#define DEBUG true
#endif  // DEBUG

#include <Arduino.h>

/* 
Water level sensor class
Liquid Level Sensor-XKC-Y25-T12V
Outputs either true or false for water detected
*/
class WaterLevelSensor {
  
  private:
    int sensor_pin_;  // Analog pin number
    
  public:
    WaterLevelSensor(int sensor_pin);
    bool getLevel();  // Get level
};


#endif // SILVIA_WATER_SENSOR_H