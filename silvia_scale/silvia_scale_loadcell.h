#ifndef SILVIA_SCALE_LOADCELL_H
#define SILVIA_SCALE_LOADCELL_H

#include <HX711.h>

#define CALIBRATION_FACTOR -7050.0

//extern HX711 loadcell;

void loadcellSetup(int dout_pin, int clk_pin);

float getMass();

#endif // SILVIA_SCALE_LOADCELL_H
