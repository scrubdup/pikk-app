import { authApi, isPikkApiConfigured } from '../api/auth-client.js';
import { clearAuthenticatedUser } from '../store.js';
import { clearLiveAuthMe } from '../auth/readiness.js';
import { shellPage, esc, toast } from '../ui.js';
import { navigate } from '../router.js';

function stripResetTokenFromHistory() {
  try {
    const hash = String(location.hash || '');
    if (!hash.includes('token=')) return;
    // Keep the reset route; drop query so the raw token is not kept in history.
    history.replaceState(null, '', `${location.pathname}${location.search}#/reset-password`);
  } catch {
    /* history may be unavailable in some test hosts */
  }
}

export function renderResetPassword(route) {
  const token = route?.query?.token || '';
  if (!token) {
    return shellPage(
      'Reset password',
      '<div class="card"><h3>Reset link missing</h3><p class="muted">This reset link does not contain a token. Request a new one from Profile.</p><a class="btn" href="#/forgot-password">Forgot password</a></div>',
    );
  }
  if (!isPikkApiConfigured()) {
    return shellPage(
      'Reset password',
      '<div class="card"><h3>Account service not connected</h3><p class="muted">PIKK cannot reset this password until the API endpoint is configured.</p><a class="btn" href="#/profile">Back to Profile</a></div>',
    );
  }
  return shellPage(
    'Reset password',
    `<div class="card" id="resetPasswordCard" data-token="${esc(token)}">
      <p class="kicker">PIKK account</p>
      <h3>Choose a new password</h3>
      <div class="field"><label for="resetPasswordInput">New password</label><input id="resetPasswordInput" type="password" autocomplete="new-password" minlength="10" placeholder="10+ chars · a letter + a number" /></div>
      <button class="btn primary block" id="resetSubmit" type="button">Update password</button>
      <p class="muted" id="resetStatus" style="margin:10px 0 0" hidden></p>
    </div>`,
    { lead: 'Secure password recovery' },
  );
}

export function bindResetPassword(root) {
  const card = root.querySelector('#resetPasswordCard');
  if (!card) return;
  const token = card.dataset.token || '';
  card.removeAttribute('data-token');
  stripResetTokenFromHistory();
  root.querySelector('#resetSubmit')?.addEventListener('click', async () => {
    const password = root.querySelector('#resetPasswordInput')?.value || '';
    const status = root.querySelector('#resetStatus');
    try {
      const r = await authApi.resetPassword({ token, password });
      clearLiveAuthMe();
      clearAuthenticatedUser();
      if (status) {
        status.hidden = false;
        status.textContent = r?.message || 'Password updated. Sign in with your new password.';
      }
      toast('Password updated');
      setTimeout(() => navigate('#/profile'), 800);
    } catch (err) {
      toast(err?.message || 'Could not reset password');
      if (status) {
        status.hidden = false;
        status.textContent = err?.message || 'This reset link is invalid or expired.';
      }
    }
  });
}
