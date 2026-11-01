import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const { renderHomeShowcase, SHOWCASE_ORDER, SHOWCASE_SEE_ALL } = await import('../src/home-showcase.js');
const html = renderHomeShowcase();
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const routeExists = (h) => { const p = '/' + h.replace(/^#\/?/, '').split(/[?#]/)[0]; return main.includes(`'${p}': {`); };
test('showcase sections render in owner order', () => {
  const order = [...html.matchAll(/data-hs="([\w-]+)"/g)].map((m) => m[1]);
  assert.deepEqual(order, SHOWCASE_ORDER);
  const core = order.filter((k) => !['live', 'battles'].includes(k));
  assert.deepEqual(core, ['music', 'posts', 'videos', 'connect', 'dating', 'games', 'shop']);
});
test('every See all and every card link resolves to a real route', () => {
  for (const [k, h] of Object.entries(SHOWCASE_SEE_ALL)) assert.ok(routeExists(h), `${k} ${h}`);
  for (const [, h] of html.matchAll(/href="(#\/[^"]+)"/g)) assert.ok(routeExists(h), h);
});
test('Games: all 15, Block Wars first, Coming Soon; Dating 18+; lazy images; no promote/pink/YouTube branding', () => {
  const g = html.slice(html.indexOf('data-hs="games"'), html.indexOf('data-hs="battles"'));
  const names = [...g.matchAll(/<strong>([^<]+)<\/strong>/g)].map((m) => m[1]);
  assert.equal(names.length, 15); assert.equal(names[0], 'Block Wars'); assert.match(g, /blockwars-preview\/01-title\.jpg/); assert.match(g, /Coming Soon/);
  assert.match(html, /18\+ · safety-gated/); assert.match(html, /No profiles shown/);
  for (const m of html.matchAll(/<img [^>]*>/g)) assert.match(m[0], /loading="lazy"/);
  assert.doesNotMatch(html, /Sponsored|Promoted|pikk-ad-slot|YouTube/);
});
test('Home renders the showcase after the visual feed', () => {
  assert.match(readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8'), /\$\{visualFeed\}\n    \$\{renderHomeShowcase\(\)\}/);
});
