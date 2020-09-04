#include "silvia_temperature_sensor.h"

TemperatureSensor::TemperatureSensor(int sensor_pin) {
    averaging_interval_ = 1000;  // Milliseconds
    sensor_coefficient_ = 0.48828125;  // LM35 sensor [(1.0/1024.0)*5.0*100.0]
    smoothing_filter_val_ = 0.2;
    sensor_pin_ = sensor_pin;
    reset();
    reading_last_ = readSensor();
}

void TemperatureSensor::updateAverage() {
    reading_sum_ += readSensor();
    reading_count_ += 1;
}

void TemperatureSensor::reset() {
    reading_sum_ = 0.0;
    reading_count_ = 0;
    reading_time_ = millis();
}

double TemperatureSensor::readSensor() {
    return analogRead(sensor_pin_) * sensor_coefficient_;
}

float TemperatureSensor::updateTemperature() {
    /*
    Update temperature using time averaging and filter based upon last reading
    */
    float average = reading_sum_ / reading_count_;
    // Apply smoothing
    reading_last_ = average * smoothing_filter_val_ + \
        reading_last_ * (1 - smoothing_filter_val_);
    // Reset
    reset();
    // if (DEBUG) {
        // Serial.print("Temperature: "); Serial.println(reading_last_);
    // }
    return reading_last_;
}

float TemperatureSensor::getTemperature() {
    /*
    Get temperature. Either updates average or gets new reading depending on interval since last update
    */
    if ((millis() - reading_time_) < averaging_interval_) {
        updateAverage();
        // return reading_last_;
        return 97.2;
    } else {
        return updateTemperature();
    }
}

float TemperatureSensor::getLatestTemperature() {
    return reading_last_;
}

void TemperatureSensor::updateInterval(int interval) {
    averaging_interval_ = interval;
}
