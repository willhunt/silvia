#include "silvia_i2c.h"

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
        Serial.print(received_data.buffer[index]);
        index++;
      }
      Serial.println("--end");

      if (DEBUG) {
        Serial.print("    Brew: "); Serial.println(received_data.data.brew);
        Serial.print("    kp: "); Serial.println(received_data.data.kp);
      }
      // Check if power needs to be toggled
      if (received_data.data.power != power_output_ref->getStatus()) {
        // toggle power
        if (received_data.data.power) {
          if (DEBUG) {
            Serial.print("Turn on");
          }
          power_output_ref->on(received_data.data.setpoint, received_data.data.kp, received_data.data.ki, received_data.data.kd);
        } else {
          if (DEBUG) {
            Serial.print("Turn off");
          }
          power_output_ref->off();
        }
      }
      // Check if brew needs to be toggled
      if (received_data.data.brew != brew_output_ref->getStatus()) {
        // toggle brew
        if (received_data.data.brew)
          brew_output_ref->on();
        else
          brew_output_ref->off();
      }
    }
  }  // if(Wire.available)
}

void requestEvent() {
  // Update values
  response_data.data.T_boiler = temp_sensor_ref->getLatestTemperature();
  response_data.data.power = power_output_ref->getStatus();
  response_data.data.brew = brew_output_ref->getStatus();
  response_data.data.duty = 
  // Write bytes to i2c address
  Wire.write(response_data.buffer, sizeof(responseData));
}

void i2cSetup(
  int i2c_addr, PowerOutput* power_output, RelayOutput* brew_output,
  TemperatureSensor* temperature_sensor, TemperatureController* temperature_controller
)
{
  // Stored outside of object (better for interrupts as static variables and methods required)
  temp_sensor_ref = temperature_sensor;
  power_output_ref = power_output;
  brew_output_ref = brew_output;
  temperature_controller_ref = temperature_controller;
  sizeof_received_data = sizeof(receivedFormat);

  Wire.begin(i2c_addr);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
}
