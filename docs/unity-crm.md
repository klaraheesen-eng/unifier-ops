# Unity CRM — operator and agent guide

Unity is Unifier’s **CRM** (quotes, opportunities, pipeline, Sage integration, etc.). All **source code and deploy mechanics** are authoritative in the Unity repo.

## Canonical paths

| What | Where |
|------|--------|
| Clone / repo root | `/home/klara/dev/unity` |
| README (deploy, logs, smoke tests) | `unity/README.md` |
| MCP skill | `unity/skills/unifier-unity/SKILL.md` |
| MCP integration reference | `unity/skills/unifier-unity/references/integration-surface.md` |
| MCP ASP endpoints | `unity/mcp/` |
| Cloudflare relay | `unity/mcp-cf/` |

## Production URL

- App: `https://www.unifier.co.za/unity/`

## What runs in Unity today (vs historic files)

Day-to-day **quotes, pipeline, pricelists, scheduling, job cards, shopping lists, and technician workflows** run in **Unity**. Google Sheets/Docs and CSV snapshots under `unifier-ops/raw/` are mainly **historic** or **supplemental**; do not treat them as the live system of record.

See [`reference/unity-scheduling-and-jobcards.md`](reference/unity-scheduling-and-jobcards.md).

## CLI and agents (this repo)

From `/home/klara/dev/unifier-ops`:

- Configure `.env` with `UNITY_MCP_TOKEN` (and optional `UNITY_BASE_URL`).
- Run `npm run unity -- help` — direct calls to `mcp_*.asp` (same bearer auth as IIS).

Details: [`runbooks/unity-cli.md`](runbooks/unity-cli.md), skill [`skills/unifier-unity-cli/SKILL.md`](../skills/unifier-unity-cli/SKILL.md).

## MCP operations

Tools (via relay) include leads, quotes, quote items, pricelists, item updates. See `integration-surface.md` for the tool → endpoint map and auth boundaries:

1. Client → relay: `x-mcp-auth` (`UNITY_EDGE_AUTH_TOKEN` or fallback).
2. Relay → Unity: `Authorization: Bearer` (`UNITY_MCP_TOKEN` matching IIS `Application("mcp-bearer-token")`).

Do not paste tokens into this repo.

## Deploy (summary)

- Local/script deploy: `deploy.sh` with `.env` FTP credentials (see Unity README).
- Team workflow: GitHub Actions `deploy-production.yml` with `production` environment approval and backup artifact.

Full steps: **read `/home/klara/dev/unity/README.md`** before any deploy task.

## Testing

- Ubuntu/Linux: Docker smoke tests in Unity repo (`docker-compose.smoke.yml`).
- Full IIS behavior: validate on Windows IIS when required.
