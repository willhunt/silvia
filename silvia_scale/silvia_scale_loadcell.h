#ifndef SILVIA_SCALE_LOADCELL_H
#define SILVIA_SCALE_LOADCELL_H

#include <Arduino.h>
#include "HX711.h"
// https://github.com/bogde/HX711

#define CALIBRATION_FACTOR 420.0983

//extern HX711 loadcell;

void loadcellSetup(int dout_pin, int clk_pin, int tare_pin);
void loadcellTare();
float getMass();

#endif // SILVIA_SCALE_LOADCELL_H
