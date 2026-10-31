import {
  getState,
  followUser,
  unfollowUser,
  ensureDemoMultiGuestContacts,
  listDemoMultiGuestContacts,
  getActiveMultiGuest,
  listMultiGuestHistory,
  startMultiGuest,
  inviteGuest,
  acceptGuest,
  declineGuest,
  leaveGuest,
  removeGuest,
  muteGuest,
  sendMultiGuestChat,
  setGiftSplit,
  discloseGiftSplit,
  endMultiGuest,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/multiguest');
}

function initials(name) {
  const s = String(name || '?').trim();
  return (s.slice(0, 2) || '?').toUpperCase();
}

function isFollowing(targetId) {
  const user = getState().user;
  if (!user || !targetId) return false;
  return (user.following || []).includes(targetId);
}

function joinedGuests(session) {
  return (session?.guests || []).filter((g) => g.status === 'joined');
}

function pendingGuests(session) {
  return (session?.guests || []).filter((g) => g.status === 'invited');
}

function shareLabel(session, userId) {
  const pct = Number(session?.giftSplit?.shares?.[userId] || 0);
  return `${pct.toFixed(0)}%`;
}

function renderSignIn() {
  return shellPage(
    'Multi-Guest Live',
    `<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,
    { lead: 'Invite 2–4 co-hosts · disclosed gift splits · TEST MODE' }
  );
}

function renderIntro() {
  return `
    <div class="card mg-intro">
      <h3>Multi-Guest Livestreams</h3>
      <ul class="mg-rules">
        <li>Host invites <strong>2–4 guests</strong> with separate profiles &amp; Follow.</li>
        <li>Fake stage tiles only — <strong>no camera / WebRTC</strong> in TEST MODE.</li>
        <li>Join / leave, host mute &amp; remove, shared chat stub.</li>
        <li>Before “broadcast”, disclose <strong>gift split</strong> (equal or custom % totaling 100%).</li>
        <li>Display-only split intent — no real payouts.</li>
      </ul>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/live">Solo Live</a>
        <a class="btn ghost" href="#/music">Music / Coming Soon</a>
        <a class="btn ghost" href="#/giftbattles">Gift Battles</a>
      </div>
      <p class="muted" style="margin:10px 0 0">TEST MODE · PIKK branding required on every collab stage.</p>
    </div>`;
}

function renderTile({ role, name, sub, muted, empty, followId }) {
  if (empty) {
    return `
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;
  }
  const muteChip = muted ? `<span class="chip">Muted</span>` : '';
  const followBtn =
    followId && followId !== 'dbs'
      ? isFollowing(followId)
        ? `<button class="btn ghost mg-follow" data-follow="${esc(followId)}" data-on="1">Following</button>`
        : `<button class="btn ghost mg-follow" data-follow="${esc(followId)}" data-on="0">Follow</button>`
      : followId === 'dbs'
        ? `<a class="btn ghost" href="#/profile">Follow PIKK</a>`
        : '';
  return `
    <div class="mg-tile ${role === 'host' ? 'mg-tile-host' : ''} ${muted ? 'mg-muted' : ''}">
      <div class="mg-avatar" aria-hidden="true">${esc(initials(name))}</div>
      <div class="mg-tile-name">${esc(name)}</div>
      <div class="mg-tile-sub">${esc(sub || '')} ${muteChip}</div>
      <div class="mg-tile-actions">${followBtn}</div>
    </div>`;
}

