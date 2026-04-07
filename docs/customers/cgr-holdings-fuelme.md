# CGR Holdings / Fuel Me (Roger Barradas)

Durable context extracted from `raw/Unifier Claims.csv` and CGR statement CSVs (`CGR Statement 19 06 2023.csv`). **Verify live** contacts and balances in Unity/Sage before financial actions.

## Entity

- **Company (statement):** CGR Holdings  
- **Contact:** Roger Barradas  
- **Email:** roger@fuelme.biz  
- **Phone:** 081 002 9743  

## Address (statement header)

- Cnr Steenbras and Dekema street, Wadeville, Germiston, **1428**  
- **VAT:** 4380286932  

## Relationship to Unifier work

From claims export, recurring themes include:

- **Fuel Me** cloud storage, monthly maintenance, additional HDD, screens, conduit reroute  
- **Andre (Fuel Me)** as contact on several quotes  
- Quotes reference **CGR Holdings (Pty)Ltd** and **FuelMe (Pty) Ltd** naming variants — confirm legal entity per invoice

Example opportunity descriptions from data (abbreviated):

- `Unifier Quote_Fuelme - Monthly Maintenance` (L-6175)  
- `Fuelme cloud` / cloud storage options  
- `Roger Barradas Fuelme_8channel 2nd system` (large line ~R94k in historical data)  
- Callouts: `Unifier Callout_Fuelme 23 August`, switch for FuelMe, etc.

## Statement snapshot (01/06/2023 issue date)

The CGR statement CSV shows:

- Running invoice/payment lines from **2022–2023**  
- A line explicitly marked **Double Payment received** (same amount as a prior payment) — **reconcile** in accounting  
- Narrative: *Removed from statement- Cloud storage not installed yet.* with offsetting invoice lines (~R3,916) — ties **billing** to **delivery** status of cloud storage  

**Balance due** on subtotal block shows **credit** (negative balance due) in the export — treat as **accounting snapshot**, not live API output.

## Operational notes

1. **Cloud vs invoice:** If “cloud storage not installed,” align Unity job status, Sage lines, and customer communication before chasing payment.  
2. **Duplicate payments:** Investigate double payment before refund or credit note.  
3. **Entity naming:** Match `CGR Holdings` vs `Fuel Me` legal name on tax invoices per finance.

## Related docs

- [`../runbooks/ar-statements-and-reconciliation.md`](../runbooks/ar-statements-and-reconciliation.md)  
- Unity repo for CRM record detail  
