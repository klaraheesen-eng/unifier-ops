from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT_PNG = Path('/home/klara/dev/unifier-ops/docs/tasks/source-docs/brenntag-pomona1/unifier-inspection-checklist.png')
OUT_PDF = Path('/home/klara/dev/unifier-ops/docs/tasks/source-docs/brenntag-pomona1/unifier-inspection-checklist.pdf')
LOGO = Path('/home/klara/dev/unity/images/unifier-logo-colour.png')

W, H = 1654, 2339  # A4-ish at 150 dpi
MARGIN = 90
NAVY = '#12324a'
BLUE = '#1f5f8b'
LINE = '#b8c7d3'
TEXT = '#1b2833'
MUTED = '#5d6b77'
BG = 'white'
CHECK_BG = '#f7fafc'

img = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(img)

try:
    title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 38)
    h1 = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 24)
    body = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 19)
    small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
except:
    title = h1 = body = small = ImageFont.load_default()

logo = Image.open(LOGO).convert('RGBA')
ratio = min(240 / logo.width, 95 / logo.height)
logo = logo.resize((int(logo.width * ratio), int(logo.height * ratio)))
img.paste(logo, (MARGIN, 45), logo)

d.text((MARGIN, 155), 'Inspection Checklist', font=title, fill=NAVY)
d.text((MARGIN, 205), 'RedOlive Estates Pty Ltd t/a Unifier', font=body, fill=BLUE)
d.text((W - MARGIN, 70), 'Project / Site: ____________________', font=body, fill=TEXT, anchor='ra')
d.text((W - MARGIN, 105), 'Date: ____________________', font=body, fill=TEXT, anchor='ra')
d.text((W - MARGIN, 140), 'Inspector: ____________________', font=body, fill=TEXT, anchor='ra')
d.text((W - MARGIN, 175), 'Supervisor: ____________________', font=body, fill=TEXT, anchor='ra')

y = 275
sections = [
    ('General Site Readiness', [
        'Work area identified and safe to access',
        'Hazards identified and communicated to team',
        'Required permits / client approvals in place',
        'Emergency contacts available on site',
        'Housekeeping standard acceptable before work starts',
    ]),
    ('PPE and Personnel', [
        'All personnel wearing required PPE',
        'PPE in good condition and fit for task',
        'Personnel medically fit and competent for assigned work',
        'Toolbox talk / pre-task briefing completed',
        'Attendance register or team list available',
    ]),
    ('Tools, Equipment and Vehicles', [
        'Tools and equipment visually inspected before use',
        'Electrical tools / leads free from visible damage',
        'Ladders / access equipment inspected and stable',
        'Equipment certificates / service records available where required',
        'Vehicles parked safely and keys controlled',
    ]),
    ('Work Execution and Controls', [
        'Task risk assessment and method statement communicated',
        'Area barricaded or controlled where required',
        'Safe work procedures being followed',
        'No unsafe acts or conditions observed during inspection',
        'Defects / non-conformances recorded and corrected',
    ]),
    ('Environmental and Close-Out', [
        'Waste collected and disposed of correctly',
        'No spills / leaks / pollution risks observed',
        'Materials stored safely and neatly',
        'Work area left clean and secure',
        'Outstanding actions assigned and communicated',
    ]),
]

col_x = [MARGIN, W - MARGIN - 150, W - MARGIN - 85, W - MARGIN - 20]
row_h = 42

for title_text, items in sections:
    d.rounded_rectangle([MARGIN, y, W-MARGIN, y+34], radius=10, fill='#eef5fa', outline=LINE)
    d.text((MARGIN+12, y+6), title_text, font=h1, fill=NAVY)
    y += 48
    d.rectangle([MARGIN, y, W-MARGIN, y+row_h], outline=LINE, fill='#dfeaf2')
    d.text((MARGIN+12, y+10), 'Checklist Item', font=body, fill=TEXT)
    d.text((col_x[1]+15, y+10), 'Yes', font=body, fill=TEXT)
    d.text((col_x[2]+15, y+10), 'No', font=body, fill=TEXT)
    d.text((col_x[3]-80, y+10), 'Comments / Action', font=body, fill=TEXT, anchor='ra')
    y += row_h
    for item in items:
        d.rectangle([MARGIN, y, W-MARGIN, y+row_h], outline=LINE, fill=CHECK_BG)
        d.line((col_x[1], y, col_x[1], y+row_h), fill=LINE, width=2)
        d.line((col_x[2], y, col_x[2], y+row_h), fill=LINE, width=2)
        d.line((col_x[3], y, col_x[3], y+row_h), fill=LINE, width=2)
        d.text((MARGIN+12, y+10), item, font=body, fill=TEXT)
        for cx in [col_x[1]+33, col_x[2]+33]:
            d.rectangle([cx-11, y+10, cx+11, y+32], outline=MUTED, width=2)
        y += row_h
    y += 28

notes_y = y
box_h = 220
d.rounded_rectangle([MARGIN, notes_y, W-MARGIN, notes_y+box_h], radius=12, outline=LINE, width=2)
d.text((MARGIN+14, notes_y+12), 'Inspector Notes / Corrective Actions', font=h1, fill=NAVY)
for i in range(1, 7):
    ly = notes_y + 42 + i*28
    d.line((MARGIN+16, ly, W-MARGIN-16, ly), fill='#d8e1e8', width=1)

foot = 'Prepared for Brenntag contractor onboarding | Unifier internal inspection checklist template'
d.text((W/2, H-50), foot, font=small, fill=MUTED, anchor='mm')

OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT_PNG, quality=95)
img.save(OUT_PDF, 'PDF', resolution=150.0)
print(OUT_PNG)
print(OUT_PDF)
