# Task: Unity MCP auth token to env and repo-safe access

- **Status:** In progress
- **Created:** 2026-04-10
- **Owner:** Klara

## Objective
Remove hard-coded Unity MCP auth usage where applicable, move token handling to environment-based configuration, and make the access pattern safe and repeatable from unifier-ops.

## Why
- Current workflow is brittle and partly undocumented
- unifier-ops CLI cannot run live MCP actions without the token available in env
- Heinrich requested env-based handling rather than leaving auth hard-coded in code paths

## Scope
- Inspect Unity-side code for hard-coded auth assumptions
- Identify current env/token sources already present on the machine
- Define the correct env contract for unifier-ops and Unity
- Make minimal code changes needed to use env-backed auth cleanly
- Document the access pattern in unifier-ops

## Notes
- Need to inspect Unity repo MCP auth helper and related config
- Avoid committing secrets
