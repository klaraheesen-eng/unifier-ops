# Unifier systems overview

This note orients agents and operators on **which repo owns what** and how pieces connect.

## Systems

1. **Unity (CRM)** — Classic ASP on IIS at `https://www.unifier.co.za/unity/`. Source, deployment, logging, and MCP live in `/home/klara/dev/unity`.

2. **Marketing stack** — Dashboard, SEO tooling, GA4, Search Console, WordPress integration notes in `/home/klara/dev/unifier-marketing`.

3. **Unifier Ops (this repo)** — Durable **operations** memory: runbooks, process, cross-links, and “how we work” that is neither pure marketing nor raw Unity source.

## Typical flows

- **Deploy a CRM fix** — Edit and test in `unity` → smoke test → GitHub production deploy workflow or `deploy.sh` per Unity README.
- **Quote/lead automation** — Unity MCP tools via relay; auth and endpoints documented in Unity `skills/unifier-unity/`.
- **Marketing campaign or dashboard** — `unifier-marketing` and its `AGENTS.md`.

## When to update this repo

Update `unifier-ops` when you document:

- Operational procedures that apply across CRM and tooling.
- Stable facts about how deploy/MCP/logging fit together (without duplicating Unity’s full README).
- Interpretation of **raw imports** (`raw/*.csv`, `manifest.json`) — see [`internal/raw-provenance.md`](internal/raw-provenance.md).

When in doubt, **link** to the Unity or marketing repo instead of copying long procedures.

## Raw-driven knowledge

Snapshot exports and Drive manifests live under `raw/`; derived notes and procedures are under `docs/` and `data/derived/`. See [`internal/repo-map.md`](internal/repo-map.md).
