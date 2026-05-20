# Jhb Metro KG quote build from site photos

## Metadata
- Task ID: 2026-05-19-jhb-metro-kg-quote-build
- Status: in-progress
- Project: Unifier Unity CRM
- Site: City Power Johannesburg, Reuven, Johannesburg, 2091
- Owner: Klara
- Priority: urgent
- Created: 2026-05-19
- Last Updated: 2026-05-19

## Objective
Extract the site drawing and handwritten scope from Heinrich/KG's Telegram attachments and build the best possible draft Unity quote for a complete access control, ANPR, CCTV, EV parking monitoring, and perimeter solution.

## Source Requirements
- Telegram request from Heinrich in Unifier Ops group on 2026-05-19 with two images, PDF drawing, and maps link `https://maps.app.goo.gl/hKomDF2hTNDKvEGh6?g_st=iw`.
- Existing Unity records created earlier:
  - Lead `11001`
  - Quote `2591`
  - Opportunity `2524`

## Inputs / Evidence
- Source docs:
  - `docs/tasks/source-docs/jhb-metro-kg/site-plan-photo.png`
  - `docs/tasks/source-docs/jhb-metro-kg/handwritten-scope.png`
  - `docs/tasks/source-docs/jhb-metro-kg/EV_CUSTOMER_PARKING_LINE_DRAWING.pdf`
- Extracted markdown:
  - `docs/tasks/knowledge-base/jhb-metro-kg/scope-extraction.md`
- Related files:
  - Previous setup task: `docs/tasks/done/2026-05-19-jhb-metro-kg-lead-site-survey.md`

## Working Notes
- Maps link resolves to `City Power Johannesburg, Reuven, Johannesburg, 2091`.
- PDF metadata title: `Model_Customer & EV Parking Top View`; author Morisse Sabrey; created 2025-10-06.
- Handwritten scope appears to require:
  - Main entrance: pole, ANPR x2, face/access cameras x2, enclosure, boom gates 4m arm x2, touch pads x2.
  - EV area: cameras for chargers x4, overview cameras x4, possible oval/extra cameras x5, network/fibre/control cabling.
  - Perimeter: cameras x2?, PTZ + multisensor/radar x1, boom gate x1.
  - Coffee shop: boom gate x1, touch/tech pad x1, overview camera x1.
- Conservative draft camera count: 2 ANPR + 16 fixed overview/monitoring + 1 PTZ/multisensor + 2 face/access devices.
- Boom gate catalogue items were not found with searches for `boom`, `barrier`, or `parking`; must be treated as a pricing/model gap unless a matching pricelist item is added.

## Checklist
- [x] Gather required source material
- [x] Extract source documents to markdown if needed
- [x] Record the information needed to complete the task
- [x] Produce the draft Unity quote
- [x] Update knowledge base if reusable
- [ ] Move task to the correct status folder

## Deliverables
- Draft Unity quote lines on quote `2591`.
- Missing-info list for Heinrich/KG/site survey.

## Blockers
- Boom gates are now priced as provisional market-related 4m commercial barrier points; final model/arm length still needs confirmation.
- Trenching/cabling is now updated from the client-populated mobile site survey and best-guess civil allowances; final route/services still need confirmation.
- Several handwritten items are unclear.

## Next Step
Report updated quote status, site-survey assumptions, trenching/boom-gate allowances, and install timeline to Heinrich before customer-ready issue.

## Completion Notes
- Pending.


## Draft Unity quote update — 2026-05-19
Added 27 lines to Unity quote `2591` as the first draft based on the extracted scope. Unity currently reports quote `2591` as `In Queue` with total `R262,440` (this total excludes confirmed boom gate pricing because no matching boom/barrier pricelist item was found).

