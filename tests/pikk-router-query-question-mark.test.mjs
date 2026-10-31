import test from 'node:test';
import assert from 'node:assert/strict';
import { getRoute } from '../src/router.js';

test('hash route retains literal question marks inside query values', () => {
  const original = globalThis.location;
  try {
    globalThis.location = { hash: '#/posts?type=text&caption=Why?Because?Yes#composer' };
    const route = getRoute();
    assert.equal(route.path, '/posts');
    assert.equal(route.query.type, 'text');
    assert.equal(route.query.caption, 'Why?Because?Yes');
    assert.equal(route.elementId, 'composer');
    assert.equal(route.raw, '/posts?type=text&caption=Why?Because?Yes');
  } finally {
    if (original === undefined) delete globalThis.location;
    else globalThis.location = original;
  }
});

test('hash route still supports encoded values and the original seven-tab routes', () => {
  const original = globalThis.location;
  try {
    globalThis.location = { hash: '#/music?search=what%3Fnow' };
    assert.deepEqual(getRoute().query, { search: 'what?now' });
    for (const path of ['/music', '/videos', '/connect', '/create', '/dating', '/games', '/shop']) {
      globalThis.location = { hash: '#' + path };
      assert.equal(getRoute().path, path);
      assert.deepEqual(getRoute().query, {});
    }
  } finally {
    if (original === undefined) delete globalThis.location;
    else globalThis.location = original;
  }
});
