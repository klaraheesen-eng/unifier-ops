# Task: Expand unifier-ops Unity CLI for lead and quote workflow

- **Status:** In progress
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

## Why
- Existing CLI only supports quotes list, pricelists, item search, and pricelist maintenance
- Operations work should be runnable from this repo with a stable CLI surface
- Heinrich wants the CLI to use whatever backend works, ideally the Unity MCP HTTP endpoints

## Validation goal
- Run the new commands successfully against live Unity from this repo once auth env is available
- Use them to support the CIA biometric quote workflow
