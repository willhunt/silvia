# Notes
Notes on development and debugging commands

## Update files
Scripts are used to fetch latest updates
```bash
$ cd silvia
$ git fetch --all
$ sudo git reset --hard origin/master
$ sudo service apache2 restart
```

## Django
Run django dev server on pi
```bash
$ python manage.py runserver 192.168.0.9:8000 
```

## Message broker
### Useful Redis commands
Start Redis server
```bash
$ sudo redis-server # Start!
```
Clear queues
```bash
$ redis-cli flushall
```

### Celery
Start celery and celery-beat
```bash
$ cd silvia
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

## Apache
Apache can be restarted using:
```bash
$ sudo service apache2 restart
```
Or stopped:
```ash
$ sudo service apache2 stop
```
Check log errors usuing:
```bash
$ nano /var/log/apache2/error.log
```


