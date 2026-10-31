import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderViralLive, viralLiveLogoSrc } from '../src/pages/viral-live.js';
import { VIDEOS } from '../src/data.js';
const FEATURED = VIDEOS.filter(video => ['dirty-money', '93', 'no-love'].includes(video.id));

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const live = readFileSync(new URL('../src/pages/live.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/viral-live.css', import.meta.url), 'utf8');

test('PIKK Viral Live preview routes from existing Live without replacing seven-tab navigation', () => {
  assert.match(main, /'\/viral-live': \{ render: renderViralLive, bind: bindViralLive \}/);
  assert.match(main, /import '\.\/viral-live\.css'/);
  assert.match(live, /href: '#\/viral-live'/);
  assert.match(live, /href="#\/viral-live"/);
  assert.match(main, /TABBAR\.map/);
  assert.match(main, /initDbsPlayer/);
  assert.match(css, /#app:has\(\.pikk-viral-page\)/);
});

test('channel preview uses only existing official source links with no fabricated livestream or metrics', () => {
  const html = renderViralLive();
  assert.match(html, /PREVIEW · NOT BROADCASTING/);
  assert.match(html, /NOT A LIVESTREAM/);
  assert.match(html, /Real-time viewer counts, live chat, engagement ranking and 24\/7 playback are not connected/);
  assert.match(html, /Music and third-party rights clearance/);
  assert.match(html, /Creator permission|permission to rebroadcast/i);
  assert.doesNotMatch(html, /\b[0-9,]+ watching\b|autoplay=1|data-fake-viewers/);
  assert.equal((html.match(/data-viral-pick="/g) || []).length, FEATURED.length);
  for (const video of FEATURED) {
    assert.ok(html.includes(video.title), video.title);
    // Queue stores source indices; only the selected source URL is rendered initially.
    // Other original links are selected by bindViralLive and checked in browser CI.
    assert.ok(video.youtube.startsWith('https://www.youtube.com/watch?v='));
  }
});

test('approved PIKK hero artwork respects root and GitHub Pages project base', () => {
  assert.equal(viralLiveLogoSrc('/'), '/brand/pikk-official-approved.jpg');
  assert.equal(viralLiveLogoSrc('/pikk-app/'), '/pikk-app/brand/pikk-official-approved.jpg');
  assert.equal(viralLiveLogoSrc('/pikk-app'), '/pikk-app/brand/pikk-official-approved.jpg');
});

test('featured source thumbnails are derived from original YouTube video IDs, not fabricated assets', () => {
  const html = renderViralLive();
  assert.match(html, /id="pikkViralThumbnail"/);
  assert.equal((html.match(/class="pikk-viral-choice-thumb"/g) || []).length, FEATURED.length);
  for (const video of FEATURED) {
    const id = new URL(video.youtube).searchParams.get('v');
    assert.ok(id, 'original source has a YouTube video ID');
    assert.ok(html.includes('https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'));
  }
  assert.match(css, /pikk-viral-choice-thumb/);
  assert.match(html, /class="pikk-viral-hero-logo" src="\/brand\/pikk-official-approved\.jpg"/);
  assert.doesNotMatch(html, /<small>PIKK<\/small>/);
  assert.match(css, /\.pikk-viral-hero-logo/);
  assert.doesNotMatch(html, /autoplay=1|data-fake-viewers/);
});

test('Viral Live content tabs use roving keyboard focus without changing source content', () => {
  const html = renderViralLive();
  assert.equal((html.match(/role="tab"[^>]*tabindex="0"/g) || []).length, 1);
  assert.equal((html.match(/role="tab"[^>]*tabindex="-1"/g) || []).length, 3);
  const source = readFileSync(new URL('../src/pages/viral-live.js', import.meta.url), 'utf8');
  for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) {
    assert.ok(source.includes("'" + key + "'"), key + ' supported');
  }
  assert.match(source, /event\.preventDefault\(\)/);
  assert.match(source, /item\.tabIndex = selected \? 0 : -1/);
  assert.match(source, /selectType\(typeTabs\[next\], true\)/);
  assert.match(source, /if \(moveFocus\) \{/);
  assert.match(source, /button\.focus\(\)/);
  assert.match(source, /button\.scrollIntoView\(\{ block: 'nearest', inline: 'nearest' \}\)/);
});

test('original source queue supports accessible keyboard browsing and selection', () => {
  const html = renderViralLive();
  const source = readFileSync(new URL('../src/pages/viral-live.js', import.meta.url), 'utf8');
  assert.match(html, /id="pikkViralQueue" role="group" aria-label="Choose an original video source"/);
  assert.match(source, /const sourceButtons = Array.from\(page.querySelectorAll\('\[data-viral-pick\]'\)\)/);
  for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']) {
    assert.ok(source.includes("'" + key + "'"), key + ' supported');
  }
  assert.match(source, /target\.click\(\)/);
  assert.match(source, /target\.focus\(\)/);
  assert.match(source, /target\.scrollIntoView\(\{ block: 'nearest', inline: 'nearest' \}\)/);
  assert.match(html, /aria-pressed="true"/);
});

test('all Viral Live tab panels are reachable by keyboard with visible focus', () => {
  const html = renderViralLive();
  assert.equal((html.match(/role="tabpanel" tabindex="0"/g) || []).length, 4);
  assert.match(css, /\.pikk-viral-page \[role="tabpanel"\]:focus-visible/);
});

test('content type tabs and empty states distinguish videos from uncleared clips, songs and photos', () => {
  const html = renderViralLive();
  assert.equal((html.match(/role="tab"/g) || []).length, 4);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 4);
  for (const type of ['clips','songs','photos']) {
    assert.match(html, new RegExp('id="viral-panel-' + type + '".*hidden'));
  }
  assert.match(html, /No approved items are queued/);
  assert.match(css, /pikk-viral-choice:focus-visible/);
  assert.match(css, /max-width:700px/);
});

test('small-phone Viral Live categories remain a single swipeable row with visible keyboard focus', () => {
  assert.match(css, /\.pikk-viral-tabs \{[^}]*flex-wrap: nowrap;[^}]*overflow-x: auto;/);
  assert.match(css, /\.pikk-viral-tabs button \{[^}]*flex: 0 0 auto;[^}]*min-width: 88px;[^}]*min-height: 44px;/);
  assert.match(css, /\.pikk-viral-tabs button:focus-visible/);
  assert.match(css, /scroll-snap-type: x proximity/);
});

test('empty Viral Live categories link to matching existing PIKK sections', () => {
  const html = renderViralLive();
  const expected = [
    ['clips', '#/shorts', 'Browse existing PIKK Clips'],
    ['songs', '#/music', 'Explore PIKK Music'],
    ['photos', '#/home', 'Explore PIKK Home'],
  ];
  for (const [type, href, label] of expected) {
    const panel = html.match(new RegExp('<section class="pikk-viral-empty" id="viral-panel-' + type + '"[\\s\\S]*?<\\/section>'))?.[0];
    assert.ok(panel, type + ' empty panel exists');
    assert.ok(panel.includes('href="' + href + '"'), type + ' destination');
    assert.ok(panel.includes(label), type + ' visible link label');
    assert.equal((panel.match(/class="btn ghost"/g) || []).length, 1, type + ' has one fallback');
  }
  for (const route of ["'/shorts'", "'/music'", "'/home'"]) {
    assert.ok(main.includes(route), route + ' is a registered PIKK route');
  }
});
