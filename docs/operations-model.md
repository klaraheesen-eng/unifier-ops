# Unifier operations model

This describes **how Unifier operations are intended to run**, at a level suitable for agents coordinating CRM, deploy, and business tooling.

## Principles

1. **Single source of truth per domain** — Unity code in `unity`; marketing workflows in `unifier-marketing`; ops memory and cross-cutting runbooks here in `unifier-ops`.

2. **Deploy with a checklist** — Prefer GitHub-approved production deploy for Unity when that is the team standard; otherwise follow Unity README for script-based deploy. Always consider rollback (workflow dispatch in Unity README).

3. **Verify before production** — Run Unity smoke tests when changing server-visible behavior; use documented curl checks where applicable.

4. **Secrets stay out of git** — FTP, MCP tokens, and OAuth material live in `.env` or secret stores only.

5. **MCP for automation** — Programmatic CRM actions go through the documented MCP relay and Unity endpoints, not ad-hoc scraping of internal pages unless explicitly required.

## Repositories

| Repo | Role |
|------|------|
| `dev/unity` | CRM codebase, MCP, deploy, logs |
| `dev/unifier-marketing` | Dashboard, SEO, WordPress, marketing AGENTS |
| `dev/unifier-ops` | Ops memory, runbooks, coordination |

## Handoff between marketing and ops

- Customer-facing content, analytics dashboards, and SEO: **marketing repo**.
- Quote status, pipeline, Sage-side CRM behavior, MCP: **Unity repo** + this repo’s pointers.

When a task touches both, start from the repo that owns the **primary risk** (e.g. production CRM change → Unity), then update `unifier-ops` if the combined workflow should be documented once.
