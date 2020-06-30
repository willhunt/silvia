---
images_component: [
    {src: "component_oled_01.jpg", caption: "OLED component"},
]
images_installation: [
    {src: "build_oled_01.jpg", caption: "X"},
]
images_wiring: [
    {src: "wiring_oleddisplay_01.png", caption: "Fritzing wiring diagram for OLED screen"},
]
---

# Display


## Components
* 128 x 64 OLED
    * Colour white
    * I2C interface
    * Working voltage 3-5V
* 3D printed panel mount fascia
    * [Onshape model](https://cad.onshape.com/documents/74cfbda0a8ffd6aca69f2a44/w/b147cd8222d0fff6b9d2a3b7/e/44c8a1f85f3d1b70e01c56da)

The CAD file for the OLED fasia can be found on [onshape](https://cad.onshape.com/documents/74cfbda0a8ffd6aca69f2a44/w/b147cd8222d0fff6b9d2a3b7/e/44c8a1f85f3d1b70e01c56da)

<DocsImageLayout :images="$frontmatter.images_component" srcBase="/silvia/assets/build/"></DocsImageLayout>


## Installation


<DocsImageLayout :images="$frontmatter.images_installation"></DocsImageLayout>

## Wiring
The OLED display is wired to the I2C pins of the raspberry pi in parallel with the Arduino. Keeping the pi as master keeps the lines at 3.3V.

<DocsImageLayout :images="$frontmatter.images_wiring" size="lg" srcBase="/silvia/assets/build/"></DocsImageLayout>