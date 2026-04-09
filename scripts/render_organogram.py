from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path('/home/klara/dev/unifier-ops/docs/tasks/source-docs/brenntag-pomona1/unifier-organogram.png')
LOGO = Path('/home/klara/dev/unity/images/unifier-logo-colour.png')

W, H = 1600, 1200
BG = 'white'
NAVY = '#12324a'
BLUE = '#1f5f8b'
LINE = '#7d98ad'
TEXT = '#13222e'
BOX_FILL = '#f5f9fc'
SUB_FILL = '#eef5fa'

img = Image.new('RGBA', (W, H), BG)
d = ImageDraw.Draw(img)

try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 42)
    font_sub = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
    font_name = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 24)
    font_role = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 20)
    font_small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 17)
except:
    font_title = font_sub = font_name = font_role = font_small = ImageFont.load_default()

# logo
logo = Image.open(LOGO).convert('RGBA')
ratio = min(260 / logo.width, 110 / logo.height)
logo = logo.resize((int(logo.width * ratio), int(logo.height * ratio)))
img.alpha_composite(logo, ((W - logo.width)//2, 35))

d.text((W/2, 165), 'Company Organogram', font=font_title, fill=NAVY, anchor='mm')
d.text((W/2, 205), 'RedOlive Estates Pty Ltd t/a Unifier', font=font_sub, fill=BLUE, anchor='mm')

def box(x, y, w, h, name, role, contact=None, fill=BOX_FILL):
    d.rounded_rectangle([x, y, x+w, y+h], radius=18, fill=fill, outline=LINE, width=3)
    d.text((x+w/2, y+28), name, font=font_name, fill=TEXT, anchor='mm')
    d.text((x+w/2, y+62), role, font=font_role, fill=BLUE, anchor='mm')
    if contact:
        d.text((x+w/2, y+h-24), contact, font=font_small, fill=TEXT, anchor='mm')

def vline(x, y1, y2):
    d.line((x, y1, x, y2), fill=LINE, width=4)

def hline(x1, x2, y):
    d.line((x1, y, x2, y), fill=LINE, width=4)

# positions
owner = (600, 255, 400, 95)
lianne = (260, 455, 380, 105)
heinrich = (960, 455, 380, 105)
mike = (130, 690, 320, 95)
martin = (470, 690, 320, 95)
ephraim = (130, 920, 320, 85)
abram = (470, 920, 320, 85)

box(*owner, 'Anthony Laing', 'Owner')
box(*lianne, 'Lianne Heesen', 'General Manager', '082 094 3681 | sales@unifier.co.za')
box(*heinrich, 'Heinrich Heesen', 'Engineering and CTO', fill=SUB_FILL)
box(*mike, 'Mike Mabua', 'Team Leader', '+27 76 720 9109 | mike@unifier.co.za')
box(*martin, 'Martin Chauke', 'Team Leader')
box(*ephraim, 'Ephraim Morero', 'Team Member', fill=SUB_FILL)
box(*abram, 'Abram Lebese', 'Team Member', fill=SUB_FILL)

# connectors
owner_cx = owner[0] + owner[2]//2
owner_bottom = owner[1] + owner[3]
branch_y = 400
vline(owner_cx, owner_bottom, branch_y)
hline(lianne[0] + lianne[2]//2, heinrich[0] + heinrich[2]//2, branch_y)
vline(lianne[0] + lianne[2]//2, branch_y, lianne[1])
vline(heinrich[0] + heinrich[2]//2, branch_y, heinrich[1])

lianne_cx = lianne[0] + lianne[2]//2
lianne_bottom = lianne[1] + lianne[3]
branch2_y = 635
vline(lianne_cx, lianne_bottom, branch2_y)
hline(mike[0] + mike[2]//2, martin[0] + martin[2]//2, branch2_y)
vline(mike[0] + mike[2]//2, branch2_y, mike[1])
vline(martin[0] + martin[2]//2, branch2_y, martin[1])

vline(mike[0] + mike[2]//2, mike[1] + mike[3], ephraim[1])
vline(martin[0] + martin[2]//2, martin[1] + martin[3], abram[1])

# footer note
footer = 'Prepared for Brenntag contractor onboarding | Alfred Nyaweni excluded from organogram as he is not a Unifier employee'
d.text((W/2, 1145), footer, font=font_small, fill='#52616d', anchor='mm')

OUT.parent.mkdir(parents=True, exist_ok=True)
img.convert('RGB').save(OUT, quality=95)
print(OUT)