Major line groups added:
- ANPR: `UNI-DAU-IP-ANPR-4MP` x2.
- Face/access: `DS-K1T341CMFW` x2; `UNI-NO-TOUCH` x3; `EYE-BIO-INST` x2.
- Fixed cameras: `SUPP-CAM-BULLET-4MP-IP-28MM-ADI` x16 plus `EYE-CAM-INST` x16.
- PTZ point: `DS-2DE5425IWAE(T5)_C` x1, PTZ pole bracket x1, 60W midspan x1, `EYE-PTZ-INST` x1.
- Recording/core: `UNI-DAU-NVR-32` x1, `UNI-8TB-HDD-WD` x2, `UNI-POE-MNG-24` x1, 4U cabinet x1, 3kVA UPS x1, NVR/switch install lines.
- Remote networking/fibre: industrial 8-port PoE switch x2, SFP modules x4, 250m ruggedised multimode fibre x1, media converters x2.
- Provisional cabling/civils: Cat5e installed 700m, 25mm conduit 300m, manual trenching 150m, 3m camera pole x1, enclosure x1, labour 40h.

Known quote gaps before customer-ready issue:
- Add or price 4 x boom gates / parking barriers, including 2 x 4m arms at main entrance, 1 perimeter, 1 coffee-shop/truck route. Need controller, loops/safety beams, plinth/civils and access-control integration.
- Confirm whether `touch pad` means no-touch sensor, keypad, access terminal, or intercom.
- Confirm exact meaning/qty of `oval cam`, `lap channel`, `Bosel`, `Tracch`, and `Menu/MECU`.
- Replace provisional cable/trench quantities with measured site-survey quantities.
- Confirm recording retention/FPS/resolution and whether ANPR/VMS licences are required.

Quote item snapshot saved to `docs/tasks/worknotes/jhb-metro-kg-q2591-items.json`.


## Client mobile site survey update — 2026-05-19 18:20
Checked Unity mobile site survey `MOBSURVEY-2026519-89219` via the public survey summary and refreshed production `verbose_log.txt`. Key client-populated details:
- Site survey title: `Private - Jhb Metro - KG - City Power Johannesburg`; address `City Power Johannesburg, Reuven, Johannesburg, 2091`; survey date `2026/05/19 13:14:48`.
- Current survey summary includes ANPR entrance/exit, overview bullets, perimeter raised-pole camera groups, charging-point domes, NVR/container, camera room/monitor, power supply, and entry/exit boom notes.
- Active current survey device list still contains long cable lengths from container/gate/perimeter runs, including 85m, 103m, 138m, 148m, 150m, 156m and 177m entries. Raw log entries total about 1.7km Cat6 and 0.7km RG59 before deletions/duplicates; this supports a large trenching/fibre/network allowance.
- WhatsApp clarification from KG/Hein: trenching is allowed (`Yebo yes my good sir`), power supply is available, and power is required at the boom gates. Heinrich noted the distance from gate to container is too long, so solution is fibre or intermediate powered switch.

Updated Unity quote `2591` from `R262,440` to Unity-reported `R822,851` and installation notes were updated. Additional/updated quote allowances include:
- `KG-BOOM-SECTORII-4M-COMP` x4 @ R74,900 each: provisional complete 4m commercial boom/barrier point based on Centurion SECTOR II 4.5m market class pricing including controller/loop/safety/civil/install allowance.
- `KG-CIVIL-REINSTATE-ALLOW` x1 @ R165,000: provisional civil/trench complexity, sleeves/protection, hand excavation near services, backfill and basic reinstatement.
- `EYE-FIBER-TRENCH-INST` x500 plus `UNI-TRENCH-HYDRAULIC-SITE` x1 and `UNI-TRENCH-HYDRAULIC` x4.
- Cabling/networking updated to `UNI-CAT5E-INST-PM` x1300, `UNI-SVC-CONDUIT25-PM` x800, `UNI-FIBRE-250m-MM` x2, industrial switches x4, media converters x4, SFPs x8, 4U cabinets x3.

Customer-facing assumptions to keep on the quote/proposal:
- Final trench route and all underground services must be marked/confirmed by client before work.
- Power at remote gate/intermediate switch locations is assumed available by others unless specifically scoped.
- Boom gate final model, exact arm length and lane civil detail remain subject to confirmation.
- Paving/asphalt/rock/heavy reinstatement could change pricing.
- Estimated installation timeline: 8-12 working days after approval, material availability, trench route and power confirmation.


