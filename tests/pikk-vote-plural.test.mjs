import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const mem = {};
globalThis.localStorage = { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
globalThis.window ??= globalThis;
const { voteLabel } = await import('../src/pages/giftbattles.js');
test('vote counts are pluralized correctly', () => {
  assert.equal(voteLabel(1), '1 vote');
  assert.equal(voteLabel(2), '2 votes');
  assert.equal(voteLabel(0), '0 votes');
});
test('no hardcoded "<n> votes" on the Battles or Roast pages', () => {
  for (const f of ['giftbattles.js', 'roast-arena.js']) {
    const src = readFileSync(new URL(`../src/pages/${f}`, import.meta.url), 'utf8');
    assert.doesNotMatch(src, /\$\{[^}]*(score|votes|points)[^}]*\}\)?\}? votes\b/, f);
  }
});

const gb = await import('../src/pages/giftbattles.js');
const gbStore = await import('../src/store.js');
test('signed-out Battles: accurate streamer-vs-streamer lead, no "Runs inside Live & Group Rooms"', () => {
  for (const w of [/Two live streamers/, /60s round/, /audience votes decide/, /gifts don't score/, /24-hour champion badge/]) assert.match(gb.BATTLES_LEAD, w);
  const src = readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /Runs inside Live & Group Rooms/);
});
test('signed-out preview: static sample split + vote screen, labeled, no actions', () => {
  const html = gb.renderSignedOutPreview();
  assert.match(html, /data-gb-preview="split"/); assert.match(html, /data-gb-preview="vote"/);
  assert.match(html, /TEST MODE · preview/); assert.match(html, /sample/i); assert.match(html, /eligible viewers voted/);
  assert.match(html, /does not score/); assert.match(html, /1 vote</); assert.match(html, /2 votes</);
  assert.match(html, /Owner verification needed/);
  assert.doesNotMatch(html, /<button|data-gb-vote|data-gb-gift|id="gb/);
});
test('#/battles is a registered route to the same page as #/giftbattles', () => {
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /'\/battles': \{ render: renderGiftBattles, bind: bindGiftBattles \}/);
  assert.match(main, /'\/giftbattles': \{ render: renderGiftBattles, bind: bindGiftBattles \}/);
});

test('page title is PIKK Battles signed in and out; old leads gone in both views', () => {
  const src = readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /shellPage\(\s*'Gift Battles'/);
  assert.match(src, /if \(!user\) return shellPage\('PIKK Battles'/);
  assert.match(src, /return shellPage\('PIKK Battles', body, \{\s*lead: BATTLES_LEAD,/);
  assert.doesNotMatch(src, /Runs inside Live & Group Rooms|Runs during Live · not a separate stream/);
});

for (const route of ['#/giftbattles', '#/battles']) {
  for (const signedIn of [false, true]) {
    test(`${route} ${signedIn ? 'signed in' : 'signed out'}: never the "whoever sends more" gift explainer; sign-in prompt when signed out`, async () => {
      if (signedIn) gbStore.signInLocal('test_host'); else gbStore.signOut();
      globalThis.location = { hash: route };
      const html = gb.renderGiftBattles();
      assert.doesNotMatch(html, /sends more|whoever sends more/i);
      assert.doesNotMatch(html, /viewer[\s-]+vs\.?[\s-]+viewer/i);
      assert.match(html, /PIKK Battles/i);
      if (!signedIn) assert.match(html, /href="#\/profile"[^>]*data-sb-signin/);
    });
  }
}
test('battles tap script checks signed-in buttons (44px + elementFromPoint centre) on both routes', () => {
  const sc = readFileSync(new URL('../scripts/visual-review-battles-taps.mjs', import.meta.url), 'utf8');
  assert.match(sc, /elementFromPoint/); assert.match(sc, /\['#\/battles', '#\/giftbattles'\]/); assert.match(sc, /sends more/);
});
