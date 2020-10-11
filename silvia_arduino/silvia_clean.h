#ifndef SILVIA_CLEAN_H
#define SILVIA_CLEAN_H

#ifndef DEBUG
#define DEBUG false
#endif  // DEBUG

#define UPDATE_INTERVAL 100 //ms

#include <Arduino.h>
#include "silvia_output.h"
#include "silvia_water_sensor.h"
#include "silvia_timer.h"

class CleaningProcess {
    private:
        int n_cycles_;
        int t_on_;
        int t_off_;
        int t_total_;
        unsigned char previous_mode_;
        unsigned long duration_;
        unsigned long last_update_;
        void pump_on();
        void pump_off();      

    public:
        CleaningProcess();
        void start(unsigned char previous_mode);
        void stop();
        unsigned char update();
        int get_time_remaining();
        void set_timings(int n_cycles, int t_on, int t_off);
};

extern RelayOutput brew_output;
extern WaterLevelSensor water_sensor;

#endif // SILVIA_CLEAN_H