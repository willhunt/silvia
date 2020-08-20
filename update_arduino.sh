#!/bin/sh

# Compile
arduino-cli compile --fqbn arduino:avr:uno silvia_arduino

# Upload
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno silvia_arduino

printf "Done  \n"