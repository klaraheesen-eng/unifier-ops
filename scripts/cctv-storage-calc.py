#!/usr/bin/env python3
"""CCTV/NVR storage and retention calculator for Unifier quote work.

Formula, using decimal storage units:
  TB = cameras * bitrate_mbps * hours_per_day * days * 3600 / 8 / 1_000_000
Equivalent 24h shortcut:
  GB/day = cameras * bitrate_mbps * 10.8

This intentionally calculates from explicit bitrate assumptions. Online calculators
vary mostly because they guess bitrate from codec/resolution/fps; when possible, use
vendor/model datasheet bitrates or NVR-calculator output.
"""
from __future__ import annotations

import argparse
import json
import math
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

BITRATE_PRESETS_MBPS = {
    # Conservative planning defaults for H.265 continuous recording.
    # Confirm against camera/NVR vendor calculators before final quote lock.
    "2mp-h265-15fps": 2.0,
    "4mp-h265-15fps": 4.0,
    "4mp-h265plus-15fps": 2.5,
    "5mp-h265-15fps": 5.0,
    "8mp-h265-15fps": 8.0,
    "8mp-h265plus-15fps": 5.0,
}


def as_float(value: Any, default: float | None = None) -> float:
    if value is None:
        if default is None:
            raise ValueError("missing required numeric value")
        return default
    return float(value)


def bitrate_for(group: dict[str, Any]) -> float:
    if "bitrate_mbps" in group:
        return float(group["bitrate_mbps"])
    preset = group.get("preset")
    if preset in BITRATE_PRESETS_MBPS:
        return BITRATE_PRESETS_MBPS[preset]
    raise ValueError(f"camera group {group.get('name')!r} needs bitrate_mbps or known preset")


def raw_tb(count: float, bitrate_mbps: float, days: float, hours_per_day: float = 24.0) -> float:
    return count * bitrate_mbps * hours_per_day * days * 3600.0 / 8.0 / 1_000_000.0


def tb_to_days(tb: float, count: float, bitrate_mbps: float, hours_per_day: float = 24.0) -> float:
    if count <= 0 or bitrate_mbps <= 0 or hours_per_day <= 0:
        return 0.0
    return tb * 8.0 * 1_000_000.0 / (count * bitrate_mbps * hours_per_day * 3600.0)


def distribute_counts(total_count: int, nvr_count: int) -> list[int]:
    base = total_count // nvr_count
    rem = total_count % nvr_count
    return [base + (1 if i < rem else 0) for i in range(nvr_count)]


def nvr_group_calc(nvr: dict[str, Any], global_defaults: dict[str, Any]) -> dict[str, Any]:
    name = nvr.get("name", "NVR group")
    nvr_count = int(nvr.get("nvr_count", 1))
    target_days = as_float(nvr.get("target_days", global_defaults.get("target_days", 30)))
    hours_per_day = as_float(nvr.get("hours_per_day", global_defaults.get("hours_per_day", 24)))
    overhead = as_float(nvr.get("overhead_percent", global_defaults.get("overhead_percent", 10))) / 100.0
    drive_tb = as_float(nvr.get("drive_tb", global_defaults.get("drive_tb", 10)))
    max_drive_bays = int(nvr.get("max_drive_bays", global_defaults.get("max_drive_bays", 4)))
    desired_drive_count = nvr.get("drive_count")

    groups = []
    total_cameras = 0
    total_bitrate_mbps = 0.0
    total_raw_tb = 0.0
    for group in nvr.get("camera_groups", []):
        count = int(group["count"])
        bitrate = bitrate_for(group)
        days = as_float(group.get("target_days", target_days))
        g_hours = as_float(group.get("hours_per_day", hours_per_day))
        g_raw_tb = raw_tb(count, bitrate, days, g_hours)
        groups.append({
            "name": group.get("name", "camera group"),
            "count": count,
            "preset": group.get("preset"),
            "bitrate_mbps": bitrate,
            "target_days": days,
            "hours_per_day": g_hours,
            "raw_tb": g_raw_tb,
            "with_overhead_tb": g_raw_tb * (1.0 + overhead),
        })
        total_cameras += count
        total_bitrate_mbps += count * bitrate
        total_raw_tb += g_raw_tb

    required_tb = total_raw_tb * (1.0 + overhead)
    required_drives = math.ceil(required_tb / drive_tb) if drive_tb > 0 else 0
    quoted_drives = int(desired_drive_count) if desired_drive_count is not None else required_drives
    quoted_tb = quoted_drives * drive_tb

    # Approximate retention if all groups share the group target mix and quoted storage.
    # This scales the requested retention by available/required raw storage.
    effective_raw_tb = quoted_tb / (1.0 + overhead)
    if total_raw_tb > 0:
        retention_factor = effective_raw_tb / total_raw_tb
        approx_retention_days = target_days * retention_factor
    else:
        approx_retention_days = 0.0

    per_nvr_counts = distribute_counts(total_cameras, nvr_count)
    per_nvr_required_tb = required_tb / nvr_count if nvr_count else required_tb
    per_nvr_required_drives = math.ceil(per_nvr_required_tb / drive_tb) if drive_tb > 0 else 0

    return {
        "name": name,
        "nvr_count": nvr_count,
        "target_days": target_days,
        "hours_per_day": hours_per_day,
        "overhead_percent": overhead * 100,
        "drive_tb": drive_tb,
        "max_drive_bays": max_drive_bays,
        "camera_groups": groups,
        "total_cameras": total_cameras,
        "aggregate_bitrate_mbps": total_bitrate_mbps,
        "required_raw_tb": total_raw_tb,
        "required_with_overhead_tb": required_tb,
        "required_drives_total": required_drives,
        "required_drives_per_nvr": per_nvr_required_drives,
        "fits_bays": per_nvr_required_drives <= max_drive_bays,
        "quoted_drives_total": quoted_drives,
        "quoted_tb_total": quoted_tb,
        "approx_retention_days_with_quoted_drives": approx_retention_days,
        "per_nvr_camera_counts_even_split": per_nvr_counts,
        "per_nvr_required_tb": per_nvr_required_tb,
    }


