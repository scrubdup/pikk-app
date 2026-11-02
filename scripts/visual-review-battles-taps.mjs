// PIKK Battles vote screen: measure RENDERED heights of the two streamer vote buttons (>=44px)
// at 360/390/430px, plus the "X of Y eligible viewers voted" count. Requires `npm run build` first.
// Uses its own free port and fails if that port is busy or its server dies (never measures a foreign server).
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { chromium } from 'playwright';
const portIsFree = (port) => new Promise((res) => { const s = createServer().once('error', () => res(false)).once('listening', () => s.close(() => res(true))).listen(port, '127.0.0.1'); });
const freePort = () => new Promise((res, rej) => { const s = createServer().once('error', rej).listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); }); });
const port = Number(process.env.BATTLES_TAPS_PORT) || await freePort();
if (!(await portIsFree(port))) { console.error(`battles-taps: port ${port} is busy; refusing to measure a foreign server`); process.exit(2); }
const base = `http://127.0.0.1:${port}/pikk-app/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { env: { ...process.env, VITE_BASE: '/pikk-app/' }, stdio: 'inherit' });
let serverExit = null; server.on('exit', (code) => { serverExit = code ?? 'signal'; });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Seed: signed-in host who is live, with a battle whose 60s countdown just ended -> vote screen.
const seed = (now) => {
  if (sessionStorage.getItem('seeded')) return; sessionStorage.setItem('seeded', '1');
  const host = { id: 'u_testhost', username: 'TestHost' };
  localStorage.setItem('dbs_v1', JSON.stringify({
    user: host,
    live: { id: 'live_t', hostId: host.id, hostName: host.username, title: 'Test live', startedAt: now, endedAt: null, viewers: 0, giftsTotal: 0, tipsTotal: 0, giftLog: [], chat: [] },
    giftBattles: { history: [], champions: [], prefs: { invitationsEnabled: true }, active: {
      id: 'gb_seed', status: 'active', mode: 'streamer_vs_streamer', testMode: true, liveId: 'live_t',
      challenger: { id: host.id, name: host.username }, opponent: { id: 'streamer_maya', name: 'MayaBeats' },
      createdAt: now - 62000, startedAt: now - 61000, endsAt: now - 1000, durationMs: 60000,
      scoreA: 0, scoreB: 0, giftA: 3, giftB: 10, votesA: 0, votesB: 0, voters: [], giftLog: [] } },
  }));
};
const results = [];
try {
  let ready = false;
  for (let i = 0; i < 60 && serverExit === null; i++) { try { if ((await fetch(base)).ok) { ready = true; break; } } catch {} await sleep(250); }
  assert.equal(serverExit, null, `our vite preview exited early (code ${serverExit})`);
  assert.ok(ready, 'Vite preview unavailable');
  await mkdir('visual-review', { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [360, 390, 430]) {
      const ctx = await browser.newContext({ viewport: { width, height: 1600 }, deviceScaleFactor: 1, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
      await ctx.addInitScript(seed, Date.now());
      const page = await ctx.newPage(); const errors = []; page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(base + '#/giftbattles', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
      await page.locator('[data-gb-status="voting"]').waitFor({ timeout: 20000 });
      const vote = await page.locator('[data-gb-vote]').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height * 10) / 10));
      assert.equal(vote.length, 2, `${width}: two streamer vote buttons`);
      const turnout = await page.locator('[data-gb-turnout]').innerText();
      assert.match(turnout, /0 of 3 eligible viewers voted/, `${width}: turnout`);
      results.push({ width, vote, turnout });
      for (const h of vote) assert.ok(h >= 44, `${width}: vote button rendered ${h}px < 44px`);
      await page.locator('[data-gb-status="voting"]').screenshot({ path: `visual-review/battles-vote-${width}.png` });
      assert.deepEqual(errors, [], `${width}: page errors`);
      await ctx.close();
    }
    // Signed-in page (both routes, live and not live): every button / button-link is >=44px tall and its
    // centre is not covered by another element (elementFromPoint), incl. Open Live / Group Rooms / Roast Arena if present.
    for (const width of [360, 390, 430]) for (const route of ['#/battles', '#/giftbattles']) for (const live of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
      await ctx.addInitScript(([now, live]) => localStorage.setItem('dbs_v1', JSON.stringify({ user: { id: 'u_testhost', username: 'TestHost' }, live: live ? { id: 'live_t', hostId: 'u_testhost', hostName: 'TestHost', title: 'Test live', startedAt: now, endedAt: null, viewers: 0, giftsTotal: 0, tipsTotal: 0, giftLog: [], chat: [] } : null })), [Date.now(), live]);
      const page = await ctx.newPage();
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
      await page.locator('.gb-rules').waitFor({ timeout: 20000 });
      const text = await page.locator('.page').first().innerText();
      assert.doesNotMatch(text, /sends more/i, `${route}@${width}: no 'sends more' explainer`);
      const taps = await page.evaluate(() => [...document.querySelectorAll('.page a.btn, .page button')].map((el) => {
        el.scrollIntoView({ block: 'center' });
        const r = el.getBoundingClientRect(); if (!r.width) return null;
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { label: el.textContent.trim().slice(0, 40), h: Math.round(r.height * 10) / 10, covered: !!top && !el.contains(top) && !top.contains(el) };
      }).filter(Boolean));
      assert.ok(taps.length > 0, `${route}@${width}: buttons found`);
      for (const t of taps) {
        assert.ok(t.h >= 44, `${route}@${width} live=${live}: '${t.label}' rendered ${t.h}px < 44px`);
        assert.equal(t.covered, false, `${route}@${width} live=${live}: centre of '${t.label}' is covered`);
      }
      results.push({ route, width, live, buttons: taps.length });
      await ctx.close();
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify(results));
} catch (e) { console.error(e); process.exitCode = 1; } finally { server.kill(); setTimeout(() => process.exit(process.exitCode || 0), 200); }
