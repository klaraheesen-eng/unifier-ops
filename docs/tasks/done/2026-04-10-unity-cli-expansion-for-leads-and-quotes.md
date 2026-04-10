# Task: Expand unifier-ops Unity CLI for lead and quote workflow

- **Status:** Done
- **Created:** 2026-04-10
- **Owner:** Klara

## Objective
Extend `scripts/unity-cli.mjs` so unifier-ops can drive the full lead-to-quote workflow without using MCP tools directly in chat.

## Target commands
- `lead-create`
- `lead-get` or `lead-list` if useful
- `quote-create-from-lead`
- `quote-add-item`
- `quote-items`
- `quote-update`

## Resolution
- Subagent completed the expansion for `lead-create`, `quote-create-from-lead`, `quote-add-item`, `quote-items`, and `quote-update`.
- Integrated output parsing where needed so Markdown table endpoints render as JSON output.
- Ensured `quote-update` hits `mcp_quote_update.asp?quote_id=XXX` using query string encoding.
- Adjusted CLI output directly to return `quote_url` values natively for generated leads and quotes.
- This is now live, merged into `main`, and fully functional from `/home/klara/dev/unifier-ops`.
