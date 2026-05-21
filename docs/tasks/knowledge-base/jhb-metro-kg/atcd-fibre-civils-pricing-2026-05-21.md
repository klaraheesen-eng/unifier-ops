# ATCD fibre/civils pricing — KG Jhb Metro quote

Source: Heinrich pasted supplier WhatsApp pricing in Unifier Ops Telegram on 2026-05-21.

Supplier context:
- Existing Unity supplier: `ATC Divergence` / `ATCD` (supplier id `21`).
- Supplier said prices are from ATCD and are **ex VAT**.
- Supplier comment: there is not much margin; use better prices later or add **10%** now.
- Applied quoting rule for this load: cost = supplier ex VAT + 15% VAT; retail = VAT-inclusive cost / 0.90 (10% margin), rounded to whole Rand for Unity storage.

## Supplier unit costs captured

| Item | Supplier ex VAT unit | Quote qty assumption | Unity retail basis |
|---|---:|---:|---|
| Paving trench including reinstatement | R180 per metre | 400m | 400m route retained per Heinrich. |
| Splice plus OTDR test | R140 each | 10 | Interpreted as 10 splice/test events. |
| 4-core drop cable | R8 per metre | 3 x 400m runs | Loaded as one 400m run item, qty 3, because Heinrich said 3 fibres made by them. |
| 50mm sleeves | R2,700 per 100m | 4 x 100m | Covers 400m route. |
| 400R handhole / handle | R1,400 each | 4 | Assumed handholes/access points along route. |
| TP complete | R100 each | 6 | LC connectors included in TP, per supplier clarification. |
| 6U outdoor cabinet | R6,000 each | 2 | Heinrich instructed assume cabinets x2; supplier suggested 6U outdoor at R6k where needed. |
| LC fly leads | R80 each | 6 | Assumed one per TP/cabinet handoff path; patch leads still needed from TP to cabinet/router/switch. |

## Clarifications from chat

- LC connectors are included in `TP complete`.
- Patch/fly leads are still needed from the termination point to the cabinet/router/switch.
- Supplier can supply fly leads.
- Supplier prefers keeping equipment indoor where possible, but 6U outdoor cabinets can be used; for KG boom/security-hut assumptions, x2 outdoor cabinets are allowed.
- Switch type depends on project size; switches remain Unifier-selected/quoted separately.

## Unity load notes

- Created/used new ATCD KG fibre/civils pricelist for the official unit costs.
- Use these line items to replace the provisional KG civil/fibre/cabinet allowance on Q-2591.
