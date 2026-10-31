import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
test('Create modal contains keyboard focus, including when focus starts outside', () => {
  assert.match(main, /aria-modal="true"/);
  assert.match(main, /if \(!panel\.contains\(document\.activeElement\)\)/);
  assert.match(main, /\(e\.shiftKey \? last : first\)\.focus\(\)/);
  assert.match(main, /if \(e\.key === 'Escape'\)/);
});
