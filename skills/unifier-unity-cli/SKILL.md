---
name: unifier-unity-cli
description: >
  Run the unifier-ops Unity MCP CLI against production IIS endpoints using UNITY_MCP_TOKEN
  from unifier-ops/.env. Use as the broad entrypoint when you need live Unity access from this repo.
  Prefer the more focused pricelist, bundle, or quote skills when the task is narrow.
---

# Unifier Unity CLI (ops repo)

## When to use

- Agents need **live** Unity access from **`/home/klara/dev/unifier-ops`** with `UNITY_MCP_TOKEN` configured.
- The task spans multiple Unity domains and it is not yet clear whether it belongs to quoting, pricelists, or bundles only.
- If the task is narrower, prefer:
  - `skills/unifier-unity-pricelists/SKILL.md`
  - `skills/unifier-unity-bundles/SKILL.md`
  - `skills/unifier-unity-quotes/SKILL.md`

## Setup

1. Copy `.env.example` to `.env` in the repo root.
2. Set `UNITY_MCP_TOKEN` (required) — same bearer token as IIS `Application("mcp-bearer-token")` / Unity relay.
3. Optional: `UNITY_BASE_URL` (default `https://www.unifier.co.za/unity/mcp/`).

## Commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- help
npm run unity -- quotes --status-name="In Queue" --limit=20
npm run unity -- lead-create --lead-short-name="CIA Biometric" --lead-details-name="Client Name"
npm run unity -- quote-create-from-lead --lead-id=123 --opportunity-type-id=1
npm run unity -- quote-add-item --quote-id=456 --part-code=DS-2CD --qty=2
npm run unity -- quote-items --quote-id=456
npm run unity -- quote-update --quote-id=456 --customer-po-number=PO-001
npm run unity -- pricelists
npm run unity -- search --part-code=DS-2CD --limit=30
npm run unity -- search --q=promo --limit=10
```

Write operations (`lead-create`, `quote-create-from-lead`, `quote-add-item`, `quote-update`, `pricelist-create`, `pricelist-add-item`, `pricelist-add-items`, `bundle-create`, `bundle-update`, `bundle-add-item`, `bundle-add-items`, `bundle-add-to-quote`, `update-item`, `obsolete`) require explicit human approval; do not run destructive updates without confirmation.

## Verified live status on 2026-04-22

Working end to end:
- `pricelists --supplier-id=`
- `search --supplier-id=`
- `lead-create`
- `pricelist-create`
- `pricelist-add-item`
- `pricelist-add-items`
- `bundles`
- `bundle-create`
- `bundle-add-item`
- `bundle-add-items`
- `bundle-add-to-quote`
- `quote-items`

Known defects:
- `quote-create-from-lead` returned success without `quote_id` / `opportunity_id` in CLI output during live testing, so agents must verify immediately after use.
- `update-item` and `obsolete` currently fail live because Unity `mcp_auth.asp` has a VBScript compile error (`Name redefined`).

## Canonical docs

- [`docs/runbooks/unity-cli.md`](../../docs/runbooks/unity-cli.md)
- Unity MCP skill (authoritative tool semantics): `/home/klara/dev/unity/skills/unifier-unity/SKILL.md`

Search results now surface ranking metadata from Unity when available, including `score`, `usage_count`, `last_used_date`, `days_since_last_used`, and `last_used_quote_id`.

## Relationship to Cloudflare relay

- **CLI** → direct IIS `mcp_*.asp` with `Authorization: Bearer`.
- **MCP relay** (`unity/mcp-cf`) → adds `x-mcp-auth` edge auth for SSE; use when connecting MCP clients.

Both use the same **UNITY_MCP_TOKEN** toward IIS.
