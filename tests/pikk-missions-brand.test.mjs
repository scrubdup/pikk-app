import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/missions.js', import.meta.url), 'utf8');

test('Missions displays PIKK, not legacy DBS, in customer-facing labels', () => {
  assert.match(source, /app: 'PIKK App'/);
  assert.match(source, /PIKK-funded · marketing expense/);
  assert.match(source, /and the PIKK app\./);
  assert.match(source, /PIKK-funded campaigns are a marketing expense/);
  assert.match(source, /value="dbs">PIKK-funded \(marketing expense\)<\/option>/);
  assert.match(source, /\? 'Third-party' : 'PIKK'/);
  assert.doesNotMatch(source, /DBS App|DBS-funded|the DBS app/);
});

test('Missions preserves the existing persisted funding option identifier', () => {
  assert.match(source, /value="dbs"/);
});
