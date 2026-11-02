import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const { document, window, CustomEvent } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document; globalThis.window = window; globalThis.CustomEvent = CustomEvent;
const gb = await import('../src/live-gift-battle.js');
const battle = (at, bt) => { let x = gb.startBattle('alice', 'bob', 0); x = gb.addGift(x, 'a', at, 0); return gb.addGift(x, 'b', bt, 0); };

test('t463u payout: off = each side keeps its own; on = winner gets the whole pot; tie never pools', () => {
  assert.deepEqual(gb.computePayout(battle(15, 6), false), { a: 15, b: 6, pot: 21, winnerTakesAll: false, tie: false });
  assert.deepEqual(gb.computePayout(battle(15, 6), true), { a: 21, b: 0, pot: 21, winnerTakesAll: true, tie: false });
  assert.deepEqual(gb.computePayout(battle(2, 11), true), { a: 0, b: 13, pot: 13, winnerTakesAll: true, tie: false });
  assert.deepEqual(gb.computePayout(battle(5, 5), true), { a: 5, b: 5, pot: 10, winnerTakesAll: false, tie: true });
  assert.deepEqual(gb.computePayout(battle(0, 0), false), { a: 0, b: 0, pot: 0, winnerTakesAll: false, tie: true });
  for (const [a, b] of [[1, 2], [10, 3], [7, 7]]) for (const on of [true, false]) { const p = gb.computePayout(battle(a, b), on); assert.equal(p.a + p.b, a + b, 'coins conserved'); }
});

test('t463u toggle renders in Live and Rooms controls (TEST MODE, off by default) and flips on tap', () => {
  for (const scope of ['live', 'room']) {
    const h = gb.renderGiftForAllControls(scope);
    assert.match(h, /data-gb-wta aria-pressed="false"[^>]*>🏆 Winner Takes All: Off <small>TEST MODE<\/small>/);
    assert.match(h, /<details class="pikk-gb-how">/);
    assert.match(gb.renderGiftBattleExplainer(scope), /Winner Takes All<\/strong>[^<]*\(optional toggle, off by default\)[\s\S]*TEST MODE demo coins only, no real money/);
  }
  assert.doesNotMatch(gb.renderGiftBattleExplainer(), /Winner Takes All/, 'no Winner Takes All wording when not in Live/Rooms (Battles page)');
  const root = document.getElementById('app'); root.innerHTML = gb.renderGiftForAllControls('live');
  gb.bindGiftForAll(root, { me: 'viewer1' });
  const t = root.querySelector('[data-gb-wta]'); t.dispatchEvent(new window.Event('click', { bubbles: true }));
  assert.equal(t.getAttribute('aria-pressed'), 'true'); assert.match(t.innerHTML, /Winner Takes All: On <small>TEST MODE<\/small>/);
  root.innerHTML = '';
});

test('t463u: giftbattles page untouched; palette + 44px taps', () => {
  const css = readFileSync(new URL('../src/pikk-pages.css', import.meta.url), 'utf8');
  assert.match(css, /\.pikk-gb-controls \.chip\{min-height:44px\}/);
  assert.match(css, /\.pikk-gb-how>summary\{min-height:44px/);
  assert.doesNotMatch(readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8'), /Winner Takes All|computePayout/);
});
