# Task: CIA biometric access control lead + quote in Unity

- **Status:** In progress
- **Created:** 2026-04-10
- **Owner:** Klara
- **Customer:** Commercial and Industrial Acceptances (CIA)
- **Source:** Email forwarded by Lianne with plans/photos and follow-up answers in Telegram group

## Objective
Create the lead in Unity, generate the quote in Unity, and document the MCP/CLI workflow in unifier-ops so the process is repeatable.

## Confirmed client scope
- Site: 13E Riley Road, Bedfordview
- Company: Commercial and Industrial Acceptances (Pty) Ltd
- Contact: Renaldo Jardim
- Email: renaldo@cia.co.za
- Gate: double swing pedestrian gate
- Leaf arrangement: one active leaf and one passive leaf
- Authentication: biometric face and fingerprint
- Functions: access control and attendance/reporting
- Reception: indoor monitor/intercom station required
- Cabling: Unifier to supply cable and conduit
- Backup power: optional extra only
- Users: approximately 65 staff

## Attachment review summary
- Photos and PDF plan reviewed from forwarded email
- Gate appears to be a double swing pedestrian gate in a semi-covered entrance area
- Main technical risk remains final locking strategy on the active leaf
- Additional learned rule captured during this task: do not default to mag locks unless they fix against a rigid, secure frame or structure rather than another unstable/moving gate section

## Unity/MCP findings
- Existing CLI in this repo supports quotes, pricelists, and item search only
- Unity repo has MCP endpoints for:
  - `mcp_leads.asp`
  - `mcp_lead_instant_quote.asp`
  - `mcp_quote_items_add.asp`
  - `mcp_quote_update.asp`
- Copied skill docs into this repo at `skills/unifier-unity/`
- Added local runbook: `docs/runbooks/unity-mcp-skill.md`

## Current blocker
- `/home/klara/dev/unifier-ops/.env` currently only contains Snupit credentials and does not contain `UNITY_MCP_TOKEN`
- Without the token, direct Unity MCP write operations cannot be executed from this repo yet

## Next actions
1. Locate usable Unity MCP token source for unifier-ops or sync the required env from Unity repo
2. Add CLI support for lead creation and instant quote creation in `scripts/unity-cli.mjs`
3. Create CIA lead in Unity
4. Create quote from the lead
5. Search live pricelist items for the recommended hardware and start building BOM
