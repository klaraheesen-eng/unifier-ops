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
- Delete an incorrect bundle component
- Add an existing bundle to a quote

## Primary commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- bundles
npm run unity -- bundle-create --bundle-name="Klara Test Bundle" --bundle-description="Safe internal test bundle" --bundle-sell-price=1170 --bundle-status=Active
npm run unity -- bundle-update --bundle-id=18 --bundle-name="Klara Test Bundle" --bundle-sell-price=1200
npm run unity -- bundle-add-item --bundle-id=18 --pricelist-entry-id=875 --quantity=1 --item-price=190 --description="Safe test item 1"
npm run unity -- bundle-add-items --bundle-id=18 --items-json='[{"pricelist_entry_id":876,"quantity":2,"item_price":390}]'
npm run unity -- bundle-delete-item --bundle-id=18 --pricelist-entry-id=876
npm run unity -- bundle-add-to-quote --bundle-id=18 --quote-id=2539 --bundle-quantity=1
```

## Important behavior

- Bundle header writes go through `mcp_bundles.asp`.
- Adding a bundle to a quote creates a parent quote entry and underlying buying lines for each bundle item.
- Use safe test bundles when validating flows.

## Bundle design rules — mandatory

- A bundle must represent a **singular reusable concept**, not an entire site quantity, unless Heinrich explicitly asks for a site/multi-unit package.
  - Good: `KG-BOOM-GATE-ACCESS-EACH` = one boom/access point.
  - Then add that bundle to the quote at the needed quantity, e.g. quantity `4` for four boom gates.
  - Do **not** encode quote quantity into every component part code/description (`-X4`) unless the source line truly cannot be split.
- A bundle must contain **all of the actual component line items** for that singular concept.
  - Do **not** replace a proper line-item bundle with one generic/package component just to make the bundle simpler.
  - The bundle details page must show the component breakdown (hardware, labour, travel, containment, etc.) as bundle items.
- Bundle components must be real pricelist entries first, then added as bundle line items.
- When converting a multi-unit supplier quote into a reusable bundle, divide component quantities/cost/retail down to the single concept before creating the component pricelist items. Re-check margin after rounding.
- Keep customer-facing bundle/line descriptions clean: do not expose subcontractor/supplier names unless explicitly approved.

## Quote-total gotcha — do not let this change bundle design

- **Known Unity bug:** current Unity quote total calculation can duplicate the parent bundle sell price once per bundle buying line when a multi-line bundle is added to a customer quote.
- This bug must **not** be solved by making the master bundle a one-line package. The master bundle still needs all component line items.
- If a multi-line bundle inflates a live quote total:
  - treat it as a Unity calculation bug to fix or work around at the quote/calculation layer;
  - verify the live quote total immediately;
  - if needed as a temporary quote workaround, document it clearly and do not rename it as the canonical bundle design.
