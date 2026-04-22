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
- CLI/MCP writes expect the final VAT-inclusive stored values:
  - `cost_price` = incl VAT buy
  - `retail_price` = incl VAT sell
- As of 2026-04-22, `update-item` and `obsolete` are blocked live by a Unity-side `mcp_auth.asp` compile error. Treat cleanup mutations as currently broken until that server defect is fixed.

## Read before acting

- `docs/runbooks/unity-cli.md`
- `skills/unifier-unity/references/integration-surface.md`
- `/home/klara/dev/unity/add-pricelist-items.asp`
- `/home/klara/dev/unity/edit-pricelist-item.asp`
