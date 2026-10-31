import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const updates = readFileSync(new URL('../src/pages/updates.js', import.meta.url), 'utf8');

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');

test('update center is a real route and accessible from menu and footer', () => {
  assert.match(main, /'\/updates': \{ render: renderUpdates, bind: bindUpdates \}/);
  assert.match(main, /href="#\/updates"/);
  assert.match(html, /href="#\/updates"/);
});
test('update center lists five verified recent merged UI releases in newest-first order', () => {
  assert.match(updates, /pr: 197[\s\S]*pr: 196[\s\S]*pr: 195[\s\S]*pr: 194[\s\S]*pr: 193/);
  assert.equal((updates.match(/pr: \d+, kind:/g) || []).length, 5);
  for (const route of ['#/viral-live', '#/explore']) {
    assert.ok(updates.includes("route: '" + route + "'"), 'Missing published section: ' + route);
    assert.ok(main.includes("'" + route.slice(1) + "': { render:"), 'Missing real app route: ' + route);
  }
  for (const detail of [
    'Viral Clips opens Clips, Songs opens Music, and Photos opens Home',
    'keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view',
    'Use arrow keys or Home/End',
    'Press Escape in Explore search',
    'switching between Trending, Following and Discover',
  ]) {
    assert.ok(updates.includes(detail), 'Missing verified release detail: ' + detail);
  }
  assert.match(updates, /not broadcasting/);
  assert.match(updates, /not a livestream/);
  assert.match(updates, /not backend search coverage/);
  assert.doesNotMatch(updates, /Premium Wallet & Payouts|real-time viewer counts are live/);
  assert.ok(updates.includes('href="${esc(release.route)}"'));
  assert.ok(updates.includes('aria-label="${esc(`See ${release.title} in PIKK`)}"'), 'Each release link has a descriptive screen-reader name');
  assert.match(updates, /pikkUpdatesRefresh/);
  assert.match(updates, /pikk-official-approved\.jpg/);
  assert.match(updates, /VIRAL LIVE · PREVIEW/);
  assert.match(updates, /EXPLORE · NAVIGATION/);
});

test('production version is the source commit of the deployed build', () => {
  assert.match(workflow, /VITE_BUILD_SHA: \$\{\{ github\.sha \}\}/);
  assert.match(html, /id="pikk-refresh-link"/);
  assert.doesNotMatch(html, /localStorage\.clear/);
});
