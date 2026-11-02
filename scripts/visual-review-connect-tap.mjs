// Checker #368: every visible Connect button must be at least 44px tall (measured), at 360/390/430.
import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] }); let bad = 0;
for (const w of [360, 390, 430]) {
  const p = await b.newPage({ viewport: { width: w, height: 844 } }); await p.goto(base + '#/connect'); await p.waitForTimeout(+(process.env.W || 6500));
  const hs = await p.evaluate(() => [...document.querySelectorAll('#app .btn')].map((e) => [e.textContent.trim().slice(0, 20), e.getBoundingClientRect().height]).filter(([, h]) => h > 0));
  const small = hs.filter(([, h]) => h < 44);
  console.log('connect', w, 'buttons', hs.length, 'min', Math.min(...hs.map(([, h]) => h)).toFixed(1), small.length ? 'UNDER 44: ' + small.map(([t, h]) => `${t}=${h.toFixed(1)}`).join(', ') : '');
  if (!hs.length || small.length) bad++;
  await p.close();
}
await b.close(); process.exit(bad ? 1 : 0);
