// unity-cli.mjs patch for group_name and group listing
const fs = require('fs');
const path = require('path');

const filePath = '/home/klara/dev/unifier-ops/scripts/unity-cli.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// quote-add-item
const qaiStart = content.indexOf('  } else if (cmd === "quote-add-item") {');
const qaiEnd = content.indexOf('\n  } else if (cmd === "quote-items") {', qaiStart);
if (qaiStart !== -1 && qaiEnd !== -1) {
    const newQai = `  } else if (cmd === "quote-add-item") {
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
    const resultMsg = String(raw).trim();
    const hasGroup = !!args["group_name"];
    console.log(JSON.stringify({ ok: true, quote_id: params.quote_id, quote_url: \`https://www.unifier.co.za/unity/quote-details.asp?quote_id=\${params.quote_id}\`, group_name: args["group_name"] ?? null, group_added: hasGroup, result: resultMsg }, null, 2));
  } else if (cmd === "quote-items") {`;
    content = content.substring(0, qaiStart) + newQai + content.substring(qaiEnd);
}

// quote-items
const qiStart = content.indexOf('  } else if (cmd === "quote-items") {');
const qiEnd = content.indexOf('\n  } else if (cmd === "quote-update") {', qiStart);
if (qiStart !== -1 && qiEnd !== -1) {
    const newQi = `  } else if (cmd === "quote-items") {
    const quoteId = args["quote-id"];
    if (!quoteId) {
      console.error("Required: --quote-id=");
      process.exit(1);
    }
    const raw = await relayGet(base, token, "mcp_quote_items_list.asp", { quote_id: quoteId });
    const rows = parseMarkdownTable(raw);
    const groups = rows ? Array.from(new Set(rows.map(r => r.group))) : [];
    console.log(JSON.stringify(rows ? { quote_id: quoteId, quote_url: \`https://www.unifier.co.za/unity/quote-details.asp?quote_id=\${quoteId}\`, count: rows.length, items: rows, groups } : { quote_id: quoteId, quote_url: \`https://www.unifier.co.za/unity/quote-details.asp?quote_id=\${quoteId}\`, raw }, null, 2));
  } else if (cmd === "quote-update") {`;
    content = content.substring(0, qiStart) + newQi + content.substring(qiEnd);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('CLI patched successfully');
EOF