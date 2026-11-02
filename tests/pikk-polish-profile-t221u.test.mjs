import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-polish-profile.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
test('polish-profile: creator actions in an even 2x2 grid; short password hint; palette only', () => {
  assert.match(page, /<div class="pikk-profile-creator-actions">[\s\S]*#\/signup[\s\S]*#\/clippers[\s\S]*#\/guidelines[\s\S]*#\/support[\s\S]*?<\/div>/);
  assert.match(css, /\.pikk-profile-creator-actions \{ display: grid; grid-template-columns: 1fr 1fr/);
  assert.match(page, /placeholder="10\+ chars · a letter \+ a number"/);
  assert.ok(main.indexOf('pikk-polish-profile.css') < main.indexOf('pikk-chips.css'));
  assert.doesNotMatch(css, /magenta|purple|pink|#(?:ff00ff|9c27b0|00ff00)/i);
});
