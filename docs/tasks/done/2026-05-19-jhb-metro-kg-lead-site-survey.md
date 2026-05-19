# Jhb Metro KG lead and mobile site survey setup

## Metadata
- Task ID: 2026-05-19-jhb-metro-kg-lead-site-survey
- Status: done
- Project: Unifier Unity CRM
- Site: City Power Johannesburg, Reuven, Johannesburg, 2091
- Owner: Klara
- Priority: urgent
- Created: 2026-05-19
- Last Updated: 2026-05-19

## Objective
Create/setup the Jhb Metro lead for KG in Unity and provide the mobile site survey start link.

## Source Requirements
- Telegram request from Heinrich in Unifier Ops group on 2026-05-19: create lead for `Kg Unifier Lead`, phone `+27 63 752 0094`, new site map link `https://maps.app.goo.gl/hKomDF2hTNDKvEGh6?g_st=iw`, and return mobile site survey start link.

## Inputs / Evidence
- Source docs: none
- Extracted markdown: none
- Related Unity records:
  - Lead: `11001` — `https://www.unifier.co.za/unity/lead-details.asp?lead_id=11001`
  - Quote: `2591` — `https://www.unifier.co.za/unity/quote-details.asp?quote_id=2591`
  - Mobile survey start: `https://www.unifier.co.za/unity/mobile-survey/start-survey.asp?quote_id=2591`

## Working Notes
- Resolved short Google Maps link with HTTP redirect lookup to: `City Power Johannesburg, Reuven, Johannesburg, 2091`.
- Created Unity lead via `npm run unity -- lead-create`:
  - Lead short name: `Jhb Metro - KG`
  - Contact: `KG`
  - Telephone: `0637520094`
  - Region: `Johannesburg`
  - Notes include original Maps link and resolved address.
- Created quote/opportunity from lead via `quote-create-from-lead`:
  - Lead ID: `11001`
  - Quote ID: `2591`
  - Opportunity ID: `2524`
- Updated quote header via `quote-update`:
  - Quote name: `Jhb Metro - KG - City Power Johannesburg`
  - Maps link: original short Maps URL
  - Installation address: resolved City Power Johannesburg address
  - Installation notes: KG contact and Telegram source context.
- Verified quote appears under `Cool` status via Unity CLI.

## Checklist
- [x] Gather required source material
- [x] Extract source documents to markdown if needed
- [x] Record the information needed to complete the task
- [x] Produce the deliverable or completed artifact
- [x] Update knowledge base if reusable
- [x] Move task to the correct status folder

## Deliverables
- Unity lead created: `11001`
- Unity quote created and updated: `2591`
- Mobile site survey starting link: `https://www.unifier.co.za/unity/mobile-survey/start-survey.asp?quote_id=2591`

## Blockers
- None

## Next Step
- Heinrich / field team can open the mobile survey start link and capture KG's site survey photos/details.

## Completion Notes
- Completed on 2026-05-19.
