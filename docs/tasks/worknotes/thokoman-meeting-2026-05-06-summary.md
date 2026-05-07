# Thokoman CCTV site meeting summary — 2026-05-06

Source transcript: `docs/tasks/worknotes/thokoman-meeting-2026-05-06-transcript.md`

Source notes:

- Older pre-meeting request image: `docs/tasks/source-docs/thokoman-2026-05-06/older-cctv-site-visit-request.jpg`
- Lianne meeting notes: `docs/tasks/source-docs/thokoman-2026-05-06/lianne-meeting-notes-2026-05-06.md`
- Q-2566 / jobcard facts: `docs/tasks/worknotes/thokoman-q2566-calendar-unity-facts.md`
- Jobcard PDF: `docs/tasks/source-docs/thokoman-2026-05-06/JOB-502-2566-00.pdf`

> Note: the older pre-meeting request and jobcard are useful baseline context only. The meeting decisions and clarified meeting notes below supersede the older request/jobcard where there is any conflict.

## 1. General summary

Thokoman requested a CCTV infrastructure enhancement / redesign for two main buildings. The agreed approach is to design the new system **as if there is no usable existing CCTV infrastructure**, then repurpose any functional existing cameras into secondary or lower-risk locations.

The existing CCTV estate is approximately **64 cameras**. Existing cameras are mostly **2MP**, image quality is not adequate, not all cameras are functional, and the current placements are not ideal for the risk areas. Earlier notes identify Hikvision and Dahua equipment with NVR recording. The transcript also mentions mixed equipment/brands and possible analogue/IP confusion, so the existing system should not be treated as the design baseline.

The new design direction is:

- Fresh CCTV design, independent of the existing 64-camera estate.
- Existing 64 cameras to remain on their current NVRs/switches unless separately repurposed.
- Quote for new switches and new recording infrastructure for the new design.
- Use **4MP IP cameras** as the general standard.
- Use selected long-range / 8MP cameras only where required for distance or number plate visibility.
- No onboard NVR PoE dependency; use separate PoE switches.
- Include storage, cabling, cabinets, protected power, monitoring workstation, and optional temporary monitoring / AI add-on.

## 2. Site context

The site is divided into two main areas:

- **Block A** — warehouse / factory / production area.
- **Block B** — office/admin block with loading bay and related operational areas.

Quote / jobcard reference:

- Unity quote ID: **Q-2566** / internal quote ID `2566`.
- Jobcard: **JOB502256600**.
- Calendar/jobcard title: **Site Survey - Nhlakanipho Cebekhulu - Thokoman Centurion Site Visit (Q-2566)**.
- Contact: **Nhlakanipho Cebekhulu**.
- Contact email: `nhlakanipho@thokoman.co.za`.
- Contact phone: `0128110501`.
- Unity status at lookup: **Scheduled** / Installation.
- Quote list total: blank / not priced yet.
- Quote items endpoint returned no current items for quote `2566`.

Address from the jobcard / older request:

- **17 Rain Street, Sunderland Ridge, Centurion, 0157**

High-risk / important areas identified:

- Server rooms in both buildings.
- Finished goods stock areas.
- Warehouse operations.
- Conveyor / movement areas between Block A and Block B.
- Loading bay.
- Gate / parking lot views where number plate recognition from footage is required.

## 3. Specific client requirements

### 3.1 Existing system

Current known environment:

- Approximately **64 existing cameras**.
- Mostly **2MP**, causing image-quality limitations.
- Earlier notes say **all IP**, Hikvision and Dahua.
- Transcript suggests there may also be mixed brands and possibly some analogue equipment.
- Recorder type: NVR.
- Not all cameras are functional.
- Some camera placements are not suitable for current risk areas.

Client direction:

- Do not base the core new design on the old system.
- Design the new system from first principles.
- Keep the existing 64 cameras on their existing NVRs and switches for now.
- Repurpose working existing cameras only where practical and non-critical.
- Unifier to reinstall/repurpose existing functional cameras where required.

### 3.2 Block B camera requirement

Meeting decision / clarified notes: **27 total cameras** for Block B.

Breakdown:

- Mostly **4MP IP bullet cameras**.
- **3 × 60m long-range bullet cameras** at / around the loading bay, outside.
- **1 × 80m long-range camera** at the gate.
- **2 × dome cameras** included in the Block B total.
- Balance to be normal **4MP IP bullet cameras**.

Important note:

- The gate camera must be good enough to recognise / make out number plates in footage.
- This is not specified as a full LPR/ANPR database solution.

### 3.3 Block A camera requirement

Meeting decision / clarified notes: **109 total cameras** for Block A.

Breakdown:

- **9 × dome cameras** inside on the ground floor.
- **3 × dome cameras** inside on the first floor.
- Balance to be **4MP bullet cameras**.
- One **80m long-range 8MP camera** to view the parking lot.

