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
Useful links:
* [raspberry-pi-network-server-guide-with-django-ssh](https://www.codingforentrepreneurs.com/blog/raspberry-pi-network-server-guide-with-django-ssh/)
* [configuring-django-with-apache-on-a-raspberry-pi](https://mikesmithers.wordpress.com/2017/02/21/configuring-django-with-apache-on-a-raspberry-pi/)

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

### Edit server configuration
Replace contents of `/etc/apache2/sites-available/000-default.conf` with:

```

```

### Change file permissions for Apache
```bash
$ chmod g+w ~/silvia/silvia/db.sqlite3 
$ chmod g+w ~/silvia/silvia
$ sudo chown :www-data ~/silvia/silvia/db.sqlite3
$ sudo chown :www-data ~/silvia/silvia
$ sudo chown :www-data ~/.virtualenvs/venv-silvia
```

*Maybe try adding "-r" argument (recursive) for chown if having problems"

### Check log errors
```bash
$ nano /var/log/apache2/error.log
```

Apache can be restarted using:
```bash
$ sudo service apache2 restart
```

### Install message broker
For RabbitMQ
```bash
$ sudo apt install rabbitmq-server
```

### Run Message Broker
```bash
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```