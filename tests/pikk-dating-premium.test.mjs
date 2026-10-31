import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page = readFileSync(new URL('../src/pages/dating.js', import.meta.url),'utf8');
const css = readFileSync(new URL('../src/dating-premium.css', import.meta.url),'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url),'utf8');
test('Dating premium styling and binder registered without replacing player, logo or tabs',()=>{
 assert.match(main,/import '\.\/dating-premium\.css'/);
 assert.match(main,/\/dating': \{ render: renderDating, bind: bindDating \}/);
 assert.match(main,/initDbsPlayer/);
 assert.match(main,/TABBAR/);
 assert.match(css,/\.pikk-dating-hero/);
 assert.match(css,/prefers-reduced-motion/);
});
test('Dating navigation has four accessible working targets and never claims matchmaking exists',()=>{
 for(const id of ['dating-discover','dating-experiences','dating-live','dating-safety']){
  assert.match(page,new RegExp('data-dating-jump="'+id+'"'));
  assert.match(page,new RegExp('id="'+id+'"'));
 }
 assert.match(page,/export function bindDating/);
 assert.match(page,/scrollIntoView/);
 assert.match(page,/aria-pressed/);
 assert.match(page,/No real matches are being created here/);
 assert.match(page,/Camera and microphone permissions are never requested/);
 assert.match(page,/href="#\/community"/);
 assert.match(page,/href="#\/messages"/);
});
