import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const page = readFileSync(new URL('../src/pages/notifications.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/notifications-premium.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('premium Notification Center retains all four existing browser-local preference keys', () => {
  for (const key of ['releases','lives','messages','quietHours']) {
    assert.ok(page.includes(`key: '${key}'`), key);
    assert.ok(page.includes('data-k='), 'bindable checkbox markup');
  }
  assert.match(page, /setNotifPrefs\(\{ \[key\]: input\.checked \}\)/);
  assert.match(page, /getState\(\)\.notifications/);
  assert.match(page, /role="status" aria-live="polite"/);
});

test('Notification Center accurately distinguishes local preferences from unavailable subscriber alerts', () => {
  for (const text of ['Stay in the loop.', 'Music &amp; Live', 'Social &amp; Focus', 'New Subscriber Live Alerts', 'Coming soon', 'Confirmed subscription event integration is not available yet', 'Real push delivery is not connected']) {
    assert.ok(page.includes(text), text);
  }
  assert.match(page, /href="#\/live"/);
  assert.match(page, /href="#\/messages"/);
});

test('Notification Center uses scoped responsive premium styles without replacing logo, player or tabs', () => {
  for (const marker of ['.pikk-notif-hero', '.pikk-notif-columns', '.pikk-notif-row input[type=checkbox]', ':focus-visible', '@media(max-width:520px)', '@media(prefers-reduced-motion:reduce)']) {
    assert.ok(css.includes(marker), marker);
  }
  assert.match(main, /import '\.\/notifications-premium\.css';/);
  assert.match(main, /import \{ renderNotifications, bindNotifications \} from '\.\/pages\/notifications\.js';/);
  assert.match(main, /'\/notifications': \{ render: renderNotifications, bind: bindNotifications \}/);
  assert.deepEqual(TABBAR.map(t => t.label), ['Music','Videos','Connect','Create','Dating','Games','Shop']);
  assert.match(html, /pikk-official-approved\.jpg/);
  assert.match(html, /dbs-sticky-player/);
});

test('Notification Center can restore only the four local preferences without claiming push support', () => {
  assert.match(page, /const DEFAULT_PREFERENCES = Object\.freeze\(\{/);
  for (const line of ['releases: true', 'lives: true', 'messages: true', 'quietHours: false']) {
    assert.ok(page.includes(line), line);
  }
  assert.match(page, /id="pikkNotifReset"/);
  assert.match(page, /setNotifPrefs\(DEFAULT_PREFERENCES\)/);
  assert.match(page, /input\.checked = DEFAULT_PREFERENCES\[input\.dataset\.k\]/);
  assert.match(page, /Notification preferences restored to defaults on this device/);
  assert.match(css, /\.pikk-notif-tools\{/);
  assert.match(css, /\.pikk-notif-studio button:focus-visible/);
});

test('Notification Center bulk pause and resume preserve Quiet hours and remain local-only', () => {
  assert.match(page, /id="pikkNotifPause"/);
  assert.match(page, /id="pikkNotifResume"/);
  assert.match(page, /const alertKeys = \['releases', 'lives', 'messages'\]/);
  assert.match(page, /setNotifPrefs\(Object\.fromEntries\(alertKeys\.map\(key => \[key, enabled\]\)\)\)/);
  assert.match(page, /if \(alertKeys\.includes\(input\.dataset\.k\)\) input\.checked = enabled/);
  assert.match(page, /Real push delivery is not connected/);
  assert.match(css, /\.pikk-notif-tool-actions\{/);
  assert.match(css, /\.pikk-notif-tool-actions\{width:100%;flex:initial;flex-direction:column\}/);
});
