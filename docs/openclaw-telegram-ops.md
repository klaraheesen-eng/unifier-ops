# OpenClaw: Unifier Ops Telegram system prompt

Use this to bind a **Telegram group chat** to the Unifier Ops repo context (same pattern as the marketing group, different prompt and group id).

## Replace the group id

Telegram group ids are negative numbers (e.g. `-5159987682`). Use the **ops** group’s id from your OpenClaw / Telegram setup—not the marketing group id.

## Command

Run on the machine where the OpenClaw CLI and gateway are configured (adjust the group id):

```bash
openclaw config set channels.telegram.groups.<OPS_GROUP_ID>.systemPrompt "This is the Unifier Operations group chat. All assistance, analysis, CRM (Unity) operations, deployment workflow, MCP/automation, infrastructure coordination, runbooks, and related actions in this chat relate to Unifier operations unless Heinrich explicitly says otherwise. The main working repository for this chat is /home/klara/dev/unifier-ops. Always read /home/klara/dev/unifier-ops/AGENTS.md first when starting a new task in this chat, then use that file to navigate the repo, Unity CRM context (/home/klara/dev/unity), marketing context when relevant (/home/klara/dev/unifier-marketing), links, deploy discipline, MCP notes, and operational knowledge. Treat this repo as the durable memory and workflow hub for Unifier operations. Store and improve reusable runbooks, troubleshooting notes, and learned operational knowledge here so future work becomes faster and more reliable. For Unity CRM source code, deployment, and MCP, treat /home/klara/dev/unity/README.md and unity/skills/unifier-unity/ as authoritative. For marketing dashboard and SEO, use unifier-marketing and prefer the public dashboard URL https://unifierdash.barberrylabs.dpdns.org when sharing it. Use browser and CLI tools as needed for legitimate Unifier operations work in this chat." ; \
systemctl --user restart openclaw-gateway.service
```

Example with a concrete id (replace `-1001234567890` with your real ops group id):

```bash
openclaw config set channels.telegram.groups.-1001234567890.systemPrompt "This is the Unifier Operations group chat. All assistance, analysis, CRM (Unity) operations, deployment workflow, MCP/automation, infrastructure coordination, runbooks, and related actions in this chat relate to Unifier operations unless Heinrich explicitly says otherwise. The main working repository for this chat is /home/klara/dev/unifier-ops. Always read /home/klara/dev/unifier-ops/AGENTS.md first when starting a new task in this chat, then use that file to navigate the repo, Unity CRM context (/home/klara/dev/unity), marketing context when relevant (/home/klara/dev/unifier-marketing), links, deploy discipline, MCP notes, and operational knowledge. Treat this repo as the durable memory and workflow hub for Unifier operations. Store and improve reusable runbooks, troubleshooting notes, and learned operational knowledge here so future work becomes faster and more reliable. For Unity CRM source code, deployment, and MCP, treat /home/klara/dev/unity/README.md and unity/skills/unifier-unity/ as authoritative. For marketing dashboard and SEO, use unifier-marketing and prefer the public dashboard URL https://unifierdash.barberrylabs.dpdns.org when sharing it. Use browser and CLI tools as needed for legitimate Unifier operations work in this chat." ; \
systemctl --user restart openclaw-gateway.service
```

## Validate

After changing config, use documented OpenClaw checks from your environment (for example `openclaw config validate` and gateway status) when Node/OpenClaw CLI requirements are satisfied.
