#include "silvia_water_sensor.h"

WaterLevelSensor::WaterLevelSensor(int sensor_pin) {
  sensor_pin_ = sensor_pin;
  pinMode(sensor_pin, INPUT);
};

bool WaterLevelSensor::getLevel() {
  // Returns True if water in tank
  return digitalRead(sensor_pin_);
}; 