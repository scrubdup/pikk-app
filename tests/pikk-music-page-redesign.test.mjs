import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {STREAMING_RELEASES,TABBAR} from '../src/data.js';
const music=readFileSync(new URL('../src/pages/music.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
test('premium music uses authentic catalog and links to existing Music views',()=>{
 assert.ok(STREAMING_RELEASES.length>0);
 for(const s of ['pikk-music-showcase','pikk-music-categories','pikk-music-release-row','pikk-music-release-tile'])assert.ok(music.includes(s),s);
 for(const s of ['songs','albums','beats','playlists'])assert.ok(music.includes('#/music?view='+s),s);
 assert.match(music,/STREAMING_RELEASES\.find/);
 assert.match(music,/STREAMING_RELEASES\.filter/);
 assert.match(music,/#\/music#vault/);
});
test('existing Vault, Apple streaming, member and Admin functionality preserved',()=>{
 for(const s of ['id="vault"','id="stream-everywhere"','id="youtube-mixes"','mem-toggle','buy-track','listCatalog','resolveMediaSrc','bindPageYoutubeEmbeds','stream-plat-apple'])assert.ok(music.includes(s),s);
 assert.deepEqual(TABBAR.map(x=>x.label),['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
 assert.match(css,/\.pikk-music-showcase/);
 assert.match(css,/@media\(max-width:520px\)/);
});
