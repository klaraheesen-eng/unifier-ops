# Scheduling and job cards (Unity)

**Canonical source:** Unity CRM (`/home/klara/dev/unity`), not Google Drive exports in `unifier-ops/raw/`.

## Where it lives

| Concern | Unity surface |
|---------|----------------|
| Schedule installation / callout / site survey | `schedule-install.asp` — updates quote status (e.g. **Scheduled**), generates **job card PDF**, emails customer |
| Job card PDFs | Served under `https://www.unifier.co.za/unity/jobcards/` (see `schedule-install.asp` / `include-jobcard.asp`) |
| Shopping list for installs | `shopping-list.asp` — **Scheduled** installs (`quote_status_id = 810`), stock checklist linkage |
| Technician checklist | `technician-checklist.asp` — requires quote to be scheduled |
| Sign-off | `signoff.asp` / `signoff-generate.asp` — references job card sections |

## Operational flow (summary)

1. Quote moves through pipeline in Unity (statuses visible via MCP `quotes_get` / CLI).
2. Scheduling sets appointment and generates job card communication.
3. Field work and sign-off stay inside Unity pages and PDFs.

## Agent tooling

- **Live quotes / statuses:** `npm run unity -- quotes …` from `unifier-ops` (see [`../runbooks/unity-cli.md`](../runbooks/unity-cli.md)).
- **MCP tools** (when gateway exposes them): `unifier-unity` skill in Unity repo.

## Historic material in `raw/`

Google Docs such as “Job Card_Mike Rogers” or callout detail exports are **archive / pre-Unity-central** context only. Prefer Unity and MCP for anything current.
