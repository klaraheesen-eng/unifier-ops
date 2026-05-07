# Thokoman Q-2566 quote build draft

Date: 2026-05-07

Source summary: `docs/tasks/worknotes/thokoman-meeting-2026-05-06-summary.md`

This is a quote-prep build only. Do not push these items into Unity until Heinrich approves.

## 1. Working assumptions

- New CCTV design is treated as a fresh IP CCTV installation.
- Existing 64 cameras remain on their existing NVRs/switches and are not used as the quote baseline.
- Total new camera count: **136 cameras**.
- CAT5e allowance: **35m per camera** as requested.
- Cable total: **136 × 35m = 4,760m CAT5e installed**.
- Use separate PoE switches. Do not rely on onboard NVR PoE.
- Meeting notes take priority over the older jobcard/request.
- Retention target:
  - Block A warehouse/production/finished goods: about 2 months.
  - Block B/admin: about 2 weeks.
- Current quote/pricelist values are draft inputs and must be vendor-confirmed where pricing/datasheets are stale or missing.

## 2. Camera schedule

### Block B — 27 cameras

- 21 × normal 4MP IP bullet cameras.
- 3 × 60m long-range bullet cameras for loading bay / outside view.
- 1 × 80m long-range gate camera, good enough to make out number plates in footage.
- 2 × 4MP dome cameras.

### Block A — 109 cameras

- 96 × normal 4MP IP bullet cameras.
- 9 × 4MP dome cameras, ground floor.
- 3 × 4MP dome cameras, first floor.
- 1 × 80m long-range 8MP camera for parking lot view.

### Total by type

- 117 × standard 4MP IP bullets.
- 14 × standard 4MP IP domes.
- 3 × 60m long-range IP bullets.
- 2 × 80m long-range IP bullets/cameras, at least one to be 8MP as per notes.
- 136 × cameras total.

## 3. Port and switch plan

Use **7 × 24-port managed PoE switches**.

Rationale:

- Camera PoE ports required: 136.
- 6 × 24-port switches gives 144 ports, only 8 spare ports, too tight for a site this size.
- 7 × 24-port switches gives 168 ports, leaving 32 spare PoE ports for layout changes, failed ports, or small additions.
- Proposed switch model from recent IP quote guide: `UNI-POE-MNG-24` / Reyee 24-port Gigabit PoE 370W, 4 × SFP, Layer 2+ managed switch.
- Use SFP/uplink ports for inter-switch/core uplinks where possible, preserving copper PoE ports for cameras.

Proposed distribution:

- Block B/admin: 2 × 24-port PoE switches for 27 cameras.
  - 48 PoE ports available.
  - 27 camera ports used.
  - 21 spare PoE ports before uplink/core design.
- Block A/warehouse: 5 × 24-port PoE switches for 109 cameras.
  - 120 PoE ports available.
  - 109 camera ports used.
  - 11 spare PoE ports before uplink/core design.
- Total: 168 PoE ports available, 136 used, 32 spare.

Suggested physical layout based on meeting notes:

- 4 switch locations total.
- Block B: 1 location with 2 × 24-port PoE switches.
- Block A: 3 locations with 5 × 24-port PoE switches split roughly 2 + 2 + 1.
- Use existing server-room cabinet(s) only where confirmed suitable; quote for the 3 new cabinets requested in meeting notes.

Open topology item:

- Need final floor plans / camera markings to confirm exact switch split, uplink distances, and whether fibre/SFP modules are required between buildings or remote switch locations.

## 4. NVR and storage plan

Meeting notes say:

- Block B: 2 NVRs.
- Block A: 4 × 32-channel NVRs.

Draft architecture:

- Block A: 4 × 32-channel non-PoE NVRs.
  - 128 channels total for 109 cameras.
  - 19 spare channels.
  - About 27/27/27/28 cameras per NVR.
- Block B: 2 × 32-channel non-PoE NVRs.
  - 64 channels total for 27 cameras.
  - 37 spare channels.
  - This is over-capacity, but follows the meeting note of 2 NVRs in Block B.
