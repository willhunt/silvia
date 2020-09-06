#include "silvia_temperature_sensor.h"

TemperatureSensor::TemperatureSensor(int sensor_pin) {
    averaging_interval_ = 1000;  // Milliseconds
    sensor_coefficient_ = 0.48828125;  // LM35 sensor [(1.0/1024.0)*5.0*100.0]
    smoothing_filter_val_ = 0.2;
    sensor_pin_ = sensor_pin;
    reset();
    reading_last_ = readSensor();
    // reading_last_ = 67.2;
}

void TemperatureSensor::updateAverage() {
    // reading_sum_ += readSensor();
    // reading_count_ += 1;
    reading_sum_ = 78.2;
    reading_count_ = 2;
}

void TemperatureSensor::reset() {
    reading_sum_ = 0.0;
    reading_count_ = 0;
    reading_time_ = millis();
}

double TemperatureSensor::readSensor() {
    // return analogRead(sensor_pin_) * sensor_coefficient_;
    return 46.9;
}

double TemperatureSensor::updateTemperature() {
    /*
    Update temperature using time averaging and filter based upon last reading
    */
    double reading_average = reading_sum_ / (double)reading_count_;
    // double reading_average = 76.2;
    // Apply smoothing
    // ***************************************************** Inclusion here causes NAN
    reading_last_ = reading_average * smoothing_filter_val_ + \
        reading_last_ * (1 - smoothing_filter_val_);
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
