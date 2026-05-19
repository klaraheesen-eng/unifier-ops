# Hide zero-retail quote item search results

## Status
Done — 2026-05-19

## Request
Heinrich asked that Unity's add-quote-item search hide pricelist items with zero retail value when adding items to quotes, e.g. `add-quote-item.asp?quote_id=2591&quote_entry_group_id=3491`.

## Changes
- Updated `/home/klara/dev/unity/add-quote-item.asp` search SQL to exclude:
  - obsolete items: `(obsolete_date IS NULL OR CONVERT(date, obsolete_date) > CONVERT(date, GETDATE()))`
  - zero/blank retail items: `(pricelist_entry_rrp IS NOT NULL AND pricelist_entry_rrp > 0)`

## Deployment
- Deployed `add-quote-item.asp` to Unity production via FTP/curl.
- Initial Unity commit: `152bbc6` (`Hide zero-retail quote item search results`).
- Follow-up Unity commit after live screenshot still showed `R0.00` rows: `20c604a` (`Strengthen zero-retail quote search filtering`).

## Verification
- Local diff/syntax placement check passed.
- Downloaded the production file back over FTP and confirmed the stronger filter is present in the live file.
- Public unauthenticated smoke request returned HTTP `302` to login/object-moved as expected for a protected Unity page; live functional test requires logged-in browser session.

## Test link
- https://www.unifier.co.za/unity/add-quote-item.asp?quote_id=2591&quote_entry_group_id=3491
