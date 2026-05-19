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

## Bundle design rules

- A bundle should represent a **singular reusable concept**, not an entire site quantity, unless the bundle name explicitly says it is a multi-unit/site package.
  - Good: `KG-BOOM-GATE-ACCESS-EACH` = one boom/access point.
  - Then add the bundle to the quote at the needed quantity, e.g. quantity `4` for four boom gates.
  - Avoid encoding quote quantity into every component part code/description (`-X4`) unless the source line truly cannot be split.
- Bundle components should be real pricelist entries first, then added as bundle line items.
- A detailed/internal bundle should **show the component line items** so the buying/scope breakdown is inspectable.
- When converting a multi-unit supplier quote into a reusable bundle, divide component quantities/cost/retail down to the single concept before creating the component pricelist items. Re-check margin after rounding.
- Keep customer-facing bundle/line descriptions clean: do not expose subcontractor/supplier names unless explicitly approved.

## Quote-total gotcha and quote-safe workaround

- **Quote total gotcha:** current Unity quote total calculation can duplicate the parent bundle sell price once per bundle buying line when a multi-line bundle is added to a customer quote.
- Until Unity's quote total calculation is fixed and verified:
  - Keep the detailed multi-line bundle as an internal/not-for-quote reference if needed.
  - For live customer quotes, use a quote-safe bundle with **one package pricelist item** as its only bundle item, but keep the detailed component bundle/pricelist lines available for inspection.
  - Add the quote-safe singular bundle at the required quote quantity.
- If a multi-line bundle is accidentally added to a quote, immediately verify the quote total; if inflated, remove it and replace with the quote-safe package bundle.
