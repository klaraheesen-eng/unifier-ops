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
      quote_url: kv[`quote_${i}_id`] ? `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${kv[`quote_${i}_id`]}` : null,
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
      supplier_id: kv[`pricelist_${i}_supplier_id`] ?? null,
      supplier: kv[`pricelist_${i}_supplier`] ?? null,
      supplier_status: kv[`pricelist_${i}_supplier_status`] ?? null,
      currency_id: kv[`pricelist_${i}_currency_id`] ?? null,
      currency: kv[`pricelist_${i}_currency`] ?? null,
    });
  }
  return { count, pricelists };
}

function parseBundleKv(kv) {
  const count = parseInt(kv.count || 0, 10);
  const bundles = [];
  for (let i = 0; i < count; i++) {
    bundles.push({
      id: kv[`bundle_${i}_id`] ?? null,
      name: kv[`bundle_${i}_name`] ?? null,
      description: kv[`bundle_${i}_description`] ?? null,
      status: kv[`bundle_${i}_status`] ?? null,
      sell_price: kv[`bundle_${i}_sell_price`] ?? null,
    });
  }
  return { count, bundles };
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
      score: kv[`score_${i}`] ?? null,
      usage_count: kv[`usage_count_${i}`] ?? null,
      days_since_last_used: kv[`days_since_last_used_${i}`] ?? null,
      last_used_date: kv[`last_used_date_${i}`] ?? null,
      last_used_quote_id: kv[`last_used_quote_id_${i}`] ?? null,
    });
  }
  return { count, items };
}

function parseMarkdownTable(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const headerIndex = lines.findIndex((line) => line.startsWith("|") && line.endsWith("|"));
  if (headerIndex < 0 || headerIndex + 2 > lines.length) return null;
  const headers = lines[headerIndex]
    .slice(1, -1)
    .split("|")
    .map((s) => s.trim());
  const rows = [];
  for (let i = headerIndex + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith("|") || !line.endsWith("|")) continue;
    const cols = line
      .slice(1, -1)
      .split("|")
      .map((s) => s.trim());
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? "";
    });
    rows.push(row);
  }
  return rows;
}

function parseSingleMarkdownTable(text) {
  const rows = parseMarkdownTable(text);
  if (rows && rows.length === 1 && Object.keys(rows[0]).length === 2 && rows[0].Field !== undefined && rows[0].Value !== undefined) {
    return { [rows[0].Field]: rows[0].Value };
  }
  if (rows && rows.length > 1 && rows.every((row) => Object.keys(row).length === 2 && row.Field !== undefined && row.Value !== undefined)) {
    return rows.reduce((acc, row) => {
      acc[row.Field] = row.Value;
      return acc;
    }, {});
  }
  return rows && rows.length ? rows[0] : null;
}

function extractIdFromUrl(url, key) {
  try {
    const value = new URL(String(url).trim()).searchParams.get(key);
    return value ?? null;
  } catch {
    return null;
  }
}

function normalizeBaseUrl(base) {
  return base.endsWith("/") ? base : `${base}/`;
}

const DEFAULT_VAT_RATE = 0.15;
const DEFAULT_MARGIN_PERCENT = 40;

function toNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const normalized = String(value).replace(/,/g, ".").trim();
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function formatMoney(value) {
  const n = roundMoney(value);
  if (Math.abs(n - Math.round(n)) < 0.005) return String(Math.round(n));
  return n.toFixed(2);
}

