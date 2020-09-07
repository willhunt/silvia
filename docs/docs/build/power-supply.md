---
images_build: [
    {src: "build_power_02.jpg", caption: "Donor 12V power supply"},
    {src: "build_power_03.jpg", caption: "Donor 5V power supply"},
    {src: "build_power_04.jpg", caption: "Common supply input wiring"},
    {src: "build_power_05.jpg", caption: "Mounted in printed case"},
    {src: "build_power_06.jpg", caption: "Finished power supply"},
]
images_installation: [
    {src: "build_power_01.jpg", caption: "Power input cable to DC supply attached with spade connectors"},
    {src: "build_power_07.jpg", caption: "Power input cable to DC supply attached with spade connectors"},
]
---

# Power supply
A 12V DC power supply was used for powering the Arduino because 12V is required to switch the mechanical on/off relay. The Arduino takes 12V as input but the raspberry pi requires 5V so a seperate supply was used. Old charger electronics were stripped from their housings and repackaged in a 3D printed case which was then mounted under the machine.

## Components
* 12 VDC power supply
    * 1 A
* 5 VDC power supply
    * 2.1 A
* 3D printed case
    * [Onshape model](https://cad.onshape.com/documents/af84bf65da6798770bf42491/w/2428a5c22df88a4f017770aa/e/4bad3c4f98bbf69f2164300a)

## Build
The power supplies were carefully removed from there cases and measured. A new case was then designed and printed to house them under the machine. The input wires are soldered in parallel to reduce connectors.

<DocsImageLayout :images="$frontmatter.images_build" srcBase="/silvia/assets/build/"></DocsImageLayout>

## Installation
The power supply was fixed under the machine using double sided adhesive foam. The AC input cable was connected using spade connectors where the mains cable connects to the on/off relay.

<DocsImageLayout :images="$frontmatter.images_installation" srcBase="/silvia/assets/build/"></DocsImageLayout>
