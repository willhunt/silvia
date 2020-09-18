#!/bin/sh

branch=$1
arduino=${2:-0}

printf "Stopping background processes...  "
sudo supervisorctl stop all

git fetch --all
git reset --hard origin/$branch
git checkout $branch

printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput --clear

if [ $arduino -eq 1 ]
then
    printf "Compile Arduino code..."
    arduino-cli compile --fqbn arduino:avr:uno silvia_arduino
    printf "Upload to Arduino..."
    arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno silvia_arduino --verbose
fi

printf "Restarting background processes...  "
sudo supervisorctl start all

printf "Restarting server...  "
sudo service apache2 restart

printf "Done  \n"