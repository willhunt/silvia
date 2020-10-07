# This will stop tasks when using Ctrl+C
trap "kill 0" EXIT

# Celery
# -c is concurrency (=1)
celery -A silvia worker --queues=celery &
celery -A silvia worker -c 1 --queues=comms &
celery -A silvia beat --scheduler django_celery_beat.schedulers:DatabaseScheduler &

# Pi GPIO
# python manage.py raspi_interrupt &
# Pi display
# python manage.py raspi_display &

redis-cli flushall

# Waits until process finishes (or Ctrl+c)
wait