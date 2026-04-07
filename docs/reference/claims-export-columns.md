# `Unifier Claims.csv` column reference

Interpretation for `raw/Unifier Claims.csv` exports. **Field names** may differ in API/MCP — map before automation.

| Column | Description |
|--------|-------------|
| **ID** | Quote id, format `Q-NNNN` |
| **Age** | Human-readable age of row (`N days old`, `N month old`, `N months old`, `N year old`) |
| **Status** | Pipeline state — see [`crm-quote-statuses.md`](crm-quote-statuses.md) |
| **Quote** | Title / subject of quote (often includes product and channel hints) |
| **Customer** | Account name (`Private`, company, estate, or test) |
| **Contact** | Primary person (may be blank when **In Queue** duplicate line) |
| **Opportunity** | Longer description; usually includes **L-NNNN** lead/opportunity id |
| **Quote Total** | Currency string, ZAR `R` with South African formatting |
| **Margin** | Rand margin |
| **GP %** | Gross profit percent (may show `-%` when total is zero) |
| **ACTIONS** | Empty in snapshot — reserved or unused |
| **Scheduled date** | Empty in snapshot |
| **Claim Date** | `FALSE` or occasional month label — **confirm** business meaning |

## Opportunity id pattern

`L-#### (1)` appears inside opportunity text — useful for cross-reference to Unity leads.

## Duplicate rows

Same **Opportunity** may appear twice: one row **Cool** with totals, one **In Queue** with **R0** — likely **multi-version** or **draft** quote lines; confirm in CRM UI.
