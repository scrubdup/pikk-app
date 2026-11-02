// Checker #370: measure RENDERED heights of Roast vote-name and rematch Yes/No buttons (must be >=44px)
// at 360/390/430px in Roast 1v1 (the only Roast mode, owner ruling t461u). Requires `npm run build` first.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { chromium } from 'playwright';
// Never measure a foreign server: use a port that is free right now (ROAST_TAPS_PORT overrides),
// start vite with --strictPort, and fail if our own server exits or the port is already taken.
export const portIsFree = (port) => new Promise((res) => { const s = createServer().once('error', () => res(false)).once('listening', () => s.close(() => res(true))).listen(port, '127.0.0.1'); });
const freePort = () => new Promise((res, rej) => { const s = createServer().once('error', rej).listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => res(port)); }); });
const port = Number(process.env.ROAST_TAPS_PORT) || await freePort();
if (!(await portIsFree(port))) { console.error(`roast-taps: port ${port} is busy; refusing to measure a foreign server`); process.exit(2); }
const base = `http://127.0.0.1:${port}/pikk-app/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { env: { ...process.env, VITE_BASE: '/pikk-app/' }, stdio: 'inherit' });
let serverExit = null;
server.on('exit', (code) => { serverExit = code ?? 'signal'; });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const heights = async (root, sel) => root.locator(sel).evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height * 10) / 10));
const results = [];
try {
  let ready = false;
  for (let i = 0; i < 60 && serverExit === null; i++) { try { if ((await fetch(base)).ok) { ready = true; break; } } catch {} await sleep(250); }
  assert.equal(serverExit, null, `our vite preview exited early (code ${serverExit}); port ${port} busy or build missing`);
  assert.ok(ready, 'Vite preview unavailable');
  await mkdir('visual-review', { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    for (const width of [360, 390, 430]) for (const mode of ['1v1']) {
      const ctx = await browser.newContext({ viewport: { width, height: 1600 }, deviceScaleFactor: 1, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
      const page = await ctx.newPage();
      await page.goto(base + '#/roast-arena', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
      const r = page.locator('#roast-1v1');
      await r.locator('[data-roast="invite"]').waitFor({ timeout: 20000 });
      await r.locator('[data-consent="challenger"]').check(); await r.locator('[data-roast="invite"]').click();
      await r.locator('[data-consent="opponent"]').check(); await r.locator('[data-roast="accept"]').click();
      await r.locator('[data-roast="skip"]').click();
      const vote = await heights(r, '[data-roast-vote]');
      assert.equal(vote.length, 2, `${mode}@${width} vote buttons`);
      await r.locator('[data-roast-vote="0"]').click();
      for (let i = 0; i < 8 && !(await r.locator('[data-roast-rematch]').count()); i++) { await r.locator('[data-roast="skip"]').click(); if (await r.locator('[data-roast-vote="0"]').count()) await r.locator('[data-roast-vote="0"]').click(); }
      const rematch = await heights(r, '[data-roast-rematch]');
      assert.ok(rematch.length >= 4, `${mode}@${width} rematch buttons`);
      results.push({ mode, width, vote, rematch });
      for (const h of [...vote, ...rematch]) assert.ok(h >= 44, `${mode}@${width}: button rendered ${h}px < 44px`);
      await r.screenshot({ path: `visual-review/roast-rematch-${mode}-${width}.png` });
      await ctx.close();
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify(results));
} catch (e) { console.error(e); process.exitCode = 1; } finally { server.kill(); setTimeout(() => process.exit(process.exitCode || 0), 200); }
