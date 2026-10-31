import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PIKK_GAMES } from '../src/games/arcade-catalog.js';
const games=readFileSync(new URL('../src/pages/games.js', import.meta.url),'utf8');
const home=readFileSync(new URL('../src/pages/home.js', import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css', import.meta.url),'utf8');

test('PIKK gallery uses exact approved fifteen-game set in approved order',()=>{
 assert.deepEqual(PIKK_GAMES.map(g=>g.name), ['Block Wars','PIKK Playground','PIKK Clash','PIKK Knockout','PIKK Bowling','PIKK Pickleball','PIKK Pool','PIKK Cup Pong','PIKK Poker','PIKK Blackjack','PIKK Slots','PIKK Speed','PIKK Spades','PIKK Dominoes','PIKK Chess']);
 assert.equal(new Set(PIKK_GAMES.map(g=>g.name)).size,15);
 for(const g of PIKK_GAMES) { assert.ok(g.description && g.icon && g.players && g.theme); }
 assert.match(PIKK_GAMES[2].description,/neighborhood-themed match/);
 assert.match(PIKK_GAMES[3].description,/physics challenges/);
 assert.equal(PIKK_GAMES[0].artwork,'/games/approved/01_block_wars.jpg');
});

test('gallery and Home slideshow share one catalog and do not claim gameplay',()=>{
 assert.match(games,/PIKK_GAMES\.map/);
 assert.match(games,/Coming Soon/);
 assert.match(games,/not playable/);
 assert.match(games,/no cash value/);
 assert.match(home,/PIKK_GAMES\.map/);
 assert.match(home,/data-game-slide/);
 assert.match(home,/homeArcadePosition/);
 assert.match(home,/data-arcade-prev/);
 assert.match(home,/data-arcade-next/);
 assert.match(home,/prefers-reduced-motion/);
 assert.match(home,/clearInterval\(carouselTimer\)/);
 assert.match(home,/if \(!document\.body\.contains\(arcade\)\)/);
 assert.match(css,/\.home-arcade-slide\[hidden\]/);
 assert.match(css,/\.pikk-arcade-grid/);
});

test('all 15 owner-supplied concept images are linked while gameplay remains unreleased',()=>{
 assert.equal(PIKK_GAMES.filter(g=>g.artwork).length,15);
 assert.match(games,/All 15 owner-supplied concept images are now displayed/);
 assert.match(games,/View preview/);
});
