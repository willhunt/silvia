---
images_wiring: [
    {src: "wiring_temperaturecontrol_01.png", caption: "Fritzing wiring diagram for temperature control"},
]
---

# Temperature Control
The stock Rancillio Silvia uses a thermostat to control the boiler heating element meaning that the temperature fluctuates by several degrees in cycles. PID control can be used with a solid state relay (SSR) to control the heater with much faster on/off cycles. This is a common modification to the this machine with several guides available online or as commercial kits, usually using an off the shelf temperature controller or Arduino for the more interested hobbyist. An Arduino is used for real time PID temperature control.  Unlike the raspberry pi it will operate consistently without interruption as well as having an analog to digital converter (ADC) for the temperature sensor.

## Components
* Clion HHG1-1/032F-38 Solid State Relay (Generic Chinese)
    * Control voltage range 3-32 VDC
    * Output voltage range 24-440 VAC
    * Output maximum load 25 A (Plenty)

## Installation
In line with other Rancillio Silvia mods the heat relay was fastened behind the front cover panel above the drip tray using the existing fastener for the cable clamp (on other side). This is enough to hold it in place but a second hole was drilled above to fix the relay securely in place.

## Wiring
The Arduino controls the PID I/O independently of the raspberry pi although the pi, connected via i2C can turn the operation on and off as well as change the setpoint and gains. A 10k&#8486; pull-down resistor is used to ensure the relay input is at 0V when the output in not high.

<DocsImageLayout :images="$frontmatter.images_wiring" size="lg" srcBase="/silvia/assets/build/"></DocsImageLayout>

## Software
### Temperature sensing
To smooth the temperature readings a combination of averaging and a smoothing filter are used.

Temperature readings are summed up over a time period, counting the quantity:
```cpp
reading_sum += analogRead(sensor_pin) * sensor_coefficient;
reading_count += 1;
```

After a set time interval these are then averaged and smoothed with respect to the previous value. The smoothing filter value controls the magnitude of this effect:
```cpp
float average = reading_sum / reading_count;
// Apply smoothing
reading_new = average * smoothing_filter_val + reading_last * (1 - smoothing_filter_val);
```

### PID
For the PID control the Arduino PID library [[Github](https://github.com/br3ttb/Arduino-PID-Library/)] was used. To control the relay on/off output the technique was used as described in the [relay example](https://playground.arduino.cc/Code/PIDLibraryRelayOutputExample/). This was wrapped up into a new class by inheriting from the libraries PID class, extending with the rleay control function.