function computeVatInclusivePricing({
  exclVatCost,
  inclVatCost,
  retailPrice,
  marginPercent,
  vatRate,
}) {
  const vatMultiplier = 1 + vatRate;
  let finalInclVatCost = toNumber(inclVatCost);
  let finalRetailPrice = toNumber(retailPrice);
  const finalMarginPercent = toNumber(marginPercent) ?? DEFAULT_MARGIN_PERCENT;

  if (finalInclVatCost == null) {
    const exVat = toNumber(exclVatCost);
    if (exVat == null) return null;
    finalInclVatCost = roundMoney(exVat * vatMultiplier);
  }

  if (finalRetailPrice == null) {
    finalRetailPrice = roundMoney(finalInclVatCost / (1 - finalMarginPercent / 100));
    finalRetailPrice = Math.round(finalRetailPrice);
  }

  return {
    cost_price: formatMoney(finalInclVatCost),
    retail_price: formatMoney(finalRetailPrice),
    incl_vat_cost: formatMoney(finalInclVatCost),
    retail_price_incl_vat: formatMoney(finalRetailPrice),
    margin_percent: formatMoney(finalMarginPercent),
    vat_rate: vatRate,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableUnityError(status, raw) {
  const text = String(raw || "").toLowerCase();
  if (status >= 500) return true;
  return text.includes("permission denied") || text.includes("logging-functions.asp");
}

async function relayRequestWithRetry(url, options, maxAttempts = 5, initialDelayMs = 100) {
  let lastStatus = 0;
  let lastRaw = "";
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, options);
      const raw = await res.text();

      if (res.ok) return raw;

      lastStatus = res.status;
      lastRaw = raw;

      if (attempt < maxAttempts && isRetryableUnityError(res.status, raw)) {
        await sleep(delayMs);
        delayMs = delayMs * 2;
        continue;
      }

      console.error(`HTTP ${res.status}: ${raw}`);
      process.exit(1);
    } catch (e) {
      lastRaw = e.message || String(e);
      if (attempt < maxAttempts) {
        await sleep(delayMs);
        delayMs = delayMs * 2;
        continue;
      }
      console.error(lastRaw);
      process.exit(1);
    }
  }

  console.error(`HTTP ${lastStatus || 500}: ${lastRaw}`);
  process.exit(1);
}

