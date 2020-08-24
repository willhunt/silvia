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

class SilviaDisplay(adafruit_ssd1306.SSD1306_I2C):
    """
    Display using newer Adafruit circuit python library
    """

    def __init__(self, i2c_address):
        # self.i2c = busio.I2C(SCL, SDA)
        self.i2c = board.I2C()
        super().__init__(128, 64, self.i2c, addr=i2c_address)
        self.fill(0)
        self.show()
    
        # self.font = ImageFont.load_default()
        self.font_data = ImageFont.truetype(django_settings.STATIC_ROOT + '/silviacontrol/fonts/Roboto-Regular.ttf', 30)
        self.font_sub = ImageFont.truetype(django_settings.STATIC_ROOT + '/silviacontrol/fonts/Roboto-Regular.ttf', 12)
        
    def welcome(self):
        self.showWelcome()
        time.sleep(2)
        self.showBlank()

    def showWelcome(self):
        image = Image.open(django_settings.STATIC_ROOT + '/silviacontrol/display/silvia_logo_128x64_inverted.png') \
                     .resize((self.width, self.height), Image.ANTIALIAS) \
                     .convert('1')
        self.image(image)
        try:
            self.show()
        except Exception as e:
            debug_log("Screen connection error")

    def showTemperature(self, T, T_set):
        image = Image.new('1', (self.width, self.height))
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
            
        # drawing.text((85, 25),
        #     "Set:", font=self.font_sub, fill=255)
        drawing.text((85, 35),
            "[{0:.0f}{1}C]".format(T_set, u'\N{DEGREE SIGN}'), font=self.font_sub, fill=255)

        self.image(image)
        try:
            self.show()
        except Exception as e:
            debug_log("Screen connection error")

    def showBlank(self):
        self.fill(0)
        self.show()