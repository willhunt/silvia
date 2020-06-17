#include "silvia_i2c.h"


void receiveEvent(int numBytes) {
  //   Serial.println("Received message");
  int index = 0;

  while (Wire.available() && index < sizeof_received_data) {
    // loop through all but the last
    // Data here is written directly to memory location for use in PID
    received_data.buffer[index] += (char)Wire.read();
    index++;
  }
  // Check if power needs to be toggled
  if (received_data.data.power != *response_data.data.power) {
      // toggle power
      if (received_data.data.power)
        power_output_ref->on(*received_data.data.setpoint, *received_data.data.kp, *received_data.data.ki, *received_data.data.kd);
      else
        power_output_ref->off();
  }
  // Check if brew needs to be toggled
  if (received_data.data.brew != *response_data.data.brew) {
      // toggle brew
      if (received_data.data.brew)
        brew_output_ref->on();
      else
        brew_output_ref->off();
  }
}

void requestEvent() {
  Wire.write(response_data.buffer, sizeof(responseData));
}

PiCommunicator::PiCommunicator(
    int i2c_addr, 
    PowerOutput* power_output, RelayOutput* brew_output,
    // TemperatureController pid,
    double *T_boiler, double *m_coffee,
    double *kp, double *ki, double *kd
) {
  // Stored within object
  i2c_addr_ = i2c_addr;

  // Stored outside of object (better for interrupts as static variables and methods required)
  response_data.data.power = &power_output->status;
  response_data.data.brew = &brew_output->status;
  response_data.data.T_boiler = T_boiler;
  response_data.data.m_coffee = m_coffee;

  received_data.data.kp = kp;
  received_data.data.ki = ki;
  received_data.data.kd = kd;

  sizeof_received_data = sizeof(receivedFormat);

  power_output_ref = power_output;
  brew_output_ref = brew_output_ref;
};

void PiCommunicator::setup() {
  Wire.begin(I2C_ADDR);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
}

