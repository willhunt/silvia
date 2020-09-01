# Notes
Notes on development and debugging commands

## Update files
Scripts are used to fetch latest updates and collect static files. If <branch name> is empty, defaults to "master".
```bash
$ cd silvia
$ ./update_branch <branch name>
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
$ cd ~/silvia/silvia
$ celery -A silvia worker -l info
$ celery -A silvia beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

Inspect celery using flower
```bash
$ cd ~/silvia/silvia
$ flower -A silvia
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

## Arduino from Pi
See serial output. If not installed, install screen:
```bash
$ sudo apt install screen
```
Then view serial output:
```bash
$ screen /dev/ttyACM0 9600
```
To stop:
'CTRL+a' and then 'k' then 'y'

## Pi Errors
I/O error fix (read only file system):
```bash
$ sudo touch /boot/forcefsck
$ sudo shutdown -r now
```

## Scale

### Display Images
XBM images can be converted at: [www.online-utility.org](https://www.online-utility.org/image/convert/to/XBM)

## Changing Database to PostgreSQL
```bash
$ sudo apt-get install postgresql libpq-dev postgresql-client postgresql-client-common python-dev -y
$ pip install psycopg2
$ cd ~/silvia/silvia
$ python manage.py dumpdata --exclude=contenttypes --exclude=auth.Permission > datadump.json
```
Test connection:
```bash
$ sudo su - postgres
$ psql
$ CREATE DATABASE silviadatabase;
$ CREATE USER databaseadmin WITH PASSWORD 'databasepwd';
$ ALTER ROLE databaseadmin SET client_encoding TO 'utf8';
$ ALTER ROLE databaseadmin SET default_transaction_isolation TO 'read committed';
$ ALTER ROLE databaseadmin SET timezone TO 'GB';
$ GRANT ALL PRIVILEGES ON DATABASE silviadatabase TO databaseadmin;
$ \q
$ exit
```
Change database settings in `settings.py`:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'silviadatabase',
        'USER': 'databaseadmin',
        'PASSWORD': 'databasepwd',
        'HOST': '127.0.0.1',
        'PORT': '',  # Default
    }
}
```
Migrate and recreate superuser
```bash
$ python manage.py migrate
$ python manage.py createsuperuser
```

## Remove files from git based upon .gitignore changes
```bash
$ git rm -r --cached .
$ git add .
$ git commit -m "update files based upon .gitignore changes"
```