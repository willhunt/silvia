#!/bin/sh

# Update
printf "Updating linux...  "
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get autoremove

# Hostname (used to detect simulation mode in Django)
sudo hostnamectl set-hostname silvia
sudo hostname silvia

# Add permissions
printf "Add permissions for bash scripts...  "
chmod +x ~/silvia/update.sh
chmod +x ~/silvia/update_branch.sh
chmod +x ~/silvia/update_arduino.sh

# Install stuff
printf "Installing linux packages...  "
sudo apt install git python3-pip python3-venv libopenjp2-7 libtiff5 apache2 apache2-dev libapache2-mod-wsgi-py3 redis-server i2c-tools sshfs postgresql libpq-dev postgresql-client postgresql-client-common python-dev -y

# Static IP - add lines to file
printf "Setting up static IP...  "
cat >> /etc/dhcpcd.conf <<EOL

# Setup static IP
interface wlan0
static ip_address=192.168.0.6/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1
EOL

# Python env
printf "Setting up Python environment...  "
python3 -m venv ~/.virtualenvs/venv-silvia
echo "source ~/.virtualenvs/venv-silvia/bin/activate" >> ~/.bashrc
source ~/.virtualenvs/venv-silvia/bin/activate
cd ~/silvia/silvia
pip install -r requirements.txt

# Apache server
printf "Setting up Apache server...  "
cd ~/silvia/pi_setup/
cp -f 000-default.conf /etc/apache2/sites-available/000-default.conf
# Change permissions
sudo chmod g+w ~/silvia/silvia
# Change owner
sudo chown www-data:www-data ~/silvia/silvia
sudo chown www-data:www-data ~/.virtualenvs/venv-silvia
# Change group
sudo groupadd server_group
sudo adduser pi server_group
sudo adduser www-data server_group
sudo adduser www-data dialout
sudo chgrp server_group ~/silvia/silvia/

# I2C Permissions
######### NOT SURE IF THIS NEEDS TO BE DONE
# sudo nano /etc/udev/rules.d/99-com.rules
# SUBSYSTEM=="ic2-dev", GROUP="i2c", MODE="0666"

# I2C
printf "Setting up I2C...  "
sudo adduser pi i2c
sudo adduser www-data i2c

# Arduino
printf "Setting up Arduino CLI...  "
cd ~
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
echo "export PATH=\$PATH:/home/pi/bin" >> ~/.bashrc
export PATH=$PATH:/home/pi/bin
arduino-cli config init
arduino-cli core update-index
arduino-cli core install arduino:avr
arduino-cli lib install PID Adafruit_SSD1306
cd ~/Arduino/libraries
git clone https://github.com/br3ttb/Arduino-PID-AutoTune-Library.git
mv Arduino-PID-AutoTune-Library/PID_AutoTune_v0 .
sudo rm -r Arduino-PID-AutoTune-Library/

# Postgres
printf "Setting up PostgreSQL...  "
sudo -u postgres psql -c "CREATE DATABASE silviadatabase;"
sudo -u postgres psql -c "CREATE USER databaseadmin WITH PASSWORD 'databasepwd';"
sudo -u postgres psql -c "ALTER ROLE databaseadmin SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE databaseadmin SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE databaseadmin SET timezone TO 'GB';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE silviadatabase TO databaseadmin;"

# Supervisor
# Make logging directories
sudo mkdir -p /var/log/celery
sudo mkdir -p /var/run/celery
sudo mkdir -p /var/log/silvia
# Permissions
sudo chgrp -R server_group /var/run/celery
sudo chgrp -R server_group /var/log/celery
sudo chgrp -R server_group /var/log/silvia
# Config
sudo cp -f supervisor/silvia_celery.conf /etc/supervisor/conf.d/silvia_celery.conf
sudo cp -f supervisor/silvia_celerybeat.conf /etc/supervisor/conf.d/silvia_celerybeat.conf
sudo cp -f supervisor/silvia_interrupt.conf /etc/supervisor/conf.d/silvia_interrupt.conf
sudo chgrp -R server_group /var/log/supervisor
sudo chmod g+wr /var/log/supervisor/supervisord.log
# sudo supervisord -c /etc/supervisor/supervisord.conf

# Reboot
printf "Finished, now reboot."