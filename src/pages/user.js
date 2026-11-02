// Server user profile (#/user?h=handle): data from GET /users/:handle; Message / Report / Block.
import { getState } from '../store.js';
import { esc, toast, shellPage } from '../ui.js';
import { navigate } from '../router.js';
import { postsApi, isPostsApiConfigured } from '../api/posts-client.js';
import { messagesApi } from '../api/messages-client.js';
import { runPeerSafetyAction, normalizePeerHandle, renderReportCategorySelect } from '../safety-actions.js';

export function renderServerUserCard(u, { selfHandle = '' } = {}) {
  const handle = normalizePeerHandle(u?.handle);
  if (!handle) return '<div class="card muted">User not found.</div>';
  const self = selfHandle && selfHandle.toLowerCase() === handle.toLowerCase();
  return `<section class="card pikk-server-user" data-server-user="${esc(handle)}">
    <h2 style="margin:0">${esc(u.display_name || handle)}</h2>
    <p class="muted" style="margin:4px 0">@${esc(handle)} <span class="chip">PIKK account</span></p>
    ${u.bio ? `<p>${esc(u.bio)}</p>` : ''}
    ${self ? '' : `<div class="row wrap" style="gap:6px;margin-top:8px">
      <button type="button" class="btn primary" data-user-message="${esc(handle)}">Message</button>
      <button type="button" class="btn ghost" data-user-flag="block" data-peer-handle="${esc(handle)}">Block</button>
      ${renderReportCategorySelect('data-report-category')}
      <button type="button" class="btn ghost danger" data-user-flag="report" data-peer-handle="${esc(handle)}">Report</button>
    </div>`}
  </section>`;
}

export function renderUser(route) {
  const handle = normalizePeerHandle(route?.query?.h);
  if (!isPostsApiConfigured()) return shellPage('Profile', '<div class="card muted">PIKK user profiles need the PIKK server, which is not connected in this build.</div>');
  if (!getState().user) return shellPage('Profile', '<div class="card"><a class="btn primary" href="#/profile">Sign in to view PIKK profiles</a></div>');
  if (!handle) return shellPage('Profile', '<div class="card muted">User not found.</div>');
  return shellPage('Profile', `<div id="serverUserHost" data-handle="${esc(handle)}"><div class="card muted">Loading @${esc(handle)}…</div></div>`);
}

/** Bind Message / Report / Block on a rendered server user card. */
export function bindServerUserActions(host) {
  host.querySelectorAll('[data-user-flag]').forEach((btn) => btn.addEventListener('click', () =>
    runPeerSafetyAction(btn.dataset.userFlag === 'block' ? 'block' : 'report', btn.dataset.peerHandle, { details: 'Reported from profile', category: host.querySelector('[data-report-category]')?.value || '' })));
  host.querySelectorAll('[data-user-message]').forEach((btn) => btn.addEventListener('click', async () => {
    try {
      const data = await messagesApi.start(btn.dataset.userMessage);
      navigate('#/messages?t=' + encodeURIComponent(data.conversation.id));
    } catch (err) {
      toast(err?.code === 'email_unverified' ? 'Verify your email before starting messages' : (err?.message || 'Could not start conversation'));
    }
  }));
}

export async function bindUser(root) {
  const host = root.querySelector('#serverUserHost');
  if (!host) return;
  try {
    const data = await postsApi.user(host.dataset.handle);
    host.innerHTML = renderServerUserCard(data.user, { selfHandle: getState().user?.handle || '' });
    bindServerUserActions(host);
  } catch (err) {
    host.innerHTML = err?.status === 404 ? '<div class="card muted">User not found.</div>' : `<div class="card muted">Could not load profile: ${esc(err?.message || 'Unknown error')}</div>`;
  }
}
