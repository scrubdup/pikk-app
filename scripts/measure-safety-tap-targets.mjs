// Measures rendered Block / Report / category picker heights at 360/390/430px with the app's real CSS (main.js import order).
// CI: .github/workflows/pikk-safety-tap-visual.yml runs this on PRs that touch safety UI/CSS.
// Usage: node scripts/measure-safety-tap-targets.mjs   (set PLAYWRIGHT_FROM=/dir/with/node_modules if playwright isn't installed here)
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const { chromium } = createRequire(process.env.PLAYWRIGHT_FROM ? process.env.PLAYWRIGHT_FROM + '/' : import.meta.url)('playwright');
import { renderReportCategorySelect } from '../src/safety-actions.js';
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = [...main.matchAll(/import '\.\/([^']+\.css)'/g)].map((m) => readFileSync(new URL('../src/' + m[1], import.meta.url), 'utf8')).join('\n');
const msgs = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');
const user = readFileSync(new URL('../src/pages/user.js', import.meta.url), 'utf8');
const btn = (src, re) => src.match(re)[0].replace(/\$\{[^}]*\}/g, 'x') + 'Label</button>';
const sets = {
  local: [btn(msgs, /<button[^>]*data-flag="block"[^>]*>/), btn(msgs, /<button[^>]*data-flag="report"[^>]*>/)],
  remote: [btn(msgs, /<button[^>]*data-remote-flag="block"[^>]*>/), btn(msgs, /<button[^>]*data-remote-flag="report"[^>]*>/)],
  user: [btn(user, /<button[^>]*data-user-flag="block"[^>]*>/), btn(user, /<button[^>]*data-user-flag="report"[^>]*>/)],
};
const body = Object.entries(sets).map(([k, [b, r]]) => `<div class="card" data-set="${k}"><div class="row wrap">${b}${renderReportCategorySelect('data-report-category')}${r}</div></div>`).join('');
const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width"><style>${css}</style></head><body><div id="app"><main class="page">${body}</main></div></body></html>`;
const browser = await chromium.launch();
let fail = 0;
for (const width of [360, 390, 430]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.setContent(html);
  const rows = await page.$$eval('[data-set]', (els) => els.flatMap((el) => [...el.querySelectorAll('button,select')].map((n) => ({ set: el.dataset.set, el: n.tagName === 'SELECT' ? 'picker' : n.dataset.flag || n.dataset.remoteFlag || n.dataset.userFlag, h: +n.getBoundingClientRect().height.toFixed(1) }))));
  for (const r of rows) { const ok = r.h >= 44; if (!ok) fail++; console.log(`${width}px ${r.set} ${r.el}: ${r.h}px ${ok ? 'OK' : 'FAIL'}`); }
  await page.close();
}
await browser.close();
console.log(fail ? `FAIL (${fail})` : 'ALL >= 44px');
process.exit(fail ? 1 : 0);
