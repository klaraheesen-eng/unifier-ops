# Sensor Security QTGP0171606 — official supplier pricing for KG Boom / ANPR

Source: Sensor Security Systems (Pty) Ltd sales quote `QTGP0171606`, dated 2026-05-21, reference `Boom / ANPR`, attention Heinrich Heesen / Unifier Pty Ltd.

Raw source files:
- PDF: `docs/tasks/source-docs/jhb-metro-kg/sensor-security-QTGP0171606-boom-anpr.pdf`
- Text extract: `docs/tasks/source-docs/jhb-metro-kg/sensor-security-QTGP0171606-boom-anpr.txt`

## Supplier quote totals

- Subtotal ex VAT: R12,770.01
- VAT: R1,915.50
- Total incl VAT: R14,685.51
- Quote validity: 7 days from 2026-05-21, subject to exchange rate and availability.

## Official supplier line items

| Supplier part code | Description | Qty | Unit ex VAT | Unit incl VAT / cost basis | Notes |
|---|---|---:|---:|---:|---|
| `iDS-2CD7A46G2/P-IZHSY(2.8-12mm)` | ANPR 4MP bullet, 2.8-12mm lens, 50m IR, Wiegand output, 140dB WDR, 12VDC/PoE | 1 | R9,289.87 | R10,683.35 | Official Hikvision ANPR camera for KG ANPR replacement. |
| `HIKCENTRAL-P-VSS-BASE/0CH` | HikCentral base license | 1 | R885.72 | R1,018.58 | Software. Apply 50% margin for quote retail. |
| `HIKCENTRAL-ANPR-1CAMERA` | Hikvision HikCentral ANPR Channel License Software | 1 | R2,594.42 | R2,983.58 | Software. Apply 50% margin for quote retail. |

## Pricing rules captured from Heinrich

- Treat this uploaded Sensor quote as official supplier pricing when loading/updating Unity pricelists.
- For software, use **50% margin**. Unity stores VAT-inclusive values, so retail incl VAT = supplier cost incl VAT / 0.50.
  - `HIKCENTRAL-P-VSS-BASE/0CH`: R1,018.58 / 0.50 = R2,037.16 retail incl VAT.
  - `HIKCENTRAL-ANPR-1CAMERA`: R2,983.58 / 0.50 = R5,967.16 retail incl VAT.
- For non-software hardware, keep the normal pricelist margin discipline unless Heinrich gives a supplier-specific margin. Current Unity default helper is 40% margin.
- When quoting HikCentral/software, include a suitable workstation for the software unless the client explicitly supplies one.

## KG Q-2591 application notes

- Replace the older/provisional ANPR camera line with the official Sensor ANPR camera line.
- Add HikCentral base licence.
- Use the official ANPR channel licence pricing; quantity should match ANPR camera/channel count.
- Include a workstation suitable for HikCentral/software operation.
