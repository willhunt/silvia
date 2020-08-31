# Systemd method
# Copy celery daemonization files
# sudo cp -f celery.service /etc/systemd/system/celery.service
# sudo cp -f celerybeat.service /etc/systemd/system/celerybeat.service
# sudo mkdir -p /etc/conf.d
# sudo cp -f celery /etc/conf.d/celery
# Ensure Systemd acknowledges files
# sudo systemctl daemon-reload

# General method
sudo cp -f celery/celeryd /etc/default/celeryd
sudo cp -f celery/celerybeat /etc/default/celerybeat
sudo cp -f celery/generic-init.d/celeryd /etc/init.d/celeryd
sudo cp -f celery/generic-init.d/celerybeat /etc/init.d/celerybeat


# Make logging directories
sudo mkdir -p /var/log/celery
sudo mkdir -p /var/run/celery

# Start
/etc/init.d/celeryd start
/etc/init.d/celerybeat start