- Total NVR channel capacity: 192 channels.
- Total spare NVR channels: 56.

Storage draft using 10TB surveillance drives:

- Block A: 4 NVRs × 8 × 10TB = 32 × 10TB drives.
  - Reason: about 27–28 cameras per NVR with 2-month retention needs around 70–73TB per NVR at a planning bitrate of roughly 4Mbps/camera continuous H.265.
  - 8 × 10TB per NVR gives about 80TB raw before formatting/overhead.
- Block B: 2 NVRs × 1 × 10TB = 2 × 10TB drives.
  - Reason: about 13–14 cameras per NVR with 2-week retention needs around 8–9TB per NVR at the same planning bitrate.
- Total provisional storage: **34 × 10TB surveillance HDDs**.

Important storage note:

- This is intentionally conservative for quote-prep. Vendor should confirm retention with the exact camera models, codec, fps, bitrate, and whether H.265+/motion-based recording is acceptable.
- If Block B 80m gate camera is 8MP or records at a higher bitrate, add storage margin or use 2 × 10TB per Block B NVR.

## 5. Draft quote line build

Known current Unity/pricelist lines found:

| Qty | Part code | Description | Unit retail | Draft line total | Notes |
|---:|---|---|---:|---:|---|
| 117 | `SUPP-CAM-BULLET-4MP-IP-28MM-ADI` | Pro Series AcuSense 4MP IP Bullet Camera, 2.8mm | R3,891 | R455,247 | Price/datasheet should be refreshed; last used 2025-10-27. |
| 14 | `SUPP-CAM-DOME-4MP-IP-28MM-ADI` | 4MP Indoor Dome IP Camera, 2.8mm | R3,914 | R54,796 | Price/datasheet should be refreshed; last used 2025-11-19. |
| 7 | `UNI-POE-MNG-24` | Reyee 24-port Gigabit PoE 370W 4SFP L2+ managed switch | R8,900 | R62,300 | Used recently on Q-2538. |
| 34 | `UNI-HDD-10TB-SURV-SG` | WD Purple 10TB surveillance HDD | R7,570 | R257,380 | Used recently on Q-2538. Confirm stock/current price. |
| 4,760 | `UNI-CAT5E-INST-PM` | CAT5e cable per metre installed | R8 | R38,080 | 35m × 136 cameras. |
| 136 | `UNI-SUN` | Sundries per camera | R240 | R32,640 | Per-camera sundries/mounting/connectors. |
| 7 | `UNI-RACK-PATCH-CAT5E` | 24-port Cat5e rack patch panel | R859 | R6,013 | One per 24-port switch. |
| 168 | `SUPP-PATCH-CAT5E 0.5m` | 0.5m Cat5e patch lead | R24 | R4,032 | One per switch port allowance. |
| 4 | `UNI-PDU-6` | 6-way rack PDU | R659 | R2,636 | One per switch/equipment location. |
| 3 | `UNI-CAB-12U-STD` | 12U floor-standing data cabinet | R3,884 | R11,652 | Meeting asked for 2 Block A + 1 Block B cabinets. Confirm final cabinet type/depth. |
| 1 | `DS-VP41D-C/HW5L(O-STD)` | Hikvision tower workstation | R40,605 | R40,605 | Candidate for monitoring workstation; confirm 32-camera live-view suitability. |
| 1 | `UNI-HANDOVER` | Commissioning, training, remote setup and hand-over | R5,000 | R5,000 | Include final commissioning/training. |
| 7 | `UNI-RACK-BRUSH` | Rack brush panel | R100 | R700 | Cable dressing. |
| 8 | `UNI-RACK-BLANK-1U` | 1U blank panel | R75 | R600 | Cabinet finish/airflow. |
| 4 | `UNI-SHELF-19` | 19-inch shelf | R543 | R2,172 | For cabinet equipment where required. |

Known priced subtotal above, excluding missing/unknown NVRs and long-range cameras: **R973,853 incl/excl status as per Unity line convention**.

