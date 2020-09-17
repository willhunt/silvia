#ifndef SILVIA_TEMPERATURE_CONTROLLER_H
#define SILVIA_TEMPERATURE_CONTROLLER_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

// #define ATUNE_NOISE 0.5 // Temperature noise band
// #define ATUNE_STEP 20 // Change in temperature
// #define ATUNE_LOOKBACK 1000 // Timestep for peak identification
// #define ATUNE_OUTPUTSTART 50 

#include <Arduino.h>
#include <PID_v1.h>
//#include <PID_AutoTune_v0.h>

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
    // PID_ATune* auto_tuner_; 
    bool tuning_in_progress_;

  public:
    TemperatureController(
      double* Input, double* Output, double* Setpoint,
      double Kp, double Ki, double Kd,
      int POn, int ControllerDirection, int relay_pin
    );
    void relayControl();
    void on(bool reset=false);
    void on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode, bool reset=false);
    void off();
    double getSetpoint();
    void setSetpoint(double temperature);
    double getDuty();
    int getRelayPin();
    void overrideOutput(double duty);
    // Autotuner not used - methods left in for future use
    // Inclusion caused display to fail
    void setupTuner();
    void cancelTuner();
    bool tune();
    bool getTuningInProgress();
};


#endif // SILVIA_TEMPERATURE_CONTROLLER_H
