// t353u guard: header logo bounding-box center equals viewport center (±1.5px) at 390, 485, 768, 1440.
import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] }); let bad = 0;
for (const w of [390, 485, 768, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(base + '#/home'); await p.waitForTimeout(+(process.env.W || 2500));
  const r = await p.evaluate(() => { const e = document.querySelector('#topBar .logo-img'); const r = e.getBoundingClientRect(); return { l: r.left, w: r.width, vw: document.documentElement.clientWidth }; });
  const off = r.l + r.w / 2 - r.vw / 2; console.log(w, 'logo w', r.w.toFixed(1), 'offset', off.toFixed(1)); if (Math.abs(off) > 1.5) bad++;
  await p.close();
}
await b.close(); process.exit(bad ? 1 : 0);
