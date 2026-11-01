import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const L = await import('../src/pages/legal.js');
const read = (f) => readFileSync(new URL('../' + f, import.meta.url), 'utf8');
test('t377u: Terms has exact Security & Data Breach text, draft label, anchor; linked from Privacy + Signup', () => {
  const exact = 'PIKK uses reasonable measures to protect your information, but no system is 100% secure. To the fullest extent permitted by law, PIKK and its owners are not liable for damages resulting from unauthorized access, hacking, or data breaches beyond our reasonable control. If a breach affects your data, we will notify you as required by law.';
  const t = L.renderTerms();
  assert.ok(t.includes(exact)); assert.match(t, /Security &amp; Data Breach \/ Limitation of Liability/);
  assert.match(t, /Draft — pending legal review/); assert.match(t, /id="terms-security"/);
  assert.match(L.renderPrivacy(), /href="#\/terms\?s=security"/);
  assert.match(read('src/pages/shells.js'), /href="#\/terms\?s=security"/);
  const m = read('src/main.js'); assert.match(m, /'\/terms': \{ render: renderTerms, bind: bindTerms \}/); assert.match(m, /'\/privacy': \{ render: renderPrivacy \}/);
});
