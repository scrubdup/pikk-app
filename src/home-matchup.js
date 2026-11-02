// t383u — PIKK Match Up: Monkey-style random 1-on-1 video chat. TEST MODE demo only.
// No camera/mic is ever requested; tiles are placeholders. No real users are shown.
import { esc } from './ui.js';

export const MATCHUP_TAGS = Object.freeze(['Music', 'Rap', 'Gaming', 'Dance', 'Comedy', 'Sports', 'Art', 'Fashion']);
export const MATCHUP_SECONDS = 15;

export function renderHomeMatchUp() {
  const tags = MATCHUP_TAGS.map((t) => `<button type="button" class="pikk-mu-tag" data-mu-tag="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('');
  return `
  <section class="pikk-hs pikk-matchup" id="homeMatchUp" data-hs="matchup" data-test-mode aria-labelledby="homeMatchUpH">
    <div class="pikk-hs-head"><div><p class="kicker">Random 1-on-1 video chat</p>
      <h2 id="homeMatchUpH">PIKK Match Up <span class="pikk-badge-18" aria-label="18 plus only">18+</span> <span class="chip pikk-mu-test">TEST MODE</span></h2></div></div>
    <p class="pikk-mu-lead">Demo preview only — no camera or microphone is used and no real people are matched.</p>
    <div class="pikk-mu-tags" role="group" aria-label="Interest tags">${tags}</div>
    <div class="pikk-mu-stage">
      <div class="pikk-mu-tile pikk-mu-you" aria-label="Your tile (placeholder)"><span aria-hidden="true">◉</span><small>You · camera off (demo)</small></div>
      <div class="pikk-mu-tile pikk-mu-them" aria-label="Match tile (placeholder)"><span aria-hidden="true">?</span><small data-mu-status>Demo match placeholder</small></div>
    </div>
    <div class="pikk-mu-timer" aria-live="polite"><span data-mu-time>${MATCHUP_SECONDS}</span>s
      <button type="button" class="pikk-mu-btn" data-mu-add>+15s Add time</button></div>
    <div class="pikk-mu-actions">
      <button type="button" class="pikk-mu-btn pikk-mu-start" data-mu-start>Start matching</button>
      <button type="button" class="pikk-mu-btn" data-mu-next disabled>Skip / Next</button>
      <button type="button" class="pikk-mu-btn" data-mu-friend disabled>Add friend</button>
      <button type="button" class="pikk-mu-btn" data-mu-report disabled>Report</button>
      <button type="button" class="pikk-mu-btn" data-mu-block disabled>Block</button>
    </div>
    <p class="pikk-mu-safety" role="note"><strong>Safety:</strong> 18+ only. Never share personal info. Report or Block ends a chat right away. Live matching launches only after age verification and moderation are in place — this is a demo.</p>
  </section>`;
}

export function bindHomeMatchUp(root) {
  const el = root.querySelector('#homeMatchUp');
  if (!el) return;
  const $ = (s) => el.querySelector(s);
  const timeEl = $('[data-mu-time]'), status = $('[data-mu-status]');
  let left = MATCHUP_SECONDS, timer = null, round = 0;
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  const setOn = (on) => ['[data-mu-next]', '[data-mu-friend]', '[data-mu-report]', '[data-mu-block]'].forEach((s) => { $(s).disabled = !on; });
  const picked = () => [...el.querySelectorAll('.pikk-mu-tag[aria-pressed="true"]')].map((b) => b.dataset.muTag);
  const start = () => {
    stop(); round += 1; left = MATCHUP_SECONDS; timeEl.textContent = left; setOn(true);
    const t = picked();
    status.textContent = `Demo round ${round}${t.length ? ' · ' + t.join(', ') : ''} · placeholder, not a real user`;
    timer = setInterval(() => {
      if (!document.body.contains(el)) return stop();
      left -= 1; timeEl.textContent = Math.max(left, 0);
      if (left <= 0) { stop(); setOn(false); status.textContent = 'Time up (demo). Tap Start matching again.'; }
    }, 1000);
  };
  el.querySelectorAll('.pikk-mu-tag').forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('is-on', on);
  }));
  $('[data-mu-start]').addEventListener('click', start);
  $('[data-mu-next]').addEventListener('click', start);
  $('[data-mu-add]').addEventListener('click', () => { if (timer) { left += 15; timeEl.textContent = left; } });
  $('[data-mu-friend]').addEventListener('click', () => { status.textContent = 'Friend request (demo) — not sent; no real user.'; });
  const end = (w) => { stop(); setOn(false); status.textContent = `${w} (demo) — chat ended. Real reports go to moderation at launch.`; };
  $('[data-mu-report]').addEventListener('click', () => end('Reported'));
  $('[data-mu-block]').addEventListener('click', () => end('Blocked'));
}
