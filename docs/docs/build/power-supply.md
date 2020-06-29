---
images_installation: [
    {src: "/assets/build/build_power_01.jpg", caption: "Power input cable to DC supply attached with spade connectors"},
]
images_wiring: [
    {src: "/assets/build/wiring_powersupply_01.png", caption: "Fritzing wiring diagram for electronics power supply"},
]
---

# Power supply
A 12V DC power supply was used for powering the embedded systems because 12V is required to switch the mechanical on/off relay. The Arduino takes 12V as input but needs to be stepped down to 5V for the raspberry pi.

## Components
* 12 VDC power supply


## Installation
The power supply was fixed at the back next to the water pump using double sided adhesive foam. The AC input cable was connected using spade connectors where the mains cable connects to the on/off relay.

<DocsImageLayout :images="$frontmatter.images_installation"></DocsImageLayout>

## Wiring


<DocsImageLayout :images="$frontmatter.images_wiring" size="lg"></DocsImageLayout>