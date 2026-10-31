import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageLabel, updateRouteIdentity } from '../src/page-announcement.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/page-announcement.css', import.meta.url), 'utf8');

test('route titles use visible heading and announce without altering navigation', () => {
  const document = { title: 'PIKK' };
  const announcer = { textContent: '' };
  const page = { querySelector: selector => selector === 'h1' ? { textContent: '  PIKK   Arcade  ' } : null };
  assert.equal(updateRouteIdentity({ path: '/games' }, page, announcer, document), 'PIKK Arcade');
  assert.equal(document.title, 'PIKK Arcade | PIKK');
  assert.equal(announcer.textContent, 'PIKK Arcade page loaded');
});

test('route label falls back for pages without a heading', () => {
  const noHeading = { querySelector: () => null };
  assert.equal(pageLabel({ path: '/viral-live' }, noHeading), 'Viral Live');
  assert.equal(pageLabel({ path: '/home' }, null), 'Home');
  const document = { title: '' };
  assert.equal(updateRouteIdentity({ path: '/dating' }, noHeading, null, document), 'Dating');
  assert.equal(document.title, 'Dating | PIKK');
});

test('screen reader region is hidden visually, not aria-hidden, and wired after render', () => {
  assert.match(html, /id="pikkRouteAnnouncer"[^>]*role="status"[^>]*aria-live="polite"/);
  assert.match(css, /\.pikk-route-announcer\s*\{/);
  assert.match(css, /clip-path:\s*inset\(50%\)/);
  assert.match(main, /import \{ updateRouteIdentity \} from '\.\/page-announcement\.js'/);
  assert.match(main, /updateRouteIdentity\(route, app, document\.getElementById\('pikkRouteAnnouncer'\)\)/);
  for (const id of ['dbs-sticky-player', 'tabbar', 'spPlay', 'menuBtn']) assert.ok(html.includes('id="' + id + '"'));
  assert.match(html, /brand\/pikk-official-approved\.jpg/);
});
