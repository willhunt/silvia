import Adafruit_SSD1306
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

class SilviaDisplay(Adafruit_SSD1306):

    def __init__(self, i2c_address):
        super().__init__(rst=None, i2c_address=i2c_address)
        self.begin()
        self.clear()
        self.display()
        
        self.width = display.width
        self.height = display.height
        self.font = ImageFont.load_default()
        
    def welcome(self):
        # Get drawing object to draw on image.
        draw = ImageDraw.Draw(image)
        # Draw a black filled box to clear the image.
        draw.rectangle((0, 0, width, height), outline=0, fill=0)
        
        draw.text((2, 2),  'Hello',  font=self.font, fill=255)
        draw.text((2, 22), 'World!', font=self.font, fill=255)

        self.image(image)
        self.display()