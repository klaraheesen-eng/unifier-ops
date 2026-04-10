# Hikvision MinMoe K1T341 Series Knowledge Base

## Summary
This note stores the Unifier reference material for the Hikvision MinMoe K1T341 face terminal family discussed for biometric access-control quoting.

## Reference video
- Demo video: <https://www.youtube.com/watch?v=4y5hKv0aqsw>
- Video title noted during review: **MinMoe Value Series Face Recognition Terminals - K1T341**
- Use case relevance: quick client-facing demonstration of the K1T341 family interaction flow and form factor.

## Stored datasheets and extracts
### DS-K1T341CMFW
- Raw PDF: `/home/klara/dev/unifier-ops/datasheets/raw/DS-K1T341CMFW_Datasheet_20240808.pdf`
- Extracted text: `/home/klara/dev/unifier-ops/datasheets/text/DS-K1T341CMFW_Datasheet_20240808.txt`
- Spec extract: `/home/klara/dev/unifier-ops/hardware-index/ds-k1t341cmfw-specs.txt`

### DS-K1T341AM
- Product family demo reference: <https://www.youtube.com/watch?v=4y5hKv0aqsw>
- Spec extract from official product page: `/home/klara/dev/unifier-ops/hardware-index/ds-k1t341am-specs.txt`
- Note: direct PDF retrieval from Hikvision returned 403 during automated fetch.

## Key specs, DS-K1T341CMFW
- 4.3-inch IPS capacitive touch screen
- Dual-lens 2 MP wide-angle camera, 720P stream
- 3,000 face capacity
- 3,000 card capacity
- 3,000 fingerprint capacity
- 150,000 event capacity
- Face recognition < 0.2 s per user
- Face, fingerprint, card, and PIN authentication
- Mask-wearing detection
- QR code recognition
- Face anti-spoofing
- Two-way audio
- Ethernet and 2.4 GHz Wi-Fi
- Lock output, exit button, door contact, tamper, RS-485, Wiegand, USB
- Built-in access controller
- 12 to 24 VDC, 2 A
- IP65
- Working temperature: -30 °C to 60 °C

## Optional accessories called out in datasheet
- DS-KAB6-D1 Base Bracket
- DS-KAB6-ZU1 Brackets for face terminals
- DS-KAB671-P2 Stand Stick
- DS-KAB34X-S1 Protective Shield

## Quoting guidance
- Prefer **DS-K1T341CMFW** over the simpler face-only variants when the site is semi-outdoor, when card/fingerprint fallback is desirable, or when the install needs stronger flexibility.
- The CMFW is a good candidate for pedestrian gate access where the reader may be exposed to dust/weather and where the client may want multiple credential types.
- For gate installations, still confirm lock strategy, gate leaf behavior, mounting height, sun/rain exposure, cable route, and whether visitor intercom functions must be standalone or integrated.
