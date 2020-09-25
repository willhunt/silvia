# Introduction
This section describes the software setup for the project. Where possible bash scripts have been used to automate setup.

## Implementation
The project uses various frameworks and libraries briefly detailed below.

### Web-app Front End
A front end web-app using for remote operation and tuning of the machine was created using vue.js. The webapp is a standalone static site the communicates with the backend using a restful API through Axios.
* Vue.js - Javascript web framework
* Vuetify - Material design component framework
* Axios - HTTP client

### Web-app Back End
The server side part of the webapp was programmed using the Django web framework and Django Rest Framework to deal with restful API requests from the frontend or other hardware (scale). Using  the Whitenoise python package, Django is also used to serve the static front end site. A message queue is used to run asynchronous tasks to communicate with the Arduino and connected scale as well as scheduling. All this is running on a Raspberry Pi 3B+ which also uses a Django management script to read user input through button presses on the machine.
* Django - Web framework
* Django Rest Framework - Restful API
* Redis - Message queue
* Celery - Task queue
* Apache - Http server
* Raspberry Pi - computer

### Microcontroller
An Arduino is used for real-time essential PID control as well as for reading sensors and the machines display. The Arduino communicates with the Raspberry Pi using Serial although I2C is also programmed in as an option. Using serial also allows the Raspberry Pi to flash the Arduino meaning easier remote updates. Libraries are used for the PID and OLED function and the code is written in C++.
* Arduino Uno - microcontroller
* Adafruit SSD1306 - OLED library
* PID - control library