#!/usr/bin/env node
/**
 * Standalone Vault DOM + local Worker integration script (NOT part of `npm test`).
 *
 * Origin: independent review zz-review-vault-dom-live.test.mjs (REPORT-61d4c43).
 * Uses linkedom + Node fetch against a LOCAL wrangler dev (local D1 + local R2).
 * Not a real browser — no CORS/CHIPS/popup/Safari coverage.
 *
 * Prerequisites:
 *   1. From repo root, start a review-only Worker with isolated temp state:
 *        STATE_DIR=$(mktemp -d /tmp/vault-dom-live-XXXX)
 *        cd backend && npx wrangler dev -c ../scripts/review/wrangler.review-local.jsonc \
 *          --ip 127.0.0.1 --port 8799 --persist-to "$STATE_DIR" &
 *      (or point API below at your local review Worker)
 *   2. Wait until /health returns ok.
 *   3. Run:
 *        node --test scripts/review/vault-dom-live-standalone.mjs
 *   4. Teardown (always):
 *        kill %1 2>/dev/null || true
 *        rm -rf "$STATE_DIR"
 *
 * Isolated state: never reuse prod/shared Miniflare dirs; always mktemp + rm -rf.
 * No push, deploy, remote R2, secrets, or migrations from this script.
 *
 * Excluded from package.json `npm test` on purpose (needs live Worker; hung when
 * run in parallel with the suite). Keep it runnable and documented here.
 */
// Not a real browser. fetch is Node's undici with a manual per-identity cookie jar + Origin header.
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const API = 'http://127.0.0.1:8799';
const ORIGIN = 'https://scrubdup.github.io';
const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k), clear: () => mem.clear(), key: (i) => [...mem.keys()][i] ?? null, get length() { return mem.size; } };
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document; globalThis.window = window; globalThis.CustomEvent = window.CustomEvent;
window.__PIKK_API_BASE__ = API;

const realFetch = globalThis.fetch;
const jars = { A: '', B: '', C: '' }; let who = 'A';
const hooks = { delayList: null, health: null };
const LOG = [];
globalThis.fetch = async (url, opts = {}) => {
  const u = String(url); const method = (opts.method || 'GET').toUpperCase();
  if (u.endsWith('/health') && hooks.health) return hooks.health();
  const h = new Headers(opts.headers || {}); h.set('Origin', ORIGIN);
  const jarAtSend = who; if (jars[jarAtSend]) h.set('Cookie', jars[jarAtSend]);
  if (hooks.delayList && u.includes('/media?') && method === 'GET') await hooks.delayList();
  const res = await realFetch(u, { ...opts, headers: h, ...(opts.body instanceof Blob ? { duplex: 'half' } : {}) });
  const sc = res.headers.get('set-cookie'); if (sc) { const v = sc.split(';')[0]; jars[jarAtSend] = v.endsWith('=') ? '' : v; }
  LOG.push({ who: jarAtSend, method, path: u.replace(API, ''), status: res.status });
  return res;
};
const out = {}; const log = (k, v) => { out[k] = v; console.log('VAULTDOM', k, JSON.stringify(v)); };

const { syncRemoteAuthUser, clearAuthenticatedUser } = await import('../../src/store.js');
const { noteLiveAuthMe, clearLiveAuthMe } = await import('../../src/auth/readiness.js');
const { renderVaultMediaPanelHtml, bindVaultMediaPanel } = await import('../../src/pages/vault-media-ui.js');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFor(fn, ms = 60000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(25); } return null; }
async function api(method, path, body) { const r = await fetch(API + path, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined }); let j = null; try { j = await r.json(); } catch {} return { status: r.status, json: j }; }
async function identity(k) {
  who = k; const tag = `${k.toLowerCase()}${Date.now() % 1e7}`;
  const s = await api('POST', '/auth/signup', { email: `${tag}@example.com`, password: 'review pass 123', handle: `rv_${tag}`, display_name: k, gender: 'undisclosed' });
  assert.equal(s.status, 201, JSON.stringify(s.json));
  assert.equal((await api('POST', '/auth/verify', { token: s.json.verification.token })).status, 200);
  const me = await api('GET', '/auth/me'); return me.json.user;
}
function becomes(k, user) { who = k; clearLiveAuthMe(); clearAuthenticatedUser(); syncRemoteAuthUser(user); noteLiveAuthMe(user); }
function mount() { const app = document.getElementById('app'); app.innerHTML = renderVaultMediaPanelHtml(); bindVaultMediaPanel(app); return app; }
const $ = (app, s) => app.querySelector(s);
function mp4(size) { const b = new Uint8Array(size); b.set([0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]); for (let i = 12; i < size; i++) b[i] = i & 0xff; return b; }
function jpeg(n = 512) { const b = new Uint8Array(n); b.set([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]); return b; }
async function domUpload(app, file) {
  Object.defineProperty($(app, '#vaultMediaFile'), 'files', { value: [file], configurable: true });
  const seen = []; let stop = false;
  (async () => { while (!stop) { const t = $(app, '#vaultMediaProgress')?.textContent; if (t && seen[seen.length - 1] !== t) seen.push(t); await sleep(2); } })();
  $(app, '#vaultMediaUploadForm').dispatchEvent(new window.Event('submit', { cancelable: true }));
  await waitFor(() => /Ready:|Finished with state|Upload failed|cancelled|exceeds|not configured|Request failed|Upload is|Not found|processing still running/i.test($(app, '#vaultMediaProgress')?.textContent || '') && !$(app, '#vaultMediaSubmit').disabled, 120000);
  stop = true; return seen;
}