Missing / vendor-confirmation quote lines:

| Qty | Needed item | Reason |
|---:|---|---|
| 3 | 60m long-range 4MP IP bullets | Loading bay / external long view. Need model, price, datasheet, lens/IR range. |
| 2 | 80m long-range cameras | Gate and parking lot. At least one must be 8MP. Need model, price, datasheet, lens/IR range, number-plate suitability. |
| 6 | 32-channel non-PoE NVRs | Meeting topology requires 2 × Block B and 4 × Block A. Need 8-bay option for Block A storage. |
| 1 lot | Fibre/SFP/uplink hardware | Depends on final switch-location distances and existing network path. |
| 3–4 | Correct cabinets | 12U/18U, depth, fans, shelves, power rails; depends whether NVRs sit in same cabinets or server rooms. |
| 1 | Monitoring workstation final model | Need to confirm 32-camera live-view decoding and GPU/CPU suitability. |
| 1 lot | Surge/lightning protection | Need per-cabinet/network protection design and price. |
| 1 lot | Temporary off-site shrinkage monitoring | Need service pricing for 3 months and scope of monitored cameras. |
| 1 lot | Optional AI analytics add-on | Keep separate from base CCTV quote. Need platform/license/server requirements. |

## 6. Similar quote guidance used

### Carwash / washbay historic reference

- `Q-0481` — Melville Spar Washbay.
- It was a small older promo-style CCTV quote and not a good direct technical comparison for this large IP design.
- Useful only as a reminder that washbay-style quotes included full install assumptions and extra trunking.

### Recent IP/data-cabinet quote guidance

More useful guide was recent quote `Q-2538`, which used:

- `UNI-HDD-10TB-SURV-SG` at R7,570.
- `UNI-POE-MNG-24` managed 24-port PoE switch at R8,900.
- `UNI-RACK-PATCH-CAT5E` patch panel.
- `SUPP-PATCH-CAT5E 0.5m` patch leads.
- `UNI-CAT5E-INST-PM` at R8/m.
- `UNI-SUN` at R240 per camera.
- Cabinet/rack accessory style lines.

## 7. Vendor WhatsApp request drafts

### Request 1 — CCTV hardware supplier / Hikvision-Sensor-ADI style

Hi, please quote and send datasheets for a commercial IP CCTV project:

- 117 × 4MP IP bullet cameras, fixed lens, indoor/outdoor, good low-light, H.265/H.265+, NDAA not required unless noted.
- 14 × 4MP IP dome cameras, indoor/office/ceiling use.
- 3 × 60m long-range IP bullet cameras for loading-bay/external views. Please recommend lens/IR range.
- 2 × 80m long-range cameras for gate/parking views. At least one must be 8MP. Requirement is to make out number plates in footage, not full ANPR database matching.
- 6 × 32-channel non-PoE NVRs. Need option suitable for separate PoE switches, not onboard PoE dependency.
- For Block A, NVRs must support roughly 27–28 cameras each and about 2 months retention. Please recommend 8-bay NVRs/storage configuration.
- For Block B, 2 NVRs for 27 cameras total and about 2 weeks retention.
- Please include a storage calculation for 4MP/8MP cameras at 15fps and realistic H.265/H.265+ bitrates, with recommended HDD quantities.
- Please quote 10TB surveillance drives and confirm stock.
- Please also recommend/quote a monitoring workstation that can display at least 32 cameras simultaneously on two client-supplied screens.

Please send current pricing, stock availability, and datasheets/model numbers.

### Request 2 — Networking / Scoop-Reyee style

Hi, please quote and send datasheets for the network side of a 136-camera IP CCTV project:

- 7 × 24-port managed Gigabit PoE switches, around 370W PoE budget or better, with SFP uplinks. Current candidate: Reyee RG-NBS3100-24GT4SFP-P-V2 or equivalent.
- 7 × 24-port Cat5e patch panels.
- 168 × 0.5m Cat5e patch leads.
- 4 × rack PDUs.
- 3 × suitable data/CCTV cabinets, likely 12U minimum, with fans/shelves/brush panels/blank panels. Please recommend correct depth if NVRs/HDDs may be installed in the cabinets.
- SFP modules/fibre uplink options between 4 switch locations, if copper uplinks are not ideal.
- Surge/lightning protection recommendations for distributed PoE CCTV switches/cameras.