function renderStage(session) {
  const joined = joinedGuests(session);
  const slots = [];
  slots.push(
    renderTile({
      role: 'host',
      name: session.hostName,
      sub: 'Host',
      followId: session.hostId === getState().user?.id ? 'dbs' : session.hostId,
    })
  );
  for (let i = 0; i < (session.maxGuests || 4); i++) {
    const g = joined[i];
    if (g) {
      slots.push(
        renderTile({
          role: 'guest',
          name: g.username,
          sub: 'Guest',
          muted: g.muted,
          followId: g.id,
        })
      );
    } else {
      slots.push(renderTile({ empty: true }));
    }
  }
  const splitChip = session.giftSplit?.disclosed
    ? `<span class="chip">Split disclosed</span>`
    : `<span class="chip">Split pending</span>`;
  const readyChip = session.broadcastReady
    ? `<span class="chip">Broadcast ready</span>`
    : `<span class="chip">Setup</span>`;

  return `
    <div class="card mg-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div>
          <div class="row wrap" style="gap:8px;align-items:center">
            <img class="mg-brand-logo" src="/brand/pikk-official-approved.jpg" alt="PIKK" />
            <div>
              <strong>${esc(session.title)}</strong>
              <div class="muted" style="font-size:12px">@${esc(session.hostName)} · Multi-Guest · Follow DatBoiSkeet</div>
            </div>
          </div>
        </div>
        <div class="row wrap" style="gap:6px">
          <span class="chip"><span class="dot" aria-hidden="true"></span> DEMO</span>
          ${readyChip}
          ${splitChip}
        </div>
      </div>
      <p class="muted mg-stage-note">TEST MODE · placeholder tiles · no camera / bandwidth stream</p>
      <div class="mg-grid" role="list">${slots.join('')}</div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn ghost" href="#/music">PIKK Music</a>
        <a class="btn ghost" href="#/live">Solo Live</a>
        <button class="btn ghost danger" id="mgEnd">End session</button>
      </div>
    </div>`;
}

function renderInvite(session) {
  const contacts = listDemoMultiGuestContacts();
  const taken = new Set(
    (session.guests || [])
      .filter((g) => g.status === 'invited' || g.status === 'joined')
      .map((g) => g.id)
  );
  const available = contacts.filter((c) => c.id !== session.hostId && !taken.has(c.id));
  const pending = pendingGuests(session);
  const joined = joinedGuests(session);

  const options = available.length
    ? available
        .map(
          (c) =>
            `<option value="${esc(c.id)}">${esc(c.username)} — ${esc(c.bio || 'demo')}</option>`
        )
        .join('')
    : `<option value="">No more demo guests</option>`;

  const pendingHtml = pending.length
    ? pending
        .map(
          (g) => `
        <li class="mg-guest-row">
          <span><strong>@${esc(g.username)}</strong> <span class="chip">Invited</span></span>
          <span class="row wrap" style="gap:6px">
            <button class="btn primary mg-accept" data-id="${esc(g.id)}">Accept (sim)</button>
            <button class="btn ghost mg-decline" data-id="${esc(g.id)}">Decline</button>
          </span>
        </li>`
        )
        .join('')
    : `<li class="muted">No pending invites.</li>`;

  const joinedHtml = joined.length
    ? joined
        .map(
          (g) => `
        <li class="mg-guest-row">
          <span>
            <strong>@${esc(g.username)}</strong>
            ${g.muted ? '<span class="chip">Muted</span>' : '<span class="chip">On stage</span>'}
            <span class="muted" style="font-size:12px"> · gift ${esc(shareLabel(session, g.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${esc(g.id)}" data-muted="${g.muted ? '1' : '0'}">
              ${g.muted ? 'Unmute' : 'Mute'}
            </button>
            <button class="btn ghost mg-leave" data-id="${esc(g.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${esc(g.id)}">Remove</button>
          </span>
        </li>`
        )
        .join('')
    : `<li class="muted">No guests on stage yet — invite below.</li>`;

  const full = joined.length + pending.length >= (session.maxGuests || 4);

  return `
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${esc(String(session.maxGuests || 4))} guests.</p>
      <ul class="mg-list">${joinedHtml}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${pendingHtml}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${full || !available.length ? 'disabled' : ''}>${options}</select>
          <button class="btn primary" id="mgInviteBtn" ${full || !available.length ? 'disabled' : ''}>Invite</button>
        </div>
      </div>
      ${full ? '<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>' : ''}
    </div>`;
}

