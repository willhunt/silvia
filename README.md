# Silvia Web App
!!! Work in progress !!!  
Django and Vue.js web server to control espresso machine. Raspberry Pi hosts web server inside appliance.

## Overview

### Front End
Front end progressive web-app using Vue.js.

* Vue Js - Front end framework
* Axios - HTTP CLient

### Back End
Back end using Django.

* Django - Web framework
* Django Rest Framework - Restful API

### Hardware
Raspberry pi for web app serving and possibly arduino to run PID temperature controller for espresso machine.

## Setup
### SSH into raspberry pi
```bash
$ ssh pi@<IP>
```
The IP adress can be found on the pi using
```bash
$ hostname -I
```
In my case:
```bash
$ ssh pi@192.168.0.14
```

### Update pi
```bash
$ sudo apt-get update -y
$ sudo apt-get upgrade -y
$ sudo apt-get autoremove
```

## Allow remote access to files
Mount file system on local machine
```bash
$ sudo apt-get install sshfs
$ mkdir ~/remote_code
$ sshfs pi@192.168.0.14:/home ~/remote_code #-o debug
```

### Download files
```bash
$ git clone https://github.com/willhunt/silvia.git
```

### Install server side requirements
```bash
$ sudo apt-get install python3-venv
$ python3 -m venv .virtualenvs/venv-silvia
$ source .virtualenvs/venv-silvia/bin/activate
$ cd silvia/silvia
$ pip install -r requirements.txt
```

### Install Apache
```bash
$ sudo apt install apache2 -y
$ sudo apt install apache2-dev -y
$ sudo apt install apache2-mpm-worker -y
$ sudo apt install libapache2-mod-wsgi-py3 
```

