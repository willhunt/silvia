#ifndef SILVIA_SCALE_LOADCELL_H
#define SILVIA_SCALE_LOADCELL_H

#include <Arduino.h>
//#include "HX711.h"
#include <HX711_ADC.h>

#define CALIBRATION_FACTOR 2871.68

//extern HX711 loadcell;

void loadcellSetup(int dout_pin, int clk_pin, int tare_pin);
void ICACHE_RAM_ATTR loadcellTare();
float getMass();

#endif // SILVIA_SCALE_LOADCELL_H
