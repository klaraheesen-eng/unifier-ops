# Repo map — where to find what

Read this section first when orienting on an ops task (pattern aligned with `tesla-support`).

## Core operating instructions

| Path | Purpose |
|------|---------|
| `AGENTS.md` | Rules of engagement, scope vs marketing vs Unity, repo map pointer |
| `docs/internal/repo-map.md` | This file: navigation index |
| `docs/internal/raw-provenance.md` | What lives under `raw/`, Drive catalog, sensitivity |
| `docs/reference/crm-quote-statuses.md` | Unity quote/opportunity **status** values seen in exports |
| `docs/reference/lead-channel-taxonomy.md` | Naming patterns: Bark, Leads, website, etc. |
| `docs/reference/access-control-quoting-checklist.md` | Qualification checklist for gates, locks, biometrics, intercoms, and mag lock suitability |
| `docs/reference/cctv-quoting-checklist.md` | Minimum CCTV quote qualification checklist based on Unity lead and site-survey questions |
| `docs/tasks/knowledge-base/cctv/connectivity-requirements.md` | CCTV prerequisite: fibre first, network cable to router required, LTE/4G/5G fallback options |
| `docs/customers/cgr-holdings-fuelme.md` | Durable context: CGR / Fuel Me (from raw statements + claims) |
| `docs/runbooks/ar-statements-and-reconciliation.md` | Statement-of-account workflows and reconciliation cues |
| `docs/operations/callouts-training-and-site-docs.md` | Operational Google Docs/Sheets catalog (from manifest) |
| `docs/operations/main-agent-subagent-workflow.md` | How to split chat vs repo-deep work |
| `docs/reference/unity-scheduling-and-jobcards.md` | Schedules & job cards — **Unity** (not Drive) |
| `docs/runbooks/unity-cli.md` | `npm run unity` — direct MCP HTTP from `.env` |
| `skills/unifier-unity-cli/SKILL.md` | Broad agent skill for the CLI |
| `skills/unifier-unity-pricelists/SKILL.md` | Focused skill for supplier pricelists, item creation, and cleanup |
| `skills/unifier-unity-bundles/SKILL.md` | Focused skill for bundle creation and bundle-to-quote workflows |
| `skills/unifier-unity-quotes/SKILL.md` | Focused skill for lead/quote composition workflows |
| `scripts/unity-cli.mjs` | Implementation |

## Raw imports and derived notes

| Path | Purpose |
|------|---------|
| `raw/manifest.json` | Google export index (Doc/Sheet ids and `webViewLink`s) |
| `raw/Unifier Claims.csv` | CRM export: quotes, margins, statuses, opportunities |
| `raw/Statement of Account.csv` | Template-style statement (placeholders) |
| `raw/CGR Statement 19 06 2023.csv` | Customer statement snapshot (CGR / Roger Barradas) |
| `raw/CGR Statement 19/06/2023.csv` | **Duplicate content** of the CGR CSV; prefer the flat filename |
| `data/derived/README.md` | Optional derived summaries; do not replace Unity |

## Authoritative technical repos

| Topic | Repo |
|-------|------|
| Unity CRM source, deploy, MCP | `/home/klara/dev/unity` |
| Marketing, dashboard, SEO | `/home/klara/dev/unifier-marketing` |

## External reference (secondary)

| Repo | When to use |
|------|-------------|
| `/home/klara/dev/tesla-support` | Pattern reference for ticket/repo structure, not Unifier business rules |
