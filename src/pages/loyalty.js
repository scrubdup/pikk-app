import {
  getState,
  signInLocal,
  getLoyalty,
  setLoyaltyVisibility,
  recordLoyaltyAction,
  listLoyaltyBadges,
  resetLoyaltyDemo,
  joinFanClub,
  ensureFanClubsSeeded,
  listFanClubs,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/loyalty');
}

function ensureSignedIn() {
  const { user } = getState();
  if (user) return user;
  const signed = signInLocal('LoyalFan');
  toast('Signed in as LoyalFan · local demo');
  return signed || getState().user;
}

function act(kind, points, note) {
  ensureSignedIn();
  const res = recordLoyaltyAction(kind, { points, note });
  if (res.error === 'signin') return toast('Sign in required');
  if (res.error === 'cooldown') return toast('Anti-farming · wait a few seconds');
  if (res.error === 'daily_cap') return toast('Daily cap hit · come back tomorrow (demo)');
  if (res.error) return toast('Could not record');
  const unlocked = (res.newBadges || []).filter((id) => id !== 'day_one' || (res.loyalty.badges || []).includes('day_one'));
  if (res.newBadges?.length) toast(`+${points} pts · badge: ${res.newBadges.join(', ')}`);
  else toast(`+${points} pts · ${note}`);
  refresh();
}

export function renderLoyalty() {
  const { user } = getState();
  const L = getLoyalty();
  const badges = listLoyaltyBadges();

  const badgeCards = badges
    .map((b) => {
      const on = b.unlocked;
      return `<div class="card" style="opacity:${on ? 1 : 0.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${esc(b.name)}</strong>
          <span class="chip">${on ? 'Unlocked' : 'Locked'}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${esc(b.blurb)}</p>
      </div>`;
    })
    .join('');

  const history =
    (L.history || []).length === 0
      ? `<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>`
      : `<ul class="list-plain">${(L.history || [])
          .slice(0, 12)
          .map(
            (h) => `<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${h.points}</strong> · ${esc(h.note || h.kind)}</span>
              <span class="muted" style="font-size:12px">${esc(timeAgo(h.at))}</span>
            </div>
          </li>`
          )
          .join('')}</ul>`;

  const visibleNote = L.publicVisible
    ? 'Your badges & points can appear on your profile (demo flag).'
    : 'History & achievements are private — only you see them here.';

  return shellPage(
    'Loyalty Club',
    `
    <div class="pikk-loyalty-studio">
    <section class="pikk-loyalty-hero" aria-label="PIKK Loyalty rewards overview">
      <p class="kicker">PIKK REWARDS · RECOGNITION BEYOND SPENDING</p>
      <h2>Earn your place. <span>Get recognized.</span></h2>
      <p class="muted" style="margin:0 0 10px">Badges for listening, attending lives, and Fan Club participation — <strong>not purchase-only</strong>. Paid gifts are never the only loyalty signal. Anti-farming cooldowns + daily caps apply (TEST MODE).</p>
      <div class="pikk-loyalty-stats" aria-label="Your demo loyalty totals">
        <span class="pikk-loyalty-points">${L.points}</span>
        <span class="muted">points</span>
        <span class="chip">${(L.badges || []).length} badges</span>
        <span class="chip">TEST MODE</span>
      </div>
      ${!user ? `<p class="chip" style="margin-top:10px">Sign in to earn · local demo</p>` : ''}
      <div class="pikk-loyalty-hero-mark" aria-hidden="true">★</div>
    </section>

    <div class="card pikk-loyalty-panel pikk-loyalty-actions">
      <h3 style="margin:0 0 8px">Demo actions</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Healthy participation stubs — not a spend ladder.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" id="loyListen">Listen tick · +5</button>
        <button class="btn" id="loyLive">Attend live stub · +8</button>
        <button class="btn" id="loyClub">Join a Fan Club · +10</button>
        <button class="btn" id="loyHelp">Helper tip · +6</button>
        <button class="btn ghost" id="loyReset">Reset demo</button>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/live">Live</a>
        <a class="btn" href="#/fanclubs">Fan Clubs</a>
        <a class="btn" href="#/openmic">Open Mic</a>
      </div>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-privacy">
      <h3 style="margin:0 0 6px">Visibility</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">${esc(visibleNote)}</p>
      <label class="row" style="gap:8px;align-items:center;cursor:pointer">
        <input type="checkbox" id="loyPublic" ${L.publicVisible ? 'checked' : ''} />
        <span>Show badges publicly (demo)</span>
      </label>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-badges">
      <h3 style="margin:0 0 10px">Badges</h3>
      <div class="pikk-loyalty-badge-grid">${badgeCards}</div>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-activity">
      <h3 style="margin:0 0 8px">Recent activity</h3>
      ${history}
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-roadmap">
      <h3 style="margin:0 0 6px">Admin-ish rollup · optional</h3>
      <p class="muted" style="margin:0;font-size:12px">Future Admin Fan Loyalty dashboard (plan § Live Gift Effects) can list tenure, attendance, and opted-in history. This page stays fan-facing; no purchase-only ranking.</p>
    </div>
    </div>
    `,
    { lead: 'Recognition for healthy participation · DEMO.', badge: 'Phase 2 demo' }
  );
}

export function bindLoyalty(root) {
  root.querySelector('#loyListen')?.addEventListener('click', () =>
    act('listen', 5, 'Authorized listening tick')
  );
  root.querySelector('#loyLive')?.addEventListener('click', () =>
    act('live', 8, 'Attended live (stub)')
  );
  root.querySelector('#loyHelp')?.addEventListener('click', () =>
    act('help', 6, 'Shared community helper tip')
  );
  root.querySelector('#loyClub')?.addEventListener('click', () => {
    ensureSignedIn();
    ensureFanClubsSeeded();
    const clubs = listFanClubs();
    const target = clubs.find((c) => c.privacy === 'public') || clubs[0];
    if (target) joinFanClub(target.id);
    act('club', 10, target ? `Joined ${target.name}` : 'Joined Fan Club');
  });
  root.querySelector('#loyPublic')?.addEventListener('change', (e) => {
    ensureSignedIn();
    setLoyaltyVisibility(e.target.checked);
    toast(e.target.checked ? 'Public visibility on' : 'Achievements private');
    refresh();
  });
  root.querySelector('#loyReset')?.addEventListener('click', () => {
    resetLoyaltyDemo();
    toast('Loyalty demo reset');
    refresh();
  });
}
