import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { freshPikkUrl } from '../src/refresh-url.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('update check retains the PIKK route, existing query and project base', () => {
  const oldUrl = 'https://scrubdup.github.io/pikk-app/?campaign=creator&refresh=old#/music?tab=releases';
  const updated = new URL(freshPikkUrl(oldUrl, 12345));
  assert.equal(updated.pathname, '/pikk-app/');
  assert.equal(updated.hash, '#/music?tab=releases');
  assert.equal(updated.searchParams.get('campaign'), 'creator');
  assert.deepEqual(updated.searchParams.getAll('refresh'), ['12345']);
});

test('update check preserves home and nested routes without touching local state', () => {
  for (const hash of ['#/home', '#/shop', '#/connect#connect-multistream']) {
    const next = new URL(freshPikkUrl('https://scrubdup.github.io/pikk-app/' + hash, 99));
    assert.equal(next.hash, hash);
    assert.equal(next.searchParams.get('refresh'), '99');
  }
  assert.match(html, /id="pikk-refresh-link"/);
  assert.match(html, /import \{ freshPikkUrl \} from '\.\/src\/refresh-url\.js'/);
  assert.match(html, /window\.location\.assign\(freshPikkUrl\(window\.location\.href\)\)/);
  assert.doesNotMatch(html, /localStorage\.(?:clear|removeItem)/);
});
