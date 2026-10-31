import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PIKK_GAMES, arcadeArtSrc } from '../src/games/arcade-catalog.js';
import { renderGames } from '../src/pages/games.js';


const approved = [
  [
    "01_block_wars.jpg",
    "b45e4bfe786d0da015f3a99945e8564c729041f567439787768366f9d5f54e11"
  ],
  [
    "02_pikk_playground.jpg",
    "b80d624fc76f8d567e56b42d6bce0689d17428fbcb4c441f71ea005e0f1e9277"
  ],
  [
    "03_pikk_clash.jpg",
    "f8ec5597686ef29407135d3af77a522876b517fbdaaa7742fd1dc6d4b444e831"
  ],
  [
    "04_pikk_knockout.jpg",
    "79bc3110ebc41e5eec8e674f4e19af1bc2137f46e979cab3b4ab9d59fe7e34a6"
  ],
  [
    "05_pikk_bowling.jpg",
    "d278e0ee09096f3c123afede0ea61d2bc6bab4d590394cb6d5153278bd006d1b"
  ],
  [
    "06_pikk_pickleball.jpg",
    "0ff1a1b6ab6c5095718704742fb0adfd97dad8dc765bba2150ffc6578c6dbf97"
  ],
  [
    "07_pikk_pool.jpg",
    "6e02042e91199946639e9ddffc00739720d18b24cd4d3614b53e62132b2918d5"
  ],
  [
    "08_pikk_cup_pong.jpg",
    "d9b9eb131b0ba2f8921ca617ed7b0e076f6fe56b1be2d6c216197b3c6f970ccd"
  ],
  [
    "09_pikk_poker.jpg",
    "29e645481a28221c475c8aa8d55ddc7114921c9b10daedd31987d8e02c79b558"
  ],
  [
    "10_pikk_blackjack.jpg",
    "26d2b5b98e415afe526869a1f711e6619b802cdce90b2f32edddaa4a25b3e034"
  ],
  [
    "11_pikk_slots.jpg",
    "13f751fc184fcad7b834acc082a705996123e67b9c39d1b76056489d70acaeab"
  ],
  [
    "12_pikk_speed.jpg",
    "18a357849241be99b63dc12166376e0603e0224fee4edca5f4db4a781d8f7c61"
  ],
  [
    "13_pikk_spades.jpg",
    "7942aff366e7809e6c9cc36b96d0a7115b06276461d8b70230b6b1f215ce8e61"
  ],
  [
    "14_pikk_dominoes.jpg",
    "3e3f550ad0500694e887735a26e2bb07099fd155fc37e53bd696fc9cb729fdeb"
  ],
  [
    "15_pikk_chess.jpg",
    "a5349c881dbf694819988bf85dfcc9645486ecda03bbf205936ab285a59eb39b"
  ]
];
test('all 15 exact owner-supplied PIKK Arcade JPEGs are committed unchanged', () => {
  assert.equal(PIKK_GAMES.length, 15);
  for (const [i, [name, sha256]] of approved.entries()) {
    const game = PIKK_GAMES[i];
    assert.equal(game.artwork, '/games/approved/' + name);
    const bytes = readFileSync(new URL('../public/games/approved/' + name, import.meta.url));
    assert.ok(bytes.length > 2048, name);
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256, name);
    assert.equal(arcadeArtSrc(game), '/games/approved/' + name);
  }
});
test('both routes render approved images while preserving previews and coming-soon status', () => {
  const games = renderGames();
  const homeSource = readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8');
  assert.equal((games.match(/\/games\/approved\/\d\d_[^"]+\.jpg/g) || []).length, 15);
  assert.match(homeSource, /PIKK_GAMES\.map/);
  assert.match(homeSource, /arcadeArtSrc\(game\)/);
  assert.match(games, /ALL GAMES COMING SOON/);
  assert.match(games, /no cash value/);
  assert.match(games, /View preview/);
  assert.match(games, /final artwork may evolve/);
});
