#!/bin/sh

git fetch --all
git reset --hard origin/pid
git checkout pid
printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput --clear
printf "Restarting server...  "
sudo service apache2 restart
printf "Done  \n"