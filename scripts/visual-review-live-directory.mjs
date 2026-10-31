import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
await mkdir('visual-review', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const [device, width, height, columns] of [
    ['mobile', 390, 844, 2],
    ['desktop', 1440, 900, 3],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/#/live?tab=categories', { waitUntil: 'domcontentloaded' });
    await page.locator('#liveTabCategories').waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(3600);
    assert.equal(await page.locator('.logo-img').isVisible(), true, 'approved logo remains visible');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent music player');
    assert.equal(await page.locator('#tabbar a').count(), 7, 'seven bottom tabs preserved');
    assert.equal(await page.locator('.pikk-live-directory-group').count(), 8, 'eight organized sections');
    assert.equal(await page.locator('#pikk-live-group-coed').getAttribute('open'), '', 'coed open by default');
    assert.equal(await page.locator('#pikk-live-group-coed .pikk-live-room-card').count(), 10);
    assert.equal(await page.locator('#pikk-live-group-women .pikk-live-room-card').count(), 15);
    assert.equal(await page.locator('#pikk-live-group-men .pikk-live-room-card').count(), 15);
    assert.equal(await page.locator('#pikk-live-group-men .pikk-live-directory-icon').textContent(), '🫱🏻‍🫲🏿', 'light and dark handshake on mobile and desktop');
    const iconWidth = await page.locator('#pikk-live-group-men .pikk-live-directory-icon').evaluate(el => el.getBoundingClientRect().width);
    assert.ok(iconWidth >= 32, 'handshake icon retains its visible tile');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 3, device + ' must not overflow viewport: ' + overflow);
    await page.screenshot({ path: 'visual-review/pikk-live-' + device + '-directory.png' });

    for (const [id, count] of [['women', 15], ['men', 15]]) {
      const group = page.locator('#pikk-live-group-' + id);
      await group.locator('summary').click();
      assert.equal(await group.getAttribute('open'), '', id + ' expands on click');
      assert.equal(await group.locator('.pikk-live-room-card:visible').count(), count);
      const cols = await group.locator('.pikk-live-directory-cards').evaluate(el =>
        getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length);
      assert.equal(cols, columns, device + ' ' + id + ' grid columns');
      const overlaps = await group.locator('.pikk-live-room-card').evaluateAll(cards => cards.some(card => {
        const title = card.querySelector('strong').getBoundingClientRect();
        const icon = card.querySelector('.pikk-live-room-emoji').getBoundingClientRect();
        return title.top < icon.bottom - 1;
      }));
      assert.equal(overlaps, false, id + ' titles clear icons');
      await group.screenshot({ path: 'visual-review/pikk-live-' + device + '-' + id + '.png' });
      await group.locator('summary').click();
    }
    await page.locator('#pikk-live-group-coed a').filter({ hasText: 'Why Are You Single?' }).click();
    await page.waitForTimeout(200);
    assert.ok(page.url().includes('tab=channels&category=Why%20Are%20You%20Single%3F'), 'dating room routes to channel filter');
    // Verify an actual active Live goal's donation-message UI, without a real broadcast.
    await page.evaluate(() => {
      const now = Date.now();
      const state = JSON.parse(localStorage.getItem('dbs_v1') || '{}');
      state.user = {id:'visual-host',username:'VisualHost',following:[],followers:[]};
      state.live = {id:'visual-live',hostId:'visual-host',hostName:'VisualHost',title:'Visual review stream',startedAt:now,viewers:0,chat:[],gifts:[],tipsTotal:0};
      state.coins = {balance:300,history:[]};
      state.dailyGoals = {app:null,history:[],liveByHost:{'visual-host':{id:'goal_live_visual',scope:'live',hostId:'visual-host',hostName:'VisualHost',name:'Studio session',targetAmount:50,raised:0,createdAt:now,endsAt:now+86400000}}};
      localStorage.setItem('dbs_v1',JSON.stringify(state));
    });
    await page.goto('http://127.0.0.1:5173/#/live', {waitUntil:'domcontentloaded'});
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('#liveGoalSupportMessage').waitFor({state:'visible'});
    assert.equal(await page.locator('.live-goal-donate').count(),3);
    assert.equal(await page.locator('.live-goal-custom-form').count(),1);
    assert.equal(await page.locator('#liveGoalSupportMessage').getAttribute('maxlength'),'180');
    assert.equal(await page.locator('#liveGoalSupportMessageCount').textContent(), '0 / 180', device+' initial message counter');
    const message = 'Thank you for the music!';
    await page.locator('#liveGoalSupportMessage').fill(message);
    assert.equal(await page.locator('#liveGoalSupportMessageCount').textContent(), message.length+' / 180', device+' counter follows typing');
    assert.equal(await page.locator('#liveGoalSupportMessage').getAttribute('aria-describedby'), 'liveGoalSupportMessageHint liveGoalSupportMessageCount');
    assert.equal(await page.locator('#sideNav').getAttribute('aria-hidden'), 'true', device+' drawer must be hidden on Live route');
    assert.equal(await page.locator('#menuBtn').getAttribute('aria-expanded'), 'false', device+' drawer trigger must be collapsed');
    const hiddenDrawer = await page.locator('#sideNav').evaluate(el => el.getBoundingClientRect().left);
    assert.ok(hiddenDrawer >= width - 1, device+' closed drawer must be off-screen, not covering goal: '+hiddenDrawer);
    assert.equal(await page.locator('#scrim').evaluate(el => getComputedStyle(el).pointerEvents), 'none', device+' scrim must not intercept donations');
    await page.locator('#liveDailyGoal').scrollIntoViewIfNeeded();
    const goalGeometry = await page.locator('#liveDailyGoal').evaluate(el => {
      const rect = el.getBoundingClientRect();
      const input = el.querySelector('#liveGoalSupportMessage').getBoundingClientRect();
      const submit = el.querySelector('.live-goal-custom-form button').getBoundingClientRect();
      const hit = document.elementFromPoint(input.left + input.width / 2, input.top + input.height / 2);
      return {left:rect.left,right:rect.right,width:rect.width,inputRight:input.right,submitRight:submit.right,inputReachable:hit === el.querySelector('#liveGoalSupportMessage')};
    });
    assert.ok(goalGeometry.left >= 0 && goalGeometry.right <= width + 2, device+' goal card clipped: '+JSON.stringify(goalGeometry));
    assert.ok(goalGeometry.inputRight <= width + 2 && goalGeometry.submitRight <= width + 2, device+' donation controls clipped: '+JSON.stringify(goalGeometry));
    assert.ok(goalGeometry.inputReachable, device+' donation message covered by another element: '+JSON.stringify(goalGeometry));
    await page.screenshot({path:'visual-review/pikk-live-'+device+'-goal-full.png'});
    await page.locator('#liveDailyGoal').screenshot({path:'visual-review/pikk-live-'+device+'-goal-message.png'});
    assert.deepEqual(errors, [], device + ' browser errors');
    await context.close();
  }
  console.log('PASS: Live categories grouped 15 women/15 men/10 coed, route, responsive cards, logo, player and seven tabs.');
} finally {
  await browser.close();
}
