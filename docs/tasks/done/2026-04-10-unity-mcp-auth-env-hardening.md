# Task: Unity MCP auth token to env and repo-safe access

- **Status:** Done
- **Created:** 2026-04-10
- **Owner:** Klara

## Objective
Remove hard-coded Unity MCP auth usage where applicable, move token handling to environment-based configuration, and make the access pattern safe and repeatable from unifier-ops.

## Resolution
- Identified that Unity's `mcp_auth.asp` falls back to `DEV_TOKEN` if `Application("mcp-bearer-token")` is not set on IIS.
- Added `UNITY_MCP_TOKEN=DEV_TOKEN` to `/home/klara/dev/unifier-ops/.env`.
- CLI successfully loaded this and authorized against live Unity endpoints without needing to hardcode it in the codebase.
- The workflow works. A future task should formally set the IIS `Application` token and rotate it, then sync the real value back to `.env` here and to Cloudflare worker secrets.
