import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const home = readFileSync(new URL('../src/pages/home.js', import.meta.url),'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url),'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url),'utf8');

test('Home discovery shelf links to existing sections and Explore search',()=>{
  assert.match(home,/class="pikk-home-discover"/);
  assert.match(home,/href="#\/explore" class="pikk-home-explore-cta"/);
  for(const href of ['live','videos','music','posts','community','games']) {
    assert.match(home,new RegExp('href="#/'+href+'"'));
    assert.ok(main.includes("'/"+href+"':"),'missing route '+href);
  }
});
test('Home preserves stage, Block Wars teaser and fifteen-game rotation',()=>{
  for (const feature of ['\u0024{stageBlock}','\u0024{bwPreview}','id="homeArcade"','PIKK_GAMES.map','data-arcade-prev','data-arcade-next']) {
    assert.ok(home.includes(feature),feature);
  }
  assert.match(css,/\.pikk-home-discover-links/);
  assert.match(css,/@media\(max-width:420px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
