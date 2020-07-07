#include "silvia_scale_timer.h"

//unsigned long timer_start;
unsigned long timer_last;
int millis_passed;
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
//  timer_start = 0;
//  timer_last = 0;
  millis_passed = 0;
  timer_on = false;
}

void timerStartStop() {
  if (!timer_on) {
//    timer_start = millis();
    timer_last = millis();
    timer_on = true;
  }
  else {
    timer_on = false;
  }
  
}

int timerUpdate() {
  if (timer_on) {
    unsigned long millis_now = millis();
    millis_passed += (millis_now - timer_last); 
    timer_last = millis_now;
  }
  return millis_passed;
}
