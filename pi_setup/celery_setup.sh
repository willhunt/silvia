# Make logging directories
sudo mkdir -p /var/log/celery
sudo mkdir -p /var/run/celery
# Permissions
sudo chgrp -R server_group /var/run/celery
sudo chgrp -R server_group /var/log/celery


# Systemd method
# Copy celery daemonization files
# sudo cp -f celery.service /etc/systemd/system/celery.service
# sudo cp -f celerybeat.service /etc/systemd/system/celerybeat.service
# sudo mkdir -p /etc/conf.d
# sudo cp -f celery /etc/conf.d/celery
# Ensure Systemd acknowledges files
# sudo systemctl daemon-reload

# General method
# sudo cp -f celery/celeryd /etc/default/celeryd
# sudo cp -f celery/celerybeat /etc/default/celerybeat
# sudo cp -f celery/generic-init.d/celeryd /etc/init.d/celeryd
# sudo cp -f celery/generic-init.d/celerybeat /etc/init.d/celerybeat
# celery multi start worker1 -A silvia --pidfile="/var/run/celery/%n.pid" --logfile="/var/log/celery/%n%I.log"
# celery multi start celerybeat -A silvia --pidfile="/var/run/celery/%n.pid" --logfile="/var/log/celery/%n%I.log"


# Supervisor method
sudo cp -f celery/silvia_celery.conf /etc/supervisor/conf.d/silvia_celery.conf
sudo cp -f celery/silvia_celerybeat.conf /etc/supervisor/conf.d/silvia_celerybeat.conf
sudo chgrp -R server_group /var/log/supervisor
sudo chmod g+wr /var/log/supervisor/supervisord.log
sudo supervisord -c /etc/supervisor/supervisord.conf

# Delete files
# sudo rm /etc/supervisor/conf.d/silvia_celery.conf
# sudo rm /etc/supervisor/conf.d/silvia_celerybeat.conf