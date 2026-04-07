# Runbook: Unity MCP CLI (`scripts/unity-cli.mjs`)

Direct HTTP client for Unity **Classic ASP MCP endpoints** (`mcp_*.asp`). Uses the same **bearer token** as the IIS app and the Cloudflare relay’s upstream auth.

## Prerequisites

- Node **18+** (`fetch` global).
- `UNITY_MCP_TOKEN` in `/home/klara/dev/unifier-ops/.env` (copy from `.env.example`).

## Commands

| Command | Purpose |
|---------|---------|
| `quotes` | List/filter quotes (`mcp_quotes.asp`) |
| `pricelists` | Active pricelists (`mcp_pricelists.asp`) |
| `search` | Pricelist item search (`mcp_pricelist_items_search.asp`) |
| `update-item` | Update pricelist item fields (`mcp_update_item.asp`) — **approval required** |
| `obsolete` | Mark item obsolete today — **approval required** |
| `raw-get` | Debug: raw response from a named endpoint |

## Examples

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- quotes --status-name="Scheduled" --limit=30
npm run unity -- quotes --id=959
npm run unity -- pricelists
npm run unity -- search --description="camera" --limit=25
```

`status-name` accepts the same labels as the MCP relay (e.g. `In Queue`, `Cool`, `Scheduled`, …). `Incomplete` is mapped to `In Queue` to match the worker.

## Safety

- **Read-only** commands are safe for routine agent use.
- **POST** commands (`update-item`, `obsolete`) change **pricelist** data; obtain explicit approval before running.

## Troubleshooting

- **401 / Unauthorized** — token mismatch; rotate `UNITY_MCP_TOKEN` on IIS and `.env` together.
- **Empty quotes** — check filters; confirm status spelling matches Unity.
- **Differences vs CSV exports** — `raw/Unifier Claims.csv` is a snapshot; **CLI hits live DB**.

## See also

- [`../unity-crm.md`](../unity-crm.md) — Unity as system of record.
- [`/home/klara/dev/unity/skills/unifier-unity/references/integration-surface.md`](../../../unity/skills/unifier-unity/references/integration-surface.md) — endpoint map.
