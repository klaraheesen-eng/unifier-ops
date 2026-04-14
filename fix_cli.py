import re

def patch_quote_add_item(content):
    pattern = re.compile(
        r'(\s+} else if \(cmd === \"quote-add-item\)\) \{.*?)(?=\s+} else if \(cmd === \"quote-items\\))',
        re.DOTALL
    )
    replacement = '''  } else if (cmd === \"quote-add-item\") {
    const params = {
      quote_id: args[\"quote-id\"],
      part_code: args[\"part-code\"],
      qty: args.qty,
    };
    if (!params.quote_id || !params.part_code) {
      console.error(\"Required: --quote-id= and --part-code=\");
      process.exit(1);
    }
    const raw = await relayPost(base, token, \"mcp_quote_items_add.asp\", params);
    const resultMsg = String(raw).trim();
    const hasGroup = !!args[\"group_name\"];
    console.log(JSON.stringify({ ok: true, quote_id: params.quote_id, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${params.quote_id}\`, group_name: args[\"group_name\"] ?? null, group_added: hasGroup, result: resultMsg }, null, 2));
  } else if (cmd === \"quote-items\") {'''
    return pattern.sub(replacement, content)

def patch_quote_items(content):
    pattern = re.compile(
        r'(\s+} else if \(cmd === \"quote-items\)\) \{.*?)(?=\s+} else if \(cmd === \"quote-update\\))',
        re.DOTALL
    )
    replacement = '''  } else if (cmd === \"quote-items\") {
    const quoteId = args[\"quote-id\"];
    if (!quoteId) {
      console.error(\"Required: --quote-id=\");
      process.exit(1);
    }
    const raw = await relayGet(base, token, \"mcp_quote_items_list.asp\", { quote_id: quoteId });
    const rows = parseMarkdownTable(raw);
    const groups = rows ? Array.from(new Set(rows.map(r => r.group))) : [];
    console.log(JSON.stringify(rows ? { quote_id: quoteId, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}\`, count: rows.length, items: rows, groups } : { quote_id: quoteId, quote_url: `https://www.unifier.co.za/unity/quote-details.asp?quote_id=${quoteId}\`, raw }, null, 2));
  } else if (cmd === \"quote-update\") {'''
    return pattern.sub(replacement, content)

with open('/home/klara/dev/unifier-ops/scripts/unity-cli.mjs', 'r', encoding='utf-8') as f:
    content = f.read()

content = patch_quote_add_item(content)
content = patch_quote_items(content)

with open('/home/klara/dev/unifier-ops/scripts/unity-cli.mjs', 'w', encoding='utf-8') as f:
    f.write(content)

print('CLI patched successfully')