## KG voice-note update — 2026-05-19 18:35
Decoded two KG/Hein voice notes and updated quote `2591` accordingly. New confirmations:
- Quote should intentionally overcompensate/overquote first; client can remove items if over budget.
- No formal spec sheet and no known budget.
- Cameras/locations are broadly covered.
- Cabling is confirmed as Cat6, not Cat5e. Quote changed from `UNI-CAT5E-INST-PM` to `UNI-CAT6-INST-PM` x1300.
- Container is the main equipment/monitoring point; added 22-inch monitor and monitor install.
- Touch pad means no-touch wave button.
- Over/oval cam means dome cameras.
- Added provisional ANPR/VMS licensing/config allowance and increased storage to 4 x 8TB because retention/licensing remains a clarification point and KG asked to overcompensate.
- Updated Unity total after these changes: R857,710.
- Quote submission target is tomorrow; PO target is Friday if accepted.

Voice-note transcript saved at `docs/tasks/worknotes/jhb-metro-kg-client-voice-notes-2026-05-19.md`.

## Hikvision conversion update — 2026-05-19 20:45
Heinrich asked to search for the correct Hikvision line items, check the software choice online, and convert all camera items on Unity quote `2591` to Hikvision.

Research / selection notes:
- Hikvision's own ANPR material positions **HikCentral Professional** as the VMS layer for managing ANPR/vehicle data with compatible ANPR cameras.
- Unity pricelist contains exact HikCentral lines:
  - `HikCentral-P-ANPR-1Camera` — HikCentral ANPR licence per camera/channel @ R4,545.
  - `HikCentral-P-VSS-1Ch` — HikCentral VSS/video channel licence per camera/channel @ R860.
- Correct Hikvision ANPR replacement selected: `DS-2CD4A26FWD-IZS P-2.8-12` — 4MP Hikvision ANPR, 50m IR, 2.8-12mm varifocal, plate recognition, no HikCentral licence included.
- Correct 32ch Hikvision NVR replacement selected: `DS-7732NXI-I4/S (E)` — Pro Series 4K 32-channel 256Mbps 1U 4 SATA NVR.
- Fixed overview cameras converted from generic supplier code to explicit Hikvision model `DS-2CD2T46G2-2I(4MM)(O-STD)` — Hikvision 4MP AcuSense fixed bullet IP camera, IP67.

Unity quote updates applied:
- Removed `UNI-DAU-IP-ANPR-4MP` x2.
- Removed `SUPP-CAM-BULLET-4MP-IP-28MM-ADI` x16.
- Removed `UNI-DAU-NVR-32` x1.
- Removed `KG-ANPR-VMS-LIC-ALLOW` x1.
- Added `DS-2CD4A26FWD-IZS P-2.8-12` x2.
- Added `DS-2CD2T46G2-2I(4MM)(O-STD)` x16.
- Added `DS-7732NXI-I4/S (E)` x1.
- Added `HikCentral-P-ANPR-1Camera` x2.
- Added `HikCentral-P-VSS-1Ch` x2.

Verification:
- Fresh Unity `quote-items --quote-id=2591` returns 36 lines and no `Dahua`/`DAU` camera/NVR lines remain.
- Fresh Unity quote lookup reports total `R863,358`.

## Sekweti formal boom gate subcontract update — 2026-05-19 20:55
Heinrich provided Sekweti Projects quote `QU478917` dated `2026-05-19` for the boom/access subcontract package and instructed 15% margin for subcontracting.

Source saved/extracted:
- Image: `docs/tasks/source-docs/jhb-metro-kg/sekweti-projects-QU478917-boom-gates.jpg`
- Extract: `docs/tasks/knowledge-base/jhb-metro-kg/sekweti-projects-QU478917-boom-gates.md`

Supplier quote totals:
- Subtotal ex VAT: R243,045.00
- VAT: R36,456.75
- Cost incl VAT: R279,501.75
- 15% margin target: R279,501.75 / 0.85 = R328,825.59, rounded to R328,826.

