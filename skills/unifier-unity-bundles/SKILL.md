---
name: unifier-unity-bundles
description: >
  Use the unifier-ops Unity CLI for bundle listing, bundle creation, bundle item management,
  and adding bundles to quotes in Unity.
---

# Unifier Unity Bundles

Use this skill when the task is specifically about Unity bundles.

## Use this for

- List available bundles
- Create or update a bundle
- Add one or many pricelist entries to a bundle
- Add an existing bundle to a quote

## Primary commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- bundles
npm run unity -- bundle-create --bundle-name="Klara Test Bundle" --bundle-description="Safe internal test bundle" --bundle-sell-price=1170 --bundle-status=Active
npm run unity -- bundle-update --bundle-id=18 --bundle-name="Klara Test Bundle" --bundle-sell-price=1200
npm run unity -- bundle-add-item --bundle-id=18 --pricelist-entry-id=875 --quantity=1 --item-price=190 --description="Safe test item 1"
npm run unity -- bundle-add-items --bundle-id=18 --items-json='[{"pricelist_entry_id":876,"quantity":2,"item_price":390}]'
npm run unity -- bundle-add-to-quote --bundle-id=18 --quote-id=2539 --bundle-quantity=1
```

## Important behavior

- Bundle header writes go through `mcp_bundles.asp`.
- Adding a bundle to a quote creates a parent quote entry and underlying buying lines for each bundle item.
- Use safe test bundles when validating flows.
