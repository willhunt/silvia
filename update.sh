#!/bin/sh

git fetch --all
git reset --hard origin/master
git checkout master
chmod g+w silvia/db.sqlite3 silvia/celery.sqlite
chgrp server_group silvia/db.sqlite3 silvia/celery.sqlite
chmod +x update.sh
printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput
printf "Restarting server...  "
sudo service apache2 restart
printf "Done  \n"