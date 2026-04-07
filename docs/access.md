# Access and secrets

## Rules

- Never commit `.env`, tokens, passwords, or live credentials.
- Prefer `.env.example` in this repo for **variable names only**.

## Where secrets live by subsystem

| Subsystem | Document |
|-----------|----------|
| Unity FTP / deploy | `/home/klara/dev/unity/README.md`, `.env.example` in Unity |
| Unity MCP | `unity/skills/unifier-unity/SKILL.md`, `unity/mcp-cf/` Wrangler secrets |
| Marketing dashboard | `/home/klara/dev/unifier-marketing/marketing-dashboard/.env` (see marketing `AGENTS.md`) |

## This repo

- Copy `.env.example` to `.env` only if you add scripts that need MCP or other keys.
- Operational docs should describe **which** secret is needed, not the value.
