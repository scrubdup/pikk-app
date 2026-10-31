import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applyDrawerState } from '../src/drawer-state.js';

function fixture() {
  const classes = () => {
    const values = new Set();
    return {
      toggle(name, on) { if (on) values.add(name); else values.delete(name); },
      contains(name) { return values.has(name); },
    };
  };
  const attributes = new Map();
  const triggerAttributes = new Map();
  const first = { focused: false, focus() { this.focused = true; } };
  const drawer = {
    classList: classes(), inert: true,
    setAttribute(name, value) { attributes.set(name, value); },
    querySelector(selector) { assert.equal(selector, 'button, a[href]'); return first; },
  };
  const scrim = { classList: classes() };
  const trigger = {
    classList: classes(), focused: false,
    setAttribute(name, value) { triggerAttributes.set(name, value); },
    focus() { this.focused = true; },
  };
  return { drawer, scrim, trigger, first, attributes, triggerAttributes };
}

test('drawer opens with keyboard focus and accurate expanded state', () => {
  const f = fixture();
  applyDrawerState(f, true);
  assert.equal(f.drawer.inert, false);
  assert.equal(f.drawer.classList.contains('open'), true);
  assert.equal(f.scrim.classList.contains('show'), true);
  assert.equal(f.attributes.get('aria-hidden'), 'false');
  assert.equal(f.triggerAttributes.get('aria-expanded'), 'true');
  assert.equal(f.triggerAttributes.get('aria-label'), 'Close navigation menu');
  assert.equal(f.first.focused, true);
});

test('drawer closes, disables off-screen tab stops and restores focus on Escape', () => {
  const f = fixture();
  applyDrawerState(f, true);
  applyDrawerState(f, false, true);
  assert.equal(f.drawer.inert, true);
  assert.equal(f.drawer.classList.contains('open'), false);
  assert.equal(f.scrim.classList.contains('show'), false);
  assert.equal(f.attributes.get('aria-hidden'), 'true');
  assert.equal(f.triggerAttributes.get('aria-expanded'), 'false');
  assert.equal(f.triggerAttributes.get('aria-label'), 'Open navigation menu');
  assert.equal(f.trigger.focused, true);
});

test('drawer accessibility is integrated without altering PIKK player, tabs or approved art', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(html, /id="menuBtn"[^>]*aria-controls="sideNav"[^>]*aria-expanded="false"/);
  assert.match(html, /id="sideNav"[^>]*aria-hidden="true" inert/);
  assert.match(main, /import \{ applyDrawerState \} from '\.\/drawer-state\.js'/);
  assert.match(main, /if \(event\.key !== 'Escape'/);
  assert.match(main, /setDrawer\(false, true\)/);
  for (const id of ['dbs-sticky-player', 'tabbar', 'spPlay', 'menuBtn']) {
    assert.ok(html.includes('id="' + id + '"'), id);
  }
  assert.match(html, /brand\/pikk-official-approved\.jpg/);
});
