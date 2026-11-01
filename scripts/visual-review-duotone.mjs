// t335u guard: every sampled button/chip/tab/header control on each tab must include a red-family AND a blue-family computed color.
import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const routes = (process.env.R || 'home,music,videos,connect,create,dating,games,shop').split(',');
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] }); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
let fails = 0;
for (const r of routes) {
  await p.goto(base + '#/' + r); await p.waitForTimeout(+(process.env.W || 2500));
  const bad = await p.evaluate(() => {
    const fam = (s) => { const out = new Set(); for (const m of s.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)) { const [r, g, b, a] = [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]]; if (a < 0.2) continue; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (mx < 70 || d / mx < 0.4) continue; let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; if (h < 20 || h >= 345) out.add('r'); if (h >= 190 && h <= 255) out.add('b'); } return out; };
    const sel = 'main button:not([hidden]), main .btn, main .chip, main [class*="chip"], #tabbar > a, #topBar a.pill, #topBar button';
    const res = [];
    for (const el of [...document.querySelectorAll(sel)].slice(0, 80)) {
      const rc = el.getBoundingClientRect(); const cs = getComputedStyle(el); if (!rc.width || !rc.height || cs.visibility === 'hidden') continue;
      let s = [cs.color, cs.borderTopColor, cs.borderBottomColor, cs.borderLeftColor, cs.backgroundColor, cs.backgroundImage, cs.boxShadow, cs.outlineColor, cs.filter, cs.textShadow].join(' ');
      for (const k of el.querySelectorAll('*')) { const c = getComputedStyle(k); s += ' ' + [c.color, c.stroke, c.fill, c.backgroundColor, c.backgroundImage, c.borderTopColor, c.boxShadow, c.filter].join(' '); }
      const f = fam(s); if (!(f.has('r') && f.has('b'))) res.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 18)}" has=${[...f].join('')}`);
    }
    return res;
  });
  console.log(`== ${r} ${bad.length}`); bad.forEach((x) => console.log('  ' + x)); fails += bad.length;
}
await b.close(); console.log('FAILS', fails); process.exit(fails ? 1 : 0);
