# Thokoman CCTV site meeting summary — 2026-05-06

Source transcript: `docs/tasks/worknotes/thokoman-meeting-2026-05-06-transcript.md`

Older pre-meeting request image: `docs/tasks/source-docs/thokoman-2026-05-06/older-cctv-site-visit-request.jpg`

> Note: the older pre-meeting request is useful background only. The meeting decisions and clarified requirements below supersede the older request where there is any conflict.

## 1. General summary

Thokoman requested a site visit for a CCTV infrastructure enhancement / redesign. The site currently has an existing CCTV system, but the agreed approach from the meeting is to design the new system **as if starting from scratch**, then repurpose any useful existing cameras into secondary or lower-risk positions.

The existing CCTV estate is approximately **64 cameras** across two buildings. The older request noted Hikvision and Dahua equipment, NVR recording, and mostly 2MP cameras. During the meeting, the existing estate was described as a mix of IP and analogue cameras, split across brands including Equal Vision and Power. Not all cameras are functional, and current camera placement is not ideal.

The overall design direction is therefore:

- Treat the new solution as a fresh design.
- Use new 4MP cameras as the general standard.
- Use selected long-range / higher-resolution cameras where distance or number plate visibility is required.
- Repurpose functional existing cameras only where appropriate.
- Design around proper switch, NVR, cabinet, cabling, power, and retention requirements.
- Avoid over-reliance on onboard NVR PoE ports; prefer separate PoE switching for maintainability and resilience.

## 2. Site context

The site is divided into two main areas:

- **Block A** — large factory / warehouse / production area.
- **Block B** — office/admin block with related loading / warehouse areas.

The older request identifies the address as:

- **17 Rain Street, Sunderland Ridge, Centurion, 0157**

High-risk areas identified in the older request and reinforced during the meeting include:

- Server rooms in both buildings.
- Finished goods stock areas.
- Warehouse operations.
- Conveyor / movement areas between Block A and Block B.
- Loading bay and gate / parking areas.

## 3. Specific client requirements

### 3.1 Existing system

Current known environment:

- Approximately **64 existing cameras**.
- Existing cameras are mostly **2MP**, causing image-quality limitations.
- Mix of IP and analogue cameras.
- Multiple brands currently in use.
- Recorder type: NVR.
- No current formal SLA in place.
- Some existing cameras are not functional.
- Some camera placements are not suitable for current risk areas.

Client direction from meeting:

- Do not base the core design on the old system.
- Design the new system from first principles.
- Repurpose working existing cameras into non-critical or secondary areas where practical.

### 3.2 Block B camera requirement

Meeting decision: **27 total cameras** for Block B.

Breakdown:

- Mostly bullet cameras.
- **3 × 60m long-range bullet cameras** for the loading bay / long-distance viewing area.
- **1 × 80m long-range camera**, specified as **8MP**, aimed toward the gate / parking area.
- **2 × dome cameras** on the first floor.
- Balance to be normal **4MP bullet cameras**.

Important note:

- The 80m / 8MP camera should allow number plates to be made out from footage when needed.
- The client is **not requesting a full LPR/ANPR database solution**.

### 3.3 Block A camera requirement

Meeting decision: **109 total cameras** for Block A.

Breakdown:

- **9 × dome cameras** on the ground floor.
- **3 × dome cameras** on the first floor.
- Balance to be **4MP bullet cameras**.
- One **80m / 8MP long-range camera**.

Block A includes factory, warehouse, production, inside, and outside coverage.

### 3.4 Image quality

The older request specifically notes image-quality problems because most current cameras are **2MP** and the client is looking for **4MP**.

Meeting decision:

- Use **4MP** as the general camera standard.
- Use **8MP** only where specifically required for long-range viewing / number plate visibility.

### 3.5 Floor plans and design input

The client indicated that they have already mapped where cameras should go.

Still required from client:

- Floor plans.
- Camera location markings / desired camera positions.
- Spec sheets.
- Confirmation of server room, cabinet, and switch locations.

The older request says floor plans would be provided after the site visit. Meeting discussion confirmed the floor plans may be blank and may require camera positions to be marked up as part of proposal preparation.

### 3.6 Cabling

A rough cable allowance of **2,000m** was discussed and flagged as likely too low.

With approximately **134 cameras** across the new design, even a conservative **35m average per camera** results in roughly **4,700m** of cable before detailed routing and allowance.

Cabling must be estimated from:

- Marked floor plans.
- Server room locations.
- Switch / cabinet positions.
- Actual cable routes, not straight-line distances.
- Cable trays, conduits, vertical drops, ups and downs, and wastage allowance.

Switch placement will have a major impact on cable length and cost.

### 3.7 Switch and NVR architecture

Recommended architecture from the meeting:

- Use dedicated PoE switches rather than relying primarily on NVR onboard PoE.
- Use NVRs primarily for recording.
- Split the large camera estate into zones / groups.
- Consider multiple 32-channel NVR groups rather than one large central dependency.
- Place NVRs / switches closer to camera clusters where practical.

Reasoning:

- Easier maintenance.
- Better redundancy.
- Less traffic backhaul over long internal links.
- Lower impact if one switch, NVR, or cable route fails.
- PoE/lightning damage should ideally affect a switch, not force replacement of an NVR.
- Distributed equipment makes tampering with the full system harder.

The client has some existing switches that may be repurposed, including at least one existing **32-port PoE switch**, but the quote should include the new switching required for the new camera estate.

### 3.8 Cabinets

Existing server-room cabinets are handled by the client.

Additional cabinet locations will likely be required for remote switch / NVR locations.

