#include "silvia_temperature_sensor.h"

TemperatureSensor::TemperatureSensor(int sensor_pin) {
    averaging_interval_ = 200;  // Milliseconds
    sensor_coefficient_ = 0.48828125;  // LM35 sensor [(1.0/1024.0)*5.0*100.0]
    smoothing_filter_val_ = 0.8;  // How much smoothing (1=100% filtered(no update), 0=no filtering)
    sensor_pin_ = sensor_pin;
    reset();
    reading_last_ = readSensor();
    // Setup moving average filter
    for (int i = 0; i < MA_FILTER_WINDOW_SIZE; i++) {
        ma_readings_[i] = 0;
    }
    ma_sum_ = reading_last_;
    ma_index_ = 0;
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
    if (FILTER_TYPE == 0) {  // Lag filter
        reading_last_ = reading_average * (1 - smoothing_filter_val_) + \
        reading_last_ * smoothing_filter_val_;
    } else if (FILTER_TYPE == 1) { // moving average
        ma_sum_ -= ma_readings_[ma_index_];  // Remove the oldest entry from the sum
        ma_sum_ += reading_average;  // Add new value to sum
        ma_readings_[ma_index_] = reading_average;  // Replace with new value in store
        ma_index_ = (ma_index_ + 1) % MA_FILTER_WINDOW_SIZE;  // Increment index
        reading_last_ = ma_sum_ / MA_FILTER_WINDOW_SIZE;
    } else {  // No filter
        reading_last_ = reading_average;
    }
    
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
