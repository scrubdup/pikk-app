import {
  getState,
  listMissions,
  createMission,
  seedDemoMissions,
  joinMission,
  submitMissionProof,
  setMissionStatus,
  bumpMissionScore,
  getMissionRankings,
  signInLocal,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/missions');
}

const PROMOTE_LABELS = {
  song: 'Song',
  album: 'Album',
  video: 'Video',
  live: 'Livestream',
  app: 'PIKK App',
  interview: 'Interview',
};

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(0);
}

function deadlineLabel(ms) {
  const t = Number(ms) || 0;
  if (!t) return 'No deadline';
  const diff = t - Date.now();
  if (diff < 0) {
    const days = Math.ceil(-diff / 86400000);
    return `Ended ${days}d ago`;
  }
  const days = Math.ceil(diff / 86400000);
  if (days <= 1) return 'Due today / tomorrow';
  return `${days}d left`;
}

function deadlineInputValue(daysFromNow = 14) {
  const d = new Date(Date.now() + daysFromNow * 86400000);
  return d.toISOString().slice(0, 10);
}

function ensureSignedIn() {
  const { user } = getState();
  if (user) return user;
  const signed = signInLocal('DemoCreator');
  toast('Signed in as DemoCreator · local demo');
  return signed || getState().user;
}

