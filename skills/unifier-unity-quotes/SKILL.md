---
name: unifier-unity-quotes
description: >
  Use the unifier-ops Unity CLI for lead-to-quote flows, quote retrieval, adding items,
  and adding bundles to quotes. Keep this skill narrow to quoting work.
---

# Unifier Unity Quotes

Use this skill when the task is specifically about creating or updating quotes.

## Use this for

- List and inspect quotes
- Create a lead
- Attempt quote creation from a lead
- Add priced items to a quote
- List quote items
- Update quote header fields
- Add bundles to a quote

## Primary commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- quotes --status-name="In Queue" --limit=20
npm run unity -- lead-create --lead-short-name="Klara CLI E2E" --lead-details-name="Klara Test"
npm run unity -- quote-create-from-lead --lead-id=10954 --opportunity-type-id=1
npm run unity -- quote-add-item --quote-id=2539 --part-code=EYE-BIO-INST --qty=1
npm run unity -- quote-items --quote-id=2539
npm run unity -- quote-update --quote-id=2539 --customer-po-number="PO-TEST-001"
npm run unity -- bundle-add-to-quote --bundle-id=18 --quote-id=2539 --bundle-quantity=1
```

## Important behavior

- `quote-create-from-lead` currently needs careful validation. On 2026-04-22 it returned success but no `quote_id` / `opportunity_id` in CLI output for a live test lead, so agents should verify creation immediately instead of trusting the return payload blindly.
- For quote composition, prefer searching items first, then adding exact part codes.
- For bundle quoting, use the bundle skill or bundle commands from the same CLI.
