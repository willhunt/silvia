#ifndef SILVIA_TEMP_SENSOR_H
#define SILVIA_TEMP_SENSOR_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#include <Arduino.h>

#define MA_FILTER_WINDOW_SIZE 10
#define FILTER_TYPE 1  // 0=lag, 1=moving average

/* 
Rosserial publisher class for publishing IMU data from Adafruit BNO055
*/
class TemperatureSensor {
  
  private:
    double reading_sum_;  // Sum readings to take average
    int reading_count_;  // Count readings to take average
    double sensor_coefficient_; // Specific to sensor
    double smoothing_filter_val_;  // Between 0 and 1 for smoothing function (small=more smooth)
    int sensor_pin_;  // Analog pin number
    double averaging_interval_;  // Interval over which to average [millis]
    double reading_last_;  // Last temperature last_reading
    unsigned long reading_time_;  // Time at which last reading was taken
    double updateTemperature();  // Updates temperature reading
    void reset();  // Reset variables
    double ma_readings_[MA_FILTER_WINDOW_SIZE]; // Store of previous readings for moving average filter
    int ma_index_; // Moving average index
    double ma_sum_; // Moving average Sum

  public:
    TemperatureSensor(int sensor_pin);
    void updateAverage();  // Updates sum and reading count
    double getTemperature();  // Get temperature, either last or new depending on interval
    double getLatestTemperature(); // Get latest without updating
    void updateInterval(int interval);  // Update interval [seconds]
    double readSensor();  // Read sensor
};

#endif //SILVIA_TEMP_SENSOR_H