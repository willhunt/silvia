#ifndef SILVIA_TEMPERATURE_CONTROLLER_H
#define SILVIA_TEMPERATURE_CONTROLLER_H

#ifndef DEBUG
#define DEBUG true
#endif  // DEBUG

#define ATUNE_NOISE 1
#define ATUNE_STEP 50
#define ATUNE_LOOKBACK 20

#include <Arduino.h>
#include <PID_v1.h>
#include <PID_AutoTune_v0.h>

/* 
PID controller for boiler temperature
*/
class TemperatureController : public PID {
  private:
    int relay_pin_;
    unsigned long tpc_window_start_;  // Time proportional control start time [millis]
    unsigned long tpc_window_size_;  // Time proportional control window size [millis]
    double* output_;
    double* setpoint_;
    PID_ATune* auto_tuner_;
    bool tuning_in_progress_;

  public:
    TemperatureController(
      double* Input, double* Output, double* Setpoint,
      double Kp, double Ki, double Kd,
      int POn, int ControllerDirection, int relay_pin
    );
    void relayControl();
    void on(double Setpoint, double Kp, double Ki, double Kd);
    void resume();
    void off();
    double getSetpoint();
    double getDuty();
    int getRelayPin();
    void TemperatureController::overrideOutput(bool on);
    bool tune();
    bool getTuningInProgress();
};


#endif // SILVIA_TEMPERATURE_CONTROLLER_H