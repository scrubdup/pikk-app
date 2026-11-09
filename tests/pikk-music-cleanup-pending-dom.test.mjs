/**
 * FE-1: music cleanup-pending sessionStorage is account-scoped + validated.
 * Real module under linkedom + test fetch (not source regex). No browser automation.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const { window, document } = parseHTML(
  '<!doctype html><html><body><div id="root"><div id="pikkMusicUploadList"></div></div></body></html>'
);
const store = new Map();
const ss = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
};
globalThis.window = window;
globalThis.document = document;
globalThis.sessionStorage = ss;
globalThis.localStorage = {
  getItem: () => null,
  setItem() {},
  removeItem() {},
  clear() {},
};
globalThis.location = {
  hash: '#/music',
  href: 'https://x/#/music',
  pathname: '/',
  origin: 'https://x',
  assign() {},
  replace() {},
};
globalThis.confirm = () => true;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Event = window.Event;
globalThis.CustomEvent = window.CustomEvent;
globalThis.requestAnimationFrame = (f) => setTimeout(f, 0);
window.sessionStorage = ss;
window.localStorage = globalThis.localStorage;
window.__PIKK_API_BASE__ = 'https://api.test';

const USER_A = 'user_a_live';
const USER_B = 'user_b_live';
const calls = [];
let currentUser = USER_A;
let listFor = {
  [USER_A]: [
    {
      id: 'media_a1',
      title: 'A secret',
      artist_name: 'A',
      original_name: 'a.mp3',
      size_bytes: 4,
      status: 'draft',
    },
  ],
  [USER_B]: [],
};
let delMode = 'pending'; // pending | ok | gone | conflict
let listDelayMs = 0;
let deleteDelayMs = 0;
let listHolders = [];

globalThis.fetch = async (url, opts = {}) => {
  const method = (opts.method || 'GET').toUpperCase();
  const userAtStart = currentUser;
  calls.push({ user: userAtStart, method, url: String(url) });
  const j = (s, b) => ({
    ok: s >= 200 && s < 300,
    status: s,
    json: async () => b,
    text: async () => JSON.stringify(b),
    headers: { get: (h) => (String(h).toLowerCase() === 'content-type' ? 'application/json' : null) },
  });
  const u = String(url);
  if (u.includes('/health')) {
    return j(200, { ok: true, capabilities: { media_storage: true } });
  }
  if (method === 'GET' && (u.endsWith('/media/music') || /\/media\/music\?/.test(u))) {
    const delay = listDelayMs;
    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    }
    // List payload follows the user at request start (stale A must not become B's rows).
    return j(200, { uploads: listFor[userAtStart] || [] });
  }
  if (method === 'DELETE' && u.includes('/media/music/')) {
    const delay = deleteDelayMs;
    if (delay > 0) await new Promise((r) => setTimeout(r, delay));
    const id = decodeURIComponent(u.split('/').pop());
    // Authz uses the session that started the request (not a later switch).
    if (userAtStart !== USER_A || !id.startsWith('media_a')) {
      return j(404, { error: { code: 'not_found', message: 'Music upload not found' } });
    }
    if (delMode === 'gone') {
      return j(404, { error: { code: 'not_found', message: 'Music upload not found' } });
    }
    if (delMode === 'conflict') {
      return j(409, { error: { code: 'not_draft', message: 'Only private drafts can be deleted' } });
    }
    if (delMode === 'pending') {
      return j(202, {
        ok: true,
        cleanup_pending: true,
        retry_required: true,
        message: 'Storage delete failed — retry required. No automatic cleanup sweeper.',
      });
    }
    return j(200, { ok: true });
  }
  return j(404, { error: { code: 'not_found' } });
};

const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms));

const {
  bindMusic,
  musicCleanupPendingKey,
  readMusicCleanupPending,
  writeMusicCleanupPending,
  sanitizeMusicCleanupPendingIds,
  retireLegacyMusicCleanupPendingKey,
  MUSIC_CLEANUP_PENDING_LEGACY,
  MUSIC_CLEANUP_PENDING_PREFIX,
} = await import('../src/pages/music.js');
const { noteLiveAuthMe, clearLiveAuthMe, getLiveAuthMeUserId } = await import(
  '../src/auth/readiness.js'
);

function freshRoot() {
  document.body.innerHTML = '<div id="root"><div id="pikkMusicUploadList"></div></div>';
  return document.getElementById('root');
}

function setUser(id) {
  currentUser = id;
  if (id) noteLiveAuthMe({ id, handle: id });
  else clearLiveAuthMe();
}

test('sanitizeMusicCleanupPendingIds: array-only, id regex, dedupe', () => {
  assert.deepEqual(sanitizeMusicCleanupPendingIds(null), []);
  assert.deepEqual(sanitizeMusicCleanupPendingIds({}), []);
  assert.deepEqual(sanitizeMusicCleanupPendingIds('media_a1'), []);
  assert.deepEqual(
    sanitizeMusicCleanupPendingIds([1, { x: 2 }, '../../x', 'ok_1', 'ok_1', 'bad/slash', 'a'.repeat(81), 'media_a1']),
    ['ok_1', 'media_a1']
  );
  assert.equal(musicCleanupPendingKey(USER_A), MUSIC_CLEANUP_PENDING_PREFIX + USER_A);
  assert.equal(musicCleanupPendingKey(''), null);
  assert.equal(musicCleanupPendingKey('../../x'), null);
});

test('music cleanup pending: scoped key, refresh, switch, stale, 404/409, double-click', async () => {
  store.clear();
  calls.length = 0;
  listFor = {
    [USER_A]: [
      {
        id: 'media_a1',
        title: 'A secret',
        artist_name: 'A',
        original_name: 'a.mp3',
        size_bytes: 4,
        status: 'draft',
      },
    ],
    [USER_B]: [],
  };
  delMode = 'pending';
  listDelayMs = 0;
  deleteDelayMs = 0;

  // Seed unsafe legacy key — must be retired and never drive UI.
  store.set(MUSIC_CLEANUP_PENDING_LEGACY, JSON.stringify(['media_legacy_leak']));

  setUser(USER_A);
  bindMusic(freshRoot());
  await tick();
  assert.equal(store.has(MUSIC_CLEANUP_PENDING_LEGACY), false, 'legacy key retired on bind');
  assert.ok(document.querySelector('.music-draft-delete'), 'A draft delete button');
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0);

  // 202 → retain card + scoped pending
  document.querySelector('.music-draft-delete').dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick();
  const aKey = musicCleanupPendingKey(USER_A);
  assert.ok(aKey);
  assert.deepEqual(JSON.parse(store.get(aKey)), ['media_a1']);
  assert.equal(store.has(MUSIC_CLEANUP_PENDING_LEGACY), false);
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 1);
  assert.equal(document.querySelector('[data-cleanup-pending="1"]')?.dataset.cleanupPending, '1');

  // Double-click safety while busy: second click ignored
  const retryBtn = document.querySelector('.music-draft-cleanup-retry');
  assert.ok(retryBtn);
  deleteDelayMs = 40;
  retryBtn.dispatchEvent(new window.Event('click', { bubbles: true }));
  retryBtn.dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick(80);
  deleteDelayMs = 0;
  const aDeletes = calls.filter((c) => c.user === USER_A && c.method === 'DELETE');
  // initial delete + one retry (not two)
  assert.equal(aDeletes.length, 2, 'double-click must not fire two retries');

  // Refresh as A with empty list → pending card survives from scoped storage
  listFor[USER_A] = [];
  delMode = 'pending';
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 1, 'A refresh keeps pending');
  assert.deepEqual(readMusicCleanupPending(USER_A), ['media_a1']);

  // Sign-out: clear rendered state; A's pending remains in storage for recovery
  setUser(null);
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0, 'signed-out shows no pending');
  assert.match(document.querySelector('#pikkMusicUploadList').textContent, /sign in/i);
  assert.deepEqual(readMusicCleanupPending(USER_A), ['media_a1'], 'A pending recoverable after sign-out');

  // Switch to B: never expose A's pending; click must not DELETE A's id under B
  const deletesBeforeB = calls.filter((c) => c.method === 'DELETE').length;
  setUser(USER_B);
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0, 'B must not see A pending');
  assert.ok(!document.querySelector('#pikkMusicUploadList').textContent.includes('media_a1'));
  document.querySelector('.music-draft-cleanup-retry')?.dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick();
  const bDeletes = calls.filter((c) => c.user === USER_B && c.method === 'DELETE');
  assert.equal(bDeletes.length, 0, 'B must not issue DELETE for A pending');
  assert.equal(calls.filter((c) => c.method === 'DELETE').length, deletesBeforeB);
  assert.deepEqual(readMusicCleanupPending(USER_A), ['media_a1']);
  assert.deepEqual(readMusicCleanupPending(USER_B), []);

  // Invalid storage shapes under B's key — must not break list or invent cards
  for (const bad of ['{}', '"media_a1"', '[1,{"x":2},"../../x"]', 'not json']) {
    store.set(musicCleanupPendingKey(USER_B), bad);
    bindMusic(freshRoot());
    await tick();
    const text = document.querySelector('#pikkMusicUploadList').textContent.replace(/\s+/g, ' ');
    assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0, `bad shape ${bad}`);
    assert.ok(!/filter is not a function/i.test(text), `bad shape must not throw into UI: ${bad}`);
  }
  // Mixed array: keep only valid ids for B
  writeMusicCleanupPending(USER_B, ['ok_b1', 1, { x: 2 }, '../../x', 'ok_b1', 'bad/x']);
  assert.deepEqual(readMusicCleanupPending(USER_B), ['ok_b1']);
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 1);
  assert.equal(document.querySelector('.music-draft-cleanup-retry')?.dataset.id, 'ok_b1');

  // 404 retires card + pending; 409 same
  setUser(USER_A);
  writeMusicCleanupPending(USER_A, ['media_a1']);
  listFor[USER_A] = [];
  delMode = 'gone';
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 1);
  document.querySelector('.music-draft-cleanup-retry').dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0, '404 retires card');
  assert.deepEqual(readMusicCleanupPending(USER_A), []);

  writeMusicCleanupPending(USER_A, ['media_a1']);
  delMode = 'conflict';
  bindMusic(freshRoot());
  await tick();
  document.querySelector('.music-draft-cleanup-retry').dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick();
  assert.equal(document.querySelectorAll('.music-draft-cleanup-retry').length, 0, '409 retires card');
  assert.deepEqual(readMusicCleanupPending(USER_A), []);

  // Stale late A list response must not paint into B
  listDelayMs = 60;
  setUser(USER_A);
  listFor[USER_A] = [
    {
      id: 'media_a1',
      title: 'A secret',
      artist_name: 'A',
      original_name: 'a.mp3',
      size_bytes: 4,
      status: 'draft',
    },
  ];
  bindMusic(freshRoot());
  await tick(5);
  setUser(USER_B);
  listFor[USER_B] = [];
  listDelayMs = 0;
  bindMusic(freshRoot());
  await tick(80);
  assert.ok(!document.querySelector('#pikkMusicUploadList').textContent.includes('A secret'), 'stale A list must not show under B');
  assert.equal(getLiveAuthMeUserId(), USER_B);

  // Stale late A 202 must not mutate B DOM; A pending still recoverable
  listDelayMs = 0;
  deleteDelayMs = 50;
  delMode = 'pending';
  setUser(USER_A);
  listFor[USER_A] = [
    {
      id: 'media_a2',
      title: 'A2',
      artist_name: 'A',
      original_name: 'a2.mp3',
      size_bytes: 4,
      status: 'draft',
    },
  ];
  writeMusicCleanupPending(USER_A, []);
  bindMusic(freshRoot());
  await tick();
  document.querySelector('.music-draft-delete').dispatchEvent(new window.Event('click', { bubbles: true }));
  await tick(5);
  setUser(USER_B);
  bindMusic(freshRoot());
  await tick(80);
  assert.equal(document.querySelectorAll('[data-id="media_a2"]').length, 0, 'late A 202 must not paint under B');
  assert.deepEqual(readMusicCleanupPending(USER_A), ['media_a2'], 'A pending still stored for A');
  assert.deepEqual(readMusicCleanupPending(USER_B), ['ok_b1']); // earlier B write still scoped

  // A returns → pending recoverable
  setUser(USER_A);
  listFor[USER_A] = [];
  deleteDelayMs = 0;
  bindMusic(freshRoot());
  await tick();
  assert.equal(document.querySelector('.music-draft-cleanup-retry')?.dataset.id, 'media_a2');

  retireLegacyMusicCleanupPendingKey();
  assert.equal(store.has(MUSIC_CLEANUP_PENDING_LEGACY), false);
});
