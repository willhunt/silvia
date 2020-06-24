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
$ ssh pi@192.168.0.9
```

### Setup static IP address
Reference: [Raspberry Pi Static IP Address](https://pimylifeup.com/raspberry-pi-static-ip-address/).

Edit file:
```bash
$ sudo nano /etc/dhcpcd.conf
```

And add:
```
interface wlan0
static ip_address=192.168.0.9/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1
```

Replacing with relevant IP addresses. Use this to find router/name server:
```bash
$ ip r | grep default
```

Reboot
```bash
$ sudo reboot
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
$ sshfs pi@192.168.0.9:/home ~/remote_code #-o debug
```

### Download files
```bash
$ sudo apt install git
$ git clone https://github.com/willhunt/silvia.git
```

### Install server side requirements
```bash
$ sudo apt install python3-venv python3-pil # python3-smbus
$ python3 -m venv .virtualenvs/venv-silvia
$ source .virtualenvs/venv-silvia/bin/activate
$ cd silvia/silvia
$ pip install -r requirements.txt
```

Source virtual env by default by adding line to .bashrc
```bash
$ sudo nano .bashrc
```
Add at end:
```
source .virtualenvs/venv-silvia/bin/activate
```

### Install Apache
```bash
$ sudo apt install apache2 apache2-dev libapache2-mod-wsgi-py3 -y
```

### Edit server configuration
Replace contents of `/etc/apache2/sites-available/000-default.conf` with:

```
<VirtualHost *:80>
    # The ServerName directive sets the request scheme, hostname and port that
    # the server uses to identify itself. This is used when creating
    # redirection URLs. In the context of virtual hosts, the ServerName
    # specifies what hostname must appear in the request's Host: header to
    # match this virtual host. For the default virtual host (this file) this
    # value is not decisive as it is used as a last resort host regardless.
    # However, you must set it for any further virtual host explicitly.
    #ServerName www.example.com

    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html

    # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
    # error, crit, alert, emerg.
    # It is also possible to configure the loglevel for particular
    # modules, e.g.
    #LogLevel info ssl:warn

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # For most configuration files from conf-available/, which are
    # enabled or disabled at a global level, it is possible to
    # include a line for only one particular virtual host. For example the
    # following line enables the CGI configuration for this host only
    # after it has been globally disabled with "a2disconf".
    #Include conf-available/serve-cgi-bin.conf

    Alias /static /home/pi/silvia/silvia/staticfiles
        <Directory /home/pi/silvia/silvia/staticfiles>
            Require all granted
        </Directory>

    WSGIDaemonProcess silvia python-path=/home/pi/silvia/silvia python-home=/home/pi/.virtualenvs/venv-silvia
    WSGIProcessGroup silvia
    WSGIScriptAlias / /home/pi/silvia/silvia/silvia/wsgi.py

    <Directory /home/pi/silvia/silvia>
        <Files wsgi.py>
                Require all granted
        </Files>
    </Directory>
</VirtualHost>
```

### Change file permissions for Apache
```bash
# Change permissions
$ sudo chmod g+w ~/silvia/silvia/db.sqlite3 
$ sudo chmod g+w ~/silvia/silvia
# Change owner
$ sudo chown www-data:www-data ~/silvia/silvia/db.sqlite3
$ sudo chown www-data:www-data ~/silvia/silvia
$ sudo chown www-data:www-data ~/.virtualenvs/venv-silvia
# Change group
$ sudo groupadd server_group
$ sudo adduser pi server_group
$ sudo adduser www-data server_group
$ sudo chgrp server_group ~/silvia/silvia/db.sqlite3
$ sudo chgrp server_group ~/silvia/silvia/
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
Or stopped:
```ash
$ sudo service apache2 stop
```

### Install message broker
For RabbitMQ
```bash
$ sudo apt install rabbitmq-server
$ sudo adduser rabbitmq server_group
```

For Redis
```bash
$ sudo apt install redis-server
$ sudo redis-server # Start!
```

### Run Message Broker
```bash
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

### Purge messages
```bash
$ rabbitmqadmin purge queue name=celery
```
or
```bash
$ sudo rabbitmqctl purge_queue celery
```

### Setup I2c
Edit this file for I2C permissions:

```bash
$ sudo nano /etc/udev/rules.d/99-com.rules
```
Change this line
```
SUBSYSTEM=="ic2-dev", GROUP="i2c", MODE="0660"
```
to this:
SUBSYSTEM=="ic2-dev", GROUP="i2c", MODE="0666"
```

Then add users to i2c group
```bash
$ sudo adduser pi i2c
$ sudo adduser www-data i2c
```

## Update
```bash
$ cd silvia
$ git fetch --all
$ sudo git reset --hard origin/master
$ sudo service apache2 restart
```

### Run django dev server on pi
```bash
$ python manage.py runserver 192.168.0.9:8000 
```