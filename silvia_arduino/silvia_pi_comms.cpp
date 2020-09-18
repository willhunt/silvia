#include "silvia_pi_comms.h"

responseData response_data;
receivedData received_data;
overrideData override_data;
int sizeof_received_data;
int sizeof_response_data;
int sizeof_override_data;

bool pid_overridden_by_brew = false;

void pi_comms_setup(int i2c_addr, TwoWire* wire) {
  sizeof_received_data = sizeof(receivedFormat);
  sizeof_response_data = sizeof(responseData);
  sizeof_override_data = sizeof(overrideData);
  // Serial
  Serial.begin(57600);
  // I2C
  wire->begin(i2c_addr);
  wire->onReceive(receiveEvent);
  wire->onRequest(requestEvent);
}

void pi_comms_setup() {
  sizeof_received_data = sizeof(receivedFormat);
  sizeof_response_data = sizeof(responseData);
  sizeof_override_data = sizeof(overrideData);
  // Serial
  Serial.begin(57600);
}

void update_data_buffer() {
  // Update values
  response_data.data.T_boiler = temperature_sensor.getLatestTemperature();
  response_data.data.power = power_output.getStatus();
  response_data.data.brew = brew_output.getStatus();
  response_data.data.duty = pid.getDuty();
  response_data.data.water_level = water_sensor.getLevel();
  response_data.data.mode = mode;
  response_data.data.Kp = pid.GetKp();
  response_data.data.Ki = pid.GetKi();
  response_data.data.Kd = pid.GetKd();
}

void response_actions() {
  if (DEBUG) {
    Serial.print(F("    Power: ")); Serial.println(received_data.data.power);
    Serial.print(F("    Brew: ")); Serial.println(received_data.data.brew);
    Serial.print(F("    Mode: ")); Serial.println(received_data.data.mode);
  }

  // Check if power needs to be toggled
  if (received_data.data.power != power_output.getStatus()) {
    // toggle power
    if (received_data.data.power) {
      if (DEBUG) {
        Serial.println("Turn on");
      }
      power_output.on();
      timerReset();
    } else {
      if (DEBUG) {
        Serial.println("Turn off");
      }
      power_output.off();
      pid.off();
    }
  }

  // Update pid settings
  if (received_data.data.mode == MODE_PID) {
    pid.SetTunings(received_data.data.kp, received_data.data.ki, received_data.data.kd, received_data.data.kp_mode);
    pid.setSetpoint(received_data.data.setpoint);
  }
  // Add mode 'MODE_OFF' which webserver doesn't record
  unsigned char new_mode = (received_data.data.power == false) ? MODE_OFF : received_data.data.mode;
  // Mode change
  change_mode(new_mode);

  // Check if brew needs to be toggled
  if (received_data.data.brew != brew_output.getStatus()) {
    // Toggle brew if either in manual mode or water in tank
    if (received_data.data.brew && ( (mode == 1) || water_sensor.getLevel() )) {
      brew_output.on();
      timerReset();
      timerStart();
      if (mode == MODE_PID) {
        // Change to manual mode to max power and no integral windup
        change_mode(MODE_MANUAL);
        pid.overrideOutput(100);
        pid_overridden_by_brew = true;
      }
    } else {
      brew_output.off();
      if (pid_overridden_by_brew) {
        change_mode(MODE_PID);
        pid_overridden_by_brew = false;
      }
    }
  }
}

void change_mode(unsigned char new_mode) {
    if (new_mode == MODE_OFF) {
        if (mode = MODE_PID)
            pid.off();
        if (mode = MODE_MANUAL)
            pid.overrideOutput(0);
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        mode = MODE_OFF;
    } else if (new_mode == MODE_PID) { // Change to PID or PID settings
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        bool reset_pid = false;
        if (mode != MODE_PID)
            reset_pid = true;  // Reset PID if previously in a different mode
        mode = MODE_PID;
        pid.on(reset_pid);
    } else if (new_mode == MODE_MANUAL && mode != MODE_MANUAL) { // Change to manual
        if (mode = MODE_AUTOTUNE)
            pid.cancelTuner();
        if (mode = MODE_PID)
            pid.off();
        mode = MODE_MANUAL;
        pid.overrideOutput(0);
    } else if (new_mode == MODE_AUTOTUNE && mode != MODE_AUTOTUNE) { // Change to auto tune
        mode = MODE_AUTOTUNE;
        pid.setupTuner();
    }
}

void heater_on_request(double duty) {
  if (mode != MODE_MANUAL) {
    change_mode(MODE_MANUAL);
  }
  pid.overrideOutput(duty);
}

void check_serial_calls() {
  if (Serial.available() > 0) {
    int first_byte = Serial.read();
    if (first_byte == 0) {
      Serial.flush();
      send_serial_response();
    } else if (first_byte == 1) {
      Serial.readBytes(received_data.buffer, sizeof_received_data);
      Serial.flush();
      response_actions();
      Serial.println("Update received");
    } else if (first_byte == 2) {
      Serial.readBytes(override_data.buffer, sizeof_override_data);
      Serial.flush();
      heater_on_request(override_data.data.duty);
      Serial.print(F("Override received, duty: ")); Serial.println(override_data.data.duty);
    }
  }
}

void send_serial_response() {
  if (DEBUG) {
    Serial.println(F("Received request for sensor readings"));
  }
  update_data_buffer();
  // Write bytes to i2c address
  Serial.write(response_data.buffer, sizeof_response_data);
}

void receiveEvent(int numBytes) {
  if (DEBUG) {
    Serial.print(F("Received "));Serial.print(numBytes);Serial.println(F(" bytes."));
  }
  // Check register
  if (Wire.available()) {
    // Get register (1st byte sent)
    int i2c_register = (byte)Wire.read();
    if (DEBUG) {
      Serial.print(F("    Register: ")); Serial.println(i2c_register);
    }
    // Register 1 to update
    if (i2c_register == 1) {
      int index = 0;
      while (Wire.available() && index < sizeof_received_data) {
        // loop through all but the last
        // Data here is written directly to memory location for use in PID
        received_data.buffer[index] = (byte)Wire.read();
        index++;
      }
      response_actions();
    } else if (i2c_register == 2) { // Override request
      int index = 0;
      while (Wire.available() && index < sizeof_override_data) {
        override_data.buffer[index] = (byte)Wire.read();
        index++;
      }
      heater_on_request(override_data.data.duty);
      Serial.print(F("Override received, duty: ")); Serial.println(override_data.data.duty);
    } 
  }  // if(Wire.available)
}

void requestEvent() {
  update_data_buffer();
  // Write bytes to i2c address
  Wire.write(response_data.buffer, sizeof_response_data);
}
