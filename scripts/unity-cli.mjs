#!/usr/bin/env node
/**
 * Unity MCP direct CLI — calls Classic ASP endpoints with Bearer UNITY_MCP_TOKEN.
 * Same surface as unity/mcp-cf relay → IIS (no Cloudflare edge token required).
 *
 * Usage: node scripts/unity-cli.mjs <command> [options]
 * Load env from unifier-ops/.env (UNITY_MCP_TOKEN required, UNITY_BASE_URL optional).
 */

import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDotEnv() {
  const envPath = join(__dirname, "..", ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
      val = val.slice(1, -1);
    if (!process.env[key]) process.env[key] = val;
  }
}

function parseAspKv(text) {
  const params = new URLSearchParams(text);
  const obj = {};
  for (const [k, v] of params.entries()) obj[k] = v;
  return obj;
}

function parseQuotesKv(kv) {
  const count = parseInt(kv.count || 0, 10);
  const quotes = [];
  for (let i = 0; i < count; i++) {
    let statusName = kv[`quote_${i}_status_name`] ?? null;
    if (statusName && String(statusName).toLowerCase() === "incomplete") statusName = "In Queue";
    quotes.push({
      id: kv[`quote_${i}_id`] ?? null,
      name: kv[`quote_${i}_name`] ?? null,
      date: kv[`quote_${i}_date`] ?? null,
      status_id: kv[`quote_${i}_status_id`] ?? null,
      status_name: statusName,
      status_group: kv[`quote_${i}_status_group`] ?? null,
      total: kv[`quote_${i}_total`] ?? null,
      customer: kv[`quote_${i}_customer`] ?? null,
      contact: kv[`quote_${i}_contact`] ?? null,
    });
  }
  return { count, quotes };
}

function parsePricelistsKv(kv) {
  const count = parseInt(kv.count || 0, 10);
  const pricelists = [];
  for (let i = 0; i < count; i++) {
    pricelists.push({
      id: kv[`pricelist_${i}_id`] ?? null,
      name: kv[`pricelist_${i}_name`] ?? null,
      expiry_date: kv[`pricelist_${i}_expiry_date`] ?? null,
      supplier: kv[`pricelist_${i}_supplier`] ?? null,
      supplier_status: kv[`pricelist_${i}_supplier_status`] ?? null,
      currency: kv[`pricelist_${i}_currency`] ?? null,
    });
  }
  return { count, pricelists };
}

function parsePricelistItemsKv(kv) {
  const count = parseInt(kv.count || 0, 10);
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      id: kv[`id_${i}`] ?? null,
      part_code: kv[`part_code_${i}`] ?? null,
      description: kv[`description_${i}`] ?? null,
      group_name: kv[`group_name_${i}`] ?? null,
      currency: kv[`currency_${i}`] ?? null,
      cost_price: kv[`cost_price_${i}`] ?? null,
      retail_price: kv[`retail_price_${i}`] ?? null,
      supplier_name: kv[`supplier_name_${i}`] ?? null,
      pricelist_name: kv[`pricelist_name_${i}`] ?? null,
    });
  }
  return { count, items };
}

function normalizeBaseUrl(base) {
  return base.endsWith("/") ? base : `${base}/`;
}

async function relayGet(base, token, endpoint, params) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const url = `${base}${endpoint}${qs.toString() ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const raw = await res.text();
  if (!res.ok) {
    console.error(`HTTP ${res.status}: ${raw}`);
    process.exit(1);
  }
  return raw;
}

async function relayPost(base, token, endpoint, params) {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) body.set(k, String(v));
  }
  const url = `${base}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  const raw = await res.text();
  if (!res.ok) {
    console.error(`HTTP ${res.status}: ${raw}`);
    process.exit(1);
  }
  return raw;
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq > 0) {
        out[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        const next = argv[i + 1];
        if (next && !next.startsWith("-")) {
          out[a.slice(2)] = next;
          i++;
        } else out[a.slice(2)] = true;
      }
    } else out._.push(a);
  }
  return out;
}

function printHelp() {
  console.log(`unity-cli — Unity MCP (direct to IIS)

Env: UNITY_MCP_TOKEN (required), UNITY_BASE_URL (optional, default https://www.unifier.co.za/unity/mcp/)

Commands:
  quotes [--id=] [--status-name=] [--limit=50] [--dStartDay=YYYY-MM-DD] [--dEndDay=YYYY-MM-DD]
  pricelists
  search [--part-code=] [--description=] [--limit=50]  (+ optional min/max cost/retail — see code)
  update-item --pricelist-entry-id=N [--part-code=] [--description=] [--cost-price=] [--retail-price=] [--obsolete-date=YYYY-MM-DD]
  obsolete --pricelist-entry-id=N   (marks obsolete today)
  raw-get <endpoint.asp> [--key=value ...]   (debug: returns raw body)

Examples:
  npm run unity -- quotes --status-name="In Queue" --limit=20
  npm run unity -- pricelists
  npm run unity -- search --part-code=DS-2CD
`);
}

