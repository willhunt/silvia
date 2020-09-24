---
images_kp: [
    {src: "setup_tuning_proportional.png", caption: "Effect of proportional gain"},
]
images_ki: [
    {src: "setup_tuning_integral.png", caption: "Effect of integral gain"},
]
images_kd: [
    {src: "setup_tuning_proportional.png", caption: "Effect of derivative gain"},
]
images_fine: [
    {src: "setup_tuning_proportional.png", caption: "Final fine tuning examples"},
]
images_final: [
    {src: "setup_tuning_final.png", caption: "Final tuning response"},
]
---
# Temperature Control
The temperature controller is tuned by adjusting the PID gains. This proved challenging for a number of reasons but a large factor is the time it takes to measure a response to see if long term oscillation is occurring and then to cool the boiler back down again. Some other issues encountered are listed with their resolution:

* Erratic controller output with high derivative gain
    * Smoothing temperature measurements using moving average filter
    * Reduce derivative gain and therefore proportional gain (less damping)
* Massive overshoot following brewing
    * Massive overshoots would occur after a brew cycle, assumed cause being integral windup
    * Brew changed to override PID with maximum output during followed by a controller reset
* Inconsistent and unrepeatable results
    * Linked to erratic behavior with high derivative gain
    * Also reduced PID update frequency to be slower than temperature update frequency

## Proportional gain
Some measurements are shown with varying proportional gain.
<DocsImageLayout :images="$frontmatter.images_kp" size="lg" srcBase="/silvia/assets/setup/"></DocsImageLayout>

## Derivative gain
Some measurements are shown with varying derivative gain.
<DocsImageLayout :images="$frontmatter.images_kd" size="lg" srcBase="/silvia/assets/setup/"></DocsImageLayout>

## Integral gain
Some measurements are shown with varying integral gain.
<DocsImageLayout :images="$frontmatter.images_ki" size="lg" srcBase="/silvia/assets/setup/"></DocsImageLayout>

## Fine tuning
Using some tuning guidelines a decent response was gained but further tuning was used to account for different setpoints and to improve response to a brew cycle which could overshoot significantly in comparison to the initial warm up.
<DocsImageLayout :images="$frontmatter.images_fine" size="lg" srcBase="/silvia/assets/setup/"></DocsImageLayout>

## Chosen settings
The final settings were chosen to allow a small amount of oscillation in order to improve settling time. Using lower gains resulted in unacceptable time to steady state and, as noted, pushing the damping higher (kd) made the controller output very noisy and erratic giving inconsistent results.
<DocsImageLayout :images="$frontmatter.images_final" size="lg" srcBase="/silvia/assets/setup/"></DocsImageLayout>