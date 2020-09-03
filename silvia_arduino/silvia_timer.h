#ifndef SILVIA_TIMER_H
#define SILVIA_TIMER_H

#include <Arduino.h>
#include "silvia_output.h"

void timerReset();
void timerStart();
int timerUpdate();

extern RelayOutput brew_output;

#endif // SILVIA_TIMER_H
