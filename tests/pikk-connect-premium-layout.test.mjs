import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const src=readFileSync(new URL('../src/pages/connect.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Connect premium discovery keeps verified routes and never invents profiles',()=>{
 for(const selector of ['pikk-connect-hero','pikk-connect-discover-nav','pikk-connect-feature-grid','pikk-connect-feature-community','pikk-connect-feature-messages']) assert.ok(src.includes(selector),selector);
 for(const route of ['community','messages','live','dating']) {
  assert.ok(src.includes('href="#/'+route+'"'),route);
  assert.ok(main.includes("'/"+route+"':"),'missing route '+route);
 }
 assert.match(src,/Real-time video matching remains unavailable/);
 assert.match(src,/pikk-connect-feature-live/);
});
test('Connect safety and multistream test mode are preserved',()=>{
 for(const marker of ['BLOCK_MSG','ageConfirmed','rulesAccepted','connect-start','connect-random-chat','connect-multistream','renderMultiPlatform','bindMultiPlatform','No matching service','no WebRTC','TEST MODE']) assert.ok(src.includes(marker),marker);
 assert.match(src,/Never animate a fake match/);
 assert.match(src,/startRestreamGoLive/);
 assert.match(css,/\.pikk-connect-hero/);
 assert.match(css,/@media\(max-width:560px\)/);
});
