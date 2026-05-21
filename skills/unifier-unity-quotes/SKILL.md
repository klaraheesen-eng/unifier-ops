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
- Remove priced items from a quote
- Clear quote items when needed for testing
- List quote items
- Update quote header fields
- Add bundles to a quote
- Remove bundles from a quote via quote line removal

## Primary commands

```bash
cd /home/klara/dev/unifier-ops
npm run unity -- quotes --status-name="In Queue" --limit=20
npm run unity -- lead-create --lead-short-name="Klara CLI E2E" --lead-details-name="Klara Test"
npm run unity -- quote-create-from-lead --lead-id=10954 --opportunity-type-id=1
npm run unity -- quote-add-item --quote-id=2539 --part-code=EYE-BIO-INST --qty=1
npm run unity -- quote-remove-item --quote-id=2539 --part-code=EYE-BIO-INST
npm run unity -- quote-clear-items --quote-id=2539
npm run unity -- quote-items --quote-id=2539
npm run unity -- quote-update --quote-id=2539 --customer-po-number="PO-TEST-001"
npm run unity -- bundle-add-to-quote --bundle-id=18 --quote-id=2539 --bundle-quantity=1
npm run unity -- bundle-remove-from-quote --quote-id=2539 --part-code="Klara MCP Test Bundle 2026-04-22"
```


## Software / HikCentral quoting rule

When quoting HikCentral, ANPR/VMS software, or similar software/licence stacks:

- Use current official supplier pricing if Heinrich has provided it and it has been loaded into Unity.
- Software/licence lines should use Heinrich's **50% margin** rule unless explicitly overridden.
- Include the required base licence/module prerequisites, not only the per-channel expansion licence. For HikCentral ANPR, quote **one ANPR licence per ANPR camera/channel**.
- Include a suitable workstation/server for the software unless the client explicitly provides one or Heinrich says to exclude it. For HikCentral, search for existing Sensor workstation/server lines (for example `workstation`, `HikCentral`, or `WS-XL04`) and pick a fit-for-purpose item before sending the quote.
- If replacing provisional software or camera lines, remove stale quote lines first, then add the exact updated part codes and verify `quote-items` afterwards.

## Important behavior

- `quote-create-from-lead` currently needs careful validation. On 2026-04-22 it returned success but no `quote_id` / `opportunity_id` in CLI output for a live test lead, so agents should verify creation immediately instead of trusting the return payload blindly.
- For quote composition, prefer searching items first, then adding exact part codes.
- Quote line removal currently works by part code through `mcp_quote_items_remove.asp`.
- Bundle removal from a quote is handled through quote line removal using the bundle line part code.
- For bundle quoting, use the bundle skill or bundle commands from the same CLI.
