from django.conf import settings as django_settings
import Adafruit_SSD1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

class SilviaDisplay(Adafruit_SSD1306.SSD1306_128_64):

    def __init__(self, i2c_address):
        super().__init__(rst=None, i2c_address=i2c_address)
        self.begin()
        self.clear()
        self.display()
    
        self.font = ImageFont.load_default()
        
    def welcome(self):
        image = Image.open(django_settings.STATIC_ROOT + '/silviacontrol/display/silvia_logo_128x64_inverted.png') \
                     .resize((self.width, self.height), Image.ANTIALIAS) \
                     .convert('1')
        self.image(image)
        self.display()

    def showTemperature(self, T, T_set):
        image = Image.new('1', (self.width, self.height))
        # Get drawing object to draw on image.
        draw = ImageDraw.Draw(image)
        # Draw a black filled box to clear the image.
        draw.rectangle((0, 0, self.width, self.height), outline=0, fill=0)
        
        padding_x = 4
        padding_y = 4

        draw.text((padding_x, padding_y),  'Temperature:',  font=self.font, fill=255)
        draw.text((padding_x + 13, padding_y),  "{:.1f}".format(T),  font=self.font, fill=255)
        draw.text((padding_x, padding_y + 30), 'Setpoint:', font=self.font, fill=255)
        draw.text((padding_x + 13, padding_y + 30),  "{:.1f}".format(T_set),  font=self.font, fill=255)
