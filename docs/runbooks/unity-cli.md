# Runbook: Unity MCP CLI (`scripts/unity-cli.mjs`)

Direct HTTP client for Unity **Classic ASP MCP endpoints** (`mcp_*.asp`). Uses the same **bearer token** as the IIS app and the Cloudflare relay’s upstream auth.

## Prerequisites

- Node **18+** (`fetch` global).
- `UNITY_MCP_TOKEN` in `/home/klara/dev/unifier-ops/.env` (copy from `.env.example`).

## Commands

| Command | Purpose |
|---------|---------|
| `quotes` | List/filter quotes (`mcp_quotes.asp`) |
| `lead-create` | Create a lead (`mcp_leads.asp`) — **approval required** |
| `quote-create-from-lead` | Create quote/opportunity from a lead (`mcp_lead_instant_quote.asp`) — **approval required** |
| `quote-add-item` | Add or update a quote item by part code (`mcp_quote_items_add.asp`) — **approval required** |
| `quote-items` | List items on a quote (`mcp_quote_items_list.asp`) |
| `quote-update` | Update quote header fields (`mcp_quote_update.asp`) — **approval required** |
| `pricelists` | Active pricelists (`mcp_pricelists.asp`), optionally filtered by supplier |
| `pricelist-create` | Create a new pricelist plus default section (`mcp_pricelists.asp`) — **approval required** |
| `pricelist-add-item` | Add a single item to a pricelist (`mcp_pricelist_items_create.asp`) — **approval required** |
| `pricelist-add-items` | Add multiple items to a pricelist from JSON (`mcp_pricelist_items_create.asp`) — **approval required** |
| `search` | Pricelist item search (`mcp_pricelist_items_search.asp`) with ranking metadata (`score`, `usage_count`, `last_used_date`, `days_since_last_used`, `last_used_quote_id`) |
| `update-item` | Update pricelist item fields (`mcp_update_item.asp`) — **approval required** |
| `obsolete` | Mark item obsolete today — **approval required** |
| `bundles` | List bundles or inspect a bundle (`mcp_bundles.asp`) |
| `bundle-create` | Create a new bundle (`mcp_bundles.asp`) — **approval required** |
| `bundle-update` | Update bundle header fields (`mcp_bundles.asp`) — **approval required** |
| `bundle-add-item` | Add a single pricelist entry to a bundle (`mcp_bundles.asp`) — **approval required** |
| `bundle-add-items` | Add multiple pricelist entries to a bundle from JSON (`mcp_bundles.asp`) — **approval required** |
| `bundle-add-to-quote` | Add an existing bundle to a quote (`mcp_bundles.asp`) — **approval required** |
| `raw-get` | Debug: raw response from a named endpoint |

## Examples

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- quotes --status-name="Scheduled" --limit=30
npm run unity -- quotes --id=959
npm run unity -- lead-create --lead-short-name="CIA Biometric" --lead-details-name="Client Name" --lead-details-email="client@example.com"
npm run unity -- quote-create-from-lead --lead-id=123 --opportunity-type-id=1
npm run unity -- quote-add-item --quote-id=456 --part-code=DS-2CD --qty=2
npm run unity -- quote-items --quote-id=456
npm run unity -- quote-update --quote-id=456 --customer-po-number="PO-001"
npm run unity -- pricelists --supplier-id=18
npm run unity -- pricelist-create --pricelist-name="Klara MCP Test Pricelist" --currency-id=1 --supplier-id=15 --default-section-name="Klara Test Section"
npm run unity -- pricelist-add-item --pricelist-id=30 --pricelist-entry-group-name="Klara Test Section" --part-code="KLARA-TEST-001" --description="Safe test item" --cost-price=115 --retail-price=190 --type-id=1
npm run unity -- search --description="camera" --limit=25
npm run unity -- search --q="promo" --limit=10
npm run unity -- bundles
npm run unity -- bundle-create --bundle-name="Klara MCP Test Bundle" --bundle-description="Safe internal test bundle" --bundle-sell-price=500
npm run unity -- bundle-add-item --bundle-id=12 --pricelist-entry-id=564 --quantity=1 --item-price=3905
npm run unity -- bundle-add-to-quote --bundle-id=12 --quote-id=2539 --bundle-quantity=1
```

`status-name` accepts the same labels as the MCP relay (e.g. `In Queue`, `Cool`, `Scheduled`, …). `Incomplete` is mapped to `In Queue` to match the worker.

For `search`, prefer `--q` when you want ranked matching across part code and description. The CLI returns Unity's ranking metadata so agents can prefer heavily used, recently used items instead of simple text-only matches.

## Safety

- **Read-only** commands are safe for routine agent use.
- **POST** commands (`lead-create`, `quote-create-from-lead`, `quote-add-item`, `quote-update`, `pricelist-create`, `pricelist-add-item`, `pricelist-add-items`, `update-item`, `obsolete`, `bundle-create`, `bundle-update`, `bundle-add-item`, `bundle-add-items`, `bundle-add-to-quote`) change live Unity data; obtain explicit approval before running.

## Live verification snapshot (2026-04-22)

Verified working live:
- supplier-filtered pricelist listing
- supplier-filtered pricelist item search
- lead creation
- pricelist creation
- single and batch pricelist item creation
- bundle listing
- bundle creation
- single and batch bundle item creation
- bundle add-to-quote
- quote item listing

Verified with safe test data:
- test lead `10954`
- test pricelist `29` (`Klara MCP Test Pricelist 2026-04-22`)
- test pricelist entries `875`, `876`, `877`
- test bundle `18` (`Klara MCP Test Bundle 2026-04-22`)
- bundle `18` successfully added to quote `2539`

Known live defects:
- `quote-create-from-lead` returned success but did not return `quote_id` / `opportunity_id` in CLI output during live validation.
- `update-item` and `obsolete` fail with Unity-side VBScript compile error in `mcp_auth.asp` (`Name redefined`).

## Skill split for smaller agent context

Use the same CLI, but prefer focused skills when delegating:
- `skills/unifier-unity-pricelists/SKILL.md`
- `skills/unifier-unity-bundles/SKILL.md`
- `skills/unifier-unity-quotes/SKILL.md`

## Troubleshooting

- **401 / Unauthorized** — token mismatch; rotate `UNITY_MCP_TOKEN` on IIS and `.env` together.
- **Empty quotes** — check filters; confirm status spelling matches Unity.
- **Differences vs CSV exports** — `raw/Unifier Claims.csv` is a snapshot; **CLI hits live DB**.

## See also

- [`../unity-crm.md`](../unity-crm.md) — Unity as system of record.
- [`/home/klara/dev/unity/skills/unifier-unity/references/integration-surface.md`](../../../unity/skills/unifier-unity/references/integration-surface.md) — endpoint map.
