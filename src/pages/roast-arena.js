import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, startRematch, roastVoteTurnout, REMATCH_SECONDS, sendRoastTestGift, recordRoastReport, ROUND_SECONDS, VOTE_SECONDS, BASE_ROUNDS } from '../roast-engine.js';
import { shellPage } from '../ui.js';

/** Roast Arena 1v1 TEST MODE flow (Roast is 1v1 only, owner ruling t461u). Everything is local: no server, video, or payments. */
const VIEWERS = ['test-viewer-1', 'test-viewer-2', 'test-viewer-3'];
const MODES = {
  '1v1': { root: 'roast-1v1', names: ['Challenger (test)', 'Opponent (test)'] },
};
const contestantName = (key, m, c) => MODES[key].names[m.contestants.indexOf(c)];
const states = {};
const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clock = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function stopTimer(st) { if (st?.timer) clearInterval(st.timer); if (st) st.timer = null; }
function startTimer(key) {
  const st = states[key]; stopTimer(st);
  st.timer = setInterval(() => {
    if (!document.getElementById(MODES[key].root)) return stopTimer(st);
    st.match = tickRoastMatch(st.match);
    if (st.match.phase === 'finished') stopTimer(st);
    draw(key);
  }, 1000);
}
const err = (st) => (st.error ? `<p class="muted" role="alert">${esc(st.error)}</p>` : '');
function inviteView1v1(st) {
  const names = MODES['1v1'].names; const inv = st.invite;
  if (!inv) {
    return `<h3>Step 1 · Challenger sends invite</h3>
      <label><input type="checkbox" data-consent="challenger"> I (challenger) accept the Roast Arena rules and consent to being roasted.</label>
      <p><button type="button" class="btn primary" data-roast="invite">Send TEST invite to ${esc(names[1])}</button></p>${err(st)}`;
  }
  if (inv.status === 'declined') return `<h3>Invite declined</h3><p>${esc(names[1])} declined. No match was started.</p><button type="button" class="btn" data-roast="reset">Start over</button>`;
  return `<h3>Step 2 · Opponent responds</h3><p>Pending TEST invite <code>${esc(inv.id)}</code> from ${esc(names[0])} (challenger consent recorded).</p>
    <label><input type="checkbox" data-consent="opponent"> I (opponent) accept the Roast Arena rules and consent to being roasted.</label>
    <p><button type="button" class="btn primary" data-roast="accept">Accept</button> <button type="button" class="btn" data-roast="decline">Decline</button></p>${err(st)}`;
}
function panel(key, i, m) {
  const names = MODES[key].names;
  return `<div class="card roast-panel" data-roast-panel="${i}" style="flex:1;min-width:140px;text-align:center">
    <div style="aspect-ratio:3/4;margin-bottom:6px;display:flex;align-items:center;justify-content:center;border:2px dashed currentColor;border-radius:12px;opacity:.8">
      <div><strong>TEST MODE</strong><br><span class="muted">Placeholder tile · no camera connected</span></div></div>
    <h4>${esc(names[i])}</h4>
    <p>Rounds won: <strong>${m.scores[i]}</strong></p>
    <p class="muted">Test gifts: ${m.gifts[i]} (not counted for winner)</p>
    ${['round', 'vote'].includes(m.phase) ? `<button type="button" class="btn" data-roast-gift="${i}">Send TEST gift</button>` : ''}
  </div>`;
}
export function matchView(key, st) {
  const m = st.match; const names = MODES[key].names;
  const roundName = m.tieBreaker ? 'Tie Breaker' : `Round ${m.round}`;
  const label = m.phase === 'round' ? roundName : m.phase === 'vote' ? `${roundName} · Vote: who won?` : m.phase === 'rematch' ? 'Result · Run It Back?' : 'Match finished';
  const result = m.result === 'winner' ? `<p data-roast-result="winner"><strong>Winner (audience votes): ${esc(names[m.winner])}</strong></p>` : m.result === 'tie' ? '<p data-roast-result="tie"><strong>Result: Tie</strong> (tiebreaker round was also tied)</p>' : '';
  const voted = m.votersThisRound.includes(st.viewer);
  return `<p class="chip">TEST MODE · local only · no server, video or real payments</p>
    <div class="card"><strong>On-screen rules (automated, no host):</strong> ${BASE_ROUNDS} rounds of ${ROUND_SECONDS}s, then a vote after each round (vote window ${VOTE_SECONDS}s). One vote per viewer per round. Winner is decided by votes only; gifts are tallied separately. If tied after ${BASE_ROUNDS} rounds, one tiebreaker round is played, then it ends as a tie. Contestants cannot vote. A rematch needs every contestant to agree (decision window ${REMATCH_SECONDS}s, rematch rounds are also ${ROUND_SECONDS}s).</div>
    <h3 aria-live="polite">${label} · <span data-roast-clock>${clock(m.seconds)}</span></h3>
    <div class="row" style="display:flex;gap:12px">${panel(key, 0, m)}${panel(key, 1, m)}</div>
    <p>Round votes so far: ${m.votes[0]} – ${m.votes[1]} · Round winners: ${m.roundWinners.map((w) => (w === null ? 'tie' : names[w].split(' ')[0])).join(', ') || '—'}</p>
    <label>Acting as test viewer: <select data-roast-viewer>${VIEWERS.map((v) => `<option ${v === st.viewer ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
    ${m.phase === 'vote' ? (({ voted: n, eligible: e }) => `<p data-roast-turnout><strong>${n} of ${e} eligible viewers voted</strong> <span class="chip">TEST MODE · test viewer list</span></p>`)(roastVoteTurnout(m)) : ''}
    ${m.phase === 'vote' ? (voted ? '<p class="muted">This viewer already voted this round.</p>' : `<p data-roast-vote-screen><strong data-roast-vote-round>${roundName}</strong> · Tap a name to vote who won:</p><p><button type="button" class="btn primary roast-tap" data-roast-vote="0" aria-label="Vote for ${esc(names[0])}">${esc(names[0])}</button> <button type="button" class="btn primary roast-tap" data-roast-vote="1" aria-label="Vote for ${esc(names[1])}">${esc(names[1])}</button></p>`) : ''}
    ${result}
    ${m.phase === 'rematch' ? `<p><strong>Rematch? Every contestant must agree within ${REMATCH_SECONDS}s.</strong> Viewers do not vote on rematches.</p><ul data-roast-rematch-list>${m.contestants.map((c) => `<li>${esc(contestantName(key, m, c))}: ${c in m.rematchAgreement ? (m.rematchAgreement[c] ? '<strong>Yes</strong>' : 'No') : `<button type="button" class="btn roast-tap" data-roast-rematch="yes" data-contestant="${c}">Rematch: Yes</button> <button type="button" class="btn roast-tap" data-roast-rematch="no" data-contestant="${c}">Rematch: No</button>`}</li>`).join('')}</ul>` : ''}
    ${m.rematch === 'agreed' ? '<p data-roast-rematch-status="agreed">All contestants agreed. <button type="button" class="btn primary" data-roast="rematch">Start rematch</button></p>' : m.rematch === 'declined' ? '<p data-roast-rematch-status="declined">Rematch declined by a contestant. Match over.</p>' : m.rematch === 'expired' ? '<p data-roast-rematch-status="expired">Rematch window closed without agreement. Match over.</p>' : ''}
    <p><button type="button" class="btn" data-roast="report">Report (stub)</button> <button type="button" class="btn" data-roast="skip">Skip to next phase (test control)</button></p>
    ${m.reports.length ? `<p class="muted" data-roast-reports>${m.reports.length} report(s) recorded locally only. Not sent to moderators.</p>` : ''}`;
}
function draw(key) {
  const root = document.getElementById(MODES[key].root); const st = states[key];
  if (!root || !st) return;
  root.innerHTML = st.match ? matchView(key, st) : inviteView1v1(st);
}
function onClick(key, event) {
  const el = event.target.closest('[data-roast],[data-roast-vote],[data-roast-gift],[data-roast-rematch]');
  if (!el) return;
  const st = states[key]; const root = document.getElementById(MODES[key].root);
  const checked = (k) => root.querySelector(`[data-consent="${k}"]`)?.checked === true;
  st.error = '';
  const action = el.dataset.roast;
  if (action === 'invite') {
    const r = createRoastInvite({ inviterId: 'test-challenger', inviteeId: 'test-opponent', consentAccepted: checked('challenger') });
    if (r.error) st.error = 'You must accept the rules and consent before inviting.'; else st.invite = r;
  } else if (action === 'accept') {
    const r = respondRoastInvite(st.invite, { accept: true, consentAccepted: checked('opponent') });
    if (r.error) st.error = 'That member must accept the rules and consent first.';
    else { st.invite = r; if (r.status === 'accepted') { st.match = createRoastMatch(r, { eligibleViewerIds: VIEWERS }); startTimer(key); } }
  } else if (action === 'decline') {
    st.invite = respondRoastInvite(st.invite, { accept: false });
  } else if (action === 'reset') {
    stopTimer(st); states[key] = { viewer: VIEWERS[0] };
  } else if (action === 'rematch') {
    st.match = startRematch(st.match, st.invite); startTimer(key);
  } else if (action === 'report') {
    st.match = recordRoastReport(st.match, { reporterId: st.viewer, reason: 'test report' });
  } else if (action === 'skip') {
    st.match = tickRoastMatch({ ...st.match, seconds: 1 });
    if (st.match.phase === 'finished') stopTimer(st);
  } else if (el.dataset.roastVote !== undefined) {
    st.match = castRoastVote(st.match, Number(el.dataset.roastVote), st.viewer);
  } else if (el.dataset.roastGift !== undefined) {
    st.match = sendRoastTestGift(st.match, Number(el.dataset.roastGift), 1);
  } else if (el.dataset.roastRematch !== undefined) {
    st.match = castRematchVote(st.match, el.dataset.roastRematch === 'yes', el.dataset.contestant);
    if (st.match.phase === 'finished') stopTimer(st);
  }
  draw(key);
}
export function bindRoastArena() {
  for (const key of Object.keys(MODES)) {
    stopTimer(states[key]);
    const root = document.getElementById(MODES[key].root);
    if (!root) continue;
    states[key] = { viewer: VIEWERS[0] };
    root.addEventListener('click', (e) => onClick(key, e));
    root.addEventListener('change', (e) => { if (e.target.matches('[data-roast-viewer]')) { states[key].viewer = e.target.value; draw(key); } });
    draw(key);
  }
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
      <p class="muted">Try the 1v1 flow locally: invite, consent from both sides, timed rounds, one vote per test viewer per round. Test-mode data only; nothing is shared or sent to a server.</p>
      <div id="roast-1v1"></div>
    </div>
    <div class="card">
      <h3>Battle formats</h3>
      <div class="row wrap"><span class="chip">1 vs. 1</span><span class="chip">Open Mic</span><span class="chip">Tournament</span></div>
      <p class="muted">Automated format: split-screen contestants, on-screen rules, automatic round countdown, timed voting buttons for viewers, gifts and requests to battle. No host is required.</p>
    </div>
    <div class="card">
      <h3>How an automated round works</h3>
      <ol>
        <li>Both contestants opt in and see the rules before the round begins.</li>
        <li>The system starts a visible countdown and displays the current round and time remaining to everyone.</li>
        <li>When the round ends, both microphones pause and viewers see <strong>Vote: Contestant A</strong> or <strong>Vote: Contestant B</strong> buttons.</li>
        <li>Each eligible viewer gets one vote per round within the timed voting window; the system locks voting when time expires.</li>
        <li>Results display the round winner, cumulative score and a separate gifts leaderboard. The <strong>audience voting window is the only break</strong> (${VOTE_SECONDS} seconds, owner-approved) between rounds. The next round starts immediately after voting closes. If the final match vote is tied, an automatic <strong>tiebreaker final round</strong> begins after voting closes. At the end of a decided match, each contestant has ${REMATCH_SECONDS} seconds to choose <strong>Rematch: Yes</strong> or <strong>Rematch: No</strong>; a rematch proceeds only if both contestants agree. Viewers do not vote on rematches.</li>
      </ol>
      <p class="muted">Voting windows, tiebreakers, rematch agreement with no additional inter-round break are planned behavior, not yet a working real-time match.</p>
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
