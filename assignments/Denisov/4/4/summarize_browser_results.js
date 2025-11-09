const fs = require('fs');
const path = 'evidence/framable-results.json';
if (!fs.existsSync(path)) {
  console.error('No framable-results.json found. Did you move it into evidence/?');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(path, 'utf8'));
let total = 0, framable = 0, blocked = 0, errors = 0;
for (const [url, result] of Object.entries(data)) {
  total++;
  if (result.status === 'framable') framable++;
  else if (result.status === 'blocked') blocked++;
  else errors++;
}
const summary = { total, framable, blocked, errors };
console.log(summary);

const append = `
---

## Browser Results (live test)
| Metric | Count |
|:--|--:|
| Total tested | ${total} |
| Framable | ${framable} |
| Blocked | ${blocked} |
| Errors / timeouts | ${errors} |

See detailed raw data in [evidence/framable-results.json](evidence/framable-results.json).
`;

fs.appendFileSync('README.md', append);
console.log('Appended summary to README.md');
