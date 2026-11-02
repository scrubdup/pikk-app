// t221u guard: at 390x844 the gap between the tab labels' bottom and the tab bar's bottom must be <= 12px.
import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(base + '#/home'); await p.waitForTimeout(+(process.env.W || 6500));
const r = await p.evaluate(() => {
  const bar = document.getElementById('tabbar').getBoundingClientRect();
  const labels = [...document.querySelectorAll('#tabbar > a > span:last-child')].map((s) => s.getBoundingClientRect().bottom);
  return { barBottom: bar.bottom, labelBottom: Math.max(...labels), n: labels.length };
});
const gap = r.barBottom - r.labelBottom;
console.log('tabbar labels', r.n, 'label bottom', r.labelBottom.toFixed(1), 'bar bottom', r.barBottom.toFixed(1), 'gap', gap.toFixed(1));
await b.close(); process.exit(r.n === 7 && gap <= 12 ? 0 : 1);
