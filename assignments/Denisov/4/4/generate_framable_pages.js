// generate_framable_pages.js
// Usage: node generate_framable_pages.js
const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const OUT_DIR = path.join(BASE_DIR, 'framable');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const sitesPath = path.join(BASE_DIR, 'sites.txt');
if (!fs.existsSync(sitesPath)) {
  console.error('Create sites.txt with one URL per line in the same directory.');
  process.exit(1);
}
const sites = fs.readFileSync(sitesPath, 'utf8')
  .split(/\r?\n/)
  .map(s => s.trim())
  .filter(Boolean);

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

sites.forEach((site, i) => {
  const n = String(i+1).padStart(3, '0');
  const filename = path.join(OUT_DIR, `${n}.html`);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Framability test ${n}</title>
<style>
  body{font-family:system-ui,Segoe UI,Roboto,Arial;margin:12px}
  #status{font-weight:700;margin-bottom:8px}
  iframe{width:100%;height:560px;border:1px solid #ccc}
</style>
</head>
<body>
<h2>Framability test ${n}</h2>
<div id="meta">target: <a href="${escapeHtml(site)}" target="_blank" rel="noopener noreferrer">${escapeHtml(site)}</a></div>
<div id="status">Testing…</div>
<div id="details"></div>
<iframe id="frame" src=""></iframe>

<script>
const target = ${JSON.stringify(site)};
const frame = document.getElementById('frame');
const status = document.getElementById('status');
const details = document.getElementById('details');

let loaded = false;
function mark(result, info){
  loaded = true;
  status.textContent = result;
  const p = document.createElement('p');
  p.textContent = info || '';
  details.appendChild(p);
  // Save to localStorage for index aggregation
  const key = 'framable-results';
  const all = JSON.parse(localStorage.getItem(key) || '[]');
  all.push({target, result, info, timestamp: new Date().toISOString()});
  localStorage.setItem(key, JSON.stringify(all));
}

frame.addEventListener('load', () => {
  try {
    const title = frame.contentDocument && frame.contentDocument.title;
    mark('FRAMABLE', title ? ('title: '+title) : 'loaded (cross-origin or same-origin)');
  } catch (e) {
    mark('FRAMABLE', 'loaded (cross-origin)');
  }
});

const TIMEOUT_MS = 5000;
setTimeout(() => {
  if (!loaded) {
    mark('NOT FRAMABLE', 'timeout — likely blocked by X-Frame-Options or CSP frame-ancestors or redirect');
  }
}, TIMEOUT_MS);

frame.src = target;
</script>
</body>
</html>`;
  fs.writeFileSync(filename, html, 'utf8');
  console.log('Wrote', filename);
});

console.log('Done. Generated', sites.length, 'files in', OUT_DIR);
