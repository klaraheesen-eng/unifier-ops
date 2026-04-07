# Raw folder — provenance and sensitivity

## Purpose of `raw/`

The `raw/` directory holds **imports and snapshots** used to bootstrap ops knowledge and historic Google Drive catalog metadata. It is **not** the system of record for live CRM, **job cards**, **schedules**, or **pricelists** — **Unity** is. Most manual spreadsheet/Docs workflows have been **moved into Unity**; treat Drive-linked names in `manifest.json` as **archive or secondary** unless you confirm they are still maintained.

**Live operations:** quotes, pipeline, scheduling, job cards, shopping lists → Unity ([`../reference/unity-scheduling-and-jobcards.md`](../reference/unity-scheduling-and-jobcards.md)).

## Files

### `manifest.json`

Export manifest from **Google Drive** (or compatible tool). Each entry includes:

- `id` — Google file id
- `name` — human title
- `mimeType` — `document` or `spreadsheet`
- `parents` — optional folder labels such as `Operational`, `Clients`
- `output` — suggested export filename (often `.docx` / `.xlsx`)
- `webViewLink` — **canonical link** to open the live Google file

Use this manifest to locate **operational** documents (callouts, training, incident reports) without duplicating their full text in git. See [`../operations/callouts-training-and-site-docs.md`](../operations/callouts-training-and-site-docs.md) for a grouped catalog.

### `Unifier Claims.csv`

Spreadsheet export from Unity CRM (or reporting pipeline) with columns including:

`ID`, `Age`, `Status`, `Quote`, `Customer`, `Contact`, `Opportunity`, `Quote Total`, `Margin`, `GP %`, `ACTIONS`, `Scheduled date`, `Claim Date`

- **Snapshot date:** implied by “Age” column (e.g. “11 days old”) — treat as **historical** once imported.
- **Claim Date** column mixes boolean `FALSE` and occasional month labels (e.g. `Oct & Nov 2022`); confirm meaning in current Unity workflow before automating.

### `Statement of Account.csv`

Short template/example statement for **Unifier (PTY) LTD** with placeholder client fields (`>company name<`, etc.) and sample 2022 deposit/invoice lines. Use for **format reference**, not live balances.

### CGR statement CSVs (two paths, same content)

- `CGR Statement 19 06 2023.csv`
- `CGR Statement 19/06/2023.csv`

Both contain the **same** statement for **CGR Holdings** / **Roger Barradas** (Fuel Me), issue date **01/06/2023**. The path with slashes is awkward on some filesystems; **prefer the flat filename** for new copies.

Content includes: invoices, payments, a **double payment** line, a note on **cloud storage not installed**, and adjustment lines. Detailed interpretation is in [`../customers/cgr-holdings-fuelme.md`](../customers/cgr-holdings-fuelme.md) and [`../runbooks/ar-statements-and-reconciliation.md`](../runbooks/ar-statements-and-reconciliation.md).

## Sensitivity

- `raw/` may contain **PII** (names, phones, emails, addresses) and **commercial** figures.
- Do not paste raw rows into public channels; prefer aggregates or redacted excerpts.
- When refreshing exports, **replace** files deliberately and note the refresh date in `data/derived/` or a runbook.

## Binary exports (local only)

`.docx`, `.pdf`, and `.xlsx` files next to `raw/` imports are **gitignored** to avoid bloating the repo. They may exist on disk from Drive export; **`webViewLink` in `manifest.json`** remains the canonical pointer.

## Relationship to Unity

For current quote/opportunity state, use Unity (`/home/klara/dev/unity`) and MCP tools documented in `unity/skills/unifier-unity/`. Re-import `raw/Unifier Claims.csv` periodically if offline analysis is required.
