#include "silvia_temperature_sensor.h"

TemperatureSensor::TemperatureSensor(int sensor_pin) {
    averaging_interval_ = 200;  // Milliseconds
    sensor_coefficient_ = 0.48828125;  // LM35 sensor [(1.0/1024.0)*5.0*100.0]
    smoothing_filter_val_ = 0.5;  // How much smoothing (1=100% filtered(no update), 0=no filtering)
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

double TemperatureSensor::updateTemperature() {
    /*
    Update temperature using time averaging and filter based upon last reading
    */
    double reading_average;
    // Check for division by zero, was causing nan problem
    if (reading_count_ == 0) {
        reading_average = 999;
    } else {
        reading_average = reading_sum_ / (double)reading_count_;
    }
    // Apply smoothing
    reading_last_ = reading_average * (1 - smoothing_filter_val_) + \
        reading_last_ * smoothing_filter_val_;
    // Reset
    reset();
    // if (DEBUG) {
        // Serial.print(F("Temperature: ")); Serial.println(reading_last_);
    // }
    return reading_last_;
}

double TemperatureSensor::getTemperature() {
    /*
    Get temperature. Either updates average or gets new reading depending on interval since last update
    */
    if ((millis() - reading_time_) < averaging_interval_) {
        updateAverage();
        return reading_last_;
    } else {
        return updateTemperature();
    }
}

double TemperatureSensor::getLatestTemperature() {
    return reading_last_;
}

void TemperatureSensor::updateInterval(int interval) {
    averaging_interval_ = interval;
}
