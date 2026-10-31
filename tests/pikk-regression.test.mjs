import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getRoute, navigate, onRoute } from '../src/router.js';
import { TABBAR, VIDEOS } from '../src/data.js';

// These checks protect the developed main branch from the older skeleton being
// published or used as a new starting point. They do not exercise a browser.
test('hash routes keep deep links, query strings and in-page anchors', () => {
  const original = globalThis.location;
  try {
    for (const [hash, path, query, elementId] of [
      ['', '/home', {}, ''],
      ['#/wallet#wallet-coins', '/wallet', {}, 'wallet-coins'],
      ['#/posts?compose=1', '/posts', { compose: '1' }, ''],
      ['#/earnings?cat=gifts', '/earnings', { cat: 'gifts' }, ''],
      ['#/blockwars', '/blockwars', {}, ''],
    ]) {
      globalThis.location = { hash };
      const route = getRoute();
      assert.equal(route.path, path, hash);
      assert.deepEqual(route.query, query, hash);
      assert.equal(route.elementId, elementId, hash);
    }
  } finally {
    if (original === undefined) delete globalThis.location;
    else globalThis.location = original;
  }
});

test('same-route navigation refreshes listeners without changing the hash', () => {
  const original = globalThis.location;
  // Match browser Location.hash normalization (a plain object does not add '#').
  let hash = '#/music';
  globalThis.location = {
    get hash() { return hash; },
    set hash(value) { hash = value.startsWith('#') ? value : '#' + value; },
  };
  let refreshes = 0;
  const unsubscribe = onRoute(() => refreshes++);
  try {
    navigate('/music');
    assert.equal(refreshes, 1);
    assert.equal(globalThis.location.hash, '#/music');
    navigate('/home');
    assert.equal(globalThis.location.hash, '#/home');
    assert.equal(refreshes, 1); // browser hashchange fires separately
  } finally {
    unsubscribe();
    if (original === undefined) delete globalThis.location;
    else globalThis.location = original;
  }
});

test('preserve the seven approved navigation tabs and their order', () => {
  assert.deepEqual(TABBAR.map(({ label }) => label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.deepEqual(TABBAR.map(({ href }) => href), ['#/music', '#/videos', '#/connect', '#/create', '#/dating', '#/games', '#/shop']);
  assert.equal(TABBAR[3].primary, true, 'Create remains the center action');
  const header = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(header, /id="headerProfile" href="#\/profile"/);
  assert.match(header, /id="headerMsg" href="#\/messages"/);
  assert.match(header, /id="notifBtn" href="#\/notifications"/);
});

test('preserve developed route modules instead of the older skeleton', () => {
  const source = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  for (const route of [
    '/home', '/posts', '/music', '/videos', '/live', '/messages',
    '/spotlight', '/openmic', '/giftbattles', '/multiguest',
    '/clippers', '/wallet', '/earnings', '/shop', '/rewards',
    '/blockwars', '/connect', '/shorts', '/fanclubs', '/dating', '/games',
  ]) {
    // /rewards is a standalone module in some branches, while this main
    // version uses the /share and /refer routes for Rewards.
    if (route === '/rewards') {
      assert.ok(source.includes("'/share':"));
      assert.ok(source.includes("'/refer':"));
      continue;
    }
    assert.ok(source.includes(`'${route}':`), `Missing developed route: ${route}`);
  }
});

test('preserve the real DatBoiSkeet music catalog', () => {
  for (const title of [
    'Dirty Money ft. Lil Baby',
    '93 ft. DaBaby',
    'No Love ft. YFN Lucci',
  ]) {
    assert.ok(VIDEOS.some(({ title: actual }) => actual === title), `Missing ${title}`);
  }
});