Block A includes warehouse, production, finished goods, factory, internal, and external coverage.

### 3.4 Image quality

Client problem:

- Existing 2MP camera quality is insufficient.

New design:

- Use **4MP IP** as the general camera standard.
- Use **8MP** only for the specific long-range parking/gate-type view where higher detail is needed.

### 3.5 Floor plans and design input

Still required from client:

- Spec sheet.
- Floor plan.
- Camera location markings / desired camera positions.
- Confirmation of server room, cabinet, switch, and NVR locations.

The client indicated that floor plans and specs will be sent.

### 3.6 Cabling

Meeting/notes direction:

- Add approximately **5,000m CAT5e** cable allowance.

Rationale:

- A 2,000m allowance was discussed and flagged as too low.
- With around 136 new cameras total if Block B is 27 and Block A is 109, 5,000m is a more realistic planning allowance before final measurement.
- Final cabling should still be checked against floor plans and route distances.

Cabling must account for:

- Actual cable routes, not straight-line distances.
- Cable trays / conduits / containment.
- Vertical drops, cabinet drops, ups and downs.
- Wastage and service loops.
- Switch location impact on cable quantity.

### 3.7 Switch and NVR architecture

Confirmed direction:

- **No onboard PoE** as the primary design.
- Use **separate PoE switches**.
- Quote for **completely new switches** for the new system.
- Keep existing 64 cameras on existing NVRs and switches.

Clarified equipment/topology notes:

- **Block B:** 2 NVRs, including a 32-channel NVR requirement noted for Block B.
- **Block A:** 4 × 32-channel NVRs.
- Switch locations discussed as **4 locations**.
- Notes mention one switch location for each block, one in Block A packaging, and adding a third switch in the server room.
- Two existing 32-port switches are already onsite, but the quote should still cover the new switches required for the new system.

Design reasoning:

- Easier maintenance.
- Better redundancy.
- Less traffic backhaul over long internal links.
- Lower impact if one switch, NVR, or cable route fails.
- PoE/lightning damage should ideally affect a switch, not force replacement of an NVR.
- Distributed equipment makes tampering with the full system harder.

### 3.8 Cabinets

Quote for:

- **2 cabinets for Block A**.
- **1 cabinet for Block B**.

Existing server-room cabinets are handled by the client where applicable.

### 3.9 Backup power and protection

Known:

- Backup power exists in the main server rooms.

Requirement:

- Connect relevant cabinet/equipment power to solar / backed-up power where available.
- Client/electrician must ensure power is connected and surge protected before installation.
- Include surge/lightning protection in the design assumptions.
- Avoid relying only on small UPS batteries where properly backed-up building power can be provided.

### 3.10 Recording retention

Clarified retention requirement:

- **Block A warehouse / production / finished goods:** approximately **2 months** storage.
- **Block B and admin office areas:** approximately **2 weeks** storage.

This supersedes the older general 60–90 day retention request.

### 3.11 Maintenance / SLA / monitoring

Clarified notes:

- Maintenance to be done **in-house**.
- Quote for **temporary off-site incident monitoring** for approximately **3 months**.
- Purpose is shrinkage/theft investigation — **not traditional security monitoring**.
- Focus: identify who is stealing / reduce shrinkage.
- Possible AI analytics quote should be separate as an add-on.

Important interpretation:

- This is not primarily armed-response security monitoring.
- It is closer to shrinkage / operational incident monitoring and investigation support.
- The monitoring scope should therefore focus on selected high-risk stock movement, finished goods, warehouse, conveyor, loading, and access areas.

### 3.12 Monitoring workstation

Include a monitoring workstation in the quote.

Requirement:

- Strong GPU / suitable workstation specification.
- Able to monitor at least **32 cameras at a time**.
- No screens required.
- Client can connect **2 screens**.

If AI analytics is quoted as an add-on, workstation/GPU requirements should be checked against the selected analytics platform.

### 3.13 Timeline

Client expectation:

- Quote by **early next week**.
- Installation date to be confirmed.
- Expected start: **Q3**.

## 4. Open items before quoting

The following still need to be received or confirmed before the final quote is prepared:

- Final floor plans.
- Camera markings / exact camera positions.
- Spec sheets.
- Confirmation of server room, cabinet, switch, and NVR positions.
- Final switch location layout, because the notes mention 4 switch locations but the wording needs layout confirmation.
- Whether the existing equipment is definitely all IP/Hikvision/Dahua or mixed as described in the transcript. This does not materially affect the new quote if existing equipment is kept separate.
- Final retention requirement per camera group if any areas differ from the 2-month / 2-week split.
- Final offsite monitoring scope and number of monitored cameras/zones.
- Whether AI analytics should be included only as an optional add-on or also priced as a recommended option.
- Power availability and backup/protection at each remote cabinet.
- Confirmation that client electrical work will provide protected/solar-backed power before installation.