Unity pricelist work:
- Created supplier/pricelist `Sekweti Projects QU478917 2026-05-19` (`pricelist_id=31`, supplier `Sekweti Projects (Pty) Ltd`).
- Added detailed supplier line-total pricelist entries `SEK-QU478917-10`, `-11`, `-14`, and `-19` through `-29` for the included quote lines.
- Added quote-safe package pricelist entry `SEK-QU478917-PACKAGE` (`pricelist_entry_id=951`) with cost R279,502 and retail R328,826.

Bundle work:
- Created detailed internal bundle `bundle_id=20`, then marked it inactive after discovering Unity quote totals duplicate a bundle parent once per bundle buying line. This is now documented in `skills/unifier-unity-bundles/SKILL.md`.
- Created active quote-safe bundle `bundle_id=21`, name `SEK-QU478917-BOOM-GATES`, with a single package component `SEK-QU478917-PACKAGE` to avoid the quote-total duplication issue.

Q-2591 update:
- Removed provisional boom allowance `KG-BOOM-SECTORII-4M-COMP` x4 @ R74,900 (R299,600).
- Added bundle `SEK-QU478917-BOOM-GATES` x1 @ R328,826.
- Fresh Unity quote lookup reports total `R892,584`.

Note: the broader `KG-CIVIL-REINSTATE-ALLOW` and trenching/fibre allowances remain on Q-2591 because Sekweti's quote covers boom/access subcontract scope; the broader site route/trenching uncertainty is still intentionally overquoted pending final site confirmation.

## Screen default correction — 2026-05-19 21:00
Heinrich clarified that when no specific screen size is specified, the default quote item should be `UNI-SCREEN-40INCH`, not smaller 22/32 inch monitor lines.

Q-2591 update:
- Removed `UNI-SCREEN-22IN-SWING` x1 @ R2,860.
- Added `UNI-SCREEN-40INCH` x1 @ R3,970.
- Kept `EYE-MON-INST` x1.
- Fresh Unity quote lookup reports total `R893,694`.

Durable default added to `docs/reference/cctv-quoting-checklist.md` under Quote discipline.

## Sekweti bundle fibre correction — 2026-05-19 21:10
Heinrich clarified: remove fibre from the Sekweti boom/access bundle, but keep containment (`kabels, krag, ens`).

Applied in Unity:
- Updated package pricelist item `SEK-QU478917-PACKAGE` (`pricelist_entry_id=951`) to exclude supplier line 28 fibre installation/splicing.
- Kept containment line 29 in the package for cables, power, etc.
- Updated active bundle `SEK-QU478917-BOOM-GATES` (`bundle_id=21`) description and sell price.
- Removed/re-added the bundle on Q-2591 so the quote line uses the corrected price.

Pricing:
- Previous Sekweti package sell: R328,826.
- Removed fibre/splicing component retail: R40,588.
- Corrected bundle sell: R288,238.
- Corrected cost basis: R245,001.75 incl VAT with 15% subcontract margin.
- Fresh Unity quote lookup reports Q-2591 total `R853,106`.

## Boom/access bundle structure correction — 2026-05-19 21:25
Heinrich corrected the bundle structure: the subcontract scope must not be a single package line; each individual line item must exist on the pricelist first and then be included as an individual bundle item. He also instructed not to expose the supplier name for now and to re-check the 15% margin.

Applied in Unity:
- Created/used unbranded pricelist part codes `KG-BOOM-*` for the individual boom/access lines.
- Marked old one-line bundle `bundle_id=21` inactive and renamed it `OLD-SEK-QU478917-DO-NOT-USE`.
- Created active individual-line bundle `bundle_id=22`, `KG-BOOM-GATES-ACCESS`, with 13 component lines: barriers, radar sensors, batteries, civils, technical labour, PM, QC/handover, site establishment, transport/logistics, travel, sundries, plant hire, and containment.
- Removed supplier wording from customer-facing descriptions. The quote item check confirms no `Sekweti` wording appears in Q-2591 item part codes/descriptions.
- Fibre installation/splicing remains excluded; containment remains included.

