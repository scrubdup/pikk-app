import {
  getState,
  signInLocal,
  getShareEarn,
  listSharePlatforms,
  listShareRewardTiers,
  linkSharePlatform,
  unlinkSharePlatform,
  startShareChallenge,
  simulateShareChallengeElapsed,
  endShareChallenge,
  submitSharePost,
  setShareSubmissionStatus,
  countVerifiedSharePlatforms,
  getClaimableShareRewards,
  claimShareReward,
  resetShareEarnDemo,
  getReferEarn,
  ensureReferCode,
  getReferLink,
  listReferMilestones,
  simulateReferInvitee,
  claimInviteeWelcome,
  markInviteeActiveDay,
  flagInviteeFraud,
  countVerifiedActiveReferrals,
  getClaimableReferMilestones,
  claimReferMilestone,
  seedDemoReferrals,
  resetReferEarnDemo,
  getMembership,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

const PLATFORM_LABELS = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  youtube: 'YouTube',
  x: 'X',
  snapchat: 'Snapchat',
  other: 'Other',
};

function activeTab(route) {
  const path = route?.path || '';
  if (path === '/refer') return 'refer';
  return 'share';
}

function refresh(tab) {
  navigate(tab === 'refer' ? '#/refer' : '#/share');
}

function ensureSignedIn() {
  const { user } = getState();
  if (user) return user;
  const signed = signInLocal('DemoCreator');
  toast('Signed in as DemoCreator · local demo');
  return signed || getState().user;
}

