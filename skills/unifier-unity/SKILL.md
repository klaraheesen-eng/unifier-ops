---
name: unifier-unity
description: >
  Operate Unifier Unity via MCP tools for leads, quotes, pricelists, and item updates.
  Use when users need CRM quoting operations against https://www.unifier.co.za/unity/
  through the Unity MCP relay. Requires Unity MCP auth token and relay endpoint config.
---

# Unifier Unity MCP Skill

Use this skill for operational actions in Unity (lead creation, quote retrieval, quote item updates, pricelist search, and item maintenance).

## Integration Surface

Unity MCP tools available through the relay or direct MCP endpoints:

- `leads_post`
- `quotes_get`
- `quote_items_post`
- `pricelists_list`
- `pricelist_create`
- `pricelist_item_search`
- `pricelist_item_create`
- `update_item`
- `mark_item_obsolete`
- `bundles_list`
- `bundle_create`
- `bundle_update`
- `bundle_item_create`
- `bundle_add_to_quote`

Endpoint family behind these tools:

- `https://www.unifier.co.za/unity/mcp/mcp_*.asp`

See full details in [references/integration-surface.md](references/integration-surface.md).

## Required Secrets

Set these before use:

- `UNITY_MCP_TOKEN` (required): bearer token used between relay and Unity ASP endpoints.
- `UNITY_EDGE_AUTH_TOKEN` (recommended): token required by relay clients on `x-mcp-auth`.
- `UNITY_BASE_URL` (optional): defaults to `https://www.unifier.co.za/unity/mcp/`.

Classic ASP validation source in Unity:

- `Application("mcp-bearer-token")`
- fallback: `DEV_TOKEN` (development only)

## Quick Setup

From `mcp-cf/`:

```bash
pnpm install
pnpm wrangler secret put UNITY_MCP_TOKEN
pnpm wrangler secret put UNITY_EDGE_AUTH_TOKEN
pnpm wrangler deploy
```

From IIS/Unity side:

1. Set `Application("mcp-bearer-token")` to the same value as `UNITY_MCP_TOKEN`.
2. Keep `mcp_auth.asp` included in all `/unity/mcp/` endpoints and call `RequireAuth()` first.

## Usage Notes

- Always include `x-mcp-auth` when calling `/sse` or `/mcp`.
- Prefer exact filters for quote and pricelist searches to reduce payload size.
- Use supplier-scoped pricelist listing/search when you are cleaning or comparing one supplier at a time.
- Unity's classic UI margin/VAT helper is still the reference for human data entry, but MCP create endpoints expect final VAT-inclusive stored values (`cost_price` = incl VAT buy, `retail_price` = incl VAT sell).
- Bundle adds to quotes create a parent quote entry plus buying lines for each bundle item, matching the Unity UI flow.
- Do not send price filter fields with `0` unless you explicitly want zero-value filtering.
