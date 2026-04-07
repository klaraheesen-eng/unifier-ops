# CRM quote statuses (from `raw/Unifier Claims.csv`)

This reference reflects a **point-in-time export** in `raw/Unifier Claims.csv`. Unity may add or rename statuses; verify in live CRM when behaviour matters.

## Status values observed

| Status | Role (operational meaning) |
|--------|----------------------------|
| **Cool** | Active pipeline / not stalled (largest bucket in snapshot) |
| **In Queue** | Often paired with a **R0** quote line for the same opportunity — treat as **draft or alternate line** pending configuration |
| **Full Payment Made** | Payment complete; useful for AR and claim timing |
| **Final Invoice Sent** | Billing dispatched; follow up payment if needed |
| **Site Survey Needed** | Pre-sales / survey step before quoting |
| **Warm** | Intermediate temperature (rare in snapshot) |
| **PO Received** | Purchase order received |
| **Phone Call Needed** | Explicit phone follow-up |
| **Special Project** | Non-standard engagements (e.g. large scope) |
| **Frozen** | On hold or paused |

## Approximate frequency (snapshot)

From a simple field split on the export (quoted commas may skew counts slightly):

- Cool — majority of open pipeline rows
- Full Payment Made — large closed bucket
- In Queue — notable minority (often zero-value companion quotes)

## Related columns

- **Age** — Relative age string (`N days old`, `N month old`, etc.).
- **Quote Total / Margin / GP %** — Commercial; confirm currency context (ZAR `R`).
- **Claim Date** — Mix of `FALSE` and text month ranges in the snapshot; align with internal **claims** process before reporting.

## Unity alignment

Statuses are enforced in Unity CRM UI and reporting. For automation, prefer MCP `quotes_get` and related tools with explicit filters rather than assuming CSV column names match API fields.
