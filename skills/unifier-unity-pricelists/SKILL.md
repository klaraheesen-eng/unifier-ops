---
name: unifier-unity-pricelists
description: >
  Use the unifier-ops Unity CLI for supplier-scoped pricelist listing, pricelist creation,
  item creation, and pricelist cleanup checks. Use when an agent needs to inspect or modify
  Unity pricelists without opening the browser.
---

# Unifier Unity Pricelists

Use this skill when the task is specifically about supplier pricelists, item imports, item cleanup, or margin/VAT-aware pricelist entry workflows.

## Use this for

- List pricelists for a specific supplier
- Create a new supplier pricelist
- Add one or many items to a pricelist
- Search priced items before quoting
- Cleanup checks, obsolete marking, and item maintenance
- Explaining Unity's margin/VAT helper expectations

## Primary commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- pricelists --supplier-id=18
npm run unity -- pricelist-create --pricelist-name="Klara Test" --currency-id=1 --supplier-id=18 --default-section-name="Default Section"
npm run unity -- pricelist-add-item --pricelist-id=29 --pricelist-entry-group-id=88 --part-code="KLARA-TEST-001" --description="Safe test item" --cost-price=115 --retail-price=190 --type-id=1
npm run unity -- pricelist-add-items --pricelist-id=29 --pricelist-entry-group-id=88 --items-json='[{"part_code":"A","description":"B","cost_price":10,"retail_price":20,"type_id":1}]'
npm run unity -- search --supplier-id=18 --limit=20
npm run unity -- update-item --pricelist-entry-id=875 --description="Updated description"
npm run unity -- obsolete --pricelist-entry-id=875
```

## Important behavior

- Supplier-scoped listing works through `mcp_pricelists.asp?supplier_id=...`.
- Search also supports `--supplier-id=` for supplier-local cleanup/import work.
- Unity UI helper pages calculate excl VAT, incl VAT, margin %, and retail incl VAT before insert.
- Unity stores VAT-inclusive values in the DB.
- The CLI now mirrors the Unity helper by default for pricelist item creation:
  - default margin = `40%`
  - default VAT rate = `15%`
  - pass `--excl-vat-cost=` and it will compute VAT-inclusive `cost_price` and `retail_price`
  - override with `--margin-percent=` and/or `--vat-rate=` when needed
  - if you already know the final stored values, pass `--cost-price=` and `--retail-price=` directly
- `update-item` creates a replacement entry with updated values rather than mutating the original row in place.
- `obsolete` marks an existing item obsolete by date.


## Supplier quote ingestion rules

When Heinrich provides an official supplier quote/invoice for pricelist loading:

- Save the source document under `docs/tasks/source-docs/<project-or-site>/` and extract/summarize it under `docs/tasks/knowledge-base/<project-or-site>/` before or while loading Unity.
- Record supplier quote number, date, validity, line item part codes, descriptions, quantities, ex-VAT cost, VAT-inclusive cost basis, and the margin rule used.
- Unity stores VAT-inclusive `cost_price` and `retail_price`. If the source gives ex-VAT values, convert to VAT-inclusive at the applicable VAT rate before writing final stored prices, or use `--excl-vat-cost` with the correct margin.
- Software rule from Heinrich: use **50% margin** for software/licences unless he overrides it for the specific quote. In stored VAT-inclusive terms, software retail = VAT-inclusive supplier cost / 0.50. Use `--margin-percent=50` when loading software from ex-VAT costs.
- For non-software hardware, keep the normal/current quote discipline unless a supplier-specific margin is supplied. The CLI helper default remains 40% margin.
- Prefer exact supplier part codes for official price entries, and include the supplier quote reference in the description when it helps future cleanup/search.
- Current Unity MCP create endpoint has shown locale issues with decimal `cost_price`/`retail_price` writes; if decimal supplier values fail, round the Unity stored prices to whole Rand and preserve the exact cents in the knowledge-base source extract.

## Read before acting

- `docs/runbooks/unity-cli.md`
- `skills/unifier-unity/references/integration-surface.md`
- `/home/klara/dev/unity/add-pricelist-items.asp`
- `/home/klara/dev/unity/edit-pricelist-item.asp`