export function renderMissions() {
  const { user } = getState();
  const missions = listMissions().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const active = missions.filter((m) => m.status === 'active' || m.status === 'paused');
  const archive = missions.filter((m) => m.status === 'ended' || m.status === 'draft');
  const uniqueCreators = new Set(missions.flatMap((m) => (m.participants || []).map((p) => p.userId).filter(Boolean))).size;
  const proofCount = missions.reduce((count, m) => count + (m.submissions || []).length, 0);

  const missionCard = (m) => {
    const feeChip =
      m.fundSource === 'third_party'
        ? `<span class="chip">20% management fee · disclosed</span>`
        : `<span class="chip">PIKK-funded · marketing expense</span>`;
    const rankings = getMissionRankings(m.id);
    const joined = user && (m.participants || []).some((p) => p.userId === user.id);
    const mySubmissions = (m.submissions || []).filter((s) => user && s.userId === user.id);
    const rankRows =
      rankings.length > 0
        ? rankings
            .slice(0, 8)
            .map(
              (r, i) => `<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${i + 1}</td>
              <td style="padding:6px 4px"><strong>${esc(r.username)}</strong>
                ${r.referralCode ? `<br/><span class="muted" style="font-size:11px">${esc(r.referralCode)}</span>` : ''}
              </td>
              <td style="padding:6px 4px">${r.score}</td>
              <td style="padding:6px 4px">${r.submissions}</td>
            </tr>`
            )
            .join('')
        : `<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>`;

    const subsHtml =
      (m.submissions || []).length > 0
        ? `<ul class="list-plain" style="margin-top:8px">${(m.submissions || [])
            .slice(0, 5)
            .map(
              (s) => `<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${esc(s.username)}</strong>
                <span class="chip">${esc(s.status || 'pending')}</span>
                <br/><span style="font-size:13px">${esc(s.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${timeAgo(s.at)} · Manual review</span>
              </span>
            </li>`
            )
            .join('')}</ul>`
        : `<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>`;

    const actions =
      m.status === 'active'
        ? `<div class="row wrap" style="margin-top:10px;gap:8px">
            ${
              joined
                ? `<span class="chip">Joined</span>
                   <button class="btn" data-bump="${esc(m.id)}">+5 demo points</button>`
                : `<button class="btn primary" data-join="${esc(m.id)}">Join mission</button>`
            }
            <button class="btn ghost" data-status="${esc(m.id)}" data-next="paused">Pause</button>
            <button class="btn ghost" data-status="${esc(m.id)}" data-next="ended">End mission</button>
          </div>
          ${
            joined
              ? `<form class="msn-proof" data-id="${esc(m.id)}" style="display:grid;gap:8px;margin-top:12px;max-width:480px">
                  <div class="field"><label>Submit proof (URL or note)</label>
                    <input name="proof" placeholder="https://… or clip description" maxlength="400" required />
                  </div>
                  <button class="btn" type="submit">Submit for review · +10 pts</button>
                </form>`
              : ''
          }`
        : m.status === 'paused'
          ? `<div class="row wrap" style="margin-top:10px;gap:8px">
              <button class="btn primary" data-status="${esc(m.id)}" data-next="active">Resume</button>
              <button class="btn ghost" data-status="${esc(m.id)}" data-next="ended">End mission</button>
            </div>`
          : `<div class="row wrap" style="margin-top:10px"><span class="chip">Archive · ${esc(m.status)}</span></div>`;

    return `<article class="card pikk-mission-card" data-mission="${esc(m.id)}">
      <div class="row wrap">
        <span class="chip">${esc(PROMOTE_LABELS[m.promoteType] || m.promoteType)}</span>
        <span class="chip">${esc(m.status)}</span>
        <span class="chip">Budget ${fmtMoney(m.budget)}</span>
        <span class="chip">${esc(deadlineLabel(m.deadline))}</span>
        ${feeChip}
        <span class="muted spacer" style="text-align:right;font-size:12px">${timeAgo(m.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${esc(m.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${esc(m.reward || '')}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${m.fundSource === 'third_party' ? 'Third-party' : 'PIKK'}</strong>
        ${m.fundSource === 'third_party' ? ' · 20% management fee (disclosed)' : ' · not a creator commission — marketing expense'}
        · ${(m.participants || []).length} joined · ${(m.submissions || []).length} submissions
        ${joined ? ` · your proofs: ${mySubmissions.length}` : ''}
      </p>
      ${actions}
      <h4 style="margin:16px 0 6px;font-size:14px">Rankings · demo score</h4>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr class="muted" style="text-align:left">
              <th style="padding:6px 4px">#</th>
              <th style="padding:6px 4px">Creator</th>
              <th style="padding:6px 4px">Score</th>
              <th style="padding:6px 4px">Subs</th>
            </tr>
          </thead>
          <tbody>${rankRows}</tbody>
        </table>
      </div>
      <h4 style="margin:14px 0 0;font-size:14px">Submissions</h4>
      ${subsHtml}
    </article>`;
  };

  const listHtml = active.length
    ? active.map(missionCard).join('')
    : missions.length
      ? `<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>`
      : '';

  const archiveHtml =
    archive.length > 0
      ? `<div class="card"><h3>Archive</h3>${archive.map(missionCard).join('')}</div>`
      : '';

  const body = `
    <div class="pikk-missions-studio">
      <section class="pikk-missions-hero" aria-label="PIKK Missions Studio overview">
        <p class="pikk-missions-kicker">PIKK CREATOR STUDIO · PROMOTIONAL CAMPAIGNS</p>
        <h2>Make your next <span>move count.</span></h2>
        <p>Explore creator missions, share your work and track demo rankings. Campaign budgets and points are examples, not real earnings.</p>
        <div class="pikk-missions-stats" aria-label="Current demo mission totals">
          <div class="pikk-missions-stat"><strong>${active.length}</strong><span>Open / paused</span></div>
          <div class="pikk-missions-stat"><strong>${uniqueCreators}</strong><span>Demo creators</span></div>
          <div class="pikk-missions-stat"><strong>${proofCount}</strong><span>Proof submissions</span></div>
        </div>
        <span class="pikk-missions-mode">TEST MODE · NO REAL PAYOUTS</span>
      </section>
    <div class="card pikk-missions-intro">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">Manual review · TEST MODE — no auto fraud API</span>
        <span class="chip">Signed in as ${esc(user?.username || 'guest')}</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">
        Admin-created missions promoting songs, albums, interviews, videos, livestreams, and the PIKK app.
        Budgets, deadlines, creator participation, rankings, and verified payouts (demo).
        Third-party-funded campaigns disclose a <strong>20% management fee</strong>; PIKK-funded campaigns are a marketing expense (not a commission).
      </p>
      <div class="row wrap" style="margin-top:12px;gap:8px">
        <button class="btn" id="msnSeed">${missions.length ? 'Reload demo missions' : 'Load demo missions'}</button>
        ${!user ? `<button class="btn primary" id="msnSignIn">Sign in · demo</button>` : ''}
      </div>
    </div>

    <section class="pikk-missions-list" aria-label="Available campaigns">${listHtml}</section>

    <div class="card pikk-missions-create">
      <h3>Create mission · demo admin</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Stored in <code>dbs_v1.missions</code>. No real charges or fraud API.</p>
      <form id="msnCreate" style="display:grid;gap:10px;max-width:520px">
        <div class="field"><label>Title *</label><input name="title" id="msnTitle" required maxlength="120" placeholder="Push Long Story Short" /></div>
        <div class="grid-2">
          <div class="field"><label>Promote type</label>
            <select name="promoteType" id="msnType">
              ${Object.entries(PROMOTE_LABELS)
                .map(([v, l]) => `<option value="${v}">${esc(l)}</option>`)
                .join('')}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${deadlineInputValue(14)}" /></div>
          <div class="field"><label>Fund source</label>
            <select name="fundSource" id="msnFund">
              <option value="dbs">PIKK-funded (marketing expense)</option>
              <option value="third_party">Third-party (20% mgmt fee)</option>
            </select>
          </div>
        </div>
        <div class="field"><label>Reward blurb</label><input name="reward" id="msnReward" maxlength="200" placeholder="e.g. Top 3 share demo pot" /></div>
        <button class="btn primary" type="submit">Create active mission</button>
      </form>
    </div>

    <section class="pikk-missions-archive">${archiveHtml}</section>
    </div>
  `;

  return shellPage('Missions', body, {
    lead: 'Promotional campaigns · Clippers & creators · TEST MODE (§6).',
  });
}

export function bindMissions(root) {
  root.querySelector('#msnSeed')?.addEventListener('click', () => {
    const force = listMissions().length > 0;
    const res = seedDemoMissions({ force: true });
    toast(force ? 'Demo missions reloaded' : `Loaded ${res.seeded || 0} demo missions`);
    refresh();
  });

  root.querySelector('#msnSignIn')?.addEventListener('click', () => {
    ensureSignedIn();
    refresh();
  });

  root.querySelector('#msnCreate')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const title = root.querySelector('#msnTitle')?.value || '';
    const promoteType = root.querySelector('#msnType')?.value || 'app';
    const budget = Number(root.querySelector('#msnBudget')?.value) || 0;
    const deadline = root.querySelector('#msnDeadline')?.value || '';
    const fundSource = root.querySelector('#msnFund')?.value || 'dbs';
    const reward = root.querySelector('#msnReward')?.value || '';
    const mission = createMission({
      title,
      promoteType,
      budget,
      deadline,
      fundSource,
      reward,
      status: 'active',
    });
    if (mission.error) return toast('Title required');
    toast(`Mission created · ${mission.title}`);
    refresh();
  });

  root.querySelectorAll('[data-join]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-join');
      const res = joinMission(id);
      if (res.error === 'signin') return toast('Sign in required');
      if (res.error === 'already_joined') return toast('Already joined');
      if (res.error === 'not_active') return toast('Mission not active');
      if (res.error) return toast('Could not join');
      toast('Joined mission · referral code assigned');
      refresh();
    });
  });

  root.querySelectorAll('[data-bump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const id = btn.getAttribute('data-bump');
      const res = bumpMissionScore(id, 5);
      if (res.error) return toast(res.error === 'not_joined' ? 'Join first' : 'Bump failed');
      toast('+5 demo points');
      refresh();
    });
  });

  root.querySelectorAll('[data-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-status');
      const next = btn.getAttribute('data-next');
      const res = setMissionStatus(id, next);
      if (res.error) return toast('Status update failed');
      toast(`Mission → ${next}`);
      refresh();
    });
  });

  root.querySelectorAll('form.msn-proof').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      ensureSignedIn();
      const id = form.getAttribute('data-id');
      const proof = form.querySelector('[name="proof"]')?.value || '';
      const res = submitMissionProof(id, { proof });
      if (res.error === 'required') return toast('Enter a URL or note');
      if (res.error === 'not_joined') return toast('Join first');
      if (res.error === 'not_active') return toast('Mission not active');
      if (res.error) return toast('Submit failed');
      toast('Proof submitted · pending manual review · +10 pts');
      refresh();
    });
  });
}