let A, B, C, appA;
test('setup identities', async () => { A = await identity('A'); B = await identity('B'); C = await identity('C'); });

test('D1 unauthenticated / demo session: mutations hidden', async () => {
  who = 'A'; clearLiveAuthMe(); clearAuthenticatedUser();
  const app = mount(); await sleep(50);
  log('D1', { formHidden: $(app, '#vaultMediaUploadForm').hidden, status: $(app, '#vaultMediaReadyStatus').textContent.trim(), blocked: $(app, '#vaultMediaFormBlocked').textContent });
});

test('D2 health gating: media_storage false / health throws', async () => {
  becomes('A', A);
  hooks.health = async () => new Response(JSON.stringify({ ok: true, capabilities: { media_storage: false } }), { headers: { 'Content-Type': 'application/json' } });
  let app = mount(); await sleep(100); const off = { formHidden: $(app, '#vaultMediaUploadForm').hidden, status: $(app, '#vaultMediaReadyStatus').textContent.trim() };
  hooks.health = async () => { throw new TypeError('network'); };
  app = mount(); await sleep(100); const thrown = { formHidden: $(app, '#vaultMediaUploadForm').hidden, status: $(app, '#vaultMediaReadyStatus').textContent.trim() };
  hooks.health = null; log('D2', { off, thrown });
});