async function relayGet(base, token, endpoint, params) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const url = `${base}${endpoint}${qs.toString() ? `?${qs}` : ""}`;
  return relayRequestWithRetry(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function relayPost(base, token, endpoint, params) {
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) body.set(k, String(v));
  }
  const url = `${base}${endpoint}`;
  return relayRequestWithRetry(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
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
  lead-create --lead-short-name= --lead-details-name= [--lead-details-email=] [--lead-details-telephone=] [--lead-details-region=] [--lead-details=]
              [--building-type=] [--purpose=] [--number-cameras=] [--ceiling=0|1] [--internet=0|1] [--human-form=0|1] [--colorvu=0|1] [--notes=]
  quote-create-from-lead --lead-id=N --opportunity-type-id=N [--quote-status-id=N] [--call=true|false] [--size=]
  quote-add-item --quote-id=N --part-code=CODE [--qty=N]
  quote-remove-item --quote-id=N --part-code=CODE
  quote-clear-items --quote-id=N
  quote-items --quote-id=N
  quote-update --quote-id=N [--quote-name=] [--customer-contact-id=N] [--customer-po-number=] [--quote-expected-order-date=YYYY-MM-DD]
               [--deposit-amount=] [--installation-date=YYYY-MM-DDTHH:MM] [--maps-link=] [--installation-address=] [--installation-notes=]
  pricelists [--supplier-id=N] [--include-inactive=true]
  pricelist-create --pricelist-name= --currency-id=N (--supplier-id=N | --supplier-name= | --new-supplier-name=) [--pricelist-expiry-date=YYYY-MM-DD] [--default-section-name=]
  pricelist-add-item --pricelist-id=N [--pricelist-entry-group-id=N | --pricelist-entry-group-name=] --part-code= --description= [--cost-price= --retail-price= | --excl-vat-cost= [--margin-percent=40] [--vat-rate=0.15] [--retail-price=]] [--type-id=N]
  pricelist-add-items --pricelist-id=N [--pricelist-entry-group-id=N | --pricelist-entry-group-name=] --items-json='[{...}]' [--margin-percent=40] [--vat-rate=0.15]
  search [--part-code=] [--description=] [--q=] [--supplier-id=N] [--limit=50]  (+ optional min/max cost/retail — see code)
  update-item --pricelist-entry-id=N [--part-code=] [--description=] [--cost-price=] [--retail-price=] [--obsolete-date=YYYY-MM-DD]
  obsolete --pricelist-entry-id=N   (marks obsolete today)
  bundles [--bundle-id=N] [--bundle-status=Active]
  bundle-create --bundle-name= [--bundle-description=] [--bundle-sell-price=] [--bundle-status=Active]
  bundle-update --bundle-id=N --bundle-name= [--bundle-description=] [--bundle-sell-price=] [--bundle-status=Active]
  bundle-add-item --bundle-id=N --pricelist-entry-id=N --quantity=N [--item-price=] [--description=]
  bundle-add-items --bundle-id=N --items-json='[{...}]'
  bundle-delete-item --bundle-id=N (--bundle-item-id=N | --pricelist-entry-id=N)
  bundle-add-to-quote --bundle-id=N --quote-id=N [--quote-entry-group-id=N] [--bundle-quantity=N]
  bundle-remove-from-quote --quote-id=N --part-code=CODE
  raw-get <endpoint.asp> [--key=value ...]   (debug: returns raw body)

Examples:
  npm run unity -- quotes --status-name="In Queue" --limit=20
  npm run unity -- lead-create --lead-short-name="CIA Biometric" --lead-details-name="Client Name"
  npm run unity -- quote-create-from-lead --lead-id=123 --opportunity-type-id=1
  npm run unity -- quote-add-item --quote-id=456 --part-code=DS-2CD --qty=2
  npm run unity -- quote-remove-item --quote-id=456 --part-code=DS-2CD
  npm run unity -- quote-clear-items --quote-id=456
  npm run unity -- quote-items --quote-id=456
  npm run unity -- quote-update --quote-id=456 --customer-po-number=PO-001
  npm run unity -- pricelists --supplier-id=18
  npm run unity -- pricelist-create --pricelist-name="Klara Test" --currency-id=1 --supplier-id=15
  npm run unity -- pricelist-add-item --pricelist-id=30 --part-code=KLARA-TEST-001 --description="Test item" --excl-vat-cost=100 --type-id=1
  npm run unity -- pricelist-add-item --pricelist-id=30 --part-code=KLARA-TEST-001 --description="Test item" --excl-vat-cost=100 --margin-percent=35 --vat-rate=0.15 --type-id=1
  npm run unity -- search --part-code=DS-2CD
  npm run unity -- search --q=promo --limit=10
  npm run unity -- bundles
  npm run unity -- bundle-create --bundle-name="Klara Test Bundle" --bundle-sell-price=500
  npm run unity -- bundle-add-to-quote --bundle-id=12 --quote-id=2539 --bundle-quantity=2
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
  } else if (cmd === "lead-create") {
    const post = {
      lead_short_name: args["lead-short-name"],
      lead_details_name: args["lead-details-name"],
      lead_details_email: args["lead-details-email"],
      lead_details_telephone: args["lead-details-telephone"],
      lead_details_region: args["lead-details-region"],
      lead_details: args["lead-details"],
      building_type: args["building-type"],
      purpose: args.purpose,
      number_cameras: args["number-cameras"],
      ceiling: args.ceiling,
      internet: args.internet,
      human_form: args["human-form"],
      colorvu: args.colorvu,
      notes: args.notes,
    };
    if (!post.lead_short_name || !post.lead_details_name) {
      console.error("Required: --lead-short-name= and --lead-details-name=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_leads.asp", post);
    const leadUrl = String(raw).trim();
    console.log(
      JSON.stringify(
        {
          ok: true,
          lead_id: extractIdFromUrl(leadUrl, "lead_id"),
          lead_url: leadUrl,
        },
        null,
        2,
      ),
    );
  } else if (cmd === "quote-create-from-lead") {
    const params = {
      lead_id: args["lead-id"],
      opportunity_type_id: args["opportunity-type-id"],
      quote_status_id: args["quote-status-id"],
      call: args.call,
      size: args.size,
    };
    if (!params.lead_id || !params.opportunity_type_id) {
      console.error("Required: --lead-id= and --opportunity-type-id=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_lead_instant_quote.asp", params);
    const row = parseSingleMarkdownTable(raw);
    console.log(
      JSON.stringify(
        row
          ? {
              ok: true,
              lead_id: row.lead_id ?? params.lead_id,
              quote_id: row.quote_id ?? extractIdFromUrl(row.quote_url, "quote_id"),
              opportunity_id: row.opportunity_id ?? null,
              quote_url: row.quote_url ?? null,
            }
          : { ok: true, raw },
        null,
        2,
      ),
    );
  } else if (cmd === "quote-add-item") {
    const params = {
      quote_id: args["quote-id"],
      part_code: args["part-code"],
      qty: args.qty,
    };
    if (!params.quote_id || !params.part_code) {
      console.error("Required: --quote-id= and --part-code=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_quote_items_add.asp", params);
    console.log(JSON.stringify({ ok: true, quote_id: params.quote_id, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${params.quote_id}`, result: String(raw).trim() }, null, 2));
  } else if (cmd === "quote-remove-item") {
    const quoteId = args["quote-id"];
    const partCode = args["part-code"];
    if (!quoteId || !partCode) {
      console.error("Required: --quote-id= and --part-code=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_quote_items_remove.asp", {
      quote_id: quoteId,
      part_code: partCode,
    });
    console.log(JSON.stringify({ ok: true, quote_id: quoteId, part_code: partCode, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`, result: String(raw).trim() }, null, 2));
  } else if (cmd === "quote-clear-items") {
    const quoteId = args["quote-id"];
    if (!quoteId) {
      console.error("Required: --quote-id=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_quote_items_clear.asp", {
      quote_id: quoteId,
    });
    console.log(JSON.stringify({ ok: true, quote_id: quoteId, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`, result: String(raw).trim() }, null, 2));
  } else if (cmd === "quote-items") {
    const quoteId = args["quote-id"];
    if (!quoteId) {
      console.error("Required: --quote-id=");
      process.exit(1);
    }
    const raw = await relayGet(base, token, "mcp_quote_items_list.asp", { quote_id: quoteId });
    const rows = parseMarkdownTable(raw);
    console.log(JSON.stringify(rows ? { quote_id: quoteId, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`, count: rows.length, items: rows } : { quote_id: quoteId, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`, raw }, null, 2));
  } else if (cmd === "quote-update") {
    const quoteId = args["quote-id"];
    if (!quoteId) {
      console.error("Required: --quote-id=");
      process.exit(1);
    }
    const post = {
      quote_id: quoteId,
      quote_name: args["quote-name"],
      customer_contact_id: args["customer-contact-id"],
      customer_po_number: args["customer-po-number"],
      quote_expected_order_date: args["quote-expected-order-date"],
      deposit_amount: args["deposit-amount"],
      installation_date: args["installation-date"],
      maps_link: args["maps-link"],
      installation_address: args["installation-address"],
      installation_notes: args["installation-notes"],
    };
    if (Object.values(post).filter((v) => v !== undefined && v !== null && v !== "").length < 2) {
      console.error("Provide --quote-id= plus at least one field to update");
      process.exit(1);
    }
    const raw = await relayPost(base, token, `mcp_quote_update.asp?quote_id=${encodeURIComponent(String(quoteId))}`, post);
    const parsedKv = parseAspKv(raw);
    parsedKv.quote_url = `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`;
    console.log(JSON.stringify(parsedKv, null, 2));
  } else if (cmd === "pricelists") {
    const raw = await relayGet(base, token, "mcp_pricelists.asp", {
      supplier_id: args["supplier-id"],
      include_inactive: args["include-inactive"],
    });
    const kv = parseAspKv(raw);
    if (kv.error) {
      console.error(JSON.stringify(kv, null, 2));
      process.exit(1);
    }
    console.log(JSON.stringify(parsePricelistsKv(kv), null, 2));
  } else if (cmd === "pricelist-create") {
    const post = {
      pricelist_name: args["pricelist-name"],
      currency_id: args["currency-id"],
      supplier_id: args["supplier-id"],
      supplier_name: args["supplier-name"],
      new_supplier_name: args["new-supplier-name"],
      pricelist_expiry_date: args["pricelist-expiry-date"],
      default_section_name: args["default-section-name"],
    };
    if (!post.pricelist_name || !post.currency_id || (!post.supplier_id && !post.supplier_name && !post.new_supplier_name)) {
      console.error("Required: --pricelist-name= --currency-id= and one of --supplier-id= | --supplier-name= | --new-supplier-name=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_pricelists.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "pricelist-add-item") {
    const vatRate = toNumber(args["vat-rate"]) ?? DEFAULT_VAT_RATE;
    const computed = computeVatInclusivePricing({
      exclVatCost: args["excl-vat-cost"],
      inclVatCost: args["cost-price"],
      retailPrice: args["retail-price"],
      marginPercent: args["margin-percent"],
      vatRate,
    });
    const post = {
      pricelist_id: args["pricelist-id"],
      pricelist_entry_group_id: args["pricelist-entry-group-id"],
      pricelist_entry_group_name: args["pricelist-entry-group-name"],
      part_code: args["part-code"],
      description: args.description,
      cost_price: computed?.cost_price,
      retail_price: computed?.retail_price,
      pricelist_entry_type_id: args["type-id"],
    };
    if (!post.pricelist_id || !post.part_code || !post.description || !post.cost_price || !post.retail_price) {
      console.error("Required: --pricelist-id= --part-code= --description= and either final --cost-price= with --retail-price=, or --excl-vat-cost= (CLI defaults to 40% margin and 15% VAT)");
      process.exit(1);
    }
    if (process.env.UNITY_DEBUG_PRICING === "1") {
      console.error(JSON.stringify({ debug: "pricelist-add-item", computed, post }, null, 2));
    }
    const raw = await relayPost(base, token, "mcp_pricelist_items_create.asp", post);
    const parsed = parseAspKv(raw);
    parsed.pricing_mode = args["excl-vat-cost"] ? "computed_from_ex_vat" : "direct_inclusive";
    if (computed) {
      parsed.margin_percent = computed.margin_percent;
      parsed.vat_rate = String(computed.vat_rate);
      parsed.cost_price_incl_vat = computed.incl_vat_cost;
      parsed.retail_price_incl_vat = computed.retail_price_incl_vat;
    }
    console.log(JSON.stringify(parsed, null, 2));
  } else if (cmd === "pricelist-add-items") {
    const pricelistId = args["pricelist-id"];
    const itemsJson = args["items-json"];
    if (!pricelistId || !itemsJson) {
      console.error("Required: --pricelist-id= and --items-json='[{...}]'");
      process.exit(1);
    }
    let items;
    try {
      items = JSON.parse(itemsJson);
    } catch (e) {
      console.error(`Invalid --items-json: ${e.message}`);
      process.exit(1);
    }
    if (!Array.isArray(items) || !items.length) {
      console.error("--items-json must be a non-empty JSON array");
      process.exit(1);
    }
    const defaultVatRate = toNumber(args["vat-rate"]) ?? DEFAULT_VAT_RATE;
    const defaultMarginPercent = toNumber(args["margin-percent"]) ?? DEFAULT_MARGIN_PERCENT;
    const post = {
      pricelist_id: pricelistId,
      pricelist_entry_group_id: args["pricelist-entry-group-id"],
      pricelist_entry_group_name: args["pricelist-entry-group-name"],
      pricelist_entry_type_id: args["type-id"],
    };
    items.forEach((item, idx) => {
      const n = idx + 1;
      const computed = computeVatInclusivePricing({
        exclVatCost: item.excl_vat_cost,
        inclVatCost: item.cost_price,
        retailPrice: item.retail_price,
        marginPercent: item.margin_percent ?? defaultMarginPercent,
        vatRate: toNumber(item.vat_rate) ?? defaultVatRate,
      });
      post[`row_${n}_part_code`] = item.part_code;
      post[`row_${n}_description`] = item.description;
      post[`row_${n}_cost_price`] = computed?.cost_price;
      post[`row_${n}_retail_price`] = computed?.retail_price;
      if (item.type_id != null) post[`row_${n}_type_id`] = item.type_id;
    });
    const raw = await relayPost(base, token, "mcp_pricelist_items_create.asp", post);
    const parsed = parseAspKv(raw);
    parsed.default_margin_percent = String(defaultMarginPercent);
    parsed.default_vat_rate = String(defaultVatRate);
    console.log(JSON.stringify(parsed, null, 2));
  } else if (cmd === "search") {
    const params = {
      part_code: args["part-code"],
      description: args.description,
      q: args.q,
      supplier_id: args["supplier-id"],
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
  } else if (cmd === "bundles") {
    const raw = await relayGet(base, token, "mcp_bundles.asp", {
      bundle_id: args["bundle-id"],
      bundle_status: args["bundle-status"],
    });
    const kv = parseAspKv(raw);
    if (kv.error) {
      console.error(JSON.stringify(kv, null, 2));
      process.exit(1);
    }
    console.log(JSON.stringify(parseBundleKv(kv), null, 2));
  } else if (cmd === "bundle-create") {
    const post = {
      action: "create",
      bundle_name: args["bundle-name"],
      bundle_description: args["bundle-description"],
      bundle_sell_price: args["bundle-sell-price"],
      bundle_status: args["bundle-status"],
    };
    if (!post.bundle_name) {
      console.error("Required: --bundle-name=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-update") {
    const post = {
      action: "update",
      bundle_id: args["bundle-id"],
      bundle_name: args["bundle-name"],
      bundle_description: args["bundle-description"],
      bundle_sell_price: args["bundle-sell-price"],
      bundle_status: args["bundle-status"],
    };
    if (!post.bundle_id || !post.bundle_name) {
      console.error("Required: --bundle-id= --bundle-name=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-add-item") {
    const post = {
      action: "add-items",
      bundle_id: args["bundle-id"],
      pricelist_entry_id: args["pricelist-entry-id"],
      quantity: args.quantity,
      item_price: args["item-price"],
      description: args.description,
    };
    if (!post.bundle_id || !post.pricelist_entry_id || !post.quantity) {
      console.error("Required: --bundle-id= --pricelist-entry-id= --quantity=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-add-items") {
    const bundleId = args["bundle-id"];
    const itemsJson = args["items-json"];
    if (!bundleId || !itemsJson) {
      console.error("Required: --bundle-id= and --items-json='[{...}]'");
      process.exit(1);
    }
    let items;
    try {
      items = JSON.parse(itemsJson);
    } catch (e) {
      console.error(`Invalid --items-json: ${e.message}`);
      process.exit(1);
    }
    const post = { action: "add-items", bundle_id: bundleId };
    items.forEach((item, idx) => {
      const n = idx + 1;
      post[`row_${n}_pricelist_entry_id`] = item.pricelist_entry_id;
      post[`row_${n}_quantity`] = item.quantity;
      if (item.item_price != null) post[`row_${n}_item_price`] = item.item_price;
      if (item.description != null) post[`row_${n}_description`] = item.description;
    });
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-delete-item") {
    const post = {
      action: "delete-item",
      bundle_id: args["bundle-id"],
      bundle_item_id: args["bundle-item-id"],
      pricelist_entry_id: args["pricelist-entry-id"],
    };
    if (!post.bundle_id || (!post.bundle_item_id && !post.pricelist_entry_id)) {
      console.error("Required: --bundle-id= and either --bundle-item-id= or --pricelist-entry-id=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-add-to-quote") {
    const post = {
      action: "add-to-quote",
      bundle_id: args["bundle-id"],
      quote_id: args["quote-id"],
      quote_entry_group_id: args["quote-entry-group-id"],
      bundle_quantity: args["bundle-quantity"],
    };
    if (!post.bundle_id || !post.quote_id) {
      console.error("Required: --bundle-id= --quote-id=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_bundles.asp", post);
    console.log(JSON.stringify(parseAspKv(raw), null, 2));
  } else if (cmd === "bundle-remove-from-quote") {
    const quoteId = args["quote-id"];
    const partCode = args["part-code"];
    if (!quoteId || !partCode) {
      console.error("Required: --quote-id= and --part-code=");
      process.exit(1);
    }
    const raw = await relayPost(base, token, "mcp_quote_items_remove.asp", {
      quote_id: quoteId,
      part_code: partCode,
    });
    console.log(JSON.stringify({ ok: true, quote_id: quoteId, part_code: partCode, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}`, result: String(raw).trim() }, null, 2));
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
