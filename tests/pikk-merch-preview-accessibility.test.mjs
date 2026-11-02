import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MERCH } from '../src/data.js';
import { renderMerch, bindMerch } from '../src/pages/merch.js';

test('merch keeps real products and an accessible image preview', () => {
  const html = renderMerch();
  assert.equal((html.match(/class="merch-card"/g) || []).length, MERCH.length);
  assert.match(html, /id="merchLightbox"[^>]*role="dialog"[^>]*aria-modal="true"/);
  assert.match(html, /aria-label="Close product preview"/);
  assert.match(html, /foreignx-change\.com/);
});

test('merch preview opens by keyboard, traps focus and closes with Escape restoring opener', () => {
  const handlers = {};
  const attributes = {};
  const classes = new Set();
  let focused = '';
  const image = { alt: '', src: '', removeAttribute(key) { if (key === 'src') this.src = ''; } };
  const close = { focus() { focused = 'close'; } };
  const opener = {
    dataset: { zoom: '/merch/example.jpeg' },
    isConnected: true,
    querySelector() { return { alt: 'Original product', currentSrc: '/pikk-app/merch/example.jpeg' }; },
    addEventListener(type, fn) { handlers['opener:' + type] = fn; },
    focus() { focused = 'opener'; },
  };
  const lb = {
    classList: {
      add(key) { classes.add(key); },
      remove(key) { classes.delete(key); },
      contains(key) { return classes.has(key); },
    },
    setAttribute(key, value) { attributes[key] = value; },
    querySelector(key) { return key === 'img' ? image : key === '.merch-lightbox-close' ? close : null; },
    addEventListener(type, fn) { handlers['dialog:' + type] = fn; },
  };
  const root = {
    querySelector(key) { return key === '#merchLightbox' ? lb : null; },
    querySelectorAll(key) { return key === '.img-wrap' ? [opener] : []; },
  };
  bindMerch(root);
  let prevented = false;
  handlers['opener:keydown']({ key: 'Enter', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(classes.has('show'), true);
  assert.equal(attributes['aria-hidden'], 'false');
  assert.equal(image.src, '/pikk-app/merch/example.jpeg');
  assert.equal(image.alt, 'Original product');
  assert.equal(focused, 'close');

  focused = '';
  handlers['dialog:keydown']({ key: 'Tab', preventDefault() {} });
  assert.equal(focused, 'close');

  handlers['dialog:keydown']({ key: 'Escape', preventDefault() {} });
  assert.equal(classes.has('show'), false);
  assert.equal(attributes['aria-hidden'], 'true');
  assert.equal(image.src, '');
  assert.equal(focused, 'opener');

  handlers['opener:click']();
  handlers['dialog:click']();
  assert.equal(classes.has('show'), false);
  assert.equal(focused, 'opener');
});

test('merch route and global player/navigation remain wired', () => {
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /'\/merch': \{ render: renderMerch, bind: bindMerch \}/);
  assert.match(main, /initDbsPlayer/);
  assert.match(main, /buildTabbar/);
});
