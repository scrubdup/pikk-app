import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');

test('Profile does not equate configured API URL with a successful connection', () => {
  assert.match(source, /Account API configured · live availability not yet verified/);
  assert.doesNotMatch(source, /Backend account service connected/);
});

test('Profile still reports missing account service configuration', () => {
  assert.match(source, /Account service configuration pending/);
});
