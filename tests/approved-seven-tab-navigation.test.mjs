import test from 'node:test';
import assert from 'node:assert/strict';
import { TABBAR } from '../src/data.js';
import { markActiveTab } from '../src/tabbar-state.js';

const expected = [
  ['Music', '#/music'],
  ['Videos', '#/videos'],
  ['Connect', '#/connect'],
  ['Create', '#/create'],
  ['Dating', '#/dating'],
  ['Games', '#/games'],
  ['Shop', '#/shop'],
];

test('latest approved seven-tab order is protected against older Go Live/Home layouts', () => {
  assert.deepEqual(TABBAR.map(({ label, href }) => [label, href]), expected);
  assert.equal(TABBAR.length, 7);
  assert.deepEqual(TABBAR.filter(tab => tab.primary).map(tab => tab.label), ['Create']);
  assert.equal(new Set(TABBAR.map(tab => tab.href)).size, 7);
});

test('route selection updates visual and accessible state without leaving stale active tabs', () => {
  const links = TABBAR.map(tab => {
    const attrs = new Map([['data-path', tab.href.slice(1)]]);
    const classes = new Set();
    return {
      getAttribute(name) { return attrs.get(name) ?? null; },
      setAttribute(name, value) { attrs.set(name, value); },
      removeAttribute(name) { attrs.delete(name); },
      classList: { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); }, contains(name) { return classes.has(name); } },
    };
  });
  const nav = { querySelectorAll(selector) { assert.equal(selector, 'a[data-path]'); return links; } };
  for (const [i, tab] of TABBAR.entries()) {
    markActiveTab(nav, tab.href.slice(1));
    links.forEach((link, j) => {
      assert.equal(link.classList.contains('on'), i === j);
      assert.equal(link.getAttribute('aria-current'), i === j ? 'page' : null);
    });
  }
  markActiveTab(nav, '/profile');
  links.forEach(link => {
    assert.equal(link.classList.contains('on'), false);
    assert.equal(link.getAttribute('aria-current'), null);
  });
});
