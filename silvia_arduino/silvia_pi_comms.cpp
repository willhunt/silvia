#include "silvia_pi_comms.h"

responseData response_data;
receivedData received_data;
overrideData override_data;
int sizeof_received_data;
int sizeof_response_data;
int sizeof_override_data;

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
  // Reset PID?
  bool reset_pid = false;

  // Check if power needs to be toggled
  if (received_data.data.power != power_output.getStatus()) {
    // toggle power
    if (received_data.data.power) {
      if (DEBUG) {
        Serial.println("Turn on");
      }
      power_output.on();
      timerReset();
      reset_pid = true;  // reset pid if turning on.
    } else {
      if (DEBUG) {
        Serial.println("Turn off");
      }
      power_output.off();
      pid.off();
    }
  }

  // Mode change
  if (received_data.data.mode == 0) { // Change to PID or PID settings
    if (mode = 2)
      pid.cancelTuner();
    if (mode != 0)
      reset_pid = true;  // Reset PID if previously in a different mode
    mode = 0;
    pid.on(
      received_data.data.setpoint,
      received_data.data.kp,
      received_data.data.ki,
      received_data.data.kd,
      received_data.data.kp_mode,
      reset_pid
    );
  } else if (received_data.data.mode == 1 && mode !=1) { // Change to manual
    if (mode = 2)
      pid.cancelTuner();
    mode = 1;
    pid.off();
    pid.overrideOutput(false);
  } else if (received_data.data.mode == 2 && mode !=2) { // Change to auto tune
    mode = 2;
    pid.setupTuner();
  }
  
  // Check if brew needs to be toggled
  if (received_data.data.brew != brew_output.getStatus()) {
    // Toggle brew if either in manual mode or water in tank
    if (received_data.data.brew && ( (mode == 1) || water_sensor.getLevel() )) {
      brew_output.on();
      timerReset();
      timerStart();
    } else {
      brew_output.off();
    }
  }
}

void heater_on_request(double duty) {
  if (mode != 1) {  
    if (mode = 2)
      pid.cancelTuner();
    mode = 1;
    pid.off();
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
