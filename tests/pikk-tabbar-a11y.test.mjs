import test from 'node:test';
import assert from 'node:assert/strict';
import { markActiveTab } from '../src/tabbar-state.js';

function makeLink(path) {
  const attributes = new Map([['data-path', path]]);
  const classes = new Set();
  return {
    getAttribute: (key) => attributes.get(key) ?? null,
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: (key) => attributes.delete(key),
    classList: {
      toggle: (name, on) => { if (on) classes.add(name); else classes.delete(name); },
      contains: (name) => classes.has(name),
    },
  };
}

test('selected PIKK tab has visual state and aria-current=page', () => {
  const paths = ['/music', '/videos', '/connect', '/create', '/dating', '/games', '/shop'];
  const links = paths.map(makeLink);
  const nav = { querySelectorAll: (selector) => {
    assert.equal(selector, 'a[data-path]');
    return links;
  } };
  markActiveTab(nav, '/games');
  assert.deepEqual(links.filter(x => x.classList.contains('on')), [links[5]]);
  assert.deepEqual(links.filter(x => x.getAttribute('aria-current') === 'page'), [links[5]]);

  markActiveTab(nav, '/shop');
  assert.deepEqual(links.filter(x => x.classList.contains('on')), [links[6]]);
  assert.deepEqual(links.filter(x => x.getAttribute('aria-current') === 'page'), [links[6]]);
});

test('non-tab routes clear stale selected states without hiding the menu', () => {
  const links = ['/music', '/games', '/shop'].map(makeLink);
  const nav = { querySelectorAll: () => links };
  markActiveTab(nav, '/music');
  markActiveTab(nav, '/notifications');
  assert.equal(links.filter(x => x.classList.contains('on')).length, 0);
  assert.equal(links.filter(x => x.getAttribute('aria-current')).length, 0);
  assert.doesNotThrow(() => markActiveTab(null, '/music'));
});
