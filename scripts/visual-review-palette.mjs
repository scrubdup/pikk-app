import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:4173/pikk-app/';
const routes = (process.env.R || 'dating,shop,games,connect,home,music,videos,create').split(',');
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {});
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
let bad = 0;
for (const r of routes) {
  await p.goto(base + '#/' + r); await p.waitForTimeout(+(process.env.W || 3000));
  const res = await p.evaluate(() => {
    const hue = (r, g, b) => { r/=255; g/=255; b/=255; const mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn; if (d < 0.12) return null; let h = mx===r ? ((g-b)/d)%6 : mx===g ? (b-r)/d+2 : (r-g)/d+4; h*=60; if (h<0) h+=360; return {h, s:d/(mx||1), v:mx}; };
    const out = [];
    const cols = (s) => [...s.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)].map(m => [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]]);
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect(); if (!rect.width) continue;
      const desc = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
      for (const [prop, v] of [['bg', cs.backgroundImage], ['bgc', cs.backgroundColor], ['color', cs.color], ['shadow', cs.boxShadow], ['tshadow', cs.textShadow], ['border', cs.borderTopColor]]) {
        const cl = cols(v); const mids = [];
        if (prop === 'bg' && /gradient/.test(v)) for (let i = 1; i < cl.length; i++) mids.push([(cl[i-1][0]+cl[i][0])/2|0, (cl[i-1][1]+cl[i][1])/2|0, (cl[i-1][2]+cl[i][2])/2|0, Math.min(cl[i-1][3], cl[i][3])]);
        for (const [r, g, b, a] of [...cl, ...mids]) { if (a < 0.15) continue; const h = hue(r, g, b); if (!h || h.v < 0.25 || h.s < 0.25) continue;
          const purple = h.h >= 260 && h.h <= 345; const orange = h.h >= 20 && h.h <= 70 && /^(h1|h2|h3|span|strong|b)/.test(desc) && prop === 'color';
          const orangeAny = h.h >= 20 && h.h <= 70;
          if (purple || orange || orangeAny) { out.push(`${prop} ${desc.slice(0,90)} rgb(${r},${g},${b}) h=${h.h|0}`); break; } }
      }
    }
    return [...new Set(out)];
  });
  console.log('== ' + r + ' ' + res.length); res.slice(0, 40).forEach(x => console.log('  ' + x)); bad += res.length;
}
await b.close(); console.log('TOTAL', bad); process.exit(bad ? 1 : 0);
