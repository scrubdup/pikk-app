import { shellPage } from '../ui.js';
import { getAppDailyGoal } from '../store.js';
import { appGoalInner, bindAppGoal } from './home.js';
export function renderDonate() {
  return shellPage('Donate', `<section class="card home-app-goal home-app-goal-full">
    <p class="kicker">PIKK daily app goal · 24h</p>
    <div id="homeAppGoalBody">${appGoalInner(getAppDailyGoal())}</div>
    <p class="chip" style="margin-top:10px">TEST MODE · demo coins only · no real payments</p>
  </section>`, { badge: 'TEST MODE' });
}
export const bindDonate = (root) => bindAppGoal(root);
