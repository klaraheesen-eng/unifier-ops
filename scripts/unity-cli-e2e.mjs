#!/usr/bin/env node
import process from "node:process";
import { spawn } from "node:child_process";

const cwd = "/home/klara/dev/unifier-ops";
const runId = `klara-e2e-${new Date().toISOString().replace(/[:.]/g, "-")}`;

function parseJsonLoose(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function shellQuote(value) {
  const s = String(value ?? "");
  return `'${s.replace(/'/g, `'"'"'`)}'`;
}

function runUnity(args, { expectJson = true } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", ["scripts/unity-cli.mjs", ...args], {
      cwd,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      const out = stdout.trim();
      const err = stderr.trim();
      const parsed = expectJson ? parseJsonLoose(out) : null;
      if (code !== 0) {
        reject(new Error(`Command failed (${code}): node scripts/unity-cli.mjs ${args.join(" ")}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`));
        return;
      }
      resolve({ code, stdout: out, stderr: err, json: parsed });
    });
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const context = {
  runId,
  leadId: null,
  quoteId: null,
  opportunityId: null,
  pricelistId: "29",
  supplierId: "20",
  pricelistGroupId: "88",
  bundleId: "18",
  createdPricelistEntryId: null,
  updatedPricelistEntryId: null,
};

const groups = [
  {
    name: "quotes",
    steps: [
      {
        name: "lead-create",
        run: async () => {
          const res = await runUnity([
            "lead-create",
            `--lead-short-name=${runId} lead`,
            `--lead-details-name=${runId} contact`,
            `--lead-details-email=${runId}@example.com`,
            "--lead-details-telephone=0000000099",
            "--lead-details-region=Gauteng",
            `--lead-details=${runId} end to end test lead`,
            "--building-type=House",
            `--purpose=${runId} quote flow`,
            "--number-cameras=1",
            "--ceiling=1",
            "--internet=1",
            "--human-form=0",
            "--outside=0",
            "--double-storey=0",
            "--wireless=0",
            "--telephone-contact=0",
            "--prefer-email=1",
          ]);
          assert(res.json?.ok === true, "lead-create did not return ok=true");
          assert(res.json?.lead_id, "lead-create did not return lead_id");
          context.leadId = String(res.json.lead_id);
          return res.json;
        },
      },
      {
        name: "quote-create-from-lead",
        run: async () => {
          assert(context.leadId, "leadId missing before quote-create-from-lead");
          const res = await runUnity([
            "quote-create-from-lead",
            `--lead-id=${context.leadId}`,
            "--opportunity-type-id=1",
          ]);
          assert(res.json?.ok === true, "quote-create-from-lead did not return ok=true");
          assert(res.json?.quote_id, "quote-create-from-lead did not return quote_id");
          assert(res.json?.quote_url, "quote-create-from-lead did not return quote_url");
          context.quoteId = String(res.json.quote_id);
          context.opportunityId = String(res.json.opportunity_id ?? "");
          return res.json;
        },
      },
      {
        name: "quote-items-empty",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          assert(res.json?.quote_id === context.quoteId, "quote-items did not return expected quote_id");
          return res.json;
        },
      },
      {
        name: "quote-add-item",
        run: async () => {
          const res = await runUnity([
            "quote-add-item",
            `--quote-id=${context.quoteId}`,
            "--part-code=EYE-BIO-INST",
            "--qty=1",
          ]);
          return res.json ?? { raw: res.stdout };
        },
      },
      {
        name: "quote-items-after-add",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          assert(Array.isArray(res.json?.items), "quote-items-after-add did not return items array");
          assert(res.json.items.some((item) => item.part_code === "EYE-BIO-INST"), "added quote line not found");
          return { count: res.json.count };
        },
      },
      {
        name: "quote-remove-item",
        run: async () => {
          const res = await runUnity([
            "quote-remove-item",
            `--quote-id=${context.quoteId}`,
            "--part-code=EYE-BIO-INST",
          ]);
          return res.json ?? { raw: res.stdout };
        },
      },
      {
        name: "quote-items-after-remove",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          if (Array.isArray(res.json?.items)) {
            assert(!res.json.items.some((item) => item.part_code === "EYE-BIO-INST"), "removed quote line still present");
          }
          return res.json;
        },
      },
      {
        name: "quote-update",
        run: async () => {
          const res = await runUnity([
            "quote-update",
            `--quote-id=${context.quoteId}`,
            `--customer-po-number=${runId.toUpperCase()}-PO`,
          ]);
          return res.json ?? { raw: res.stdout };
        },
      },
      {
        name: "bundle-add-to-quote",
        run: async () => {
          const res = await runUnity([
            "bundle-add-to-quote",
            `--bundle-id=${context.bundleId}`,
            `--quote-id=${context.quoteId}`,
            "--bundle-quantity=1",
          ]);
          assert(res.json?.status === "success", "bundle-add-to-quote did not return success");
          return res.json;
        },
      },
      {
        name: "quote-items-after-bundle-add",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          assert(Array.isArray(res.json?.items), "quote-items-after-bundle-add did not return items array");
          assert(res.json.items.some((item) => item.part_code === "Klara MCP Test Bundle 2026-04-22"), "bundle line not found after add");
          return { count: res.json.count };
        },
      },
      {
        name: "bundle-remove-from-quote",
        run: async () => {
          const res = await runUnity([
            "bundle-remove-from-quote",
            `--quote-id=${context.quoteId}`,
            "--part-code=Klara MCP Test Bundle 2026-04-22",
          ]);
          return res.json ?? { raw: res.stdout };
        },
      },
      {
        name: "quote-items-after-bundle-remove",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          if (Array.isArray(res.json?.items)) {
            assert(!res.json.items.some((item) => item.part_code === "Klara MCP Test Bundle 2026-04-22"), "bundle line still present after removal");
          }
          return res.json;
        },
      },
      {
        name: "quote-clear-items",
        run: async () => {
          const res = await runUnity(["quote-clear-items", `--quote-id=${context.quoteId}`]);
          return res.json ?? { raw: res.stdout };
        },
      },
      {
        name: "quote-items-after-clear",
        run: async () => {
          const res = await runUnity(["quote-items", `--quote-id=${context.quoteId}`]);
          if (Array.isArray(res.json?.items)) {
            assert(res.json.items.length === 0, "quote still has items after clear");
          }
          return res.json;
        },
      },
    ],
  },
  {
    name: "pricelists",
    steps: [
      {
        name: "pricelists-list",
        run: async () => {
          const res = await runUnity(["pricelists", `--supplier-id=${context.supplierId}`]);
          assert(Array.isArray(res.json?.pricelists), "pricelists-list did not return pricelists array");
          return { count: res.json.count };
        },
      },
      {
        name: "pricelist-add-item",
        run: async () => {
          const partCode = `${runId.toUpperCase()}-ITEM`;
          const res = await runUnity([
            "pricelist-add-item",
            `--pricelist-id=${context.pricelistId}`,
            `--pricelist-entry-group-id=${context.pricelistGroupId}`,
            `--part-code=${partCode}`,
            `--description=${runId} test item`,
            "--cost-price=111",
            "--retail-price=188",
            "--type-id=1",
          ]);
          const createdId = res.json?.pricelist_entry_id ?? res.json?.new_id ?? res.json?.id ?? res.json?.created_ids?.split(",")?.[0]?.trim();
          assert(createdId, "pricelist-add-item did not return created item id");
          context.createdPricelistEntryId = String(createdId);
          return res.json;
        },
      },
      {
        name: "pricelist-search",
        run: async () => {
          const res = await runUnity(["search", `--supplier-id=${context.supplierId}`, `--q=${runId}`, "--limit=10"]);
          assert(Array.isArray(res.json?.items), "search did not return items array");
          return { count: res.json.count };
        },
      },
      {
        name: "update-item",
        run: async () => {
          const res = await runUnity([
            "update-item",
            `--pricelist-entry-id=${context.createdPricelistEntryId}`,
            `--description=${runId} updated item`,
            "--cost-price=112",
            "--retail-price=189",
          ]);
          assert(res.json?.status === "success", "update-item did not return success");
          assert(res.json?.new_id, "update-item did not return new_id");
          context.updatedPricelistEntryId = String(res.json.new_id);
          return res.json;
        },
      },
      {
        name: "obsolete-item",
        run: async () => {
          const res = await runUnity(["obsolete", `--pricelist-entry-id=${context.updatedPricelistEntryId}`]);
          assert(res.json?.status === "success", "obsolete did not return success");
          return res.json;
        },
      },
    ],
  },
  {
    name: "bundles",
    steps: [
      {
        name: "bundles-list",
        run: async () => {
          const res = await runUnity(["bundles", `--bundle-id=${context.bundleId}`]);
          assert(Array.isArray(res.json?.bundles), "bundles-list did not return bundles array");
          return { count: res.json.count };
        },
      },
      {
        name: "bundle-update",
        run: async () => {
          const res = await runUnity([
            "bundle-update",
            `--bundle-id=${context.bundleId}`,
            "--bundle-name=Klara MCP Test Bundle 2026-04-22",
            `--bundle-description=${runId} bundle verification`,
            "--bundle-sell-price=1230",
            "--bundle-status=Active",
          ]);
          assert(res.json?.status === "success", "bundle-update did not return success");
          return res.json;
        },
      },
    ],
  },
];

async function main() {
  const results = [];
  for (const group of groups) {
    const groupResult = { group: group.name, ok: true, steps: [] };
    console.log(`\n# ${group.name}`);
    for (const step of group.steps) {
      process.stdout.write(`- ${step.name} ... `);
      try {
        const result = await step.run();
        groupResult.steps.push({ step: step.name, ok: true, result });
        console.log("ok");
      } catch (error) {
        groupResult.ok = false;
        groupResult.steps.push({ step: step.name, ok: false, error: error.message });
        results.push(groupResult);
        console.log("FAILED");
        console.error(error.message);
        const summary = { ok: false, run_id: runId, context, groups: results.concat(groups.filter((g) => g.name !== group.name).length ? [] : []) };
        console.log(JSON.stringify({ ok: false, run_id: runId, context, results: [...results, groupResult] }, null, 2));
        process.exit(1);
      }
    }
    results.push(groupResult);
  }

  console.log("\n" + JSON.stringify({ ok: true, run_id: runId, context, results }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exit(1);
});
