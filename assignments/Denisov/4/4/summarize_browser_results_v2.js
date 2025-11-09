const fs = require('fs');
const p = 'evidence/framable-results.json';
if (!fs.existsSync(p)) {
  console.error('No evidence/framable-results.json found');
  process.exit(1);
}
const raw = fs.readFileSync(p,'utf8');
let data;
try { data = JSON.parse(raw); } catch(e){ console.error('Invalid JSON'); process.exit(1); }

let records = [];
if (Array.isArray(data)) {
  records = data;
} else if (data && typeof data === 'object') {
  // legacy map form
  records = Object.entries(data).map(([target, v]) => ({target, result: v.status === 'framable' ? 'FRAMABLE' : (v.status === 'blocked' ? 'NOT FRAMABLE' : 'ERROR')}));
}

// reduce to latest per target
const latest = new Map();
for (const r of records) {
  if (!r || !r.target) continue;
  const prev = latest.get(r.target);
  const prevTime = prev && prev.timestamp ? Date.parse(prev.timestamp) : -Infinity;
  const curTime = r.timestamp ? Date.parse(r.timestamp) : Date.now();
  if (!prev || curTime >= prevTime) latest.set(r.target, r);
}

let total = 0, framable = 0, blocked = 0, errors = 0;
for (const r of latest.values()) {
  total++;
  if (r.result === 'FRAMABLE') framable++;
  else if (r.result && r.result.toUpperCase().includes('NOT')) blocked++;
  else errors++;
}

const section = `
---

## Browser Results (updated)
| Metric | Count |
|:--|--:|
| Total tested (unique) | ${total} |
| Framable | ${framable} |
| Blocked | ${blocked} |
| Errors / timeouts | ${errors} |

Source: [evidence/framable-results.json](evidence/framable-results.json)
`;
fs.appendFileSync('README.md', section);
console.log({ total, framable, blocked, errors });
