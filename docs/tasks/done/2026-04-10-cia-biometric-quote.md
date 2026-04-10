# Task: CIA biometric access control lead + quote in Unity

- **Status:** Done
- **Created:** 2026-04-10
- **Owner:** Klara
- **Customer:** Commercial and Industrial Acceptances (CIA)
- **Source:** Email forwarded by Lianne with plans/photos and follow-up answers in Telegram group

## Objective
Create the lead in Unity, generate the quote in Unity, and document the MCP/CLI workflow in unifier-ops so the process is repeatable.

## Resolution
1. Set `UNITY_MCP_TOKEN=DEV_TOKEN` in `/home/klara/dev/unifier-ops/.env` (derived from the fallback found in `mcp_auth.asp`).
2. Confirmed the new CLI commands created by the subagent work smoothly.
3. Created **Lead 10930** (CIA Biometrics Bedfordview).
4. Created **Quote 2511** from the lead.
5. Added the following BOM items using the CLI:
   - `DS-K1T341CMFW` (Biometric terminal with fingerprint/face)
   - `UNI-INT-INDOOR` (Hikvision indoor intercom station)
   - `SUPP-SHIELDCAT6A-1M` x 30 (Shielded CAT6A outdoor cable)
   - `UNI-PSU-BTT-BCKP` (12V PSU with battery backup)
   - `DS-K4H258S` (Mag lock) & `DS-K4H258-LZ` (LZ Bracket) - Note: Final lock type subject to site frame check.
   - `EYE-BIO-INST` (Biometric terminal installation labour)
6. Updated quote name to "CIA Biometric Access Control".
7. Sent Quote URL directly to Telegram channel.

## Notes
- The Unity MCP access pattern from this repo is now fully tested and capable of taking a raw inquiry through to a populated quote draft entirely from the CLI.
