# Runbook: CCTV storage calculator

Repo-local skill: `skills/cctv-storage-calculator/SKILL.md`

Script:

```bash
cd /home/klara/dev/unifier-ops
./scripts/cctv-storage-calc.py <input.json>
```

Example:

```bash
./scripts/cctv-storage-calc.py examples/cctv-storage/thokoman-q2566-storage.json \
  > docs/tasks/worknotes/thokoman-q2566-storage-calculation.md
```

The calculator uses bitrate-based planning:

```text
TB = cameras × Mbps × hours/day × days × 3600 ÷ 8 ÷ 1,000,000
```

Use vendor-provided bitrates where possible. Presets are conservative planning defaults and must be confirmed before final quote lock.
