# Jhb Metro KG — site drawing and handwritten scope extraction

## Source files
- `docs/tasks/source-docs/jhb-metro-kg/site-plan-photo.png`
- `docs/tasks/source-docs/jhb-metro-kg/handwritten-scope.png`
- `docs/tasks/source-docs/jhb-metro-kg/EV_CUSTOMER_PARKING_LINE_DRAWING.pdf`

## Site / drawing
- Site from Maps: City Power Johannesburg, Reuven, Johannesburg, 2091.
- PDF metadata title: `Model_Customer & EV Parking Top View`.
- PDF author: Morisse Sabrey.
- PDF creation date: 2025-10-06 09:14:06 SAST.
- Drawing title block visible in photo: City Power (Pty) Ltd; EV & Customer Parking; showing drivethru routes; Phase 1 & Phase 2; Customer & EV Parking Top View.
- Drawing notes visible/partly visible:
  - Traffic flow is anticlockwise.
  - Drivers must follow marked roads.
  - Existing obstructions/trees/cables compromising development may need removal.
- Plan labels visible: Main Gate, Customer Service, Service Gate, EV/customer parking, no parking road, stop markings, EV parking/charging area.

## Handwritten scope extraction

### Main entrance
1. Pole x1
2. `Over` x1 — uncertain, possibly overview/overhead
3. ANPR x2
4. Camera face x2 — likely face camera/access/recognition camera
5. `4 core fix` x1 — uncertain cable/control wiring note
6. Enclosure x1
7. Boom gate 4m arm x2
8. Touch pad x2

### EV area / EV circle
1. Cameras for charging x4
2. Overview camera x4
3. `Oval cam` x5 — uncertain; possibly overview/oval camera. Note nearby may read `struct 2`.
4. `lap channel` x2 — uncertain; likely LAN/channel/network link
5. `Bosel` x? — unidentified, possibly buzzer/beacon/booster
6. `Tracch` / track / trench — uncertain
7. Fibre + 4 core — likely fibre plus control cable
8. `Menu` / `MECU` / mains — uncertain

### Perimeter
1. Camera x2? — quantity overwritten/uncertain
2. PTZ + multi sensor (Radar) x1
3. Boom gate x1
4. Truck — likely truck route/access consideration, not equipment by itself

### Coffee shop
1. Boom gate x1
2. Tech/touch pad x1
3. Overview camera x1
4. Trucks — likely truck route/access consideration

## Conservative inferred equipment counts for draft quote
- Boom gates: 4 total, including 2 x 4m arm at main entrance; exact model and loops/safety beams not confirmed.
- ANPR cameras: 2.
- Face/access terminals/cameras: 2.
- Touch/keypad/no-touch/access devices: 3.
- Fixed overview/monitoring cameras: 16 provisional (EV charging 4 + EV overview 4 + oval/extra 5 + perimeter 2 + coffee shop 1).
- PTZ / multisensor radar point: 1.
- NVR capacity: 32 channel recommended to leave spare capacity.
- Storage: provisional 2 x 8TB surveillance drives; retention/FPS to be confirmed.
- Network: 24-port PoE core switch plus remote/industrial switch allowance; fibre link and media converter/SFP allowance.
- Cabling: provisional Cat5e/conduit/trenching allowances only until measured.

## Quote gaps / assumptions to verify
1. Boom gate make/model, arm length, duty cycle, access controller integration, vehicle loop/safety beam requirements, civil plinth requirements, and mains availability.
2. Whether `camera face x2` means face-recognition access terminals or cameras aimed at occupants/drivers.
3. Whether `touch pad` means keypad, no-touch exit button, or touch-screen intercom/access terminal.
4. Exact meaning of `oval cam x5`, `lap channel x2`, `Bosel`, `Tracch`, and `Menu/MECU`.
5. Exact cable, fibre, trenching, conduit and duct route lengths.
6. Power availability at each island/gate/camera cluster.
7. Desired recording retention, FPS, resolution, and whether ANPR requires a HikCentral/VMS licence.
8. Whether customer requires licence plate whitelist/access automation, visitor management, payment/ticketing, or only camera monitoring.
9. Whether EV charger monitoring needs integration into a charger platform or only CCTV coverage.


## Client-populated mobile site survey — `MOBSURVEY-2026519-89219`
Checked on 2026-05-19. Survey summary identifies the same site: `Private - Jhb Metro - KG - City Power Johannesburg`, address `City Power Johannesburg, Reuven, Johannesburg, 2091`, survey date `2026/05/19 13:14:48`.

Current visible device list includes:
- ANPR entrance and ANPR exit, each on pole with long Cat6 runs around 150-156m.
- Overview bullets `Bullet01`-`Bullet04`, plus perimeter raised-pole groups `Bullet05`-`Bullet07`; perimeter notes say 3x bullet cameras on raised poles for perimeter 1/2/3.
- Charging-point domes, NVR/container, camera room/monitor, power supply, and `Pole01` perimeter point.
- Boom-gate notes for entrance/exit: 4m boom gate arm, bullet camera and touch/wave pad.

Important commercial/technical implications:
- Treat this as a fibre/distributed-network job, not a simple all-copper run back to the container. Heinrich specifically noted the gate-to-container distance is too long; preferred solution is fibre or powered intermediate switches.
- KG confirmed trenching is allowed and power supply is available; power must be available at boom gates and likely remote switch/cabinet locations.
- Raw log entries before delete/duplicate cleanup total roughly 1.7km Cat6 and 0.7km RG59; current summary still shows multiple 85m-177m long runs. Use a conservative large trench/cable allowance until route is measured.
- Quote update used 500m fibre trenching, 1.3km installed Cat5e, 800m conduit, 500m ruggedised multimode fibre, extra industrial switches/media converters/cabinets, plus a provisional civil/reinstatement allowance.
- Boom gates were priced provisionally as 4 x complete 4m commercial barrier points based on Centurion SECTOR II 4.5m market-class hardware and installation/civil/safety allowances.
