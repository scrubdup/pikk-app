import { createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote } from '../roast-engine.js';
import { shellPage } from '../ui.js';

/** Roast Arena discovery and rules; live competition backend is not yet connected. */
let demo = null;
let timer = null;
function drawDemo() {
  const root = document.getElementById('roast-demo');
  if (!root || !demo) { if (timer) clearInterval(timer); timer = null; return; }
  const phase = demo.phase;
  const label = phase === 'round' ? `Round ${demo.round}${demo.tieBreaker ? ' · Final tiebreaker' : ''}` : phase === 'vote' ? 'Vote for the round winner' : phase === 'rematch' ? 'Run It Back?' : 'Match finished';
  root.innerHTML = `<h3>${label}</h3><p><strong>${String(Math.floor(demo.seconds / 60)).padStart(2, '0')}:${String(demo.seconds % 60).padStart(2, '0')}</strong></p><p>Contestant A: ${demo.scores[0]} rounds · Contestant B: ${demo.scores[1]} rounds</p>${phase === 'vote' ? '<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>' : ''}${phase === 'rematch' ? `<p>Winner: Contestant ${demo.winner === 0 ? 'A' : 'B'}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>` : ''}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`;
}
export function bindRoastArena() {
  if (timer) clearInterval(timer);
  timer = null;
  demo = null;
  const start = document.getElementById('roast-start');
  if (!start) return;
  start.addEventListener('click', () => {
    demo = createRoastMatch();
    drawDemo();
    if (timer) clearInterval(timer);
    timer = setInterval(() => { demo = tickRoastMatch(demo); drawDemo(); if (demo.phase === 'finished') { clearInterval(timer); timer = null; } }, 1000);
  });
  document.getElementById('roast-demo').addEventListener('click', (event) => {
    const vote = event.target.closest('[data-roast-vote]');
    const rematch = event.target.closest('[data-roast-rematch]');
    if (vote && demo && demo.phase === 'vote' && !demo.voted) { demo = { ...castRoastVote(demo, Number(vote.dataset.roastVote)), voted: true }; drawDemo(); }
    if (rematch && demo && demo.phase === 'rematch' && !demo.rematchVoted) { demo = { ...castRematchVote(demo, rematch.dataset.roastRematch === 'yes'), rematchVoted: true }; drawDemo(); }
  });
}
export function renderRoastArena() {
  return shellPage('PIKK Roast Arena', `
    <div class="card">
      <span class="chip">Comedy & Roast Battles · Coming Soon</span>
      <h2>PIKK Roast Arena</h2>
      <p>Step into live roast battles, trade jokes, and watch comedians go head-to-head. Join the audience, vote for your favorite, or request your turn on the mic.</p>
      <p class="muted">Live battles, voting, gifts and matchmaking are in development. No active battle or vote is represented on this page.</p>
      <a class="btn primary" href="#/live?tab=categories">Explore Live Categories</a>
    </div>
    <div class="card">
      <h3>Battle formats</h3>
      <div class="row wrap"><span class="chip">1 vs. 1</span><span class="chip">Tag Team</span><span class="chip">Open Mic</span><span class="chip">Tournament</span></div>
      <p class="muted">Automated format: split-screen contestants, on-screen rules, automatic round countdown, timed voting buttons for viewers, gifts and requests to battle. No host is required.</p>
    </div>
    <div class="card">
      <h3>How an automated round works</h3>
      <ol>
        <li>Both contestants opt in and see the rules before the round begins.</li>
        <li>The system starts a visible countdown and displays the current round and time remaining to everyone.</li>
        <li>When the round ends, both microphones pause and viewers see <strong>Vote: Contestant A</strong> or <strong>Vote: Contestant B</strong> buttons.</li>
        <li>Each eligible viewer gets one vote per round within the timed voting window; the system locks voting when time expires.</li>
        <li>Results display the round winner, cumulative score and a separate gifts leaderboard. The <strong>10-second audience voting window is the only break</strong> between rounds. The next round starts immediately after voting closes. If the final match vote is tied, an automatic <strong>tiebreaker final round</strong> begins after voting closes. At the end of a decided match, viewers can vote <strong>Rematch: Yes</strong> or <strong>Rematch: No</strong>; a rematch proceeds only if both contestants agree.</li>
      </ol>
      <p class="muted">Voting windows, tiebreakers, rematch polls with no additional inter-round break are planned behavior, not yet a working real-time match.</p>
    </div>
    <div class="card">
      <h3>Discovery</h3>
      <p class="muted">Upcoming Battles · Live Now · Top Roasters · Funniest Clips</p>
      <p>Comedy winner (audience votes) and most-supported performer (gifts) will be displayed as <strong>separate results</strong>. Gifts cannot change the audience vote winner.</p>
    </div>
    <div class="card">
      <h3>Consent & safety</h3>
      <p>Everyone competing must explicitly opt in to being roasted. Automated safety controls must enforce the rules, provide mute and removal actions, and let participants and viewers report threats, hate speech, harassment or sharing private information. Escalation to human review remains available for serious reports.</p>
      <p class="muted">18+ eligibility, reporting, moderation and consent controls must be implemented and tested before live competition launches.</p>
    </div>
  `, { lead: 'Live comedy competitions · audience votes and gifts tracked separately' });
}
