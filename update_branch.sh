#!/bin/sh

git fetch --all
git reset --hard origin/pid
git checkout pid
chmod g+w silvia/db.sqlite3 silvia/celery.sqlite
chgrp server_group silvia/db.sqlite3 silvia/celery.sqlite
chmod +x update_branch.sh
printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput --clear
printf "Restarting server...  "
sudo service apache2 restart
printf "Done  \n"