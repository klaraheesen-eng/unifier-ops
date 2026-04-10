---
name: unifier-unity-cli
description: >
  Run the unifier-ops Unity MCP CLI against production IIS endpoints using UNITY_MCP_TOKEN
  from unifier-ops/.env. Use for leads, quotes, quote items, pricelists, pricelist search,
  and item updates.
  Prefer this when the OpenClaw gateway does not expose MCP tools, or for scripted automation.
---

# Unifier Unity CLI (ops repo)

## When to use

- Agents need **live** leads, quotes, quote items, pricelists, or item search from Unity without opening the browser.
- You are working in **`/home/klara/dev/unifier-ops`** with `UNITY_MCP_TOKEN` configured.

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
```

Write operations (`lead-create`, `quote-create-from-lead`, `quote-add-item`, `quote-update`, `update-item`, `obsolete`) require explicit human approval; do not run destructive updates without confirmation.

## Canonical docs

- [`docs/runbooks/unity-cli.md`](../../docs/runbooks/unity-cli.md)
- Unity MCP skill (authoritative tool semantics): `/home/klara/dev/unity/skills/unifier-unity/SKILL.md`

## Relationship to Cloudflare relay

- **CLI** → direct IIS `mcp_*.asp` with `Authorization: Bearer`.
- **MCP relay** (`unity/mcp-cf`) → adds `x-mcp-auth` edge auth for SSE; use when connecting MCP clients.

Both use the same **UNITY_MCP_TOKEN** toward IIS.
