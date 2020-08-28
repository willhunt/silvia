#!/bin/sh

branch=${1:-master}

git fetch --all
git reset --hard origin/$branch
git checkout $branch
printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput --clear
printf "Restarting server...  "
sudo service apache2 restart
printf "Done  \n"