def calc(config: dict[str, Any]) -> dict[str, Any]:
    defaults = config.get("defaults", {})
    nvr_results = []
    for nvr in config.get("nvr_groups", []):
        r = nvr_group_calc(nvr, defaults)
        r["include_in_totals"] = bool(nvr.get("include_in_totals", True))
        nvr_results.append(r)
    totalled = [r for r in nvr_results if r.get("include_in_totals", True)]
    return {
        "project": config.get("project", "CCTV storage calculation"),
        "formula": "TB = cameras * Mbps * hours_per_day * days * 3600 / 8 / 1,000,000; overhead added afterwards",
        "bitrate_presets_mbps": BITRATE_PRESETS_MBPS,
        "nvr_groups": nvr_results,
        "totals": {
            "cameras": sum(r["total_cameras"] for r in totalled),
            "required_raw_tb": sum(r["required_raw_tb"] for r in totalled),
            "required_with_overhead_tb": sum(r["required_with_overhead_tb"] for r in totalled),
            "required_drives_total": sum(r["required_drives_total"] for r in totalled),
            "quoted_drives_total": sum(r["quoted_drives_total"] for r in totalled),
            "quoted_tb_total": sum(r["quoted_tb_total"] for r in totalled),
            "excluded_scenario_groups": len([r for r in nvr_results if not r.get("include_in_totals", True)]),
        },
    }


def print_markdown(result: dict[str, Any]) -> None:
    print(f"# {result['project']}")
    print()
    print(f"Formula: `{result['formula']}`")
    print()
    print("## Totals")
    totals = result["totals"]
    print(f"- Cameras: **{totals['cameras']}**")
    print(f"- Required raw storage: **{totals['required_raw_tb']:.2f} TB**")
    print(f"- Required storage with overhead: **{totals['required_with_overhead_tb']:.2f} TB**")
    print(f"- Required drives: **{totals['required_drives_total']}**")
    print(f"- Quoted/planned drives: **{totals['quoted_drives_total']}** ({totals['quoted_tb_total']:.2f} TB raw)")
    if totals.get("excluded_scenario_groups"):
        print(f"- Scenario groups excluded from totals: **{totals['excluded_scenario_groups']}**")
    print()
    for r in result["nvr_groups"]:
        print(f"## {r['name']}")
        if not r.get("include_in_totals", True):
            print("_Scenario / reality check only; excluded from project totals._")
            print()
        print(f"- NVRs: {r['nvr_count']}")
        print(f"- Cameras: {r['total_cameras']} | aggregate bitrate: {r['aggregate_bitrate_mbps']:.2f} Mbps")
        print(f"- Target retention: {r['target_days']} days @ {r['hours_per_day']}h/day")
        print(f"- Required: {r['required_raw_tb']:.2f} TB raw / {r['required_with_overhead_tb']:.2f} TB with {r['overhead_percent']:.0f}% overhead")
        print(f"- Drives required: {r['required_drives_total']} × {r['drive_tb']:.0f}TB total; ~{r['required_drives_per_nvr']} per NVR")
        print(f"- Bay fit: {'YES' if r['fits_bays'] else 'NO'} ({r['max_drive_bays']} bays/NVR)")
        print(f"- If quoted/planned drives are used: {r['quoted_drives_total']} drives / {r['quoted_tb_total']:.2f} TB raw, approx retention {r['approx_retention_days_with_quoted_drives']:.1f} days")
        print(f"- Even camera split per NVR: {', '.join(map(str, r['per_nvr_camera_counts_even_split']))}")
        print()
        print("| Camera group | Count | Mbps/cam | Days | Raw TB | With overhead TB |")
        print("|---|---:|---:|---:|---:|---:|")
        for g in r["camera_groups"]:
            print(f"| {g['name']} | {g['count']} | {g['bitrate_mbps']:.2f} | {g['target_days']:.0f} | {g['raw_tb']:.2f} | {g['with_overhead_tb']:.2f} |")
        print()


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Calculate CCTV/NVR storage for quote planning.")
    parser.add_argument("config", nargs="?", help="JSON config file. Use --example to print one.")
    parser.add_argument("--format", choices=["markdown", "json"], default="markdown")
    parser.add_argument("--example", action="store_true", help="Print an example JSON input and exit.")
    args = parser.parse_args(argv)

    if args.example:
        print(json.dumps({
            "project": "Example CCTV storage calculation",
            "defaults": {"drive_tb": 10, "overhead_percent": 10, "hours_per_day": 24},
            "nvr_groups": [
                {
                    "name": "Warehouse",
                    "nvr_count": 4,
                    "target_days": 60,
                    "max_drive_bays": 8,
                    "camera_groups": [
                        {"name": "4MP H.265 cameras", "count": 108, "preset": "4mp-h265-15fps"},
                        {"name": "8MP H.265 cameras", "count": 1, "preset": "8mp-h265-15fps"}
                    ]
                }
            ]
        }, indent=2))
        return 0

    if not args.config:
        parser.error("provide a JSON config file or use --example")
    config = json.loads(Path(args.config).read_text())
    result = calc(config)
    if args.format == "json":
        print(json.dumps(result, indent=2))
    else:
        print_markdown(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
