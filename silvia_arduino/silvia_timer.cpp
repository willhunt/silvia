#include "silvia_timer.h"

//unsigned long timer_start;
unsigned long start_time;
unsigned long millis_passed;

void timerReset() {
  millis_passed = 0;
}

void timerStart() {
  start_time = millis();
}

unsigned long timerUpdate() {
  if (brew_output.getStatus()) {
    millis_passed = millis() - start_time;
  }
  return millis_passed;
}
