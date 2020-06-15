#ifndef SILVIA_TEMP_SENSOR_H
#define SILVIA_TEMP_SENSOR_H

#ifndef DEBUG
#define DEBUG true
#endif  // DEBUG

#include <Arduino.h>


/* 
Rosserial publisher class for publishing IMU data from Adafruit BNO055
*/
class TemperatureSensor {
  
  private:
    
    float reading_sum_;  // Sum readings to take average
    int reading_count_;  // Count readings to take average
    float sensor_coefficient_; // Specific to sensor
    float smoothing_filter_val_;  // Between 0 and 1 for smoothing function (small=more smooth)
    int sensor_pin_;  // Analog pin number
    float updateTemperature();  // Updates temperature reading

  public:
    TemperatureSensor(int sensor_pin);
    void updateAverage();  // Updates sum and reading count
    float getTemperature();  // Get temperature, either last or new depending on interval
    float averaging_interval_;  // Interval over which to average [millis]
    float reading_last_;  // Last temperature last_reading
    unsigned long reading_time_;  // Time at which last reading was taken
    void updateInterval(int interval);  // Update interval [seconds]
};


#endif //SILVIA_TEMP_SENSOR_H