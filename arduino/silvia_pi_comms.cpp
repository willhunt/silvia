#include "silvia_pi_comms.h"

responseData response_data;
receivedData received_data;
int sizeof_received_data;
int sizeof_response_data;

void pi_comms_setup(int i2c_addr) {
  sizeof_received_data = sizeof(receivedFormat);
  sizeof_response_data = sizeof(responseData);

  // Serial
  Serial.begin(9600);
  // I2C
  Wire.begin(i2c_addr);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
}

void update_data_buffer() {
  // Update values
  response_data.data.T_boiler = temperature_sensor.getLatestTemperature();
  response_data.data.power = power_output.getStatus();
  response_data.data.brew = brew_output.getStatus();
  response_data.data.duty = pid.getDuty();
  response_data.data.water_level = water_sensor.getLevel();
}

void check_serial_calls() {
  if (Serial.available() > 0) {
    char first_byte = Serial.read();

    if (first_byte == 'R') {
      Serial.flush();
      send_serial_response();
    }
    else if (first_byte == 'X') {
      int index = 0;
      String temp_data = "";
      while (Serial.available() > 0 && index < sizeof_received_data) {
        // loop through all but the last
        // Data here is written directly to memory location for use in PID
        received_data.buffer[index] = (byte)Serial.read();
        temp_data += received_data.buffer[index];
        // temp_data += ".";
        index++;
      }

      Serial.flush();

      // Check if power needs to be toggled
      if (received_data.data.power != power_output.getStatus()) {
        // toggle power
        if (received_data.data.power) {
          power_output.on(received_data.data.setpoint, received_data.data.kp, received_data.data.ki, received_data.data.kd);
        } else {
          // power_output_ref->off();
          power_output.off();
        }
      }
      // Check if brew needs to be toggled
      if (received_data.data.brew != brew_output.getStatus()) {
        // toggle brew
        if (received_data.data.brew);
          brew_output.on();
        else
          brew_output.off();
      }
      // Send response to pi
      Serial.print("Data received: ");
      Serial.println(temp_data);
    }
  }
}

void send_serial_response() {
  if (DEBUG) {
    Serial.println("Received request for sensor readings");
  }
  update_data_buffer();
  // Write bytes to i2c address
  Serial.write(response_data.buffer, sizeof_response_data);
}

void receiveEvent(int numBytes) {
  if (DEBUG) {
    Serial.print("Received ");Serial.print(numBytes);Serial.println(" bytes.");
  }

  // Check register
  if (Wire.available()) {
    // Get register (1st byte sent)
    int i2c_register = (byte)Wire.read();
    // Register 1 to update
    if (i2c_register == 1) {
      int index = 0;
      while (Wire.available() && index < sizeof_received_data) {
        // loop through all but the last
        // Data here is written directly to memory location for use in PID
        received_data.buffer[index] = (byte)Wire.read();
        // Serial.print(received_data.buffer[index]);
        index++;
      }
      // Serial.println("--end");

      if (DEBUG) {
        Serial.print("    Brew: "); Serial.println(received_data.data.brew);
        Serial.print("    kp: "); Serial.println(received_data.data.kp);
      }
      // Check if power needs to be toggled
      if (received_data.data.power != power_output.getStatus()) {
        // toggle power
        if (received_data.data.power) {
          if (DEBUG) {
            Serial.println("Turn on");
          }
          power_output.on(received_data.data.setpoint, received_data.data.kp, received_data.data.ki, received_data.data.kd);
        } else {
          if (DEBUG) {
            Serial.println("Turn off");
          }
          // power_output_ref->off();
          power_output.off();
        }
      }
      // Check if brew needs to be toggled
      if (received_data.data.brew != brew_output.getStatus()) {
        // toggle brew
        if (received_data.data.brew)
          brew_output.on();
        else
          brew_output.off();
      }
    } else if (i2c_register == 2) {
      bool heaterOn = (byte)Wire.read();
      bool brewOn = (byte)Wire.read();
    }
  }  // if(Wire.available)
}

void requestEvent() {
  update_data_buffer();
  // Write bytes to i2c address
  Wire.write(response_data.buffer, sizeof_response_data);
}