Provisional cabinet requirement discussed:

- Approximately **2 cabinets for Block A**.
- Approximately **1 cabinet for Block B**.

This must be confirmed after final topology and floor-plan layout.

### 3.9 Backup power and protection

Main server rooms have backup power.

Remote cabinet locations will need protected / backed-up power.

Recommendation from meeting:

- Prefer feeding remote cabinet locations from existing protected circuits where possible.
- Use the client’s electrician to tap from generator / solar / protected supply where available.
- Include lightning / surge protection.
- UPSs can be used where needed, but small batteries create ongoing maintenance overhead.

### 3.10 Recording retention

Older request asked for **60–90 days** retention.

Meeting discussion refined this into area-based retention:

- Office/security-only areas may only need approximately **2 weeks** retention.
- Production / warehouse / finished goods areas need longer retention because issues may only be discovered later.
- The client indicated some issues may only be discovered after around a month.

Provisional recommendation:

- **Block A / production / warehouse / finished goods:** approximately **2 months** retention.
- **Office/admin areas:** approximately **2 weeks** retention.
- Block B may require split retention if it contains both office and warehouse-related footage.

### 3.11 Support / SLA / monitoring

Older request asked for **SLA-based support**.

Meeting discussion clarified that:

- The client may handle some maintenance onsite.
- They are considering temporary offsite monitoring for the initial period.
- The likely monitoring period discussed was around **3 months**, and less than 6 months.

Important clarification still needed:

- Whether they want **security incident monitoring** or **operational footage review support**.

Security incident monitoring means event-based triggers, schedules, motion / line-crossing rules, escalation procedures, and alerts to armed response or nominated contacts.

Operational review means ensuring footage is available for later investigation of stock, production, conveyor, or finished goods issues.

Likely zones mentioned for monitoring / review:

- Finished goods activity.
- Warehouse operations.
- Conveyor area between Block A and Block B.
- Selected high-risk / high-activity zones.

The full camera estate is unlikely to be monitored live. Monitoring should be scoped to selected cameras/zones and priced accordingly.

## 4. Open items before quoting

The following still need to be received or confirmed before the final quote is prepared:

- Final floor plans.
- Camera markings / exact camera positions.
- Spec sheets.
- Confirmation of Block A and Block B server room locations.
- Exact switch / cabinet / NVR positions.
- Which existing switches can be reused.
- Which existing cameras can be repurposed.
- Final retention requirement per camera group.
- Final offsite monitoring scope and number of monitored cameras/zones.
- Confirmation whether monitoring is security-response monitoring or operational review.
- Power availability and backup/protection at each remote cabinet.
- Whether client-provided electrical work will handle protected power feeds to cabinets.

## 5. General BOM / scope items

This is a general, non-brand-specific BOM structure for quote preparation. Final quantities and specifications must be confirmed from the floor plans, topology, and final client input.

### 5.1 Cameras

- 4MP bullet cameras for general internal / external coverage.
- 4MP dome cameras for office, indoor, or suitable ceiling-mounted locations.
- 60m long-range bullet cameras for selected longer viewing corridors / loading areas.
- 80m long-range 8MP cameras for selected high-detail / distance views, including gate or parking visibility.
- Mounting brackets, junction boxes, poles, or adapters where required.
- Weather-rated housings / fittings where required.

### 5.2 Recording and storage

- Network video recorders sized by camera group / zone.
- Surveillance-grade hard drives sized according to:
  - camera count,
  - resolution,
  - frame rate,
  - compression standard,
  - recording schedule,
  - required retention period.
- Separate storage profiles for high-retention production/warehouse areas and shorter-retention office/admin areas where practical.
- Optional distributed NVR layout for redundancy and reduced backhaul.

### 5.3 Network and PoE infrastructure

- PoE network switches sized per camera zone.
- Uplink switches / aggregation where required.
- Fibre uplinks or network backbone links where copper distances or building separation require it.
- SFP modules / fibre patch leads if fibre is used.
- Patch panels and patch leads.
- Network labelling and documentation.

### 5.4 Cabling and containment

- CAT6 / suitable network cable for camera runs.
- Cable trays, trunking, conduit, saddles, and fixings as required.
- Outdoor-rated cable / conduit where exposed.
- Penetrations, glands, weatherproofing, and sealing materials.
- Cable management inside cabinets.
- Allowance for wastage, vertical drops, routing around obstacles, and service loops.

### 5.5 Cabinets and physical infrastructure

- Wall-mount or floor-standing network cabinets for remote switch/NVR positions.
- Cabinet shelves, rails, fans, locks, and cable management.
- Cabinet earthing / bonding where required.
- Secure cabinet placement in server rooms, warehouse, or production areas.

### 5.6 Power and protection

- Protected power points for each cabinet / equipment location.
- Surge and lightning protection for network and power where appropriate.
- UPS units where protected building power is not available.
- Integration with generator / solar / backed-up circuits where available.
- Electrical work by client electrician or nominated electrical contractor, to be confirmed.

### 5.7 Configuration and commissioning

- Camera installation and alignment.
- NVR configuration.
- Recording schedule setup.
- Retention profile setup.
- User access setup.
- Remote access setup where approved.
- Motion / line-crossing / analytics configuration where required.
- Time/date/NTP configuration.
- Testing and handover.
- As-built documentation.

### 5.8 Support and optional services

- SLA / maintenance support option.
- Temporary offsite monitoring option.
- Monitoring setup and rule configuration.
- Response/escalation procedure setup.
- Health checks and periodic maintenance.
- Client training / handover.
