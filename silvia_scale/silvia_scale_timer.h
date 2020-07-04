#ifndef SILVIA_SCALE_TIMER_H
#define SILVIA_SCALE_TIMER_H

#include <Arduino.h>

void timerSetup(int start_pin, int reset_pin);
void ICACHE_RAM_ATTR timerReset();
void ICACHE_RAM_ATTR timerStartStop();
int timerUpdate();

#endif // SILVIA_SCALE_TIMER_H