Please send current pricing, stock availability, and datasheets/model numbers.

### Request 3 — Monitoring / AI add-on supplier

Hi, we need pricing/options for temporary off-site CCTV incident monitoring for a shrinkage investigation:

- Site has 136 new IP cameras planned.
- Monitoring is not armed-response security monitoring; it is operational/shrinkage incident review for about 3 months.
- Need recommendation for how many high-risk cameras to monitor live vs review on incident.
- Please quote monthly monitoring for 3 months and any setup fees.
- Please also quote optional AI analytics as a separate add-on for stock movement/loading/access/after-hours anomaly detection.
- Include workstation/server/license requirements if applicable.

Please send pricing, scope assumptions, and any technical prerequisites.

## 8. Items to clarify before final Unity quote entry

- Confirm whether Block B truly needs 2 × 32-channel NVRs despite only 27 cameras.
- Confirm whether the Block B 80m gate camera should also be 8MP, or only the Block A 80m parking camera is 8MP.
- Confirm whether all NVRs sit in server rooms/existing cabinets or whether any new cabinet must house NVRs plus HDDs.
- Confirm if cabinet count remains 3 new cabinets plus one existing/server-room switch location.
- Confirm if fibre/uplink routes are needed between the 4 switch locations.
- Confirm recording fps/quality target for retention calculation.
- Confirm temporary monitoring camera count/scope.

## 9. Recommendation before sending vendor requests

Send the two hardware/network WhatsApps first. Once NVR/camera models and storage calculations are back, lock the quote into Unity with accurate part codes and datasheets instead of using stale placeholders for the long-range cameras/NVRs.

---

## 10. Unity live quote update — 2026-05-07

Heinrich approved adding all available/closest-match lines into Unity quote `2566`.

### Updated assumptions from Heinrich

- Do **not** include fibre/SFP as a base requirement between switch locations.
- Switch locations/intersections are expected to be close enough for **CAT cable gigabit uplinks**.
- Use standard **4U wall-mount cabinets**, not 12U/18U cabinets, for the quoted cabinet allowance.

### Copper uplink adjustment

- Camera cable: 136 × 35m = 4,760m.
- Added provisional copper uplink allowance: 3 × 35m = 105m.
- Updated CAT5e installed quantity added to Unity: **4,865m**.
- Port impact: copper uplinks consume RJ45 switch ports rather than SFP ports.
  - 7 × 24-port switches = 168 RJ45 ports.
  - 136 camera ports + approx. 6 inter-switch/uplink ports = 142 ports used.
  - Approx. 26 spare RJ45 ports remain, still acceptable.

### Items added to Unity quote `2566`

