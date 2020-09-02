from django.conf import settings as django_settings
from silviacontrol.utils import debug_log
from board import SCL, SDA
import busio
import board
import adafruit_ssd1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import time

class SilviaDisplay():
    """
    Display using newer Adafruit circuit python library
    """

    def __init__(self, i2c_address):
        self.i2c_address = i2c_address
        self.font_data = ImageFont.truetype(django_settings.STATIC_ROOT + '/silviacontrol/fonts/Roboto-Regular.ttf', 30)
        self.font_sub = ImageFont.truetype(django_settings.STATIC_ROOT + '/silviacontrol/fonts/Roboto-Regular.ttf', 12)
        i2c = board.I2C()
        self.display = adafruit_ssd1306.SSD1306_I2C(128, 64, i2c, addr=self.i2c_address)
        self.showBlank()

    def getDisplay(self):
        # i2c = board.I2C()
        # return adafruit_ssd1306.SSD1306_I2C(128, 64, i2c, addr=self.i2c_address)
        return self.display
        
    def welcome(self):
        self.showWelcome()
        time.sleep(2)
        self.showBlank()

    def showWelcome(self):
        display = self.getDisplay()
        image = Image.open(django_settings.STATIC_ROOT + '/silviacontrol/display/silvia_logo_128x64_inverted.png') \
                     .resize((display.width, display.height), Image.ANTIALIAS) \
                     .convert('1')
        display.image(image)
        display.show()

    def showTemperature(self, T, T_set):
        display = self.getDisplay()
        image = Image.new('1', (display.width, display.height))
        # Get drawing object to draw on image.
        drawing = ImageDraw.Draw(image)
        padding_x = 2
        padding_y = 2

        drawing.text((padding_x, padding_y),
            "Temperature:",  font=self.font_sub, fill=255)
        if T is None:
            drawing.text((padding_x + 4, 22),
                "- {0}C".format(u'\N{DEGREE SIGN}'),  font=self.font_data, fill=255)
        else:
            drawing.text((padding_x + 4, 22),
                "{0:.0f}{1}C".format(T, u'\N{DEGREE SIGN}'),  font=self.font_data, fill=255)
            
        drawing.text((85, 35),
            "[{0:.0f}{1}C]".format(T_set, u'\N{DEGREE SIGN}'), font=self.font_sub, fill=255)

        display.image(image)
        display.show()

    def showBlank(self):
        display = self.getDisplay()
        display.fill(0)
        display.show()
