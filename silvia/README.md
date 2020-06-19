# Silvia Django Backend
Backend for silvia espressor machine control web server.
Notes mainly for my reference.


### Run Message Broker
```bash
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```
Use this to check redis tasks
```bash
$ redis-cli -h localhost -p 6379 -n 1 keys \*
```

### Run django in development
```bash
$ python manage.py runserver
```

### Make changes to database
Migrate database after making any changes (just for reference)
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

### Collect static files for production
```bash
$ python manage.py collectstatic
```
