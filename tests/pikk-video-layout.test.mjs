import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const data=readFileSync(new URL('../src/data.js',import.meta.url),'utf8');
const src=readFileSync(new URL('../src/pages/shells.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
test('video gallery contains verified originals and original embedded playback',()=>{
  assert.match(src,/pikk-video-hero/);
  assert.match(src,/pikk-video-grid/);
  assert.match(src,/pikk-video-filters/);
  assert.match(src,/data-videos-filter="Music Videos"/);
  assert.match(src,/class="hero-video"/);
  assert.match(data,/artist: 'DatBoiSkeet'/);
  assert.match(src,/No rehosted files/);
});
test('video category filters are interactive without deleting uploads or share controls',()=>{
 assert.match(src,/button\.dataset\.videosFilter/);
 assert.match(src,/section\.hidden = !visible/);
 assert.match(src,/bindPageYoutubeEmbeds\(root\)/);
 assert.match(src,/video-share/);
 assert.match(src,/resolveMediaSrc\(ref\)/);
 assert.match(src,/catalog-admin-video/);
 assert.match(css,/\.pikk-video-section\[hidden\]/);
 assert.match(css,/@media\(max-width:520px\)/);
});

test('video filters also hide unrelated Coming Soon categories and explain empty results',()=>{
 assert.match(src,/data-video-coming-category="\$\{esc\(cat\)\}"/);
 assert.match(src,/pikk-video-coming-list/);
 assert.match(src,/data-video-filter-status/);
 assert.match(src,/aria-live="polite"/);
 assert.match(src,/card\.dataset\.videoComingCategory !== category/);
 assert.match(src,/comingList\.hidden = !upcomingVisible/);
 assert.match(src,/No published \$\{category\} videos yet/);
 assert.match(src,/Showing all video categories and upcoming titles/);
 assert.match(src,/data-video-category="Admin"/);
 assert.match(src,/VIDEO_COMING_SOON/);
});

test('video category buttons support accessible keyboard selection without removing tab stops',()=>{
 assert.match(src,/\.pikk-video-filters'\)\?\.addEventListener\('keydown'/);
 for(const key of ['ArrowLeft','ArrowRight','Home','End'])assert.ok(src.includes(key));
 assert.match(src,/filterButtons\[next\]\.focus\(\)/);
 assert.match(src,/filterButtons\[next\]\.click\(\)/);
 assert.match(src,/aria-pressed/);
});