function renderSplit(session) {
  const joined = joinedGuests(session);
  const recipients = [
    { id: session.hostId, username: session.hostName, role: 'Host' },
    ...joined.map((g) => ({ id: g.id, username: g.username, role: 'Guest' })),
  ];
  const mode = session.giftSplit?.mode || 'equal';
  const disclosed = !!session.giftSplit?.disclosed;
  const rows = recipients
    .map((r) => {
      const pct = Number(session.giftSplit?.shares?.[r.id] || 0);
      return `
        <li class="mg-split-row">
          <span><strong>@${esc(r.username)}</strong> <span class="chip">${esc(r.role)}</span></span>
          ${
            mode === 'custom' && !disclosed
              ? `<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${esc(r.id)}" value="${esc(String(pct))}" /> %</label>`
              : `<span class="chip">${esc(String(Math.round(pct)))}%</span>`
          }
        </li>`;
    })
    .join('');

  return `
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button class="btn ${mode === 'equal' ? 'primary' : 'ghost'}" id="mgSplitEqual">Equal split</button>
        <button class="btn ${mode === 'custom' ? 'primary' : 'ghost'}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${rows}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${esc(shareLabel(session, session.hostId))}</strong>
        · Guests: ${joined.length ? joined.map((g) => `@${esc(g.username)} ${esc(shareLabel(session, g.id))}`).join(' · ') : 'none yet'}</p>
      ${
        disclosed
          ? `<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${session.giftSplit.disclosedAt ? '· ' + timeAgo(session.giftSplit.disclosedAt) : ''}. Broadcast ready (demo).</p>`
          : `<div class="row wrap" style="gap:8px;margin-top:12px">
               ${mode === 'custom' ? '<button class="btn" id="mgSplitApply">Apply custom %</button>' : ''}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`
      }
    </div>`;
}

function renderChat(session) {
  const rows = (session.chat || [])
    .slice(-40)
    .map(
      (m) => `
      <div class="mg-chat-row ${m.system ? 'system' : ''}">
        <strong>${esc(m.username)}</strong>
        <span>${esc(m.text)}</span>
      </div>`
    )
    .join('');
  return `
    <div class="card">
      <h3>Shared chat</h3>
      <div class="mg-chat" id="mgChat">${rows || '<p class="muted">No messages yet.</p>'}</div>
      <div class="row" style="gap:8px;margin-top:10px">
        <input id="mgChatInput" placeholder="Say something on the collab…" maxlength="280" style="flex:1" />
        <button class="btn primary" id="mgChatSend">Send</button>
      </div>
    </div>`;
}

function renderHistory(history) {
  if (!history.length) {
    return `
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`;
  }
  const items = history
    .slice(0, 8)
    .map((h) => {
      const n = (h.guests || []).filter((g) => g.status === 'joined' || g.joinedAt).length;
      return `<li><strong>${esc(h.title)}</strong> · ${esc(String(n))} guests · ${timeAgo(h.endedAt || h.startedAt)}
        ${h.giftSplit?.disclosed ? ' · split disclosed' : ''}</li>`;
    })
    .join('');
  return `
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${items}</ul>
    </div>`;
}

function renderStartForm(user) {
  return `
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${esc(user.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`;
}

export function renderMultiGuest() {
  const state = getState();
  const user = state.user;
  if (!user) return renderSignIn();

  ensureDemoMultiGuestContacts();
  const session = getActiveMultiGuest();
  const history = listMultiGuestHistory();

  if (!session || session.endedAt) {
    return shellPage(
      'Multi-Guest Live',
      `${renderIntro()}${renderStartForm(user)}${renderHistory(history)}`,
      { lead: '2–4 co-hosts · gift split disclosure · TEST MODE' }
    );
  }

  return shellPage(
    'Multi-Guest Live',
    `${renderStage(session)}${renderInvite(session)}${renderSplit(session)}${renderChat(session)}${renderHistory(history)}`,
    { lead: 'Active collab session · fake stage · TEST MODE' }
  );
}

export function bindMultiGuest(root) {
  if (!root) return;

  root.querySelector('#mgStart')?.addEventListener('click', () => {
    const title = root.querySelector('#mgTitle')?.value || '';
    const res = startMultiGuest(title);
    if (res.error === 'signin') return toast('Sign in first');
    if (res.error === 'session_in_progress') return toast('Session already active');
    toast('Multi-guest session started');
    refresh();
  });

  root.querySelector('#mgEnd')?.addEventListener('click', () => {
    const res = endMultiGuest();
    if (res.error) return toast(res.error === 'host_only' ? 'Host only' : 'No session');
    toast('Session ended');
    refresh();
  });

  root.querySelector('#mgInviteBtn')?.addEventListener('click', () => {
    const id = root.querySelector('#mgInviteSelect')?.value;
    if (!id) return toast('Pick a guest');
    const res = inviteGuest(id);
    if (res.error === 'full') return toast('Guest slots full');
    if (res.error === 'already_invited') return toast('Already invited');
    if (res.error) return toast('Invite failed: ' + res.error);
    toast('Invited @' + (res.guest?.username || id));
    refresh();
  });

  root.querySelectorAll('.mg-accept').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = acceptGuest(btn.getAttribute('data-id'));
      if (res.error === 'full') return toast('Stage full');
      if (res.error) return toast('Accept failed');
      toast('@' + (res.guest?.username || '') + ' joined');
      refresh();
    });
  });

  root.querySelectorAll('.mg-decline').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = declineGuest(btn.getAttribute('data-id'));
      if (res.error) return toast('Decline failed');
      toast('Invite declined');
      refresh();
    });
  });

  root.querySelectorAll('.mg-mute').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const currentlyMuted = btn.getAttribute('data-muted') === '1';
      const res = muteGuest(id, !currentlyMuted);
      if (res.error) return toast('Mute failed');
      toast(currentlyMuted ? 'Unmuted' : 'Muted');
      refresh();
    });
  });

  root.querySelectorAll('.mg-leave').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = leaveGuest(btn.getAttribute('data-id'));
      if (res.error) return toast('Leave failed');
      toast('Guest left');
      refresh();
    });
  });

  root.querySelectorAll('.mg-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = removeGuest(btn.getAttribute('data-id'));
      if (res.error) return toast('Remove failed');
      toast('Guest removed');
      refresh();
    });
  });

  root.querySelectorAll('.mg-follow').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-follow');
      const on = btn.getAttribute('data-on') === '1';
      if (on) {
        unfollowUser(id);
        toast('Unfollowed');
      } else {
        followUser(id);
        toast('Following');
      }
      refresh();
    });
  });

  root.querySelector('#mgSplitEqual')?.addEventListener('click', () => {
    const res = setGiftSplit({ mode: 'equal', disclose: false });
    if (res.error) return toast('Split failed');
    toast('Equal split applied');
    refresh();
  });

  root.querySelector('#mgSplitCustom')?.addEventListener('click', () => {
    const session = getActiveMultiGuest();
    const res = setGiftSplit({
      mode: 'custom',
      shares: session?.giftSplit?.shares || {},
      disclose: false,
    });
    if (res.error) return toast('Could not switch to custom');
    toast('Custom split — edit % then Apply');
    refresh();
  });

  root.querySelector('#mgSplitApply')?.addEventListener('click', () => {
    const shares = {};
    root.querySelectorAll('.mg-share-input').forEach((inp) => {
      shares[inp.getAttribute('data-id')] = Number(inp.value) || 0;
    });
    const res = setGiftSplit({ mode: 'custom', shares, disclose: false });
    if (res.error === 'split_total') {
      return toast(`Percents total ${res.total}% — need 100%`);
    }
    if (res.error) return toast('Apply failed');
    toast('Custom split saved');
    refresh();
  });

  root.querySelector('#mgDisclose')?.addEventListener('click', () => {
    const session = getActiveMultiGuest();
    if (session?.giftSplit?.mode === 'custom') {
      const shares = {};
      const inputs = root.querySelectorAll('.mg-share-input');
      if (inputs.length) {
        inputs.forEach((inp) => {
          shares[inp.getAttribute('data-id')] = Number(inp.value) || 0;
        });
        const applied = setGiftSplit({ mode: 'custom', shares, disclose: false });
        if (applied.error === 'split_total') {
          return toast(`Percents total ${applied.total}% — need 100%`);
        }
      }
    }
    const res = discloseGiftSplit();
    if (res.error === 'split_total') {
      return toast(`Percents total ${res.total}% — need 100%`);
    }
    if (res.error) return toast('Disclose failed');
    toast('Gift split disclosed · broadcast ready (demo)');
    refresh();
  });

  const sendChat = () => {
    const input = root.querySelector('#mgChatInput');
    const text = input?.value || '';
    const res = sendMultiGuestChat(text);
    if (res.error === 'empty') return toast('Type a message');
    if (res.error) return toast('Chat failed');
    if (input) input.value = '';
    refresh();
  };
  root.querySelector('#mgChatSend')?.addEventListener('click', sendChat);
  root.querySelector('#mgChatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  });
}