loadDotEnv();

const args = parseArgs(process.argv.slice(2));
const cmd = args._[0];

const token = process.env.UNITY_MCP_TOKEN;
const base = normalizeBaseUrl(process.env.UNITY_BASE_URL || "https://www.unifier.co.za/unity/mcp/");

if (!cmd || cmd === "help" || cmd === "-h" || cmd === "--help") {
  printHelp();
  process.exit(0);
}

if (!token) {
  console.error("Missing UNITY_MCP_TOKEN in environment or .env");
  process.exit(1);
}

try {
  if (cmd === "quotes") {
    const params = {
      id: args.id,
      status_name: args["status-name"],
      limit: args.limit,
      dStartDay: args.dStartDay,
      dEndDay: args.dEndDay,
    };
    if (params.status_name && String(params.status_name).toLowerCase() === "incomplete")
      params.status_name = "In Queue";
    const raw = await relayGet(base, token, "mcp_quotes.asp", params);
    const kv = parseAspKv(raw);
    if (kv.error) {
      console.error(JSON.stringify(kv, null, 2));
      process.exit(1);
    }
    const parsed = parseQuotesKv(kv);
    console.log(JSON.stringify(parsed, null, 2));
  } else if (cmd === "pricelists") {
    const raw = await relayGet(base, token, "mcp_pricelists.asp", {});
    const kv = parseAspKv(raw);
    if (kv.error) {
      console.error(JSON.stringify(kv, null, 2));
      process.exit(1);
    }
    console.log(JSON.stringify(parsePricelistsKv(kv), null, 2));
  } else if (cmd === "search") {
    const params = {
      part_code: args["part-code"],
      description: args.description,
      limit: args.limit,
      min_cost_price: args["min-cost-price"],
      max_cost_price: args["max-cost-price"],
      min_retail_price: args["min-retail-price"],
      max_retail_price: args["max-retail-price"],
    };
    for (const k of Object.keys(params)) {
      if (params[k] === "0" || params[k] === 0) delete params[k];
    }
    const raw = await relayGet(base, token, "mcp_pricelist_items_search.asp", params);
    const kv = parseAspKv(raw);
    if (kv.error) {
      console.error(JSON.stringify(kv, null, 2));
      process.exit(1);
    }
    console.log(JSON.stringify(parsePricelistItemsKv(kv), null, 2));
  } else if (cmd === "update-item") {
    const id = args["pricelist-entry-id"];
    if (!id) {
      console.error("Required: --pricelist-entry-id=");
      process.exit(1);
    }
    const post = {
      pricelist_entry_id: id,
      action: "update",
    };
    if (args["part-code"]) post.pricelist_entry_part_code = args["part-code"];
    if (args.description) post.pricelist_entry_description = args.description;
    if (args["cost-price"]) post.pricelist_entry_price = args["cost-price"];
    if (args["retail-price"]) post.pricelist_entry_rrp = args["retail-price"];
    if (args["obsolete-date"] !== undefined) post.obsolete_date = args["obsolete-date"];
    if (args["entry-type-id"]) post.pricelist_entry_type_id = args["entry-type-id"];
    const raw = await relayPost(base, token, "mcp_update_item.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "obsolete") {
    const id = args["pricelist-entry-id"];
    if (!id) {
      console.error("Required: --pricelist-entry-id=");
      process.exit(1);
    }
    const t = new Date();
    const todayStr = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    const raw = await relayPost(base, token, "mcp_update_item.asp", {
      pricelist_entry_id: id,
      obsolete_date: todayStr,
      action: "update",
    });
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "raw-get") {
    const endpoint = args._[1];
    if (!endpoint) {
      console.error("Usage: raw-get mcp_quotes.asp [--key=value]");
      process.exit(1);
    }
    const q = {};
    for (const [k, v] of Object.entries(args)) {
      if (k === "_") continue;
      if (v === true || v === false) continue;
      q[k] = v;
    }
    const raw = await relayGet(base, token, endpoint, q);
    console.log(raw);
  } else {
    printHelp();
    process.exit(1);
  }
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
