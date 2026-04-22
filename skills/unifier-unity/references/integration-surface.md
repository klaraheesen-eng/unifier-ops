# Unifier Unity Integration Surface

## Auth Model Validation

Two auth boundaries are in place:

1. Edge/client to MCP relay (`mcp-cf/src/index.ts`)
- Header: `x-mcp-auth`
- Token accepted as raw value or `Bearer <token>`
- Expected token from `UNITY_EDGE_AUTH_TOKEN` (fallback `UNITY_MCP_TOKEN`)

2. Relay to Unity ASP endpoint (`mcp/mcp_auth.asp`)
- Header: `Authorization: Bearer <UNITY_MCP_TOKEN>`
- Token validated against `Application("mcp-bearer-token")`
- `DEV_TOKEN` supported only as fallback for local/dev

## Tool-to-Endpoint Map

- `leads_post` -> `mcp_leads.asp` (POST)
- `quotes_get` -> `mcp_quotes.asp` (GET)
- `quote_items_post` -> `mcp_quote_items.asp` / `mcp_quote_items_add.asp` (POST)
- `pricelists_list` -> `mcp_pricelists.asp` (GET, supports `supplier_id`)
- `pricelist_create` -> `mcp_pricelists.asp` (POST)
- `pricelist_item_search` -> `mcp_pricelist_items_search.asp` (GET, supports `supplier_id`)
- `pricelist_item_create` -> `mcp_pricelist_items_create.asp` (POST)
- `update_item` -> `mcp_update_item.asp` (POST)
- `mark_item_obsolete` -> `mcp_update_item.asp` (POST with `obsolete_date=today`)
- `bundles_list` -> `mcp_bundles.asp` (GET)
- `bundle_create` -> `mcp_bundles.asp` (POST `action=create`)
- `bundle_update` -> `mcp_bundles.asp` (POST `action=update`)
- `bundle_item_create` -> `mcp_bundles.asp` (POST `action=add-items`)
- `bundle_add_to_quote` -> `mcp_bundles.asp` (POST `action=add-to-quote`)

## Deployment and Operations

- Cloudflare Worker config: `mcp-cf/wrangler.jsonc`
- Worker runtime secrets: `UNITY_MCP_TOKEN`, `UNITY_EDGE_AUTH_TOKEN`
- Unity ASP auth helper: `mcp/mcp_auth.asp`
- n8n implementation docs: `mcp/README-n8n.md`
