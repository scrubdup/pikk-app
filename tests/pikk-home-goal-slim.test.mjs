import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
test('Home: slim goal bar first (directly under player), full card removed from feed', () => {
  const home = read('src/pages/home.js');
  assert.match(home, /\$\{appGoalCard\}\n    \$\{visualFeed\}/);
  assert.match(home, /const appGoalCard = slimGoalBar\(getAppDailyGoal\(\)\);/);
  assert.match(home, /class="home-goal-slim" id="home-app-goal" href="#\/donate"/);
  assert.match(home, /<span class="btn primary home-goal-slim-btn">Donate<\/span>/);
  const css = read('src/pikk-pages.css');
  assert.match(css, /\.home-goal-slim\{[^}]*min-height:44px;max-height:56px/);
  assert.match(css, /\.home-goal-slim-bar>span\{[^}]*linear-gradient\(90deg,#ff3137,#c0c6cf,#2f6bff\)/);
  assert.match(css, /html:root \{ --sp-h: 95px; \}/);
});
test('#/donate reuses getAppDailyGoal/donateToGoal; drawer has Donate', async () => {
  const main = read('src/main.js'); assert.match(main, /'\/donate': \{ render: renderDonate, bind: bindDonate \}/);
  const d = read('src/pages/donate.js'); assert.match(d, /appGoalInner\(getAppDailyGoal\(\)\)/); assert.match(d, /bindAppGoal\(root\)/);
  assert.match(read('src/pages/home.js'), /export function bindAppGoal\(root\) \{[\s\S]*donateToGoal\(goalId, amount\)/);
  const { drawerGroups } = await import('../src/nav-sections.js');
  assert.ok(drawerGroups().some((g) => g.href === '#/donate' && /Donate/.test(g.label)));
  assert.match(read('.github/workflows/pikk-duotone-visual.yml'), /node scripts\/visual-review-home-goal\.mjs/);
});
