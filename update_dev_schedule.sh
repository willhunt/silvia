#!/bin/sh

git fetch --all
sleep 2
git reset --hard origin/dev-schedule
sleep 1
git checkout dev-schedule
sleep 1
chmod g+w silvia/db.sqlite3 silvia/celery.sqlite
sleep 1
chgrp server_group silvia/db.sqlite3 silvia/celery.sqlite
sleep 1
chmod +x update.sh
sleep 1
printf "Restarting server...  "
sudo service apache2 restart
printf "Done  \n"