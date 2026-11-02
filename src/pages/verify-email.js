import { authApi, isPikkApiConfigured } from '../api/auth-client.js';
import { syncRemoteAuthUser } from '../store.js';
import { shellPage, esc } from '../ui.js';

export function renderVerifyEmail(route) {
  const token = route?.query?.token || '';
  if (!token) {
    return shellPage('Verify email', '<div class="card"><h3>Verification link missing</h3><p class="muted">This verification link does not contain a token. Request a new verification email once email delivery is enabled.</p><a class="btn" href="#/profile">Back to Profile</a></div>');
  }
  if (!isPikkApiConfigured()) {
    return shellPage('Verify email', '<div class="card"><h3>Account service not connected</h3><p class="muted">PIKK cannot verify this link until the production API endpoint is configured.</p><a class="btn" href="#/profile">Back to Profile</a></div>');
  }
  return shellPage('Verify email', `<div class="card" id="verifyEmailCard" data-token="${esc(token)}"><h3>Verify your PIKK email</h3><p class="muted" id="verifyEmailStatus">Checking your verification link…</p><a class="btn" href="#/profile">Back to Profile</a></div>`);
}

export function bindVerifyEmail(root) {
  const card = root.querySelector('#verifyEmailCard');
  if (!card) return;
  const status = root.querySelector('#verifyEmailStatus');
  const token = card.dataset.token || '';
  authApi.verifyEmail(token)
    .then(async () => {
      try {
        const session = await authApi.me();
        if (session?.user) syncRemoteAuthUser(session.user);
      } catch {}
      if (status) status.textContent = 'Email verified. Your PIKK account is ready.';
    })
    .catch((err) => {
      if (status) status.textContent = err?.message || 'This verification link is invalid or expired.';
    });
}
