---
name: cctv-storage-calculator
description: Calculate CCTV/NVR storage, hard-drive quantities, and retention days for Unifier IP camera quotes in /home/klara/dev/unifier-ops. Use when planning camera counts, bitrates, NVR bay counts, H.264/H.265 assumptions, drive quantities, or updating quote storage requirements.
---

# CCTV Storage Calculator

Use this repo-local skill for CCTV quote storage calculations.

## Core command

```bash
cd /home/klara/dev/unifier-ops
./scripts/cctv-storage-calc.py examples/cctv-storage/thokoman-q2566-storage.json
```

JSON output for automation:

```bash
./scripts/cctv-storage-calc.py examples/cctv-storage/thokoman-q2566-storage.json --format=json
```

Print a starter input file:

```bash
./scripts/cctv-storage-calc.py --example
```

## Input pattern

Create a JSON file with `nvr_groups`. Each NVR group can have different camera counts, retention days, drive size, and NVR bay count.

Use explicit `bitrate_mbps` when a vendor provides a value. Otherwise use a preset:

- `2mp-h265-15fps` = 2 Mbps
- `4mp-h265-15fps` = 4 Mbps
- `4mp-h265plus-15fps` = 2.5 Mbps
- `5mp-h265-15fps` = 5 Mbps
- `8mp-h265-15fps` = 8 Mbps
- `8mp-h265plus-15fps` = 5 Mbps

## Formula

The script calculates from bitrate, not guessed resolution:

```text
TB = cameras × Mbps × hours/day × days × 3600 ÷ 8 ÷ 1,000,000
```

For 24/7 recording this is equivalent to:

```text
GB/day = cameras × Mbps × 10.8
```

Then the script adds the configured overhead percentage. Default planning overhead in examples is 10%.

## Workflow for quotes

1. Put the project input JSON under `examples/cctv-storage/` or `docs/tasks/source-docs/<project>/`.
2. Run the script and save Markdown output in `docs/tasks/worknotes/`.
3. Check:
   - required TB per NVR group,
   - drives required per NVR,
   - whether it fits the NVR bay count,
   - approximate retention if the quote already has a fixed drive count.
4. Update the quote worknote and, if approved, Unity quote storage quantities.
5. If the result depends on vendor assumptions, ask the vendor for a storage calculation using exact camera model, codec, fps, bitrate, and recording mode.

## Important quoting notes

- Continuous recording is the conservative baseline unless the client explicitly accepts motion/event recording.
- H.265+ can materially reduce storage, but do not rely on it without confirming camera/NVR compatibility and scene suitability.
- 4-SATA NVRs often become the constraint before channel count. Always check `required_drives_per_nvr <= max_drive_bays`.
- Use decimal TB for quote planning because HDD vendors sell decimal TB.
