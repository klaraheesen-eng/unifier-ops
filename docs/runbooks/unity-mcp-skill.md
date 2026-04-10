# Runbook: Unity MCP skill access from unifier-ops

This repo now carries a local copy of the Unity MCP skill so Unifier ops work can stay self-contained.

## Local skill location
- `skills/unifier-unity/SKILL.md`
- `skills/unifier-unity/references/integration-surface.md`

## Canonical upstream source
- `/home/klara/dev/unity/skills/unifier-unity/SKILL.md`
- `/home/klara/dev/unity/skills/unifier-unity/references/integration-surface.md`

When Unity-side MCP semantics change, sync the copies into this repo as part of the same task.

## MCP surface currently documented
- `leads_post` -> `mcp_leads.asp`
- `quotes_get` -> `mcp_quotes.asp`
- `quote_items_post` -> `mcp_quote_items.asp`
- `pricelists_list` -> `mcp_pricelists.asp`
- `pricelist_item_search` -> `mcp_pricelist_items_search.asp`
- `update_item` -> `mcp_update_item.asp`
- `mark_item_obsolete` -> `mcp_update_item.asp` with obsolete date

## Direct endpoints currently useful for quoting flow
Not all quoting endpoints are wrapped by the current CLI yet. The Unity repo also exposes:
- `mcp_lead_instant_quote.asp` -> create a quote from a lead
- `mcp_quote_items_add.asp` -> add quote items by part code and quantity
- `mcp_quote_items_list.asp` / `mcp_quote_items.asp` -> inspect quote items
- `mcp_quote_update.asp` -> update quote header fields

## Access pattern from unifier-ops
1. Preferred: use the local CLI in this repo for read operations and safe scripted flows.
2. When the CLI lacks a needed endpoint, use `curl` with `Authorization: Bearer $UNITY_MCP_TOKEN` against the IIS `mcp_*.asp` endpoint.
3. Keep any helper scripts and runbooks in this repo so quoting work is repeatable.

## CLI coverage
The checked-in `scripts/unity-cli.mjs` now covers:
- lead creation
- quote creation from lead
- adding quote items by part code
- listing quote items
- quote header updates
- quotes, pricelists, item search, and pricelist maintenance

That gives this repo a usable end-to-end lead-to-quote workflow over the IIS MCP endpoints.
