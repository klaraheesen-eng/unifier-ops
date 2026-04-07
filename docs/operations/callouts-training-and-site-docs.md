# Operational documents catalog (from `raw/manifest.json`)

**Context:** Unity now owns **scheduling, job cards, pricelists, and related CRM workflow**. Entries below come from a **Drive export manifest** and are largely **historic or parallel** documentation. For **current** installs, schedules, and PDFs, use Unity ([`../reference/unity-scheduling-and-jobcards.md`](../reference/unity-scheduling-and-jobcards.md)) and MCP/CLI — not these Doc titles alone.

The following Google Workspace files were indexed in `raw/manifest.json`. **Live content** may still exist in Drive; verify whether each doc is still maintained before relying on it.

## How to use

1. Open the **`webViewLink`** for the current document (see manifest in repo).
2. If a name appears twice with different ids, treat them as **duplicate exports** until someone confirms which is canonical in Drive.

## Grouped by topic

### Callout detail records

| Topic | Google Docs (examples) | Notes |
|--------|-------------------------|--------|
| 13 June callout | `13 June Callout details` (two doc ids in manifest) | Pair may be duplicate |
| 31 August callout | `31 August Callout details` (two doc ids) | Pair may be duplicate |
| Generic | `Callout details` (two doc ids) | Template or general callout log |

### Training

| Name | Parent folder | Output name |
|------|---------------|-------------|
| Admin training | `Operational` | `Admin training.docx` (duplicate ids in manifest) |

### Customer / incident

| Name | Parent folder | Notes |
|------|---------------|--------|
| Incident Report-PharmaLeaf 20231211 | `Clients` | PharmaLeaf incident; date in title |

### Site / product notes

| Name | Parent folder | Notes |
|------|---------------|--------|
| Links - how to disable HikConnect notifications | `Operational` | Hikvision / HikConnect operator note |

### Job cards

| Name | Notes |
|------|--------|
| Job Card_Mike Rogers May22 | Duplicate doc ids in manifest |
| Job Card_Quade Africa | Duplicate doc ids in manifest |

### Spreadsheets (financial / CRM)

| Name | Notes |
|------|--------|
| CGR Statement 19 06 2023 | See `raw/` CSV copies + [`../customers/cgr-holdings-fuelme.md`](../customers/cgr-holdings-fuelme.md) |
| CGR Statement 19/06/2023 | Second Sheet id — cross-check vs first |
| Statement of Account | Under `Operational` in manifest; matches template-style `raw/Statement of Account.csv` |
| Unifier Claims | Matches `raw/Unifier Claims.csv` export pattern |

## Maintenance

When new operational docs are added in Drive:

1. Re-export or refresh `raw/manifest.json` if your tooling supports it.
2. Add a one-line entry under the right heading in this file **or** rely on manifest-only discovery and link from [`../internal/raw-provenance.md`](../internal/raw-provenance.md).
