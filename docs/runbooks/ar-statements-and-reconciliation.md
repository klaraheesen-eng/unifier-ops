# Runbook: statements of account and AR reconciliation

Guidance derived from raw **Statement of Account** examples and the **CGR** snapshot in `raw/`. Pair with Sage/accounting **source of truth**.

## Artifacts

| File | Use |
|------|-----|
| `raw/Statement of Account.csv` | Unifier letterhead template: company **2017/265961/07**, VAT **4010278515**, Olympus address, **FNB** branch **259745**, account **62707889244** |
| `raw/CGR Statement 19 06 2023.csv` | Customer-specific statement with live-style lines |

## Standard statement sections (Unifier side)

From template CSV:

- Prepared for: client name, email, cell  
- Company block, VAT number  
- Table: Date, Transaction, Description, Amount, Payments, Balance  
- Subtotals and **Balance Due**

## Reconciliation checklist

1. **Opening balance** — Matches prior closing or Sage AR ledger for that customer.  
2. **Invoices** — Each invoice number (e.g. `INV-…`) exists in Sage/Unity billing export.  
3. **Payments** — Bank deposits match **Payment received** lines; watch for **duplicate** entries (CGR snapshot shows “Double Payment received”).  
4. **Credits / adjustments** — Narrative lines (e.g. *Removed from statement — Cloud storage not installed yet*) require matching **credit note** or **revised invoice** in accounting.  
5. **Sign** — Negative “Balance Due” may mean **customer credit**; confirm before dunning.

## CGR-specific cues (from raw)

- **Double payment** — Resolve with finance before applying new charges.  
- **Cloud storage** — Billing vs install completion must align; ops and AR should use the same completion definition.

## When agents assist

- **Read-only:** explain line items and flags from CSV exports.  
- **Writes:** never post invoices or change Sage from this repo without explicit human approval and the right tool.  
- **Unity:** quote status `Full Payment Made` / `Final Invoice Sent` in CRM exports supports **collections narrative** but is not a substitute for bank reconciliation.

## Company legal (from template)

- **Unifier (PTY) LTD**  
- Company #: **2017/265961/07**  
- VAT #: **4010278515**  
- Address: **186 Arathorn Estate, Leander Road, Olympus, 0081**
