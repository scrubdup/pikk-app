import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const r = (f) => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');
test('Checker #363/#364/#365: 44px tap targets; video actions stack (no 2-up overflow)', () => {
  assert.match(r('pikk-polish-connect.css'), /connect-btn-start[^{]*connect-controls \.btn\) \{ min-height: 44px; \}/);
  const v = r('pikk-polish-videos.css');
  assert.match(v, /> \.row \.btn \{[^}]*min-height: 44px/);
  assert.doesNotMatch(v, /grid-template-columns: 1fr 1fr/);
  assert.match(r('pikk-polish-profile.css'), /\.pikk-profile-creator-actions \.btn \{[^}]*min-height: 44px/);
});
