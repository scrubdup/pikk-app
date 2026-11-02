import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const head = html.slice(html.indexOf('<header class="top"'), html.indexOf('</header>'));
test('t221u: Home header has no #/settings link and no gear button', () => {
  assert.ok(head.length > 100, 'header found');
  assert.doesNotMatch(head, /href="#\/settings"/);
  assert.doesNotMatch(head, /id="settingsBtn"|header-settings|aria-label="Settings"/i);
});