test('D3 single + multipart upload through DOM, list/status/open/cancel', async () => {
  becomes('A', A); appA = mount();
  await waitFor(() => !$(appA, '#vaultMediaUploadForm').hidden);
  const single = await domUpload(appA, new File([jpeg()], 'a-private-photo.jpg', { type: 'image/jpeg' }));
  const multi = await domUpload(appA, new File([mp4(9 * 1024 * 1024)], 'a-private-video.mp4', { type: 'video/mp4' }));
  const partPuts = LOG.filter((l) => /\/parts\/\d+$/.test(l.path)).map((l) => [l.path.replace(/.*parts\//, 'part'), l.status]);
  await waitFor(() => $(appA, '#vaultMediaList').textContent.includes('a-private-video.mp4'), 10000);
  const listText = $(appA, '#vaultMediaList').textContent.replace(/\s+/g, ' ');
  const list = (await api('GET', '/media?limit=100')).json.media;
  const vid = list.find((m) => m.filename === 'a-private-video.mp4'); const pic = list.find((m) => m.filename === 'a-private-photo.jpg');
  // Open via DOM (capture anchor instead of navigating)
  const opened = []; const ce = document.createElement.bind(document);
  document.createElement = (t) => { const el = ce(t); if (t === 'a') el.click = () => opened.push(el.href || el.getAttribute('href')); return el; };
  $(appA, `.vault-media-open[data-id="${pic.id}"]`)?.dispatchEvent(new window.Event('click', { bubbles: true }));
  await waitFor(() => opened.length, 5000); document.createElement = ce;
  const signed = opened[0] || '';
  const anon = signed ? await realFetch(signed) : null; const anonBytes = anon ? new Uint8Array(await anon.arrayBuffer()) : null;
  const durable = { localStorageHasSig: [...mem.values()].some((v) => /sig=/.test(v)), domHasSig: /sig=/.test(document.documentElement.outerHTML) };
  // Unfinished upload cancel via DOM
  const pend = await api('POST', '/media/uploads', { type: 'photo', content_type: 'image/jpeg', filename: 'a-unfinished.jpg', size: 512, access: 'private' });
  appA = mount(); await waitFor(() => $(appA, `.vault-media-cancel[data-id="${pend.json.upload.id}"]`), 10000);
  $(appA, `.vault-media-cancel[data-id="${pend.json.upload.id}"]`).dispatchEvent(new window.Event('click', { bubbles: true }));
  await waitFor(async () => (await api('GET', `/media/${pend.json.upload.id}`)).status === 404, 5000);
  log('D3', { singleProgress: single, multipartProgress: multi, partPuts, listShowsBoth: listText.includes('a-private-photo.jpg') && listText.includes('a-private-video.mp4'), states: { pic: pic?.state, vid: vid?.state, vidSize: vid?.size }, listKeys: Object.keys(pic || {}), openedRelativeToApi: signed.startsWith(API + '/media/'), anonSignedFetch: anon?.status, bytesMatch: anonBytes?.length === 512 && anonBytes[0] === 0xff, durable, cancelledGone: (await api('GET', `/media/${pend.json.upload.id}`)).status });
  out.ids = { pic: pic?.id, vid: vid?.id };
});

test('D4 cross-user: B list/get/cancel/access; blocked C on public media', async () => {
  becomes('B', B); const appB = mount(); await waitFor(() => !$(appB, '#vaultMediaUploadForm').hidden); await sleep(300);
  const bList = (await api('GET', '/media?limit=100')).json;
  const r = { bDomShowsA: /a-private/.test($(appB, '#vaultMediaList').textContent), bListCount: bList.count, bGetA: (await api('GET', `/media/${out.ids.pic}`)).status, bCancelA: (await api('DELETE', `/media/uploads/${out.ids.pic}`)).status, bAccessA: (await api('POST', `/media/${out.ids.pic}/access-url`)).status, bVaultHealth: (await api('GET', '/vault/health')).status };
  who = 'A'; await api('POST', '/blocks', { handle: C.handle });
  // make A's photo public directly is not exposed; check C (blocked) still 404
  who = 'C'; r.cGetA = (await api('GET', `/media/${out.ids.pic}`)).status; r.cAccessA = (await api('POST', `/media/${out.ids.pic}/access-url`)).status;
  r.limitCap = (await api('GET', '/media?limit=1000')).status; r.limitJunk = (await api('GET', '/media?limit=abc')).status;
  who = 'A'; r.aLimit1 = (await api('GET', '/media?limit=1')).json.count; r.aLimit1000Count = (await api('GET', '/media?limit=1000')).json.count;
  log('D4', r);
});

test('D5 account switch while A list request is in flight (same page, no re-render)', async () => {
  becomes('A', A); let release; const gate = new Promise((r) => (release = r));
  hooks.delayList = () => gate;
  const app = mount(); await sleep(150);
  becomes('B', B); // switch identity on the same page without re-mount
  release(); hooks.delayList = null; await sleep(400);
  const sameDomShowsA = /a-private-photo/.test($(app, '#vaultMediaList').textContent);
  // re-mount variant
  becomes('A', A); let rel2; const gate2 = new Promise((r) => (rel2 = r)); hooks.delayList = () => gate2;
  const app1 = mount(); await sleep(150); const oldList = $(app1, '#vaultMediaList');
  becomes('B', B); const app2 = mount(); rel2(); hooks.delayList = null; await sleep(500);
  log('D5', { sameDomAfterSwitchShowsA: sameDomShowsA, remountNewDomShowsA: /a-private/.test($(app2, '#vaultMediaList').textContent), oldDetachedHadA: /a-private/.test(oldList.textContent), oldConnected: oldList.isConnected });
});

test('D6 account switch during A multipart upload', async () => {
  becomes('A', A); const app = mount(); await waitFor(() => !$(app, '#vaultMediaUploadForm').hidden);
  Object.defineProperty($(app, '#vaultMediaFile'), 'files', { value: [new File([mp4(17 * 1024 * 1024)], 'a-switch.mp4', { type: 'video/mp4' })], configurable: true });
  const before = LOG.length;
  $(app, '#vaultMediaUploadForm').dispatchEvent(new window.Event('submit', { cancelable: true }));
  await waitFor(() => LOG.slice(before).some((l) => /\/parts\/1$/.test(l.path)), 30000);
  becomes('B', B);
  await waitFor(() => !$(app, '#vaultMediaSubmit').disabled, 60000);
  const after = LOG.slice(before).map((l) => `${l.who}:${l.method} ${l.path.replace(/med_[\w-]+/, 'ID').replace(/\?.*/, '')} ${l.status}`);
  who = 'A'; const aRow = (await api('GET', '/media?limit=100')).json.media.find((m) => m.filename === 'a-switch.mp4');
  log('D6', { requests: after, progress: $(app, '#vaultMediaProgress').textContent, listDomShowsA: /a-private/.test($(app, '#vaultMediaList').textContent), aRowState: aRow?.state });
});

test('D7 direct load before /auth/me resolves (no rebind)', async () => {
  who = 'A'; clearLiveAuthMe(); clearAuthenticatedUser(); syncRemoteAuthUser(A); // cached backend user, live marker not yet set
  const app = mount(); await sleep(50); const before = { formHidden: $(app, '#vaultMediaUploadForm').hidden, status: $(app, '#vaultMediaReadyStatus').textContent.trim() };
  noteLiveAuthMe(A); await sleep(300);
  log('D7', { before, afterAuthMeResolves: { formHidden: $(app, '#vaultMediaUploadForm').hidden } });
});
