#include "silvia_scale_loadcell.h"

HX711 loadcell_;

void loadcellSetup(int dout_pin, int clk_pin, int tare_pin) {
  pinMode(tare_pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(tare_pin), loadcellTare, RISING);
  
//  loadcell_.begin(dout_pin, clk_pin);
//  loadcell_.set_scale(CALIBRATION_FACTOR);
//  loadcell_.tare();
}

float getMass() {
  // Average of 5 readings from the ADC minus the tare weight
//  return loadcell_.get_units(5);
  return random(0, 20);
}

void loadcellTare() {
//  loadcell_.tare();

}
