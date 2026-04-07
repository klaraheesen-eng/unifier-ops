# Snapshot: `raw/Unifier Claims.csv`

Derived **statistics** for orientation (regenerate if CSV is replaced).

## Scale

- **Rows:** 391 data rows (excluding header), quote ids from **Q-0959** down to **Q-0414** in file order  
- **Export:** Unity CRM-style quote list with commercial columns  

## Status counts (approximate)

From `awk` on comma-separated field 3 (may miscount rows with embedded commas):

| Status | Count |
|--------|------:|
| Cool | 226 |
| Full Payment Made | 96 |
| In Queue | 26 |
| Final Invoice Sent | 20 |
| Site Survey Needed | 19 |
| Warm | 2 |
| Special Project | 2 |
| PO Received | 1 |
| Phone Call Needed | 1 |
| Frozen | 1 |

Use [`../../docs/reference/crm-quote-statuses.md`](../../docs/reference/crm-quote-statuses.md) for meanings.

## Notable line references (manual)

- Large pipeline example: **Q-0933** — `R150 000` quote, `[Bark] [Mary] [Midrand] [64]`  
- **CGR / Fuel Me** rows: search `CGR Holdings` or `Fuel` in `Customer` / `Opportunity` columns  
- **Test:** **Q-0889** — `test mr smith`, `Test ABC`  

## Claim Date column

Mix of `FALSE` and values like `Oct & Nov 2022`; confirm business rule in Unity before KPIs.
