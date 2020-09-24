---
images_cad: [
    {src: "build_scale_01.png", caption: "OnShape Model"},
    {src: "build_scale_02.png", caption: "Section view"},
]
images_parts: [
    {src: "build_scale_03.png", caption: "ESP8266 with OLED and battery"},
    {src: "build_scale_04.jpg", caption: "HX711 amplifier"},
    {src: "build_scale_05.jpg", caption: "Sparkfun load cell"},
]
images_wiring: [
    {src: "wiring_scale_01.png", caption: "Fritzing wiring diagram for scale"},
]
---

# Wireless Scale

## Design
The scale was modelled using onshape to house the loadcell and microcontroller [[OnShape CAD model](https://cad.onshape.com/documents/2a3b68ac9099f8a1aaf5fcd3/w/46f7f0d65b6fa4d15a000c7e/e/e381db44c28ba80dee051377)].

<DocsImageLayout :images="$frontmatter.images_cad" srcBase="/silvia/assets/build/"></DocsImageLayout>

## Parts
The main non-printed parts used are:
* ESP8266 board with integrated OLED, battery & buttons
* HX711 load cell amplifier
* Sparkfun 500g mini load cell [[Product page](https://www.sparkfun.com/products/14728)][[Datasheet](https://cdn.sparkfun.com/assets/9/9/a/f/3/TAL221.pdf)]

The Arduino compatible ESP8266 board used included an onboard battery holder, charger, OLED screen and 5-way button. See notes in the Setup section about pins and programming.
<DocsImageLayout :images="$frontmatter.images_parts" srcBase="/silvia/assets/build/"></DocsImageLayout>

## Wiring
The approximate wiring is shown here although the board used had an integrated OLED screen and 5-way button. The wiring was shown with separate parts for clarity on pin usage.
<DocsImageLayout :images="$frontmatter.images_wiring" size="lg" srcBase="/silvia/assets/build/"></DocsImageLayout>
