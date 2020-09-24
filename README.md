<p align="center"><image src="docs/docs/.vuepress/public/assets/will_silvia_icon.png" height="75"></p>

# Silviabot Espresso Machine
Silviabot is a modified Rancilio Silvia espresso machine with remote app operation, PID temperature control, display, connected wireless scale for gravimetric brewing and more.

Full documentation on setup, hardware build and a demo can be found on the [github pages site](https://willhunt.github.io/silvia/).

<p align="center">
    <image src="docs/docs/.vuepress/public/assets/demo/demo_machine_05.jpg" height="300">
    <image src="docs/docs/.vuepress/public/assets/demo/demo_screenshot_1.jpg" height="300">
</p>

## Overview
### Front End
Front end web-app using Vue.js.
* Vue.js - Front end framework
* Axios - HTTP Client

### Back End
Back end using Django, hosted with Apache.
* Django - Web framework
* Django Rest Framework - Restful API

### Hardware
Raspberry pi for serving the web app and user interaction, Arduino to run PID temperature controller and sensing.
