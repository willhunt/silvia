# This will stop tasks when using Ctrl+C
trap "kill 0" EXIT

# Celery
celery -A silvia worker &

# Pi GPIO
python manage.py raspi_interrupt &

# Waits until process finishes (or Ctrl+c)
wait