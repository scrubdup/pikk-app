import { authApi, isPikkApiConfigured } from '../api/auth-client.js';
import { shellPage, toast } from '../ui.js';

export function renderForgotPassword() {
  if (!isPikkApiConfigured()) {
    return shellPage(
      'Reset password',
      '<div class="card"><h3>Account service not connected</h3><p class="muted">Password reset needs the PIKK API.</p><a class="btn" href="#/profile">Back to Profile</a></div>',
    );
  }
  return shellPage(
    'Reset password',
    `<div class="card">
      <p class="kicker">PIKK account</p>
      <h3>Forgot password</h3>
      <p class="muted">Enter your account email. If it matches a PIKK account, we send reset instructions. The response is the same either way.</p>
      <div class="field"><label for="forgotEmail">Email</label><input id="forgotEmail" type="email" autocomplete="email" /></div>
      <button class="btn primary block" id="forgotSubmit" type="button">Send reset link</button>
      <p class="muted" id="forgotStatus" style="margin:10px 0 0" hidden></p>
      <a class="btn ghost" href="#/profile" style="margin-top:12px">Back to Sign in</a>
    </div>`,
    { lead: 'Secure password recovery' },
  );
}

export function bindForgotPassword(root) {
  root.querySelector('#forgotSubmit')?.addEventListener('click', async () => {
    const email = root.querySelector('#forgotEmail')?.value?.trim() || '';
    const status = root.querySelector('#forgotStatus');
    try {
      const r = await authApi.forgotPassword(email);
      if (status) {
        status.hidden = false;
        status.textContent = r?.message || 'If an account exists for that email, password reset instructions were sent.';
      }
      toast('Request received');
    } catch (err) {
      toast(err?.message || 'Could not start password reset');
    }
  });
}
