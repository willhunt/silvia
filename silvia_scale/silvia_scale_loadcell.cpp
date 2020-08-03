#include "silvia_scale_loadcell.h"

//HX711 loadcell_;
HX711_ADC* loadcell_;
bool new_data_ready = false;
unsigned long loadcell_last_update;
const int loadcell_update_interval = 0;
float mass;

void loadcellSetup(int dout_pin, int clk_pin, int tare_pin) {
  pinMode(tare_pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(tare_pin), loadcellTare, RISING);
  
//  loadcell_.begin(dout_pin, clk_pin);
//  loadcell_.set_scale(CALIBRATION_FACTOR);
//  loadcell_.tare();

  loadcell_last_update = millis();
  loadcell_ = new HX711_ADC(dout_pin, clk_pin);
  loadcell_->begin();
  loadcell_->start(2000, true);
  if (loadcell_->getTareTimeoutFlag()) {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
    while (1);
  }
  else {
    loadcell_->setCalFactor(CALIBRATION_FACTOR); // set calibration value (float)
    Serial.println("Loadcell startup is complete");
  }
}

float getMass() {
  // Average of 5 readings from the ADC minus the tare weight
//  return loadcell_.get_units(10);
//  return random(0, 20);

  if (loadcell_->update()) new_data_ready = true;

  // get smoothed value from the dataset:
  if (new_data_ready) {
    if (millis() > loadcell_last_update + loadcell_update_interval) {
      mass = loadcell_->getData();
      new_data_ready = false;
      loadcell_last_update = millis();
    }
  }
  return mass;
}

void loadcellTare() {
//  loadcell_.tare(5);
  loadcell_->tareNoDelay();
  Serial.println("Tare");

}
