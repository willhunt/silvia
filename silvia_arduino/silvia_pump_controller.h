#ifndef SILVIA_PUMP_CONTROLLER_H
#define SILVIA_PUMP_CONTROLLER_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#define PROFILE_STEPS 5

#include <Arduino.h>
#include <PID_v1.h>
#include <RBDdimmer.h>

/* 
Controller for pump delivered pressure
*/
class PumpController : public PID {
  private:
    int dimmer_pin_;
    double* output_;
    double* setpoint_;
    dimmerLamp dimmer_;
    int t_profile_[PROFILE_STEPS];
    double P_profile_[PROFILE_STEPS];

  public:
    PumpController(
      double* Input, double* Output, double* Setpoint,
      double Kp, double Ki, double Kd,
      int POn, int ControllerDirection, int dimmer_pin
    );
    void dimmerControl();
    void on(bool reset=false);
    void on(double Setpoint, double Kp, double Ki, double Kd, int Kp_mode, bool reset=false);
    void off();
    double getSetpoint();
    void setSetpoint(double pressure);
    double getDuty();
    int getDimmerPin();
    void overrideOutput(double duty);
    double getProfilePressure(double t);
    void update(double t);
};


#endif // SILVIA_PUMP_CONTROLLER_H
