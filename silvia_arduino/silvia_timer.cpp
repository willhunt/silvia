#include "silvia_timer.h"

//unsigned long timer_start;
unsigned long start_time;
int millis_passed;

void timerReset() {
  millis_passed = 0;
}

void timerStart() {
  start_time = millis();
}

int timerUpdate() {
  if (brew_output.getStatus()) {
    millis_passed = millis() - start_time;
  }
  return millis_passed;
}
