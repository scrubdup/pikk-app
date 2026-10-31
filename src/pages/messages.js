import {
  getState,
  listThreads,
  getThread,
  getOrCreateThread,
  sendMessage,
  sendGroupMessage,
  ensureDemoMessageContacts,
  ensureDemoGroupThread,
  ensureDemoUnreadMessages,
  getThreadUnreadCount,
  markThreadRead,
  isMutualFollow,
  setThreadFlags,
  updateMessagePrefs,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh(hash) {
  navigate(hash || '#/messages');
}

function lastPreview(t) {
  const msgs = t.messages || [];
  if (!msgs.length) return 'No messages yet';
  const m = msgs[msgs.length - 1];
  const prefix = m.priority ? '⚡ ' : '';
  return prefix + (m.text || '').slice(0, 80);
}

function renderSignIn() {
  return shellPage(
    'Messages',
    `<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the DatBoiSkeet team inbox with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,
    { lead: 'Private messaging & team inbox · TEST MODE' }
  );
}

function renderInbox(user) {
  const threads = listThreads();
  const unreadThreads = threads.filter(t => getThreadUnreadCount(t) > 0);
  const prefs = getState().messagePrefs || { allowDMs: true, allowRequests: true };
  const rows = threads
    .map((t) => {
      const isGroup = t.kind === 'group';
      const isTeam = !isGroup && t.peerId === 'dbs';
      const chips = [
        isGroup ? '<span class="chip">Group</span>' : '',
        isTeam ? '<span class="chip">Team</span>' : '',
        t.request ? '<span class="chip">Request</span>' : '',
        t.muted ? '<span class="chip">Muted</span>' : '',
        t.blocked ? '<span class="chip">Blocked</span>' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const unreadN = getThreadUnreadCount(t);
      const unreadChip = unreadN
        ? `<span class="chip msg-unread-chip" aria-label="${unreadN} unread">${unreadN}</span>`
        : '';
      return `
      <button type="button" class="msg-thread-row${unreadN ? ' has-unread' : ''}" data-search="${esc(String(t.peerName || t.peerId).toLowerCase())}" data-unread="${unreadN > 0}" data-open-thread="${esc(t.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${esc(String(t.peerName || t.peerId || "?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${esc(t.peerName || t.peerId)}</strong>
          <span class="muted">${esc(timeAgo(t.updatedAt || 0))}</span>
        </div>
        <div class="msg-thread-preview muted">${esc(lastPreview(t))}</div>
        <div class="msg-thread-chips">${unreadChip}${chips}</div></div>
      </button>`;
    })
    .join('');

  return `
    <section class="pikk-messages-hero" aria-label="PIKK inbox">
      <div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Stay connected with people, groups, and the DatBoiSkeet team.</p></div>
      <span class="pikk-messages-hero-mark" aria-hidden="true">✉</span>
    </section>
    <div class="pikk-msg-tools">
      <label for="pikkMsgSearch">Search conversations</label>
      <input id="pikkMsgSearch" type="search" placeholder="Search messages..." autocomplete="off" aria-controls="msgInbox" />
      <label class="row" style="gap:8px;align-items:center;margin-top:8px" for="pikkMsgUnreadOnly"><input id="pikkMsgUnreadOnly" type="checkbox" aria-controls="msgInbox" /> Unread only (${unreadThreads.length})</label>
      <div class="pikk-msg-tool-actions"><button type="button" class="btn ghost" id="pikkMsgClearFilters" aria-controls="msgInbox" hidden>Clear filters</button><button type="button" class="btn primary" id="pikkNewChatTop">+ New chat</button><button type="button" class="btn ghost" id="pikkGroupTop">Group chat</button></div>
    </div>
    <div class="card msg-team-card">
      <h3>DatBoiSkeet · Team inbox</h3>
      <p class="muted" style="margin:0 0 10px">Free inquiry or <strong>Priority $2.99 TEST MODE</strong> (not charged). Priority = faster review, not a guaranteed personal reply.</p>
      <button type="button" class="btn primary" id="msgOpenTeam">Open team chat</button>
    </div>

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Inbox</h3>
        <div class="row wrap" style="gap:8px">
          <button type="button" class="btn ghost" id="msgMarkAllRead" ${unreadThreads.length ? '' : 'disabled'}>Mark all read${unreadThreads.length ? ` (${unreadThreads.length})` : ''}</button>
          <button type="button" class="btn" id="msgNewChat">New chat</button>
          <button type="button" class="btn ghost" id="msgOpenGroup">DBS Fans group</button>
        </div>
      </div>
      <div class="msg-inbox" id="msgInbox">
        ${
          rows ||
          `<div class="msg-empty">
            <p class="muted">No conversations yet.</p>
            <button type="button" class="btn primary" id="msgEmptyNew">Start a chat</button>
          </div>`
        }
        <p id="pikkMsgNoResults" class="pikk-msg-no-results" role="status" hidden>No conversations match your search.</p>
      </div>
    </div>

    <div class="card">
      <h3>Privacy stubs</h3>
      <p class="muted" style="margin:0 0 10px">Demo flags only — no real moderation queue.</p>
      <div class="row wrap" style="gap:8px">
        <label class="toggle"><span>Allow DMs</span>
          <input type="checkbox" id="msgPrefDMs" ${prefs.allowDMs ? 'checked' : ''}/>
        </label>
        <label class="toggle"><span>Allow requests</span>
          <input type="checkbox" id="msgPrefRequests" ${prefs.allowRequests ? 'checked' : ''}/>
        </label>
      </div>
    </div>
  `;
}

function renderNewChat() {
  const contacts = ensureDemoMessageContacts();
  const cards = contacts
    .map((c) => {
      const mutual = c.team || isMutualFollow(c.id);
      const label = c.team ? 'Team inbox' : mutual ? 'Message' : 'Message request';
      return `
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${esc(String(c.username || "?").slice(0, 1).toUpperCase())}</span>
          <strong>${esc(c.username)}</strong>
          ${c.team ? '<span class="chip">Official</span>' : mutual ? '<span class="chip">Mutual</span>' : '<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${esc(c.bio || '')}</p>
        <button type="button" class="btn ${c.team ? 'primary' : ''}" data-start-peer="${esc(c.id)}" data-peer-name="${esc(c.username)}">${esc(label)}</button>
      </article>`;
    })
    .join('');

  return `
    <section class="pikk-msg-flow-hero" aria-label="Start a PIKK conversation">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · NEW CONVERSATION</span>
      <h2>Start a conversation. <em>Stay connected.</em></h2>
      <p>Choose a demo contact below. Mutual follows open a DM; other contacts start a message request.</p>
      <span class="chip">TEST MODE · Browser-local conversations</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <div class="row" style="justify-content:space-between">
        <h3 style="margin:0">Start chat</h3>
        <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
      </div>
      <p class="muted">Demo peers. Mutual follows open a DM; others create a <em>request</em> thread (still usable in TEST MODE).</p>
    </div>
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${cards}</section>
  `;
}

function renderTeamIntro() {
  return `
    <section class="pikk-msg-flow-hero" aria-label="DatBoiSkeet team inbox">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · CREATOR TEAM</span>
      <h2>Reach the team. <em>One inbox.</em></h2>
      <p>Send a local demo inquiry to the DatBoiSkeet team. Priority is a test-mode flag, never a charge.</p>
      <span class="chip">TEST MODE · No real delivery</span>
    </section>
    <div class="card msg-team-card pikk-msg-flow-panel">
      <div class="row" style="justify-content:space-between">
        <h3 style="margin:0">Team inbox</h3>
        <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
      </div>
      <p class="muted">Message DatBoiSkeet / authorized team. Free inquiry stays in the normal queue; Priority ($2.99 TEST MODE — not charged) flags the thread for priority review only.</p>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn primary" id="msgTeamFree">Free inquiry</button>
        <button type="button" class="btn" id="msgTeamPriority">Priority $2.99 · TEST MODE</button>
      </div>
    </div>
  `;
}

function renderThread(thread, { teamPriorityHint = false } = {}) {
  const user = getState().user;
  const isGroup = thread.kind === 'group';
  const isTeam = !isGroup && thread.peerId === 'dbs';
  const blocked = !!thread.blocked;
  const msgs = (thread.messages || [])
    .map((m) => {
      const mine = m.from === user?.id;
      return `
      <div class="msg-bubble ${mine ? 'mine' : ''} ${m.priority ? 'priority' : ''}">
        <div class="msg-bubble-meta">
          <strong>${esc(m.fromName || m.from)}</strong>
          ${m.priority ? '<span class="chip priority-chip">Priority</span>' : ''}
          <span class="muted">${esc(timeAgo(m.at))}</span>
        </div>
        <div class="msg-bubble-text">${esc(m.text)}</div>
      </div>`;
    })
    .join('');

  const requestBanner = thread.request
    ? `<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>`
    : '';
  const priorityBanner = teamPriorityHint
    ? `<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>`
    : '';

  return `
    <section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread" aria-label="Current PIKK conversation">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · ${isGroup ? "GROUP CHAT" : isTeam ? "TEAM INBOX" : "DIRECT MESSAGES"}</span>
      <h2>${esc(thread.peerName || thread.peerId)}</h2>
      <p>Browser-local conversation preview · Messages are not delivered to other accounts.</p>
      <span class="chip">TEST MODE</span>
    </section>
    <div class="card msg-thread-head pikk-msg-flow-panel">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <div>
          <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
          <h3 style="margin:8px 0 0">${esc(thread.peerName || thread.peerId)}</h3>
          <div class="row wrap" style="gap:6px;margin-top:6px">
            ${isGroup ? '<span class="chip">Group</span>' : ''}
            ${isTeam ? '<span class="chip">Team</span>' : ''}
            ${thread.request ? '<span class="chip">Request</span>' : ''}
            ${thread.muted ? '<span class="chip">Muted</span>' : ''}
            ${thread.blocked ? '<span class="chip">Blocked</span>' : ''}
          </div>
        </div>
        <div class="row wrap msg-privacy-btns" style="gap:6px">
          <button type="button" class="btn ghost" data-flag="mute">${thread.muted ? 'Unmute' : 'Mute'}</button>
          <button type="button" class="btn ghost" data-flag="block">${thread.blocked ? 'Unblock' : 'Block'}</button>
          <button type="button" class="btn ghost danger" data-flag="report">Report</button>
        </div>
      </div>
    </div>
    ${requestBanner}
    ${priorityBanner}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${msgs || '<p class="muted">No messages yet — say hi.</p>'}</div>
      ${
        blocked
          ? `<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>`
          : `<div class="msg-composer">
               <input id="msgInput" placeholder="${isTeam ? 'Write an inquiry…' : 'Message…'}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${
                 isTeam
                   ? `<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>`
                   : ''
               }
             </div>`
      }
    </div>
  `;
}

export function renderMessages(route) {
  const user = getState().user;
  if (!user) return renderSignIn();

  ensureDemoMessageContacts();
  // Seed the one-time demo unread thread before rendering inbox counts.
  ensureDemoUnreadMessages();

  const view = route?.query?.view || '';
  const threadId = route?.query?.t || '';
  const priorityHint = route?.query?.priority === '1';

  let body;
  if (threadId) {
    const t = getThread(threadId);
    if (!t) {
      body = `<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>`;
    } else {
      body = renderThread(t, { teamPriorityHint: priorityHint && t.peerId === 'dbs' });
    }
  } else if (view === 'new') {
    body = renderNewChat();
  } else if (view === 'team') {
    body = renderTeamIntro();
  } else {
    body = renderInbox(user);
  }

  return shellPage('Messages', body, {
    lead: 'DMs, group chats, and DatBoiSkeet team inbox · TEST MODE',
  });
}

export function bindMessages(root) {
  const user = getState().user;
  if (!user) return;

  const goInbox = () => refresh('#/messages');

  root.querySelector('#msgBackInbox')?.addEventListener('click', goInbox);
  root.querySelector('#msgMarkAllRead')?.addEventListener('click', () => {
    const unread = listThreads().filter(t => getThreadUnreadCount(t) > 0);
    if (!unread.length) return;
    unread.forEach(t => markThreadRead(t.id));
    toast(`${unread.length} conversation${unread.length === 1 ? '' : 's'} marked read`);
    refresh('#/messages');
  });
  root.querySelector('#msgNewChat')?.addEventListener('click', () => refresh('#/messages?view=new'));
  root.querySelector('#pikkNewChatTop')?.addEventListener('click', () => refresh('#/messages?view=new'));
  const filterInbox = () => {
    const query = String(root.querySelector('#pikkMsgSearch')?.value || '').trim().toLowerCase();
    const unreadOnly = !!root.querySelector('#pikkMsgUnreadOnly')?.checked;
    let shown = 0;
    root.querySelectorAll('#msgInbox [data-open-thread]').forEach(row => {
      const matchesSearch = !query || String(row.dataset.search || '').includes(query);
      const matchesUnread = !unreadOnly || row.dataset.unread === 'true';
      row.hidden = !(matchesSearch && matchesUnread);
      if (!row.hidden) shown++;
    });
    const empty = root.querySelector('#pikkMsgNoResults');
    if (empty) {
      empty.textContent = unreadOnly
        ? (query ? 'No unread conversations match your search.' : 'No unread conversations.')
        : 'No conversations match your search.';
      empty.hidden = shown > 0 || (!query && !unreadOnly);
    }
    const clearFilters = root.querySelector('#pikkMsgClearFilters');
    if (clearFilters) clearFilters.hidden = !query && !unreadOnly;
  };
  root.querySelector('#pikkMsgClearFilters')?.addEventListener('click', () => {
    const search = root.querySelector('#pikkMsgSearch');
    const unread = root.querySelector('#pikkMsgUnreadOnly');
    if (search) search.value = '';
    if (unread) unread.checked = false;
    filterInbox();
    search?.focus();
  });
  const inboxSearch = root.querySelector('#pikkMsgSearch');
  inboxSearch?.addEventListener('input', filterInbox);
  // Escape clears the search text without resetting the Unread only filter.
  // Keep focus in the field so keyboard users can immediately search again.
  inboxSearch?.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !inboxSearch.value) return;
    event.preventDefault();
    event.stopPropagation();
    inboxSearch.value = '';
    filterInbox();
  });
  root.querySelector('#pikkMsgUnreadOnly')?.addEventListener('change', filterInbox);
  root.querySelector('#msgEmptyNew')?.addEventListener('click', () => refresh('#/messages?view=new'));
  root.querySelector('#msgOpenTeam')?.addEventListener('click', () => refresh('#/messages?view=team'));

  root.querySelector('#pikkGroupTop')?.addEventListener('click', () => root.querySelector('#msgOpenGroup')?.click());

  root.querySelector('#msgOpenGroup')?.addEventListener('click', () => {
    const g = ensureDemoGroupThread();
    if (g?.error) {
      toast('Sign in required');
      return;
    }
    toast('Opened DBS Fans');
    refresh('#/messages?t=' + encodeURIComponent(g.id));
  });

  root.querySelector('#msgTeamFree')?.addEventListener('click', () => {
    const t = getOrCreateThread('dbs', 'DatBoiSkeet');
    if (t.error) return toast('Sign in required');
    refresh('#/messages?t=' + encodeURIComponent(t.id));
  });

  root.querySelector('#msgTeamPriority')?.addEventListener('click', () => {
    const t = getOrCreateThread('dbs', 'DatBoiSkeet');
    if (t.error) return toast('Sign in required');
    refresh('#/messages?t=' + encodeURIComponent(t.id) + '&priority=1');
  });

  root.querySelectorAll('[data-start-peer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const peerId = btn.dataset.startPeer;
      const peerName = btn.dataset.peerName || peerId;
      if (peerId === 'dbs') {
        refresh('#/messages?view=team');
        return;
      }
      const t = getOrCreateThread(peerId, peerName);
      if (t.error) return toast('Sign in required');
      if (t.request) toast('Request thread created · demo');
      refresh('#/messages?t=' + encodeURIComponent(t.id));
    });
  });

  root.querySelectorAll('[data-open-thread]').forEach((btn) => {
    btn.addEventListener('click', () => {
      refresh('#/messages?t=' + encodeURIComponent(btn.dataset.openThread));
    });
  });

  root.querySelector('#msgPrefDMs')?.addEventListener('change', (e) => {
    updateMessagePrefs({ allowDMs: !!e.target.checked });
    toast(e.target.checked ? 'DMs allowed' : 'DMs disabled (stub)');
  });
  root.querySelector('#msgPrefRequests')?.addEventListener('change', (e) => {
    updateMessagePrefs({ allowRequests: !!e.target.checked });
    toast(e.target.checked ? 'Requests allowed' : 'Requests disabled (stub)');
  });

  const threadId = new URLSearchParams((location.hash.split('?')[1] || '')).get('t');
  const thread = threadId ? getThread(threadId) : null;
  if (thread) {
    markThreadRead(thread.id);
  }

  root.querySelectorAll('[data-flag]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!thread) return;
      const flag = btn.dataset.flag;
      if (flag === 'mute') {
        const next = setThreadFlags(thread.id, { muted: !thread.muted });
        toast(next.muted ? 'Muted' : 'Unmuted');
        refresh('#/messages?t=' + encodeURIComponent(thread.id));
      } else if (flag === 'block') {
        const next = setThreadFlags(thread.id, { blocked: !thread.blocked });
        toast(next.blocked ? 'Blocked' : 'Unblocked');
        refresh('#/messages?t=' + encodeURIComponent(thread.id));
      } else if (flag === 'report') {
        setThreadFlags(thread.id, { report: true });
        toast('Reported · stub (Guidelines §13)');
        refresh('#/messages?t=' + encodeURIComponent(thread.id));
      }
    });
  });

  const send = (priority) => {
    if (!thread) return;
    const input = root.querySelector('#msgInput');
    const text = input?.value || '';
    let res;
    if (thread.kind === 'group') {
      res = sendGroupMessage(thread.id, text);
    } else {
      res = sendMessage(thread.peerId, thread.peerName, text, { priority: !!priority });
    }
    if (res?.error === 'empty') return toast('Type a message');
    if (res?.error) return toast('Could not send');
    if (priority) toast('Priority sent · TEST MODE $2.99 not charged');
    else toast('Sent');
    refresh('#/messages?t=' + encodeURIComponent(thread.id));
  };

  root.querySelector('#msgSend')?.addEventListener('click', () => send(false));
  root.querySelector('#msgSendPriority')?.addEventListener('click', () => send(true));
  root.querySelector('#msgInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      send(false);
    }
  });

  // Scroll thread to bottom
  const box = root.querySelector('#msgThread');
  if (box) box.scrollTop = box.scrollHeight;
}
