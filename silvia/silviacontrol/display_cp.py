from django.conf import settings as django_settings
from board import SCL, SDA
import busio
import adafruit_ssd1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import time

class SilviaDisplay(adafruit_ssd1306.SSD1306_I2C):
    """
    Display using newer Adafruit circuit python library
    """

    def __init__(self, i2c_address):
        self.i2c = busio.I2C(SCL, SDA)
        super().__init__(128, 64, self.i2c, addr=i2c_address)
        self.fill(0)
        self.show()
    
        self.font = ImageFont.load_default()
        
    def welcome(self):
        image = Image.open(django_settings.STATIC_ROOT + '/silviacontrol/display/silvia_logo_128x64_inverted.png') \
                     .resize((self.width, self.height), Image.ANTIALIAS) \
                     .convert('1')
        self.image(image)
        self.show()
        time.sleep(2)
        self.fill(0)
        self.display()


    def showTemperature(self, T, T_set):
        image = Image.new('1', (self.width, self.height))
        # Get drawing object to draw on image.
        drawing = ImageDraw.Draw(image)
        # Draw a black filled box to clear the image.
        # drawing.rectangle((0, 0, self.width, self.height), outline=0, fill=0)
        
        padding_x = 4
        padding_y = 4

        drawing.text((padding_x, padding_y),  'Temperature:',  font=self.font, fill=255)
        drawing.text((padding_x + 13, padding_y),  "{:.1f}".format(T),  font=self.font, fill=255)
        drawing.text((padding_x, padding_y + 30), 'Setpoint:', font=self.font, fill=255)
        drawing.text((padding_x + 13, padding_y + 30),  "{:.1f}".format(T_set),  font=self.font, fill=255)

        self.image(image)
        self.show()