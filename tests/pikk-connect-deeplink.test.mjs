import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bindConnect } from '../src/pages/connect.js';
import { getRoute } from '../src/router.js';

const datingSource = readFileSync(new URL('../src/pages/dating.js', import.meta.url), 'utf8');

test('Dating links to the separate Random Chat section in Connect', () => {
  assert.match(datingSource, /href="#\/connect#connect-random-chat"/);
});

test('Connect scrolls to the requested, allowlisted section without starting camera', () => {
  const originalLocation = globalThis.location;
  const originalRaf = globalThis.requestAnimationFrame;
  try {
    globalThis.requestAnimationFrame = (callback) => { callback(); return 1; };
    for (const [hash, expected] of [
      ['#/connect#connect-random-chat', 'connect-random-chat'],
      ['#/connect#connect-multistream', 'connect-multistream'],
      ['#/connect#untrusted-section', null],
      ['#/connect', null],
    ]) {
      globalThis.location = { hash };
      assert.equal(getRoute().path, '/connect');
      const scrolled = [];
      const root = {
        querySelectorAll: () => [],
        querySelector: (selector) => {
          if (selector === '#connect-random-chat' || selector === '#connect-multistream') {
            return { scrollIntoView: (options) => scrolled.push({ selector, options }) };
          }
          return null;
        },
      };
      bindConnect(root);
      assert.deepEqual(scrolled.map((item) => item.selector), expected ? [`#${expected}`] : [], hash);
    }
  } finally {
    if (originalLocation === undefined) delete globalThis.location;
    else globalThis.location = originalLocation;
    if (originalRaf === undefined) delete globalThis.requestAnimationFrame;
    else globalThis.requestAnimationFrame = originalRaf;
  }
});


test('Connect deep links honor reduced motion and preserve smooth scrolling otherwise', () => {
  const originalLocation = globalThis.location;
  const originalRaf = globalThis.requestAnimationFrame;
  const originalWindow = globalThis.window;
  try {
    globalThis.location = { hash: '#/connect#connect-random-chat' };
    globalThis.requestAnimationFrame = (callback) => { callback(); return 1; };
    const behaviors = [];
    const root = {
      querySelectorAll: () => [],
      querySelector: (selector) => selector === '#connect-random-chat'
        ? { scrollIntoView: (options) => behaviors.push(options.behavior) }
        : null,
    };
    globalThis.window = { matchMedia: () => ({ matches: true }) };
    bindConnect(root);
    globalThis.window = { matchMedia: () => ({ matches: false }) };
    bindConnect(root);
    globalThis.window = {};
    bindConnect(root);
    assert.deepEqual(behaviors, ['instant', 'smooth', 'smooth']);
  } finally {
    if (originalLocation === undefined) delete globalThis.location;
    else globalThis.location = originalLocation;
    if (originalRaf === undefined) delete globalThis.requestAnimationFrame;
    else globalThis.requestAnimationFrame = originalRaf;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
