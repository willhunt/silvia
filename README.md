# Silvia Web App
!!! Work in progress !!!
Django and Polymer web server to control espresso machine. Raspberry Pi hosts web server inside appliance.

## How to install
### Install server side requirements
```bash
$ sudo apt-get install git python3-pip
$ mkdir silvia
$ cd silvia
$ git clone https://github.com/willhunt/silvia
$ cd ..

$ pip install virtualenvwrapper
$ mkdir virtualenvs
$ export WORKON_HOME=virtualenvs
```

Add this line to the end of ~/.bashrc so that the virtualenvwrapper commands are loaded.

. /usr/local/bin/virtualenvwrapper.sh

```bash
$ mkvirtualenv venv-silvia --python=/usr/bin/python3.5
$ cd silvia
$ pip install -r requirments.txt
```

### Install client side requirements
```bash
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo apt-get install -y build-essential
$ sudo npm install -g bower
$ sudo npm install -g polymer-cli --unsafe-perm

$ cd static
$ bower install
$ polymer build
```

### Install message broker
For Redis
```bash
$ apt-get install redis-server
```

### Test website locally
```bash
$ pytest
$ redis-cli flushall
$ celery -A celery_worker.celery worker --loglevel=info
$ celery -A celery_worker.celery beat -S redbeat.RedBeatScheduler
$ python manage.py runserver
```
Use this to check redis tasks
```bash
$ redis-cli -h localhost -p 6379 -n 1 keys \*
```

### Make changes to database
Migrte database after making any changes (just for reference)
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

### Work on project later (for reference)
Access virtual environment
```bash
workon venv-silvia
```
