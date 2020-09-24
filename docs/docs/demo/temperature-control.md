---
images_response: [
    {src: "demo_temperaturecontrol_01.png", caption: "Two measured responses with 20s brew after pre-heat."},
]
---

# Temperature Control
Temperature control of the machine was achieved using a PID controller. Some oscillation was accepted for a good settling time wich proved challenging at lower proportional gains.

<DocsImageLayout :images="$frontmatter.images_response" size="lg" srcBase="/silvia/assets/demo/"></DocsImageLayout>