## 5. Possible conflicts / clarification needed

These notes mostly align with the summary and clarify it. I found the following items that may need Heinrich/client confirmation:

1. **Block B count:** one note says “Office Block B — 25 cams”, but the later detailed note says **Block B x27**, including 2 domes. The summary uses **27 total** because that is the more detailed meeting note and matches the transcript clarification.
2. **Existing camera type/brands:** Lianne’s notes say existing 64 cameras are **all IP, Hikvision and Dahua**. The transcript includes discussion suggesting mixed IP/analogue and different brand names. Since the new design is fresh and existing cameras stay on existing NVRs/switches, this is low-risk, but should be confirmed before any repurpose/reinstall work.
3. **Switch locations:** the notes say **4 locations for switches**, but also mention one for each block, one in packaging Block A, and adding a third switch in the server room. This should be confirmed against the floor plan before quoting exact switch/cabinet placement.
4. **Monitoring wording:** Lianne’s notes say “temporary off-site incident monitoring” but also “not security, focus on shrinkage.” The summary now treats this as shrinkage/theft incident monitoring rather than armed-response security monitoring.

## 6. General BOM / scope items

This is a general, non-brand-specific BOM structure for quote preparation. Final quantities and specifications must be confirmed from the floor plans, topology, and final client input.

### 6.1 Cameras

- 4MP IP bullet cameras for general internal / external coverage.
- 4MP IP dome cameras for office, indoor, or suitable ceiling-mounted locations.
- 60m long-range bullet cameras for selected longer viewing corridors / loading areas.
- 80m long-range 8MP cameras for selected high-detail / distance views, including gate or parking visibility.
- Mounting brackets, junction boxes, poles, or adapters where required.
- Weather-rated housings / fittings where required.

### 6.2 Recording and storage

- Network video recorders sized by camera group / zone.
- Block B NVR capacity, including 2 NVRs as noted.
- Block A NVR capacity, including 4 × 32-channel NVRs as noted.
- Surveillance-grade hard drives sized according to:
  - camera count,
  - resolution,
  - frame rate,
  - compression standard,
  - recording schedule,
  - required retention period.
- Separate storage profiles for:
  - 2-month Block A warehouse/production/finished-goods retention,
  - 2-week Block B/admin retention.
- Optional distributed NVR layout for redundancy and reduced backhaul.

### 6.3 Network and PoE infrastructure

- Separate PoE network switches sized per camera zone.
- No onboard NVR PoE dependency.
- Uplink switches / aggregation where required.
- Fibre uplinks or network backbone links where copper distances or building separation require it.
- SFP modules / fibre patch leads if fibre is used.
- Patch panels and patch leads.
- Network labelling and documentation.

### 6.4 Cabling and containment

- Approximately 5,000m CAT5e / suitable network cable allowance, subject to floor-plan verification.
- Cable trays, trunking, conduit, saddles, and fixings as required.
- Outdoor-rated cable / conduit where exposed.
- Penetrations, glands, weatherproofing, and sealing materials.
- Cable management inside cabinets.
- Allowance for wastage, vertical drops, routing around obstacles, and service loops.

### 6.5 Cabinets and physical infrastructure

- 2 × cabinets for Block A.
- 1 × cabinet for Block B.
- Cabinet shelves, rails, fans, locks, and cable management.
- Cabinet earthing / bonding where required.
- Secure cabinet placement in server rooms, warehouse, or production areas.

### 6.6 Power and protection

- Protected power points for each cabinet / equipment location.
- Surge and lightning protection for network and power where appropriate.
- Integration with solar / generator / backed-up circuits where available.
- UPS units only where protected building power is not available or as a supplementary requirement.
- Electrical work by client electrician or nominated electrical contractor, to be confirmed.

### 6.7 Monitoring workstation and analytics

- Monitoring workstation with strong GPU / suitable graphics capability.
- Ability to view at least 32 cameras simultaneously.
- No monitors/screens included unless later requested.
- Support for two client-supplied screens.
- Optional AI analytics platform / licensing / configuration as a separate add-on.

### 6.8 Configuration and commissioning

- Camera installation and alignment.
- Existing functional camera relocation/reinstallation where approved.
- NVR configuration.
- Recording schedule setup.
- Retention profile setup.
- User access setup.
- Remote access setup where approved.
- Motion / line-crossing / analytics configuration where required.
- Time/date/NTP configuration.
- Testing and handover.
- As-built documentation.

### 6.9 Support and optional services

- In-house maintenance handover support.
- Temporary off-site shrinkage / theft incident monitoring for approximately 3 months.
- Monitoring setup and rule configuration.
- Incident review / escalation process definition.
- Optional AI analytics add-on.
- Health checks and periodic maintenance option.
- Client training / handover.