function fmtCountdown(endsAt) {
  const diff = Number(endsAt) - Date.now();
  if (diff <= 0) return '24h window ended (demo)';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m left`;
}

function rewardsTabs(tab) {
  return `<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${tab === 'share' ? 'on' : ''}" href="#/share" role="tab" aria-selected="${tab === 'share'}">Share &amp; Earn</a>
    <a class="admin-type-tab ${tab === 'refer' ? 'on' : ''}" href="#/refer" role="tab" aria-selected="${tab === 'refer'}">Refer &amp; Earn</a>
  </div>`;
}

function renderShareTab() {
  const { user } = getState();
  const se = getShareEarn();
  const platforms = se.platformsLinked || [];
  const challenge = se.challenge;
  const submissions = se.submissions || [];
  const claimed = se.rewardsClaimed || [];
  const verifiedCount = countVerifiedSharePlatforms();
  const claimable = getClaimableShareRewards();
  const tiers = listShareRewardTiers();

  const platformList =
    platforms.length > 0
      ? `<ul class="list-plain">${platforms
          .map(
            (p) => `<li>
          <span><strong>${esc(PLATFORM_LABELS[p.platform] || p.platform)}</strong>
            ${p.handle ? `<br/><span class="muted" style="font-size:12px">@${esc(String(p.handle).replace(/^@+/, ''))}</span>` : ''}
            ${p.url ? `<br/><span class="muted" style="font-size:11px">${esc(p.url)}</span>` : ''}
          </span>
          <button class="btn ghost" type="button" data-unlink="${esc(p.id)}">Remove</button>
        </li>`
          )
          .join('')}</ul>`
      : `<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>`;

  const platformOpts = listSharePlatforms()
    .filter((p) => !platforms.some((x) => x.platform === p))
    .map((p) => `<option value="${p}">${esc(PLATFORM_LABELS[p] || p)}</option>`)
    .join('');

  let challengeHtml = '';
  if (!challenge) {
    challengeHtml = `<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" ${user ? '' : ''}>Start challenge · TEST MODE</button>
    </div>`;
  } else {
    const active = challenge.status === 'active';
    const elapsed = Date.now() >= Number(challenge.endsAt);
    challengeHtml = `<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${active ? (elapsed ? 'Window ended · demo' : 'Active') : 'Ended'}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${esc(fmtCountdown(challenge.endsAt))}</span>
        ${challenge.simulatedElapsed ? `<span class="chip">Simulated 24h elapsed</span>` : ''}
      </div>
      <h3>${esc(challenge.adTitle)}</h3>
      <p style="margin:8px 0;font-size:14px;white-space:pre-wrap">${esc(challenge.caption)}</p>
      <div class="field"><label>Tracked link</label>
        <input id="shTracked" readonly value="${esc(challenge.trackedLink)}" />
      </div>
      <p class="chip" style="margin:8px 0">#ad · Paid partnership · incentivized promotion disclosure required</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button class="btn" type="button" id="shCopyLink">Copy tracked link</button>
        <button class="btn" type="button" id="shCopyCaption">Copy caption</button>
        ${
          active
            ? `<button class="btn ghost" type="button" id="shSim24">Simulate 24h elapsed</button>
               <button class="btn ghost" type="button" id="shEnd">End challenge</button>`
            : ''
        }
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Honest scope: stories/API may not prove continuous 24h visibility — admin/demo verify only.</p>
    </div>`;
  }

  const submitOpts = listSharePlatforms()
    .map((p) => `<option value="${p}">${esc(PLATFORM_LABELS[p] || p)}</option>`)
    .join('');

  const subList =
    submissions.length > 0
      ? `<ul class="list-plain">${submissions
          .map(
            (s) => `<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${esc(PLATFORM_LABELS[s.platform] || s.platform)}</strong>
            <span class="chip">${esc(s.status)}</span>
            <br/><a href="${esc(s.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${esc(s.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${timeAgo(s.submittedAt)} · ${esc(s.note || '')}</span>
          </span>
          ${
            s.status === 'pending'
              ? `<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${esc(s.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${esc(s.id)}">Reject</button>
                </span>`
              : ''
          }
        </li>`
          )
          .join('')}</ul>`
      : `<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>`;

  const rewardRows = tiers
    .map((t) => {
      const done = claimed.some((c) => c.tierId === t.id);
      const can = claimable.some((c) => c.id === t.id);
      return `<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${esc(t.label)}</strong><br/><span class="muted" style="font-size:11px">≥${t.minVerified} verified platform${t.minVerified === 1 ? '' : 's'}${t.requireAllLinked ? ' · all linked (≥3)' : ''}</span></td>
        <td style="padding:8px 4px">${done ? '<span class="chip">Claimed</span>' : can ? `<button class="btn primary" type="button" data-claim-share="${esc(t.id)}">Claim</button>` : `<span class="muted" style="font-size:12px">Locked (${verifiedCount}/${t.minVerified})</span>`}</td>
      </tr>`;
    })
    .join('');

  const history =
    claimed.length > 0
      ? `<ul class="list-plain">${claimed
          .map(
            (c) => `<li>
          <span>${esc(c.label)}<br/><span class="muted" style="font-size:11px">${timeAgo(c.at)} · TEST MODE</span></span>
          <span class="chip">${esc(c.kind)}</span>
        </li>`
          )
          .join('')}</ul>`
      : `<p class="muted" style="margin:0;font-size:13px">No rewards claimed yet.</p>`;

  return `
    <div class="card">
      <p class="muted" style="margin:0;font-size:13px">
        Optional 24h social promo for registered users. Link platforms by <strong>name + handle/URL only</strong> — never passwords.
        Verification is <strong>manual/demo</strong> (not guaranteed auto-check of continuous 24h visibility).
      </p>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <span class="chip">Verified platforms: ${verifiedCount}</span>
        <span class="chip">Linked: ${platforms.length}</span>
        ${!user ? `<button class="btn primary" type="button" id="rwSignIn">Sign in · demo</button>` : `<span class="chip">@${esc(user.username)}</span>`}
        <button class="btn ghost" type="button" id="shReset">Reset Share demo</button>
      </div>
    </div>

    <div class="card">
      <h3>Linked social platforms</h3>
      ${platformList}
      <form id="shLinkForm" style="display:grid;gap:10px;max-width:520px;margin-top:12px">
        <div class="grid-2">
          <div class="field"><label>Platform</label>
            <select name="platform" id="shPlat" ${platformOpts ? '' : 'disabled'}>
              ${platformOpts || '<option value="">All linked</option>'}
            </select>
          </div>
          <div class="field"><label>Handle (no password)</label><input name="handle" id="shHandle" maxlength="64" placeholder="you (no @ needed)" /></div>
        </div>
        <div class="field"><label>Profile URL (optional)</label><input name="url" id="shUrl" maxlength="240" placeholder="https://…" /></div>
        <button class="btn" type="submit" ${platformOpts ? '' : 'disabled'}>Link platform</button>
        <p class="muted" style="margin:0;font-size:12px">Skip anytime — do not create fake accounts for rewards.</p>
      </form>
    </div>

    ${challengeHtml}

    ${
      challenge
        ? `<div class="card">
      <h3>Submit post URLs</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Paste the public post link for each platform. Admin Verify/Reject below (demo).</p>
      <form id="shSubmitForm" class="row wrap" style="gap:8px;align-items:flex-end">
        <div class="field" style="margin:0;min-width:140px"><label>Platform</label><select id="shSubPlat">${submitOpts}</select></div>
        <div class="field" style="margin:0;flex:1;min-width:180px"><label>Post URL</label><input id="shSubUrl" type="url" placeholder="https://…" required /></div>
        <button class="btn primary" type="submit">Submit</button>
      </form>
      <div style="margin-top:12px">${subList}</div>
    </div>`
        : ''
    }

    <div class="card">
      <h3>Rewards</h3>
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 → badge · 2 → decoration · 3 → 7d Skeet+ · all linked (≥3) → 30d Skeet+. No auto paid billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tbody>${rewardRows}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${history}
    </div>
  `;
}

function renderReferTab() {
  const { user } = getState();
  const re = ensureReferCode();
  const link = getReferLink();
  const invitees = re.invitees || [];
  const activeCount = countVerifiedActiveReferrals();
  const claimable = getClaimableReferMilestones();
  const milestones = listReferMilestones();
  const claimed = re.milestonesClaimed || [];
  const mem = getMembership();

  const nextMile = milestones.find((m) => activeCount < m.n);
  const progressLabel = nextMile
    ? `${activeCount} / ${nextMile.n} verified active → ${nextMile.label}`
    : activeCount >= 100
      ? 'All milestones unlocked'
      : `${activeCount} verified active`;

  const inviteeList =
    invitees.length > 0
      ? `<ul class="list-plain">${invitees
          .map((inv) => {
            const days = (inv.activeDays || []).length;
            return `<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${esc(inv.username)}</strong>
              <span class="chip">${esc(inv.status)}</span>
              ${inv.flaggedFraud ? `<span class="chip">Fraud flag</span>` : ''}
              ${inv.welcomeClaimed ? `<span class="chip">Welcome claimed</span>` : ''}
              <br/><span class="muted" style="font-size:12px">Active days: ${days}/3 · ${esc((inv.activeDays || []).join(', ') || 'none')} · signed ${timeAgo(inv.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${
                !inv.welcomeClaimed && !inv.flaggedFraud
                  ? `<button class="btn ghost" type="button" data-welcome="${esc(inv.id)}">Welcome perk</button>`
                  : ''
              }
              ${
                !inv.flaggedFraud && inv.status !== 'active'
                  ? `<button class="btn" type="button" data-activeday="${esc(inv.id)}">Mark active day</button>`
                  : ''
              }
              ${
                inv.flaggedFraud
                  ? `<button class="btn ghost" type="button" data-unfraud="${esc(inv.id)}">Clear fraud</button>`
                  : `<button class="btn ghost" type="button" data-fraud="${esc(inv.id)}">Flag fraud</button>`
              }
            </span>
          </li>`;
          })
          .join('')}</ul>`
      : `<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>`;

  const mileRows = milestones
    .map((m) => {
      const done = claimed.some((c) => c.milestoneId === m.id);
      const can = claimable.some((c) => c.id === m.id);
      return `<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${m.n}</strong> verified active</td>
        <td style="padding:8px 4px">${esc(m.label)}</td>
        <td style="padding:8px 4px">${done ? '<span class="chip">Claimed</span>' : can ? `<button class="btn primary" type="button" data-claim-ref="${esc(m.id)}">Claim</button>` : `<span class="muted" style="font-size:12px">${activeCount}/${m.n}</span>`}</td>
      </tr>`;
    })
    .join('');

  const claimHist =
    claimed.length > 0
      ? `<ul class="list-plain">${claimed
          .map(
            (c) => `<li>
          <span>${esc(c.label)}<br/><span class="muted" style="font-size:11px">${timeAgo(c.at)} · not Clippers pay</span></span>
          <span class="chip">${c.n}</span>
        </li>`
          )
          .join('')}</ul>`
      : `<p class="muted" style="margin:0;font-size:13px">No milestone claims yet.</p>`;

  return `
    <div class="card">
      <p class="muted" style="margin:0;font-size:13px">
        Personal referral link. Invitee welcome perks; inviter milestones only after <strong>verified active</strong>
        (meaningful participation on <strong>3 distinct days in the first 7 days</strong>). Distinct from Clippers commissions. No purchase required · no auto billing.
      </p>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <span class="chip">Verified active: ${activeCount}</span>
        ${mem ? `<span class="chip">Membership: ${esc(mem)}</span>` : `<span class="chip">Membership: none</span>`}
        ${!user ? `<button class="btn primary" type="button" id="rwSignIn">Sign in · demo</button>` : `<span class="chip">@${esc(user.username)}</span>`}
      </div>
    </div>

    <div class="card">
      <h3>Your referral link</h3>
      <div class="field"><label>Code</label><input readonly value="${esc(re.code)}" /></div>
      <div class="field"><label>Link</label><input id="refLink" readonly value="${esc(link)}" /></div>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" type="button" id="refCopy">Copy link</button>
        <button class="btn" type="button" id="refSeed">Load demo invitees</button>
        <button class="btn ghost" type="button" id="refReset">Reset Refer demo</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Progress: ${esc(progressLabel)}</p>
    </div>

    <div class="card">
      <h3>Simulate invitee</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Demo controls · fraud-resistant toggles (self-referral blocked · flag bots).</p>
      <form id="refInviteForm" class="row wrap" style="gap:8px;align-items:flex-end">
        <div class="field" style="margin:0;flex:1;min-width:160px"><label>Invitee username</label><input id="refInviteName" maxlength="24" placeholder="NewFriend" /></div>
        <button class="btn primary" type="submit">Simulate signup</button>
      </form>
      <div style="margin-top:12px">${inviteeList}</div>
    </div>

    <div class="card">
      <h3>Inviter milestones</h3>
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 / 3 / 5 / 10 / 25 / 50 / 100 verified active referrals. Memberships are TEST MODE chips — not real billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr class="muted" style="text-align:left">
            <th style="padding:6px 4px">At</th>
            <th style="padding:6px 4px">Reward</th>
            <th style="padding:6px 4px"></th>
          </tr></thead>
          <tbody>${mileRows}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${claimHist}
    </div>

    <div class="card">
      <h3>Invitee welcome path</h3>
      <ul class="list-plain">
        <li><span>Welcome badge / decoration</span><span class="chip">on signup perk</span></li>
        <li><span>3 days Skeet+</span><span class="chip">after 3 active days</span></li>
        <li><span>Extra 7 days Skeet+</span><span class="chip">7-day first-week streak</span></li>
      </ul>
      <p class="muted" style="margin:8px 0 0;font-size:12px">Invitee membership grants are illustrative chips in this demo; use Welcome perk + active days on each invitee card.</p>
    </div>
  `;
}

export function renderShare(route) {
  return renderRewards(route || { path: '/share' });
}

export function renderRefer(route) {
  return renderRewards(route || { path: '/refer' });
}

export function renderRewards(route) {
  const tab = activeTab(route);
  const body = `
    ${rewardsTabs(tab)}
    ${tab === 'refer' ? renderReferTab() : renderShareTab()}
  `;
  return shellPage('DBS Rewards', body, {
    lead:
      tab === 'refer'
        ? 'Refer & Earn · verified active friends · TEST MODE (§33).'
        : 'Share & Earn · 24h social promo · TEST MODE (§32).',
  });
}

export function bindShare(root) {
  bindRewards(root, 'share');
}

export function bindRefer(root) {
  bindRewards(root, 'refer');
}

export function bindRewards(root, tabHint) {
  const tab =
    tabHint ||
    (location.hash.includes('/refer') ? 'refer' : 'share');

  root.querySelector('#rwSignIn')?.addEventListener('click', () => {
    ensureSignedIn();
    refresh(tab);
  });

  // —— Share ——
  root.querySelector('#shLinkForm')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ensureSignedIn();
    const platform = root.querySelector('#shPlat')?.value;
    const handle = root.querySelector('#shHandle')?.value || '';
    const url = root.querySelector('#shUrl')?.value || '';
    const res = linkSharePlatform({ platform, handle, url });
    if (res.error === 'signin') return toast('Sign in required');
    if (res.error === 'already_linked') return toast('Already linked');
    if (res.error === 'required') return toast('Handle or URL required');
    if (res.error) return toast('Could not link');
    toast(`Linked ${PLATFORM_LABELS[platform] || platform}`);
    refresh('share');
  });

  root.querySelectorAll('[data-unlink]').forEach((btn) => {
    btn.addEventListener('click', () => {
      unlinkSharePlatform(btn.getAttribute('data-unlink'));
      toast('Platform removed');
      refresh('share');
    });
  });

  root.querySelector('#shStart')?.addEventListener('click', () => {
    ensureSignedIn();
    const res = startShareChallenge();
    if (res.error === 'signin') return toast('Sign in required');
    if (res.error === 'already_active') return toast('Challenge already active');
    if (res.error) return toast('Could not start');
    toast('Challenge started · 24h window');
    refresh('share');
  });

  root.querySelector('#shCopyLink')?.addEventListener('click', async () => {
    const v = root.querySelector('#shTracked')?.value || '';
    try {
      await navigator.clipboard.writeText(v);
      toast('Tracked link copied');
    } catch {
      toast('Copy manually');
    }
  });

  root.querySelector('#shCopyCaption')?.addEventListener('click', async () => {
    const se = getShareEarn();
    const cap = se.challenge?.caption || '';
    try {
      await navigator.clipboard.writeText(cap);
      toast('Caption copied');
    } catch {
      toast('Copy manually');
    }
  });

  root.querySelector('#shSim24')?.addEventListener('click', () => {
    const res = simulateShareChallengeElapsed();
    if (res.error) return toast('No active challenge');
    toast('Simulated 24h elapsed');
    refresh('share');
  });

  root.querySelector('#shEnd')?.addEventListener('click', () => {
    endShareChallenge();
    toast('Challenge ended');
    refresh('share');
  });

  root.querySelector('#shSubmitForm')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ensureSignedIn();
    const platform = root.querySelector('#shSubPlat')?.value;
    const postUrl = root.querySelector('#shSubUrl')?.value || '';
    const res = submitSharePost({ platform, postUrl });
    if (res.error === 'required') return toast('Post URL required');
    if (res.error === 'duplicate') return toast('Already submitted for this platform');
    if (res.error === 'no_challenge') return toast('Start a challenge first');
    if (res.error) return toast('Submit failed');
    toast('Submitted · pending demo verification');
    refresh('share');
  });

  root.querySelectorAll('[data-verify]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setShareSubmissionStatus(btn.getAttribute('data-verify'), 'verified');
      toast('Verified · demo (manual)');
      refresh('share');
    });
  });

  root.querySelectorAll('[data-reject]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setShareSubmissionStatus(btn.getAttribute('data-reject'), 'rejected');
      toast('Rejected');
      refresh('share');
    });
  });

  root.querySelectorAll('[data-claim-share]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const res = claimShareReward(btn.getAttribute('data-claim-share'));
      if (res.error === 'not_claimable') return toast('Not claimable yet');
      if (res.error) return toast('Claim failed');
      toast(`Claimed · ${res.claim.label}`);
      refresh('share');
    });
  });

  root.querySelector('#shReset')?.addEventListener('click', () => {
    resetShareEarnDemo();
    toast('Share demo reset');
    refresh('share');
  });

  // —— Refer ——
  root.querySelector('#refCopy')?.addEventListener('click', async () => {
    ensureSignedIn();
    ensureReferCode();
    const v = root.querySelector('#refLink')?.value || getReferLink();
    try {
      await navigator.clipboard.writeText(v);
      toast('Referral link copied');
    } catch {
      toast('Copy manually');
    }
  });

  root.querySelector('#refInviteForm')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    ensureSignedIn();
    const username = root.querySelector('#refInviteName')?.value || '';
    const res = simulateReferInvitee({ username });
    if (res.error === 'self_referral') return toast('Self-referral blocked');
    if (res.error === 'signin') return toast('Sign in required');
    if (res.error) return toast('Could not add invitee');
    toast(`Invitee ${res.invitee.username} signed up`);
    refresh('refer');
  });

  root.querySelectorAll('[data-welcome]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = claimInviteeWelcome(btn.getAttribute('data-welcome'));
      if (res.error === 'fraud') return toast('Flagged fraud');
      if (res.error) return toast('Welcome claim failed');
      toast(res.perk || 'Welcome perk claimed');
      refresh('refer');
    });
  });

  root.querySelectorAll('[data-activeday]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = markInviteeActiveDay(btn.getAttribute('data-activeday'));
      if (res.error === 'fraud') return toast('Flagged fraud');
      if (res.error === 'outside_window') return toast('Outside first-7-day window');
      if (res.error === 'window_full') return toast('All 7 demo days already marked');
      if (res.error) return toast('Could not mark day');
      const n = (res.invitee.activeDays || []).length;
      toast(
        n >= 3
          ? `${res.invitee.username} → verified active (${n} days)`
          : `Active day ${n}/3 for ${res.invitee.username}`
      );
      refresh('refer');
    });
  });

  root.querySelectorAll('[data-fraud]').forEach((btn) => {
    btn.addEventListener('click', () => {
      flagInviteeFraud(btn.getAttribute('data-fraud'), true);
      toast('Flagged as fraud · demo');
      refresh('refer');
    });
  });

  root.querySelectorAll('[data-unfraud]').forEach((btn) => {
    btn.addEventListener('click', () => {
      flagInviteeFraud(btn.getAttribute('data-unfraud'), false);
      toast('Fraud flag cleared');
      refresh('refer');
    });
  });

  root.querySelectorAll('[data-claim-ref]').forEach((btn) => {
    btn.addEventListener('click', () => {
      ensureSignedIn();
      const res = claimReferMilestone(btn.getAttribute('data-claim-ref'));
      if (res.error === 'not_claimable') return toast('Not claimable yet');
      if (res.error) return toast('Claim failed');
      toast(`Milestone claimed · ${res.claim.label}`);
      refresh('refer');
    });
  });

  root.querySelector('#refSeed')?.addEventListener('click', () => {
    ensureSignedIn();
    const res = seedDemoReferrals({ force: true });
    if (res.error === 'signin') return toast('Sign in required');
    toast(`Loaded ${res.seeded || 0} demo invitees`);
    refresh('refer');
  });

  root.querySelector('#refReset')?.addEventListener('click', () => {
    ensureSignedIn();
    resetReferEarnDemo();
    toast('Refer demo reset');
    refresh('refer');
  });
}
