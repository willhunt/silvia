---
images_installation: [
    {src: "build_power_01.jpg", caption: "Power input cable to DC supply attached with spade connectors"},
]
---

# Power Control
Digital power control was implemented by rewiring the power switch connections to a relay. The switch can be used indirectly to power the machine by wiring to a digital microcontroller pin. The main power switch is a double pole, single throw (DPST) switch, connecting both the live and neutral circuits. To replace this a dual relay was used. The relay used requires 12V to switch so a mosfet is needed to switch from the microcontroller output (5V with Arduino) to a higher 12V circuit.


## Components
* X Relay
* [12VDC power supply](./power-supply.md)
* IRF520 Mosfet [datasheet](https://www.vishay.com/docs/91017/91017.pdf)
    * Gate threshold voltage 4V
    * Drain-source voltage 100V

## Installation

## Wiring

<DocsImageLayout :images="$frontmatter.images_installation" srcBase="/silvia/assets/build/"></DocsImageLayout>