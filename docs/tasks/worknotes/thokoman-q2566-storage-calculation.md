# Thokoman Q-2566 CCTV storage calculation

Formula: `TB = cameras * Mbps * hours_per_day * days * 3600 / 8 / 1,000,000; overhead added afterwards`

## Totals
- Cameras: **136**
- Required raw storage: **302.05 TB**
- Required storage with overhead: **332.26 TB**
- Required drives: **34**
- Quoted/planned drives: **34** (340.00 TB raw)
- Scenario groups excluded from totals: **1**

## Block A warehouse/production/finished goods — ideal 8-bay NVR plan
- NVRs: 4
- Cameras: 109 | aggregate bitrate: 440.00 Mbps
- Target retention: 60.0 days @ 24.0h/day
- Required: 285.12 TB raw / 313.63 TB with 10% overhead
- Drives required: 32 × 10TB total; ~8 per NVR
- Bay fit: YES (8 bays/NVR)
- If quoted/planned drives are used: 32 drives / 320.00 TB raw, approx retention 61.2 days
- Even camera split per NVR: 28, 27, 27, 27

| Camera group | Count | Mbps/cam | Days | Raw TB | With overhead TB |
|---|---:|---:|---:|---:|---:|
| Block A standard 4MP cameras | 108 | 4.00 | 60 | 279.94 | 307.93 |
| Block A 8MP parking camera | 1 | 8.00 | 60 | 5.18 | 5.70 |

## Block B/admin — 4-bay NVR plan
- NVRs: 2
- Cameras: 27 | aggregate bitrate: 112.00 Mbps
- Target retention: 14.0 days @ 24.0h/day
- Required: 16.93 TB raw / 18.63 TB with 10% overhead
- Drives required: 2 × 10TB total; ~1 per NVR
- Bay fit: YES (4 bays/NVR)
- If quoted/planned drives are used: 2 drives / 20.00 TB raw, approx retention 15.0 days
- Even camera split per NVR: 14, 13

| Camera group | Count | Mbps/cam | Days | Raw TB | With overhead TB |
|---|---:|---:|---:|---:|---:|
| Block B standard/long-range 4MP cameras | 26 | 4.00 | 14 | 15.72 | 17.30 |
| Block B 8MP gate camera scenario | 1 | 8.00 | 14 | 1.21 | 1.33 |

## Current Unity quote reality check — 6 x 4-bay NVRs with 24 x 10TB
_Scenario / reality check only; excluded from project totals._

- NVRs: 6
- Cameras: 136 | aggregate bitrate: 552.00 Mbps
- Target retention: 60.0 days @ 24.0h/day
- Required: 357.70 TB raw / 393.47 TB with 10% overhead
- Drives required: 40 × 10TB total; ~7 per NVR
- Bay fit: NO (4 bays/NVR)
- If quoted/planned drives are used: 24 drives / 240.00 TB raw, approx retention 36.6 days
- Even camera split per NVR: 23, 23, 23, 23, 22, 22

| Camera group | Count | Mbps/cam | Days | Raw TB | With overhead TB |
|---|---:|---:|---:|---:|---:|
| All 4MP-equivalent cameras | 134 | 4.00 | 60 | 347.33 | 382.06 |
| Two 8MP long-range cameras | 2 | 8.00 | 60 | 10.37 | 11.40 |

