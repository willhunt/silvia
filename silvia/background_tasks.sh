# This will stop tasks when using Ctrl+C
trap "kill 0" EXIT

# Celery
redis-cli flushall
celery -A silvia worker &
celery -A silvia beat --scheduler django_celery_beat.schedulers:DatabaseScheduler &

# Pi GPIO
python manage.py raspi_interrupt &

# Waits until process finishes (or Ctrl+c)
wait