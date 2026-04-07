# Runbook: Unity CRM deploy

## Goal

Ship Unity (`/home/klara/dev/unity`) changes safely to production.

## Before you start

1. Read `/home/klara/dev/unity/README.md` sections **Deployment**, **GitHub-Approved Production Deploy**, and **Rollback**.
2. Confirm you have FTP or GitHub Actions secrets as required for the chosen path.
3. Run smoke tests when the change affects HTTP-visible behavior (`docker-compose.smoke.yml` on Linux).

## GitHub Actions path (recommended for team)

1. Ensure `production` environment and required reviewers are configured.
2. Merge to `main` after review; approve the deployment job.
3. Use workflow artifacts for backups; use workflow dispatch for rollback if needed.

## Script path (`deploy.sh`)

1. Copy Unity `.env.example` to `.env` with `FTP_HOST`, `FTP_USER`, `FTP_PASS`.
2. Run from Git Bash per Unity README (paths may use `/c/dev/...` on Windows).

## After deploy

- Spot-check a known URL (e.g. quotes text-only view) if the change affects those pages.
- If issues arise, follow **Rollback** in Unity README.

## Escalation

Document recurring failure modes in this repo’s `docs/runbooks/` only if they are stable and cross-cutting; otherwise add to Unity repo or internal notes.
