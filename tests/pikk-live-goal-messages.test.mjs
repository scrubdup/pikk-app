import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const page = readFileSync(new URL('../src/pages/live.js', import.meta.url), 'utf8');
globalThis.localStorage = {
  values:new Map(),
  getItem(key){return this.values.get(key) ?? null;},
  setItem(key,value){this.values.set(key,String(value));},
};
const {getState,setState,donateToGoal} = await import('../src/store.js');

function seedGoal(balance = 300) {
  const now=Date.now();
  const goal={id:'goal_live_test',scope:'live',hostId:'host1',hostName:'Creator',name:'Studio fund',targetAmount:50,raised:0,createdAt:now,endsAt:now+86400000};
  setState({user:{id:'supporter1',username:'Fan'},coins:{balance,history:[]},dailyGoals:{app:null,liveByHost:{host1:goal},history:[]}});
}

test('optional personal message saved with successful demo donation only',()=>{
  seedGoal();
  const r=donateToGoal('goal_live_test',50,{message:'  Love your music!  '});
  assert.equal(r.ok,true);
  assert.equal(r.donated.message,'Love your music!');
  assert.equal(getState().coins.history[0].message,'Love your music!');
  assert.equal(getState().coins.balance,250);
  assert.equal(getState().dailyGoals.liveByHost.host1.raised,1);
});
test('donation messages trim and cap at 180 chars without altering coin accounting',()=>{
  seedGoal();
  const r=donateToGoal('goal_live_test',100,{message:'x'.repeat(300)});
  assert.equal(r.ok,true);
  assert.equal(r.donated.message.length,180);
  assert.equal(getState().coins.balance,200);
  assert.equal(getState().dailyGoals.liveByHost.host1.raised,2);
});
test('failed donations never store messages or charge coins; old two-arg call still works',()=>{
  seedGoal(0);
  assert.equal(donateToGoal('goal_live_test',50,{message:'Do not save'}).error,'insufficient');
  assert.deepEqual(getState().coins.history,[]);
  assert.equal(getState().dailyGoals.liveByHost.host1.raised,0);
  seedGoal();
  const r=donateToGoal('goal_live_test',50);
  assert.equal(r.ok,true);
  assert.equal(r.donated.message,'');
  assert.equal(Object.hasOwn(getState().coins.history[0],'message'),false);
});
test('both quick and custom goal donation flows include optional message, with explicit demo disclosure',()=>{
  assert.ok(page.includes('id="liveGoalSupportMessage"'));
  assert.ok(page.includes('Saved with your demo coin transaction on this device only.'));
  assert.ok(page.includes("donateToGoal(form.dataset.goalId, coins, {message:"));
  assert.ok(page.includes("donateToGoal(goalId, coins, {message:"));
  assert.ok(page.includes('maxlength="180"'));
});

test('live goal message shows a bound, accessible 180-character counter', () => {
  assert.ok(page.includes('aria-describedby="liveGoalSupportMessageHint liveGoalSupportMessageCount"'));
  assert.ok(page.includes('id="liveGoalSupportMessageHint"'));
  assert.ok(page.includes('id="liveGoalSupportMessageCount" for="liveGoalSupportMessage"'));
  assert.ok(page.includes('supportMessage.addEventListener(\'input\', updateCount)'));
  assert.ok(page.includes('supportCount.textContent = `${supportMessage.value.length} / 180`'));
});
