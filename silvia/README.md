# Silvia Django Backend
Backend for silvia espressor machine control web server.
Notes mainly for my reference.

## How to install
### Install server side requirements
```bash
$ git clone https://github.com/willhunt/silvia
$ python3 venv venv-silvia .virtualenvs/venv-silvia
$ source virtualenvs/venv-silvia/bin/activate
$ cd silvia
$ pip install -r requirments.txt
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
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
$ python manage.py runserver
```
Use this to check redis tasks
```bash
$ redis-cli -h localhost -p 6379 -n 1 keys \*
```

### Make changes to database
Migrate database after making any changes (just for reference)
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

