# Lead and opportunity naming taxonomy

Opportunity and quote titles in `raw/Unifier Claims.csv` use **bracketed segments**. This is a **convention reference** for parsing and triage — not guaranteed for every row.

## Common prefixes

| Pattern | Interpretation |
|---------|----------------|
| `[Bark]` | **Bark** lead source / partner channel |
| `[Leads]` | Direct or marketing **leads** (often website or inbound) |
| `[Heinrich]` | Internal or direct-assigned **Heinrich** pipeline |
| `[Unifier]` | House **Unifier** naming |
| `[Phone]` | Phone-originated lead |
| `[Lead Souce]` | Typo for “Lead Source” in at least one row — treat as same class as `[Leads]` |

## Title shape (typical)

```
Unifier Quote - [Channel] [Contact or label] [Area] [camera count or qualifier]
```

Examples from data:

- `Unifier Quote - [Bark] [Marghon] [eladuspark] [4]`
- `Unifier Quote - [Leads] [Ecohygiene] [Midrand] [8]`

## Non-bracket sources

Rows may instead say:

- `Chat log from site www.unifier.co.za`
- `Website Contact from Unifier`
- `Facebook: …` / `FB: …`
- `Bark:` prefix without brackets
- `WhatsApp …` / `RE:` email threads

## Customer type column

**Customer** values include `Private`, named companies (e.g. `CGR Holdings (Pty)Ltd`, `Buffalo International Logistics Pty Ltd`), estates, and test entries (e.g. `Test ABC`).

## Ops use

- **Routing:** Match channel to responsible owner (Bark vs web vs partner) per current business rules.
- **Reporting:** When building dashboards, normalize `[Lead Souce]` → `Lead Source` for clean aggregates.
- **Privacy:** Contact names in titles are PII; redact in external reports.
