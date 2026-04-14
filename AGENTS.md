# AGENTS.md - Unifier Ops Repo

This repo is the home base for **Unifier operations** work: CRM-related flows, Unity deployment and operations, runbooks, and coordination between marketing and technical systems.

## First rule

When starting any new task in this chat or repo:

1. Read this file first.
2. Use [`docs/overview.md`](docs/overview.md) to pick the right subsystem.
3. Gather only the context needed for the task.
4. Update durable docs here when you learn something reusable.

## Purpose

Centralize:

- How Unifier **operations** are supposed to run (Unity CRM, MCP, deploy, smoke tests).
- Operational runbooks and troubleshooting notes that are not marketing-specific.
- Pointers to authoritative repos (`unity`, `unifier-marketing`) so agents do not duplicate or drift.
- **Imported raw data** (`raw/`) interpreted into procedures, customer context, and reference docs - **Unity remains canonical** for live CRM.
- **Unity-first ops:** job cards, install schedules, pricelists, shopping lists, and quote pipeline are **in Unity** (`/home/klara/dev/unity`). `raw/` Google/CSV material is mostly **historic**; use MCP or the **Unity CLI** below for current data.

## Repo map - where to find what

Read [`docs/internal/repo-map.md`](docs/internal/repo-map.md) first for navigation. Condensed index:

### Core operating instructions

- `AGENTS.md` — rules, scope, this map pointer
- `docs/internal/repo-map.md` — full navigation index
- `docs/internal/raw-provenance.md` — what `raw/` contains and how it relates to Drive/Unity
- `docs/tasks/` — task tracking system and working memory
- `docs/tasks/INDEX.md` — task index across backlog, in-progress, and done
- `docs/tasks/COMPLETION_LOG.md` — chronological completion log
- `docs/tasks/templates/task-template.md` — standard task structure
- `docs/tasks/source-docs/` — copied raw source documents needed to complete tasks
- `docs/tasks/knowledge-base/` — markdown extracts and reusable reference material from source docs
- `docs/tasks/worknotes/` — optional scratch notes grouped by project or site

### Raw imports and derived data

- `raw/manifest.json` - Google Docs/Sheets catalog with `webViewLink`s
- `raw/Unifier Claims.csv` - CRM quotes export (PII; historical snapshot)
- `raw/Statement of Account.csv` - Unifier template statement
- `raw/CGR Statement 19 06 2023.csv` - CGR / Fuel Me statement (duplicate path variant under `raw/CGR Statement 19/06/2023.csv`)
- `raw/README.md` - quick file list
- `data/derived/` - optional summaries; see `data/derived/claims-export-snapshot.md`

### Unity live operations (prefer over raw exports)

- `docs/reference/unity-scheduling-and-jobcards.md` - schedules, job cards, shopping list (Unity canonical)
- `docs/runbooks/unity-cli.md` - **`npm run unity`** CLI against `mcp_*.asp` (`.env`: `UNITY_MCP_TOKEN`)
- `skills/unifier-unity-cli/SKILL.md` - OpenClaw/Cursor skill stub for the CLI
- `unity/skills/unifier-unity/` (in `dev/unity`) - authoritative MCP tool semantics

### Reference (from raw extraction)

- `docs/reference/crm-quote-statuses.md` - quote status values
- `docs/reference/lead-channel-taxonomy.md` - Bark, Leads, web, etc.
- `docs/reference/claims-export-columns.md` - CSV column meanings
- `docs/tasks/knowledge-base/cctv/connectivity-requirements.md` - CCTV connectivity prerequisite, fibre-first guidance, and fallback router options

### Knowledge Management & Hardware Datasheets

When new hardware datasheets, manuals, or technical specifications are provided (via upload or shared Google Drive links), you must maintain the indexing system:
1. **Save raw PDFs:** Place the original PDF documents in `datasheets/raw/`.
2. **Extract text:** Use `pdftotext` to extract the content and save the output in `datasheets/text/`.
3. **Index specifications:** Extract key metrics (ranges, power, dimensions, integrations) and save as `hardware-index/<model>-specs.txt`.
4. **Update Master Index:** Always update `hardware-index/MASTER_INDEX.md` with a summary of the new equipment, its primary use case, and file paths. This ensures future agents can easily query and allocate the correct hardware for client needs and quoting.

### Customers and finance

- `docs/customers/cgr-holdings-fuelme.md` - CGR / Fuel Me context
- `docs/customers/notable-commercial-accounts.md` - Buffalo, Bracken Lodge, Invest Gold, SkyCorp, Pizza Perfect (stubs)
- `docs/runbooks/ar-statements-and-reconciliation.md` - statements and AR checks

### Operations and incidents

- `docs/operations/callouts-training-and-site-docs.md` - Drive doc catalog
- `docs/operations/main-agent-subagent-workflow.md` - how to split chat vs deep repo work
- `docs/incidents/pharmaleaf-20231211.md` - incident doc link (body stays in Google)

### Workflow (Tesla-style)

- **Main assistant:** routing, approvals, live MCP/tool use, short task-focus updates.
- **Repo / sub-agent:** deep reading of `raw/` + `docs/`, evidence-based write-ups, no customer sends without approval.
- Details: [`docs/operations/main-agent-subagent-workflow.md`](docs/operations/main-agent-subagent-workflow.md).

## Scope boundaries

| Topic | Primary repo |
|--------|----------------|
| Marketing dashboard, SEO, GA4, Google Ads, WordPress content, public dashboard URL | `/home/klara/dev/unifier-marketing` |
| Unity CRM (Classic ASP), FTP/GitHub deploy, MCP endpoints, Sage/quoting internals | `/home/klara/dev/unity` |
| Ops runbooks, ops memory, "how we run Unifier" cross-cutting notes | **this repo** (`unifier-ops`) |