Pricing check:
- Cost basis for corrected scope: R245,001.75 incl VAT.
- 15% subcontract margin target: R245,001.75 / 0.85 = R288,237.35.
- Rounded applied sell total: R288,237 across the 13 individual lines.

Q-2591 handling:
- Added individual boom/access lines directly to Q-2591 after confirming the active bundle exists with the same components, because Unity's current quote-total view duplicates multi-line bundle parent pricing when a multi-line bundle is added as a bundle entry.
- Fresh Unity verification: 13 `KG-BOOM-*` lines on Q-2591 total R288,237, no supplier wording on quote, Q-2591 total `R853,105`.

## One-boom bundle normalization — 2026-05-19 21:45
Heinrich clarified the desired reusable structure: bring the boom/access scope down to one boom per bundle, divide all line items and retail by 4, then add the bundle to Q-2591 at quantity 4.

Applied in Unity:
- Created per-boom unbranded pricelist items (`KG-BOOM-*`) from the four-boom scope, with cost and retail divided by 4 and rounded to Unity's integer price handling.
- Created detailed one-boom bundle `bundle_id=23`, `KG-BOOM-GATE-ACCESS-EACH-DETAIL-NOT-FOR-QUOTE`, with 13 individual per-boom component lines. Marked it inactive/not-for-quote because adding a multi-line bundle to a live quote still triggers Unity's known duplicate parent-total issue.
- Created quote-safe one-boom package item `KG-BOOM-GATE-ACCESS-EACH-PACKAGE` (`pricelist_entry_id=982`) and active one-line quote bundle `bundle_id=24`, `KG-BOOM-GATE-ACCESS-EACH`.
- Added `KG-BOOM-GATE-ACCESS-EACH` to Q-2591 at quantity 4.

Verification:
- Attempting to add the detailed 13-line one-boom bundle to Q-2591 at quantity 4 inflated the Unity quote total to `R4,311,936`; it was removed immediately.
- Quote-safe bundle at qty 4 gives boom/access total `R288,236` (R1 lower than the previous R288,237 because Unity MCP price creation rejects decimal cents and bundle sell prices are effectively integer-rounded here).
- Fresh Unity quote lookup reports Q-2591 total `R853,104`.
- Quote item check confirms no customer-facing `Sekweti` wording.

## Bundle rule correction — 2026-05-19 22:02
Heinrich corrected the bundle principle again: the canonical bundle must still contain all line items. The correction is only that the bundle represents a singular concept (one boom/access point), not that it becomes a one-line package.

Applied:
- Updated `skills/unifier-unity-bundles/SKILL.md` to make this mandatory: singular reusable concept + all component line items in the bundle + pricelist first; do not solve quote total issues by collapsing canonical bundles into one package line.
- Marked package-only bundle `bundle_id=24` inactive and renamed it `OLD-KG-BOOM-GATE-ACCESS-EACH-PACKAGE-DO-NOT-USE`.
- Reactivated/renamed detailed one-boom bundle `bundle_id=23` as the canonical active `KG-BOOM-GATE-ACCESS-EACH`; it contains the 13 per-boom component line items and has sell price `R72,059`.

Note: Q-2591 still needs care if replacing the temporary quote line, because live Unity quote totals currently inflate when a multi-line bundle is added to a quote. Do not hide that by changing bundle design; fix/work around quote calculation separately.

## Bundle 24 line-item correction — 2026-05-20 08:10
Heinrich pointed at `bundle_id=24` and clarified that the single-concept one-boom bundle still must contain all individual component line items.

Applied in Unity:
- Added the 13 per-boom component pricelist entries to `bundle_id=24` (`KG-BOOM-GATE-ACCESS-EACH`): barrier, radar sensor, batteries, civils, technical labour, project management/docs, QC/handover, site establishment, transport/logistics, travel, sundries, plant hire, and containment.
- Updated `bundle_id=24` back to active canonical name/description with sell price `R72,059`.
- Removed the old package-only component `KG-BOOM-GATE-ACCESS-EACH-PACKAGE` (`pricelist_entry_id=982`) from `bundle_id=24` after adding MCP support for targeted bundle-item deletion.

