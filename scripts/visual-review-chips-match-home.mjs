// t222u guard: tab / filter chips on sample routes must match Home's chips (text colour, size, weight, pill radius,
// blue outline when unselected, glossy shared token when selected). Story/avatar circles must wear the red·chrome·blue ring.
import { chromium } from 'playwright';
const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const GROUPS = '.pikk-home-filterbar, .home-stage-tabs, .live-disc-tabs, .admin-type-tabs, .pikk-viral-tabs, .shop-chips, .pikk-video-filters, .pikk-music-categories, .live-cat-chips';
const ROUTES = ['/live', '/music', '/videos', '/explore', '/refer', '/share', '/viral-live', '/posts', '/profile-shop'];
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] });
const sig = (page) => page.evaluate((G) => [...document.querySelectorAll(`:is(${G}) > :is(a, button)`)].filter((e) => e.getBoundingClientRect().width).map((e) => {
  const c = getComputedStyle(e); const r = e.getBoundingClientRect();
  const sel = /(^|\s)(on|active|is-active|is-current|selected)(\s|$)/.test(e.className) || ['true', 'page'].includes(e.getAttribute('aria-selected') || e.getAttribute('aria-current') || e.getAttribute('aria-pressed'));
  const before = getComputedStyle(e, '::before'); const tapH = before.content !== 'none' && before.position === 'absolute' ? r.height - 2 * (parseFloat(before.top) + parseFloat(c.borderTopWidth)) : r.height;
  return { h: Math.round(r.height), pad: c.padding, tapH: Math.round(tapH), txt: e.textContent.trim().slice(0, 16), sel, color: c.color, fs: c.fontSize, fw: c.fontWeight, pill: parseFloat(c.borderRadius) >= r.height / 2 - 1,
    blue: /(30|47), 107, 255/.test(c.borderTopColor), glossy: c.backgroundImage.includes('rgba(255, 255, 255, 0.42)'), flat: c.backgroundImage === 'none' };
}), GROUPS);
const open = async (r) => { const p = await b.newPage({ viewport: { width: 390, height: 844 } }); await p.goto(base + '#' + r, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(+(process.env.W || 6500)); return p; };
const hp = await open('/home'); const home = (await sig(hp)).filter((x) => x.txt); await hp.close();
const ref = home.find((x) => !x.sel); let bad = 0;
console.log('/home ref h', ref?.h, 'pad', ref?.pad, 'tap', ref?.tapH);
if (!ref || !home.some((x) => x.sel && x.glossy)) { console.log('home reference chips missing'); process.exit(1); }
for (const r of ROUTES) {
  const p = await open(r); const chips = await sig(p);
  const rings = await p.evaluate(() => [...document.querySelectorAll('.meta > .avatar, .shop-avatar-frame')].filter((e) => e.getBoundingClientRect().width).map((e) => getComputedStyle(e).backgroundImage.includes('gradient')));
  await p.close();
  for (const c of chips) {
    const errs = [];
    if (c.color !== ref.color) errs.push('color ' + c.color);
    if (c.fs !== ref.fs) errs.push('font-size ' + c.fs);
    if (c.fw !== ref.fw) errs.push('weight ' + c.fw);
    if (!c.pill) errs.push('not pill');
    if (c.h !== ref.h) errs.push('height ' + c.h);
    if (c.pad !== ref.pad) errs.push('padding ' + c.pad);
    if (c.tapH < 44) errs.push('tap ' + c.tapH);
    if (c.sel ? !c.glossy : !(c.blue && c.flat)) errs.push(c.sel ? 'selected not glossy token' : 'unselected not dark+blue');
    if (errs.length) { bad++; console.log(r, JSON.stringify(c.txt), errs.join(', ')); }
  }
  if (rings.includes(false)) { bad++; console.log(r, 'avatar without Home ring'); }
  console.log(r, 'chips', chips.length, 'h', [...new Set(chips.map((c) => c.h))].join('/'), 'tap', chips.length ? Math.min(...chips.map((c) => c.tapH)) : '-', 'rings', rings.length);
}
// Real hit-tests: 5px above and below each chip's visible box must resolve to that chip (its ::before), at 360/390/430.
const hitTest = (page) => page.evaluate(async (G) => {
  const out = { tested: 0, fail: [] };
  for (const e of document.querySelectorAll(`:is(${G}) > :is(a, button)`)) {
    let r = e.getBoundingClientRect(); if (!r.width) continue;
    e.scrollIntoView({ block: 'center', inline: 'nearest' }); await new Promise((f) => requestAnimationFrame(() => f()));
    r = e.getBoundingClientRect(); if (r.left < 0 || r.right > innerWidth) continue;
    const x = Math.round(r.left + r.width / 2);
    for (const [lbl, y] of [['above', r.top - 5], ['below', r.bottom + 5]]) {
      const hit = document.elementFromPoint(x, y); out.tested++;
      // Between wrapped rows (10px gap, kept so layout matches fab35c8) the point may land on the adjacent row's chip; it must still hit a chip.
      const sibs = [...e.parentElement.children].filter((o) => o !== e);
      const neighbour = sibs.find((o) => (o === hit || o.contains(hit)) && Math.abs(o.getBoundingClientRect().top - r.top) > r.height / 2 && Math.abs(o.getBoundingClientRect().top - r.top) < r.height + 16);
      if (neighbour) out.betweenRows = (out.betweenRows || 0) + 1;
      if (!(hit === e || e.contains(hit) || neighbour)) out.fail.push(`${e.textContent.trim().slice(0, 14)} ${lbl} -> ${hit ? (hit.className || hit.tagName).toString().slice(0, 30) : 'null'}`);
    }
  }
  return out;
}, GROUPS);
for (const w of [360, 390, 430]) for (const r of ['/home', ...ROUTES]) {
  const p = await b.newPage({ viewport: { width: w, height: 844 } }); await p.goto(base + '#' + r, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(+(process.env.W || 6500));
  const h = await hitTest(p); await p.close();
  console.log('hit', w, r, 'points', h.tested, 'between-rows', h.betweenRows || 0, 'miss', h.fail.length, h.fail.slice(0, 3).join(' | '));
  if (h.fail.length) bad++;
}
await b.close(); process.exit(bad ? 1 : 0);