Default to **this repo** for **ops** Telegram/chat threads and for tasks that span CRM + process. Default to **marketing** for campaigns, dashboard, and SEO unless the task is explicitly operational.

## Important links

- Unity CRM (production): `https://www.unifier.co.za/unity/`
- Unity MCP path family (see Unity repo): `https://www.unifier.co.za/unity/mcp/`
- Marketing dashboard (public): `https://unifierdash.barberrylabs.dpdns.org`
- Company website: `https://unifier.co.za`

## Unity CRM and MCP (short)

- Canonical technical documentation: `/home/klara/dev/unity/README.md`
- Unity MCP skill: `/home/klara/dev/unity/skills/unifier-unity/SKILL.md`
- Integration surface: `/home/klara/dev/unity/skills/unifier-unity/references/integration-surface.md`

Secrets for MCP and CLI (never commit): `UNITY_MCP_TOKEN` (required for `scripts/unity-cli.mjs`); `UNITY_EDGE_AUTH_TOKEN` only for Cloudflare relay clients; optional `UNITY_BASE_URL`. See `.env.example`, [`docs/runbooks/unity-cli.md`](docs/runbooks/unity-cli.md), and the Unity skill.

## Operations model (how we run Unifier)

1. **Code changes** to Unity live in the `unity` repo; deploy via documented `deploy.sh` / GitHub Actions workflow with approval.
2. **Smoke tests** before production approval: Docker smoke tests in Unity repo (`docker-compose.smoke.yml`).
3. **CRM automation** via MCP relay: Cloudflare Worker in `unity/mcp-cf/`; Unity ASP endpoints under `unity/mcp/`.
4. **Marketing metrics and site content** live in `unifier-marketing` and WordPress; do not conflate with CRM deploy unless the task requires both.

## OpenClaw Telegram (ops chat)

- [`docs/openclaw-telegram-ops.md`](docs/openclaw-telegram-ops.md) - system prompt command for the ops Telegram group (`-5298149734`, [web chat](https://web.telegram.org/a/#-5298149734)).

## Core docs in this repo

- [`docs/overview.md`](docs/overview.md) - map of systems and responsibilities.
- [`docs/unity-crm.md`](docs/unity-crm.md) - Unity CRM entry points and agent workflow.
- [`docs/operations-model.md`](docs/operations-model.md) - end-to-end ops flow.
- [`docs/related-repos.md`](docs/related-repos.md) - links and paths.
- [`docs/access.md`](docs/access.md) - secrets and safe handling.
- [`docs/runbooks/unity-deploy.md`](docs/runbooks/unity-deploy.md) - deploy checklist (points to Unity).
- [`docs/runbooks/unity-cli.md`](docs/runbooks/unity-cli.md) - Unity MCP CLI (`npm run unity`) with `.env` credentials.
- [`docs/internal/repo-map.md`](docs/internal/repo-map.md) - detailed repo map (start here for file layout).

## Skills and tools

- Prefer **Cursor** / **OpenClaw** tooling already configured on this machine.
- **Unity MCP:** use the **unifier-unity** skill in `/home/klara/dev/unity` when the gateway exposes MCP tools.
- **Unity CLI:** from this repo, `npm run unity` with `UNITY_MCP_TOKEN` in `.env` - see [`skills/unifier-unity-cli/SKILL.md`](skills/unifier-unity-cli/SKILL.md) and [`docs/runbooks/unity-cli.md`](docs/runbooks/unity-cli.md).
- Use **browser** tools when inspecting live CRM pages or auth flows.
- For sharing generated deliverables with humans, prefer Google Drive via **gog** using the Klara account, then create an anyone-with-link reader share link and send that URL back in chat. When a PDF is needed, do **not** wrap a raster image inside a PDF if avoidable. Prefer creating the document as a proper Google Doc first, then export/download it as PDF so the result stays text-native and easier to edit.

## Access and secrets

Do not commit secrets. Use `.env` locally (see `.env.example`). For Unity FTP, deploy, and MCP tokens, follow the Unity repo and `docs/access.md`.

## Task operating rules

1. Every meaningful request must become a task file in `docs/tasks/backlog/`, `docs/tasks/in-progress/`, or `docs/tasks/done/`.
2. Use the standard task structure from `docs/tasks/templates/task-template.md`.
3. Task files are not just labels, they are the durable scratch pad for the work. Keep enough notes, evidence, and next actions in the task file so work can resume cleanly next session.
4. When a source document matters to a task, copy it into `docs/tasks/source-docs/<project-or-site>/`.
5. Always extract or summarize important source documents into markdown under `docs/tasks/knowledge-base/<project-or-site>/` so they are easy to search, reuse, and edit.
6. Link each task to its source documents and extracted markdown.
7. Keep `docs/tasks/INDEX.md` up to date whenever tasks are created, moved, or completed.
8. Keep `docs/tasks/COMPLETION_LOG.md` up to date whenever a task is completed.
9. Reusable insights should be added to the knowledge base or other durable docs in this repo.
10. Commit and push after each completed task.

## Definition of done

- Task completed with correct repo boundaries.
- The task file contains enough completion notes or evidence for future reference.
- If the learning is reusable, a doc under `docs/`, `docs/runbooks/`, or `docs/tasks/knowledge-base/` is updated.
- `INDEX.md` and `COMPLETION_LOG.md` are updated if task status changed.
- Commit and push after each completed task.
