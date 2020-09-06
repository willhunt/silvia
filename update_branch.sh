#!/bin/sh

branch=$1
arduino=${2:-0}

git fetch --all
git reset --hard origin/$branch
git checkout $branch

if [ $arduino -eq 1 ]
then
    printf "Compile Arduino code..."
    arduino-cli compile --fqbn arduino:avr:uno silvia_arduino
fi

printf "Collecting Django static files..."
python silvia/manage.py collectstatic --noinput --clear

printf "Restarting server...  "
sudo service apache2 restart

if [ $arduino -eq 1 ]
then
    printf "Upload to Arduino..."
    arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno silvia_arduino --verbose
fi

printf "Done  \n"