# AGENTS.md — Unifier Ops Repo

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

## Scope boundaries

| Topic | Primary repo |
|--------|----------------|
| Marketing dashboard, SEO, GA4, Google Ads, WordPress content, public dashboard URL | `/home/klara/dev/unifier-marketing` |
| Unity CRM (Classic ASP), FTP/GitHub deploy, MCP endpoints, Sage/quoting internals | `/home/klara/dev/unity` |
| Ops runbooks, ops memory, “how we run Unifier” cross-cutting notes | **this repo** (`unifier-ops`) |

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

Secrets for MCP (never commit): `UNITY_MCP_TOKEN`, `UNITY_EDGE_AUTH_TOKEN`; optional `UNITY_BASE_URL`. See Unity skill and `.env.example` in this repo for naming only.

## Operations model (how we run Unifier)

1. **Code changes** to Unity live in the `unity` repo; deploy via documented `deploy.sh` / GitHub Actions workflow with approval.
2. **Smoke tests** before production approval: Docker smoke tests in Unity repo (`docker-compose.smoke.yml`).
3. **CRM automation** via MCP relay: Cloudflare Worker in `unity/mcp-cf/`; Unity ASP endpoints under `unity/mcp/`.
4. **Marketing metrics and site content** live in `unifier-marketing` and WordPress; do not conflate with CRM deploy unless the task requires both.

## OpenClaw Telegram (ops chat)

- [`docs/openclaw-telegram-ops.md`](docs/openclaw-telegram-ops.md) — system prompt command for the ops Telegram group (`-5298149734`, [web chat](https://web.telegram.org/a/#-5298149734)).

## Core docs in this repo

- [`docs/overview.md`](docs/overview.md) — map of systems and responsibilities.
- [`docs/unity-crm.md`](docs/unity-crm.md) — Unity CRM entry points and agent workflow.
- [`docs/operations-model.md`](docs/operations-model.md) — end-to-end ops flow.
- [`docs/related-repos.md`](docs/related-repos.md) — links and paths.
- [`docs/access.md`](docs/access.md) — secrets and safe handling.
- [`docs/runbooks/unity-deploy.md`](docs/runbooks/unity-deploy.md) — deploy checklist (points to Unity).

## Skills and tools

- Prefer **Cursor** / **OpenClaw** tooling already configured on this machine.
- For Unity MCP actions in chat, use the **unifier-unity** skill in the Unity repo when the gateway exposes MCP.
- Use **browser** tools when inspecting live CRM pages or auth flows.

## Access and secrets

Do not commit secrets. Use `.env` locally (see `.env.example`). For Unity FTP, deploy, and MCP tokens, follow the Unity repo and `docs/access.md`.

## Definition of done

- Task completed with correct repo boundaries.
- If the learning is reusable, a doc under `docs/` or `docs/runbooks/` is updated.
- Meaningful progress is committed and pushed when appropriate.
