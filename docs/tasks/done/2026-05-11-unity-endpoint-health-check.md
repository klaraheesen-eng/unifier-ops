# Unity endpoint health check

## Metadata
- Task ID: 2026-05-11-unity-endpoint-health-check
- Status: done
- Project: Unity CRM
- Site: Unifier
- Owner: Klara
- Priority: high
- Created: 2026-05-11
- Last Updated: 2026-05-11

## Objective
Check whether the live Unity CRM and a few MCP/API endpoints are working.

## Source Requirements
- Telegram ops request from Heinrich Heesen on 2026-05-11 12:11 SAST: “please test a few endpoints on the unity system? is it working or not?”

## Inputs / Evidence
- Related repos: `/home/klara/dev/unifier-ops`, `/home/klara/dev/unity`
- Runbook: `docs/runbooks/unity-cli.md`
- Unity smoke script: `/home/klara/dev/unity/tests/smoke/run-smoke.sh`

## Working Notes
Health checks run around 2026-05-11 12:12-12:15 SAST:

- `https://www.unifier.co.za/unity/` returned HTTP 500.
- `https://www.unifier.co.za/unity/login.asp` returned HTTP 500 with SQL Server OLE DB error: `[DBNETLIB][ConnectionOpen (SECDoClientHandshake()).]SSL Security error.` at `/unity/login.asp`, line 11.
- `https://www.unifier.co.za/unity/quotes-text-only.asp?quote_status_id=100` redirected to login; when followed, login returned the same DB SSL handshake error.
- Direct unauthenticated MCP request to `mcp_quotes.asp` returned HTTP 401, confirming the endpoint still enforces auth.
- Authenticated MCP CLI read checks failed:
  - `quotes --status-name="In Queue" --limit=3`: HTTP 500 `Database connection failed`.
  - `pricelists --supplier-id=18`: HTTP 500 Provider error `80004005`, `/unity/mcp/mcp_pricelists.asp`, line 14.
  - `search --q="camera" --limit=3`: HTTP 500 Provider error `80004005`, `/unity/mcp/mcp_pricelist_items_search.asp`, line 13.
  - `bundles`: HTTP 500 Provider error `80004005`, `/unity/mcp/mcp_bundles.asp`, line 14.
  - `quote-items --quote-id=2539`: HTTP 500 SQL Server OLE DB SSL security error, `/unity/mcp/mcp_quote_items_list.asp`, line 34.
- Docker smoke test failed immediately because `quotes-text-only.asp?quote_status_id=100` returned 302 to `login.asp`; following the redirect exposes the HTTP 500 DB SSL error.
- Public WordPress site `https://www.unifier.co.za/` returned HTTP 200, so the failure appears specific to Unity/Classic ASP database connectivity rather than the whole domain.

## Checklist
- [x] Gather required source material
- [x] Record live endpoint evidence
- [x] Produce the answer in Telegram ops chat
- [x] Move task to the correct status folder

## Deliverables
- Health status summary for Heinrich in the ops chat.

## Blockers
- None for diagnosis. Fix requires server/hosting/DB-side intervention.

## Next Step
- Escalate as a Unity production outage focused on SQL Server TLS/SSL handshake or DB connectivity from IIS.

## Completion Notes
Unity is not healthy as of this check. The common failure across login, normal pages, and authenticated MCP reads is SQL Server database connection failure, especially `SECDoClientHandshake()` SSL security errors.
