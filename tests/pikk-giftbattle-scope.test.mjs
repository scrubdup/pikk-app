import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const { document, window, CustomEvent } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document; globalThis.window = window; globalThis.CustomEvent = CustomEvent;
const gb = await import('../src/live-gift-battle.js');
const rd = (f) => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');

test('viewer Gift Battle explainer/overlay is not on the streamer Battles page (#/giftbattles)', () => {
  for (const x of [gb.renderGiftBattleExplainer(), gb.renderGiftBattleExplainer('battles')]) {
    assert.match(x, /id="sbExplainer"/); assert.doesNotMatch(x, /gbExplainer|Gift Battle/);
  }
  assert.match(gb.renderGiftBattleExplainer('live'), /id="gbExplainer"/);
  assert.match(gb.renderGiftBattleExplainer('room'), /id="gbExplainer"/);
  const page = rd('pages/giftbattles.js');
  assert.doesNotMatch(page, /renderGiftForAllControls|bindGiftForAll|renderGiftBattleExplainer\('(live|room)'\)/);
});

test("Live 'Challenge @gifter' pop enters the 30s first-tap flow and starts the battle", () => {
  const live = rd('pages/live.js');
  assert.match(live, /ev\.target\.closest\('#liveGbPopChallenge'\)/);
  assert.match(live, /gbChallengeGifter\(root, pop\.fromUser\)/);
  const root = document.getElementById('app');
  root.innerHTML = gb.renderGiftForAllControls('live');
  gb.bindGiftForAll(root, { me: 'viewer1' });
  assert.equal(gb.challengeGifter(root, 'bigGifter'), true);
  const slot = root.querySelector('[data-gb-slot]');
  assert.equal(slot.hidden, false);
  assert.match(slot.innerHTML, /Gift Battle/);
  assert.match(slot.innerHTML, /bigGifter/);
  assert.match(slot.innerHTML, /viewer1/);
  assert.match(slot.innerHTML, /data-gb-side="a"/, 'battle (not just the window) is running');
  const empty = parseHTML('<div></div>').document.querySelector('div');
  assert.equal(gb.challengeGifter(empty, 'x'), false);
  root.innerHTML = ''; // slot leaves the DOM -> its 1s ticker clears itself
});

test('signed-out #/giftbattles renders a non-empty Streamer Battles explainer about votes, with no gift battle / gift scoring words', async () => {
  mem.delete('dbs_v1');
  globalThis.location = { hash: '#/giftbattles' };
  const { renderGiftBattles } = await import('../src/pages/giftbattles.js');
  const html = renderGiftBattles();
  const { document: d } = parseHTML(`<main>${html}</main>`);
  const ex = d.querySelector('#sbExplainer');
  assert.ok(ex && ex.textContent.trim().length > 80, 'explainer present and non-empty');
  assert.match(ex.textContent, /vote/i);
  assert.doesNotMatch(ex.textContent, /gift|coins?\b|points?\b|send more/i);
  assert.ok(ex.querySelector('a[href="#/profile"][data-sb-signin]'), 'sign-in prompt when signed out');
  assert.equal(d.querySelector('#gbExplainer'), null);
});
