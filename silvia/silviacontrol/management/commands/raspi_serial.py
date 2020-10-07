from django.core.management.base import BaseCommand, CommandError
from silviacontrol.models import StatusModel
from silviacontrol.tasks import async_comms_process
from django.conf import settings as django_settings
from silviacontrol.utils import debug_log
import os
import serial
import time


class Command(BaseCommand):
    help = 'Waits for serial communication from Arduino'

    def handle(self, *args, **options):
        if django_settings.SIMULATE_MACHINE == False:
            # Connect
            for i in range(0, 3):
                serial_path = "/dev/ttyACM{}".format(i)
                if os.path.exists(serial_path) == True:
                    serial_arduino = serial.Serial(serial_path, 57600, timeout=1)
                    break
            if serial_arduino:
                serial_arduino.flush()
            else:
                raise serial.serialutil.SerialException("No serial connection to Arduino")

            while True:
                if (serial_arduino.in_waiting() > 0): #if incoming bytes are waiting to be read from the serial input buffer
                    data_block = serial_arduino.read(size=24)
                    async_comms_process.delay(data_block)
                time.sleep(0.01) # Optional: sleep 10 ms (0.01 sec) once per loop to let other threads on your PC run during this time. 