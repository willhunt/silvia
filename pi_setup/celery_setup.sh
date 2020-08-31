# Copy celery daemonization fioes
sudo cp -f celery.service /etc/systemd/system/celery.service
sudo cp -f celerybeat.service /etc/systemd/system/celerybeat.service
sudo cp -f celery /etc/conf.d/celery

# Ensure Systemd acknowledges files
systemctl daemon-reload
