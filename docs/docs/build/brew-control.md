---
images_installation: [
    {src: "$withBase('/assets/build/build_brewrelay_03.jpg')", caption: "Relay modified with JST female connector"},
    {src: "$withBase('/assets/build/build_brewrelay_01.jpg')", caption: "Marking out for drilling"},
    {src: "$withBase('/assets/build/build_brewrelay_02.jpg')", caption: "Drilled holes"},
]
images_wiring: [
    {src: "$withBase('/assets/build/wiring_brewcontrol_01.png')", caption: "Fritzing wiring diagram for brew control"},
]
---

# Brew Control
To actuate the brew control relays are required for both the pump and the solenoid valve. This could be done with either 2 relays or a dual relay and could be either mechanical or solid state (SSR). To save space a Crydom dual SSR was used, found on eBay for £23 delivered (although if buying new at £70+ it would be quite expensive).

## Components
* Crydom D2425D Dual Solid State Relay [[datasheet](http://www.crydom.com/en/products/catalog/dual-series-ac-panel-mount.pdf)]
    * Control voltage range 4-15 VDC (better to use Arduino than Raspberry Pi)
    * Output voltage range 24-280 VAC
    * Output maximum load 25 A (Plenty)

## Installation
The relay is installed adjacent to the manual brew control to avoid any additional wiring changes. It is fixed by M3 machine screws to the body, requiring 2 3.5mm holes to be drilled.

<DocsImageLayout :images="$frontmatter.images_installation"></DocsImageLayout>

## Wiring
The Arduino controls the relay which requires >4V input (raspberry pi is 3.3V). A 10k&#8486; pull-down resistor is used to ensure the relay input is at 0V when the output in not high. The raspberry pi detects the switch operation via a GPIO pin. This does not require a pull up/down resistor as they are built in.

<DocsImageLayout :images="$frontmatter.images_wiring" size="lg"></DocsImageLayout>

## Software

### Raspberry pi interrupt
The raspberry pi gpiozero [Button class](https://gpiozero.readthedocs.io/en/stable/api_input.html#gpiozero.Button) is used to detect switch operation which then communicates to the Arduino over I2C via [Celery](https://github.com/celery/celery) asyncrhonus tasks.

```python
from gpiozero import Button

button_brew = Button(27)
button_brew.when_pressed = trigger_celery_brew_start
button_brew.when_released = trigger_celery_brew_stop
```

The python interrupt file is registered as a django management command:
```bash
$ python manage.py raspi_interrupt
```

### Arduino relay control
A generic relay control class was used to operate the relays through the standard Arduino interface with the relevant `on()` method being:
```cpp
void RelayOutput::on() {
  status_ = true;
  digitalWrite(pin_, HIGH);
};

```