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
    // Capture the actual Live directory, not the startup splash overlay.
    await page.locator('#splash').waitFor({ state: 'hidden', timeout: 20000 });
    assert.equal(await page.locator('.logo-img').isVisible(), true, 'approved logo remains visible');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent music player');
    assert.equal(await page.locator('#tabbar a').count(), 7, 'seven bottom tabs preserved');
    assert.equal(await page.locator('.pikk-live-directory-group').count(), 8, 'eight organized sections');
    assert.equal(await page.locator('#pikk-live-group-coed').getAttribute('open'), '', 'coed open by default');
    assert.equal(await page.locator('.pikk-live-directory-group').first().getAttribute('id'), 'pikk-live-group-general', 'General Live is first');
    assert.equal(await page.locator('#pikk-live-group-general').getAttribute('open'), '', 'General Live opens by default');
    assert.equal(await page.locator('#pikk-live-group-general .pikk-live-room-card:visible').count(), 17, 'all General Live categories visible');
    assert.equal(await page.locator('#pikk-live-group-general').getByText('IRL', { exact: true }).isVisible(), true, 'IRL discoverable');
    assert.equal(await page.locator('#pikk-live-group-general').getByText('Gaming', { exact: true }).isVisible(), true, 'Gaming discoverable');
    await page.locator('#pikk-live-group-general').screenshot({ path: 'visual-review/pikk-live-' + device + '-general.png' });
    assert.equal(await page.locator('#pikk-live-group-coed .pikk-live-room-card').count(), 10);
    assert.equal(await page.locator('#pikk-live-group-women .pikk-live-room-card').count(), 15);
    assert.equal(await page.locator('#pikk-live-group-men .pikk-live-room-card').count(), 15);
    assert.equal(await page.locator('#pikk-live-group-men .pikk-live-directory-icon').textContent(), '🫱🏻‍🫲🏿', 'light and dark handshake on mobile and desktop');
    const iconWidth = await page.locator('#pikk-live-group-men .pikk-live-directory-icon').evaluate(el => el.getBoundingClientRect().width);
    assert.ok(iconWidth >= 32, 'handshake icon retains its visible tile');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 3, device + ' must not overflow viewport: ' + overflow);
    // Element screenshots scroll the page. Reset before capturing the initial
    // viewport so review shows the real header, search and first Live section.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({ path: 'visual-review/pikk-live-' + device + '-directory.png' });

    const search = page.getByRole('searchbox', { name: 'Find a Live topic' });
    assert.equal(await search.isVisible(), true, device + ' accessible topic search');
    await search.fill('Couples Corner');
    assert.equal(await page.locator('.pikk-live-room-card:visible').count(), 1, device + ' exact matching topic visible');
    assert.equal(await page.locator('#liveRoomSearchStatus').textContent(), '1 matching topic · channel discovery only.');
    assert.equal(await page.locator('#pikk-live-group-coed').getAttribute('open'), '', 'matching folder expands');
    assert.equal(await page.locator('#pikk-live-group-coed .pikk-live-directory-count').textContent(), '1 of 10 topics', 'folder count reflects filter');
    assert.equal(await page.locator('.pikk-live-room-card').count(), 78, 'filter does not delete categories');
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 3, device + ' filtered layout must not overflow');
    await page.locator('.pikk-live-room-search').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(150);
    const matchingCard = await page.locator('.pikk-live-room-card:visible').boundingBox();
    assert.ok(matchingCard && matchingCard.y < height - 60, device + ' search result must be visible in screenshot');
    await page.screenshot({ path: 'visual-review/pikk-live-' + device + '-search.png' });
    await search.fill('Browse channels');
    assert.equal(await page.locator('.pikk-live-room-card:visible').count(), 0,
      device + ' generic action text must not match all topics');
    assert.equal(await page.locator('#liveRoomSearchStatus').textContent(),
      '0 matching topics · channel discovery only.');
    await search.press('Escape');
    assert.equal(await search.inputValue(), '', device + ' Escape clears the filtered directory');
    assert.equal(await search.evaluate(el => el === document.activeElement), true, device + ' Escape retains search focus');
    assert.equal(await page.locator('#pikk-live-group-women').getAttribute('open'), null, device + ' Escape restores collapsed folders');
    assert.equal(await page.locator('#liveRoomSearchStatus').textContent(), 'Browse 78 topics · these filter channels, not hosted rooms.');
    await search.fill('City Connect');
    assert.equal(await page.locator('.pikk-live-room-card:visible').count(), 1, device + ' searching again works after Escape');
    await page.getByRole('button', { name: 'Clear', exact: true }).click();
    assert.equal(await search.inputValue(), '', device + ' clear resets search');
    assert.equal(await page.locator('#liveRoomSearchStatus').textContent(), 'Browse 78 topics · these filter channels, not hosted rooms.');
    assert.equal(await page.locator('#pikk-live-group-coed').getAttribute('open'), '', 'clear restores original open folder');
    assert.equal(await page.locator('#pikk-live-group-coed .pikk-live-directory-count').textContent(), '10 rooms', 'clear restores original folder count');
    assert.equal(await page.locator('#pikk-live-group-women').getAttribute('open'), null, 'clear restores collapsed folder');
    assert.equal(await page.locator('#liveRoomSearchClear').isVisible(), false, 'clear button hides when empty');
    assert.equal(await search.evaluate(el => el === document.activeElement), true, 'clear returns keyboard focus');


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
