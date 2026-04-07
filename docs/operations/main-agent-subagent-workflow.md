# Main assistant vs repo-focused sub-agent (ops)

Adapted from the `tesla-support` split, tuned for **Unifier ops** (CRM, statements, deploy coordination) — **not** HESK tickets.

## Main assistant (chat / gateway)

Responsible for:

- Parsing the user request and classifying **marketing vs Unity vs ops-repo** work.  
- Pulling **live** context when needed (Unity MCP, public URLs, approved docs).  
- Giving a short **task focus** update before deep work (what repo, what artifact, what risk).  
- Enforcing **approval gates** for financial writes, customer-facing comms, or production deploy.  
- Summarizing sub-agent output for the human operator.

### Suggested task focus block

- **Working on:** `<topic> — <artifact>`  
- **Repo / system:** `unifier-ops` / `unity` / `unifier-marketing`  
- **Risk:** e.g. PII, AR, production deploy  
- **Next step:** one concrete action  

## Repo-focused sub-agent (or deep Cursor session)

Responsible for:

- Starting in `/home/klara/dev/unifier-ops`, reading `AGENTS.md` and [`docs/internal/repo-map.md`](../internal/repo-map.md).  
- Using `raw/` only as **imports**; confirming **current** state in Unity when it matters.  
- Producing **evidence-based** summaries: cite file paths and line ranges in `raw/` or `docs/`.  
- Drafting **reconciliation notes** or **runbook updates**, not sending customer emails unless explicitly instructed.

## When to delegate to Unity repo

- Code change, deploy, MCP endpoint, or ASP behaviour → **`/home/klara/dev/unity`**.  
- Marketing dashboard, SEO, WordPress → **`/home/klara/dev/unifier-marketing`**.

## Documentation priority

1. **Live system** (Unity, Sage, bank) for truth.  
2. **This repo** for durable procedure and interpreted exports.  
3. **raw/** snapshots for historical analysis only.
