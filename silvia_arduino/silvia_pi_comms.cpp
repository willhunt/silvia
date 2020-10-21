#include "silvia_pi_comms.h"
#include "silvia_function.h"

responseData response_data;
receivedData received_data;
overrideData override_data;
int sizeof_received_data;
int sizeof_response_data;
int sizeof_override_data;
int sizeof_feedback_data;

void pi_comms_setup() {
  sizeof_received_data = sizeof(receivedFormat);
  sizeof_response_data = sizeof(responseData);
  sizeof_override_data = sizeof(overrideData);
  sizeof_feedback_data = sizeof(feedbackData);
  // Serial
  Serial.begin(57600);
}

void update_data_buffer() {
  // Update values
  response_data.data.T_measured = temperature_sensor.getLatestTemperature();
  response_data.data.power = power_output.getStatus();
  response_data.data.brew = brew_output.getStatus();
  response_data.data.heater_duty = heater.getDuty();
  response_data.data.water_level = water_sensor.getLevel();
  response_data.data.mode = mode;
  response_data.data.heater_Kp = heater.GetKp();
  response_data.data.heater_Ki = heater.GetKi();
  response_data.data.heater_Kd = heater.GetKd();
}

void response_actions() {
  // Update PID settings
  heater.SetTunings(received_data.data.heater_Kp, received_data.data.heater_Ki, received_data.data.heater_Kd, received_data.data.heater_Kp_mode);
  heater.setSetpoint(received_data.data.setpoint);
  // Update cleaner settings
  cleaner.set_timings(received_data.data.n_clean_cycles, received_data.data.t_clean_on, received_data.data.t_clean_off);

  // Add mode 'MODE_OFF' which webserver doesn't record
  unsigned char new_mode = (received_data.data.power == false) ? MODE_OFF : received_data.data.mode;
  // Mode change
  change_mode(new_mode);
  // Check if power needs to be toggled
  if (received_data.data.power != power_output.getStatus()) {
    // toggle power
    if (received_data.data.power) {
      power_on();
    } else {
      power_off();
    }
  }
  // Check if brew needs to be toggled
  if (received_data.data.brew != brew_output.getStatus()) {
    if (received_data.data.brew) {
      brew_on();
    } else {
      brew_off();
    }
  }
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
      feedbackData feedback_data;
      feedback_data.data.ok = true;
      Serial.write(feedback_data.buffer, sizeof_feedback_data);
    } else if (first_byte == 2) {
      Serial.readBytes(override_data.buffer, sizeof_override_data);
      Serial.flush();
      heater_on_request(override_data.data.heater_duty);
      feedbackData feedback_data;
      feedback_data.data.ok = true;
      Serial.write(feedback_data.buffer, sizeof_feedback_data);
    }
  }
}

void send_serial_response() {
  update_data_buffer();
  // Write bytes to i2c address
  Serial.write(response_data.buffer, sizeof_response_data);
}