Verification evidence:
- MCP `bundle-add-items` returned `items_added=13` for `bundle_id=24`.
- MCP `delete-item` returned `items_deleted=1` for `bundle_id=24`, `pricelist_entry_id=982`.

## Pre-send correction — 2026-05-20 11:25
Heinrich asked to send Q-2591. Before sending, live verification showed Unity total was inflated to `R4,311,936` because the multi-line boom/access bundle was still on the quote and triggered the known bundle-total duplication bug.

Applied in Unity:
- Removed quote line `KG-BOOM-GATE-ACCESS-EACH` from Q-2591.
- Added the 13 underlying `KG-BOOM-*` component line items directly to Q-2591 at quantity 4 each, preserving the visible detailed line breakdown without using the quote-total-breaking bundle parent.
- Removed and re-added `UNI-POE-MNG-24` at quantity 1; note the MCP markdown parser still displays this line oddly because the pricelist description contains a literal `|`, but the live quote total confirms the item is priced correctly.

Verification:
- Fresh MCP quote lookup reports Q-2591 total `R853,104`, status `In Queue`, customer `Private`, contact `KG`.
- Q-2591 now has 13 `KG-BOOM-*` lines totalling `R288,236` and no `KG-BOOM-GATE-ACCESS-EACH` bundle parent line.
- Generated preview PDF/link: `Quote-524-2591-00`; WhatsApp number detected as `27637520094`. No customer email was configured, so the MCP preview fallback email target was `anthony@unifier.co.za`.

## Bundle code fix and Q-2591 rework — 2026-05-20 12:35
Heinrich requested fixing Unity quote code rather than avoiding the bundle, then putting Q-2591 back onto the bundle structure. Also confirmed trenching should stay removed because the civils allowance is enough.

Applied to Unity code and deployed to production:
- Fixed bundle-header queries in `quote-generate.asp`, `quote-details/quote-items-section.asp`, `mcp/mcp_quote_details.asp`, and `load-payment.asp` to read bundle quote entries from `tbl_quotes_entries` + `tbl_quotes_bundle_entries` instead of summing `qry_quotes_bundle_details` rows. The old view returns one row per bundle component, which duplicated bundle selling subtotals.
- Deployed the four patched files by FTP and committed/pushed Unity commit `ff67a3b` (`Fix bundle totals in quote rendering`).

Applied to Q-2591:
- Removed the 13 individual `KG-BOOM-*` quote lines.
- Removed remaining trenching/fibre-trenching lines: `UNI-TRENCH-HYDRAULIC-SITE`, `UNI-TRENCH-HYDRAULIC`, and `EYE-FIBER-TRENCH-INST`.
- Added bundle `24` (`KG-BOOM-GATE-ACCESS-EACH`) to Q-2591 at quantity `4`.

Verification:
- MCP quote details now reports Q-2591 total `R807,148` incl. VAT, item_count `45`.
- Bundle parent line shows quantity `4`, subtotal `R288,236`; bundle components are displayed as unpriced component rows.
- Generated preview `Quote-524-2591-01.pdf`; PDF text verifies Total excl. VAT `R701,867.83`, VAT `R105,280.17`, Total incl. VAT `R807,148.00`.

## KG contact email update — 2026-05-20 12:45
Heinrich provided KG's email: `Kgadip@tracksecure.co.za`.

Applied:
- Added/deployed reusable Unity MCP endpoint `mcp/mcp_contact_update.asp` to update contact details by `quote_id` or `contact_id`.
- Updated the contact linked to Q-2591 (`contact_id=2948`) with `customer_contact_email=Kgadip@tracksecure.co.za`.

Verification:
- Fresh `mcp_quote_details.asp?quote_id=2591` returns `customer_contact_email=Kgadip@tracksecure.co.za` and phone `0637520094`.
- Fresh quote-send preview generated `Quote-524-2591-02`; email recipients resolve to `Kgadip@tracksecure.co.za,Kgadip@tracksecure.co.za` because site and billing both resolve to the same contact/email.
