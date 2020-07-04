#include "silvia_scale_timer.h"

unsigned long timer_start;
unsigned long timer_last;
bool timer_on;

void timerSetup(int start_pin, int reset_pin) {
//  Serial.println("timer setup start");
  pinMode(start_pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(start_pin), timerStartStop, RISING);
  pinMode(reset_pin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(reset_pin), timerReset, RISING);
  timerReset();
//  Serial.println("timer setup end");
}

void timerReset() {
  timer_start = 0;
  timer_last = 0;
  timer_on = false;
}

void timerStartStop() {
  if (!timer_on) {
    timer_start = millis();
    timer_last = timer_start;
    timer_on = true;
  }
  else {
    timer_on = false;
  }
  
}

int timerUpdate() {
  if (timer_on) {
    timer_last = millis();
  }
  return timer_last - timer_start;
}