| Qty | Part code | Notes |
|---:|---|---|
| 117 | `SUPP-CAM-BULLET-4MP-IP-28MM-ADI` | Standard 4MP IP bullets. |
| 14 | `SUPP-CAM-DOME-4MP-IP-28MM-ADI` | Standard 4MP IP domes. |
| 3 | `DS-2CD2T46G2-2I(4MM)(O-STD)` | Closest available match for the 60m loading-bay cameras; still needs vendor confirmation for true 60m suitability. |
| 6 | `DS-7732NXI-I4/S` | Closest available 32-channel non-PoE NVR match; 4 SATA, not the ideal 8-bay Block A requirement. |
| 24 | `UNI-HDD-10TB-SURV-SG` | Matches the 6 × 4-SATA NVR capacity currently quoted. Vendor still needs to confirm storage/retention. |
| 7 | `UNI-POE-MNG-24` | 24-port managed Gigabit PoE switch. Quote-items list endpoint displays this line with malformed qty/group fields, a known lightweight listing issue; add command reported success for qty 7. |
| 4,865 | `UNI-CAT5E-INST-PM` | 35m/camera plus 105m copper uplink allowance. |
| 136 | `UNI-SUN` | Per-camera sundries. |
| 7 | `UNI-RACK-PATCH-CAT5E` | One patch panel per 24-port switch. |
| 168 | `SUPP-PATCH-CAT5E 0.5m` | Patch leads for the 168-port switch allowance. |
| 3 | `UNI-CAB-4U` | Standard 4U wall-mounted cabinets. |
| 4 | `UNI-PDU-6` | Rack PDUs per equipment/switch location. |
| 4 | `UNI-SHELF-19` | Cabinet shelves. |
| 7 | `UNI-RACK-BRUSH` | Brush panels. |
| 8 | `UNI-RACK-BLANK-1U` | Blank panels. |
| 7 | `UNI-LIGHT-PRT-POE` | PoE lightning/surge protection allowance, one per switch/cabinet zone. |
| 1 | `DS-VP41D-C/HW5L(O-STD)` | Closest monitoring workstation match. |
| 1 | `UNI-HANDOVER` | Commissioning/training/handover. |

### Approximate live-quote subtotal from added known lines

Using the current listed Unity selling prices, and treating `UNI-POE-MNG-24` as 7 × R8,900 despite the lightweight list display bug:

- Approximate subtotal: **R1,010,602**.

### Still not properly priced / needs vendor input

- True **60m long-range** camera model/datasheet/price for 3 loading-bay cameras.
- True **80m/8MP gate/parking** camera model(s), datasheets and prices for 2 cameras. No satisfactory current pricelist match was found; do not substitute the promo or unrelated Ajax camera lines.
- Proper **32-channel 8-bay non-PoE NVR** option for Block A if the 2-month retention requirement is to be met cleanly. Current closest Unity line is 4-SATA only, so the live quote currently carries 24 × 10TB rather than the earlier 34 × 10TB ideal storage plan.
- Vendor storage calculation for 4MP/8MP, fps, bitrate, H.265/H.265+, continuous vs motion recording.
- Confirmation that the selected monitoring workstation can display at least 32 cameras simultaneously.

---

## 11. Storage calculation script result — 2026-05-07

Created repo-local CCTV storage calculator skill and script:

- Skill: `skills/cctv-storage-calculator/SKILL.md`
- Script: `scripts/cctv-storage-calc.py`
- Runbook: `docs/runbooks/cctv-storage-calculator.md`
- Thokoman input: `examples/cctv-storage/thokoman-q2566-storage.json`
- Thokoman output: `docs/tasks/worknotes/thokoman-q2566-storage-calculation.md`

Planning assumptions used for the first Thokoman run:

- 4MP H.265 @ 15fps planning bitrate: 4 Mbps/camera.
- 8MP H.265 @ 15fps planning bitrate: 8 Mbps/camera.
- 24/7 recording.
- 10% overhead.
- HDD size: 10TB decimal.

Calculated storage requirement:

- Block A: 109 cameras, 60 days retention.
  - Required: 285.12TB raw / 313.63TB with 10% overhead.
  - Required drives: 32 × 10TB total, about 8 × 10TB per NVR across 4 NVRs.
  - This fits only if the Block A NVRs are 8-bay units or equivalent external/expanded storage is used.
- Block B: 27 cameras, 14 days retention.
  - Required: 16.93TB raw / 18.63TB with 10% overhead.
  - Required drives: 2 × 10TB total, about 1 × 10TB per NVR across 2 NVRs.
- Total project requirement under these assumptions: **34 × 10TB drives**.

Unity update performed:

- Updated `UNI-HDD-10TB-SURV-SG` on quote `2566` from 24 to **34**.

Important caveat:

- The current closest-match NVR in Unity, `DS-7732NXI-I4/S`, is a 4-SATA 32-channel NVR. The storage calculation shows this is not suitable for the Block A 60-day target if using internal drives only. Vendor must quote/confirm a proper 32-channel 8-bay NVR or another supported storage design.
