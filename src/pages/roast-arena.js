import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, sendRoastTestGift, recordRoastReport, ROUND_SECONDS, VOTE_SECONDS, BASE_ROUNDS } from '../roast-engine.js';
import { shellPage } from '../ui.js';

/** Roast Arena 1v1 TEST MODE flow. Everything is local: no server, video, or payments. */
const CHALLENGER = 'test-challenger';
const OPPONENT = 'test-opponent';
const VIEWERS = ['test-viewer-1', 'test-viewer-2', 'test-viewer-3'];
const names = ['Challenger (test)', 'Opponent (test)'];
let state = null;
let timer = null;
const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function stopTimer() { if (timer) clearInterval(timer); timer = null; }
function startTimer() {
  stopTimer();
  timer = setInterval(() => {
    if (!document.getElementById('roast-1v1')) return stopTimer();
    state.match = tickRoastMatch(state.match);
    if (state.match.phase === 'finished') stopTimer();
    draw();
  }, 1000);
}
function inviteView() {
  const inv = state.invite;
  if (!inv) {
    return `<h3>Step 1 · Challenger sends invite</h3>
      <label><input type="checkbox" id="roast-consent-challenger"> I (challenger) accept the Roast Arena rules and consent to being roasted.</label>
      <p><button type="button" class="btn primary" data-roast="invite">Send TEST invite to ${esc(names[1])}</button></p>
      ${state.error ? `<p class="muted" role="alert">${esc(state.error)}</p>` : ''}`;
  }
  if (inv.status === 'declined') return `<h3>Invite declined</h3><p>${esc(names[1])} declined. No match was started.</p><button type="button" class="btn" data-roast="reset">Start over</button>`;
  return `<h3>Step 2 · Opponent responds</h3><p>Pending TEST invite <code>${esc(inv.id)}</code> from ${esc(names[0])} (challenger consent recorded).</p>
    <label><input type="checkbox" id="roast-consent-opponent"> I (opponent) accept the Roast Arena rules and consent to being roasted.</label>
    <p><button type="button" class="btn primary" data-roast="accept">Accept</button> <button type="button" class="btn" data-roast="decline">Decline</button></p>
    ${state.error ? `<p class="muted" role="alert">${esc(state.error)}</p>` : ''}`;
}
function panel(i, m) {
  return `<div class="card roast-panel" data-roast-panel="${i}" style="flex:1;min-width:140px;text-align:center">
    <div style="aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;border:2px dashed currentColor;border-radius:12px;opacity:.8">
      <div><strong>TEST MODE</strong><br><span class="muted">Placeholder tile · no camera connected</span></div></div>
    <h4>${esc(names[i])}</h4>
    <p>Rounds won: <strong>${m.scores[i]}</strong></p>
    <p class="muted">Test gifts: ${m.gifts[i]} (not counted for winner)</p>
    ${['round', 'vote'].includes(m.phase) ? `<button type="button" class="btn" data-roast-gift="${i}">Send TEST gift</button>` : ''}
  </div>`;
}
function matchView() {
  const m = state.match;
  const label = m.phase === 'round' ? `Round ${m.round}${m.tieBreaker ? ' · Final tiebreaker' : ''}` : m.phase === 'vote' ? `Vote for the round ${m.round} winner` : m.phase === 'rematch' ? 'Result · Run It Back?' : 'Match finished';
  const result = m.result === 'winner' ? `<p data-roast-result="winner"><strong>Winner (audience votes): ${esc(names[m.winner])}</strong></p>` : m.result === 'tie' ? '<p data-roast-result="tie"><strong>Result: Tie</strong> (tiebreaker round was also tied)</p>' : '';
  const voted = m.votersThisRound.includes(state.viewer);
  return `<p class="chip">TEST MODE · local only · no server, video or real payments</p>
    <div class="card"><strong>On-screen rules (automated, no host):</strong> ${BASE_ROUNDS} rounds of ${ROUND_SECONDS}s, then a ${VOTE_SECONDS}s vote after each round. One vote per viewer per round. Winner is decided by votes only; gifts are tallied separately. If tied after ${BASE_ROUNDS} rounds, one tiebreaker round is played. <em>(test values · owner verification needed)</em></div>
    <h3 aria-live="polite">${label} · <span data-roast-clock>${clock(m.seconds)}</span></h3>
    <div class="row" style="display:flex;gap:12px">${panel(0, m)}${panel(1, m)}</div>
    <p>Round votes so far: ${m.votes[0]} – ${m.votes[1]} · Round winners: ${m.roundWinners.map((w) => (w === null ? 'tie' : w === 0 ? 'C' : 'O')).join(', ') || '—'}</p>
    <label>Acting as test viewer: <select id="roast-viewer">${VIEWERS.map((v) => `<option ${v === state.viewer ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
    ${m.phase === 'vote' ? (voted ? '<p class="muted">This viewer already voted this round.</p>' : `<p><button type="button" class="btn primary" data-roast-vote="0">Vote: ${esc(names[0])}</button> <button type="button" class="btn primary" data-roast-vote="1">Vote: ${esc(names[1])}</button></p>`) : ''}
    ${result}
    ${m.phase === 'rematch' ? '<p><button type="button" class="btn" data-roast-rematch="yes">Rematch: Yes</button> <button type="button" class="btn" data-roast-rematch="no">Rematch: No</button></p>' : ''}
    <p><button type="button" class="btn" data-roast="report">Report (stub)</button> <button type="button" class="btn" data-roast="skip">Skip to next phase (test control)</button></p>
    ${m.reports.length ? `<p class="muted" data-roast-reports>${m.reports.length} report(s) recorded locally only. Not sent to moderators.</p>` : ''}`;
}
function draw() {
  const root = document.getElementById('roast-1v1');
  if (!root || !state) return;
  root.innerHTML = state.match ? matchView() : inviteView();
}
function onClick(event) {
  const el = event.target.closest('[data-roast],[data-roast-vote],[data-roast-gift],[data-roast-rematch]');
  if (!el) return;
  state.error = '';
  const action = el.dataset.roast;
  if (action === 'invite') {
    const r = createRoastInvite({ inviterId: CHALLENGER, inviteeId: OPPONENT, consentAccepted: document.getElementById('roast-consent-challenger')?.checked === true });
    if (r.error) state.error = 'Challenger must accept the rules and consent before inviting.'; else state.invite = r;
  } else if (action === 'accept') {
    const r = respondRoastInvite(state.invite, { accept: true, consentAccepted: document.getElementById('roast-consent-opponent')?.checked === true });
    if (r.error) state.error = 'Opponent must accept the rules and consent before the match can start.';
    else { state.invite = r; state.match = createRoastMatch(r, { eligibleViewerIds: VIEWERS }); startTimer(); }
  } else if (action === 'decline') {
    state.invite = respondRoastInvite(state.invite, { accept: false });
  } else if (action === 'reset') {
    stopTimer(); state = { viewer: VIEWERS[0] };
  } else if (action === 'report') {
    state.match = recordRoastReport(state.match, { reporterId: state.viewer, reason: 'test report' });
  } else if (action === 'skip') {
    state.match = { ...state.match, seconds: 1 }; state.match = tickRoastMatch(state.match);
    if (state.match.phase === 'finished') stopTimer();
  } else if (el.dataset.roastVote !== undefined) {
    state.match = castRoastVote(state.match, Number(el.dataset.roastVote), state.viewer);
  } else if (el.dataset.roastGift !== undefined) {
    state.match = sendRoastTestGift(state.match, Number(el.dataset.roastGift), 1);
  } else if (el.dataset.roastRematch !== undefined) {
    state.match = castRematchVote(state.match, el.dataset.roastRematch === 'yes', state.viewer);
  }
  draw();
}
export function bindRoastArena() {
  stopTimer();
  const root = document.getElementById('roast-1v1');
  if (!root) return;
  state = { viewer: VIEWERS[0] };
  root.addEventListener('click', onClick);
  root.addEventListener('change', (e) => { if (e.target.id === 'roast-viewer') { state.viewer = e.target.value; draw(); } });
  draw();
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
      <h3>1 vs. 1 · TEST MODE preview</h3>
      <p class="muted">Try the 1v1 flow locally: invite, consent from both sides, timed rounds, one vote per test viewer per round. Test values only; nothing is shared or sent to a server.</p>
      <div id="roast-1v1"></div>
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
