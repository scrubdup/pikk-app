/**
 * Password reset page
 * Supports both request and confirm modes via query.
 */

import { api } from '../lib/api-client.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

export function renderAuthReset(route) {
  const token = route?.query?.token || ''
  const mode = token ? 'confirm' : 'request'

  if (mode === 'confirm') {
    return shellPage(
      'Reset password',
      `
      <section class="pikk-profile-guest-hero">
        <p class="kicker">PIKK · SECURITY</p>
        <h2>Choose a new password</h2>
      </section>
      <div class="card">
        <div class="field">
          <label>New password</label>
          <input id="resetNewPassword" type="password" placeholder="Min 8 characters" autocomplete="new-password" />
        </div>
        <button class="btn primary block" id="resetConfirmBtn">Update password</button>
        <p class="muted" id="resetError" style="color:var(--danger);margin-top:10px;display:none"></p>
      </div>
      `
    )
  }

  return shellPage(
    'Reset password',
    `
    <section class="pikk-profile-guest-hero">
      <p class="kicker">PIKK · SECURITY</p>
      <h2>Forgot your password?</h2>
      <p>Enter your email and we’ll send a reset link when email delivery is enabled.</p>
    </section>
    <div class="card">
      <div class="field">
        <label>Email</label>
        <input id="resetEmail" type="email" placeholder="you@email.com" autocomplete="email" />
      </div>
      <button class="btn primary block" id="resetRequestBtn">Send reset link</button>
      <p class="muted" id="resetError" style="color:var(--danger);margin-top:10px;display:none"></p>
      <p style="margin-top:14px;font-size:13px">
        <a href="#/auth?mode=login">Back to sign in</a>
      </p>
    </div>
    `
  )
}

export function bindAuthReset(route) {
  const token = route?.query?.token || ''
  const errorEl = document.getElementById('resetError')

  if (token) {
    const btn = document.getElementById('resetConfirmBtn')
    if (!btn) return
    btn.addEventListener('click', async () => {
      const newPassword = document.getElementById('resetNewPassword')?.value || ''
      errorEl.style.display = 'none'
      btn.disabled = true
      btn.textContent = 'Updating…'
      try {
        await api.resetPassword({ token, newPassword })
        toast('Password updated — you can sign in now')
        navigate('#/auth?mode=login')
      } catch (err) {
        errorEl.textContent = err.message || 'Reset failed'
        errorEl.style.display = 'block'
        btn.disabled = false
        btn.textContent = 'Update password'
      }
    })
    return
  }

  const btn = document.getElementById('resetRequestBtn')
  if (!btn) return
  btn.addEventListener('click', async () => {
    const email = document.getElementById('resetEmail')?.value?.trim()
    errorEl.style.display = 'none'
    btn.disabled = true
    btn.textContent = 'Sending…'
    try {
      await api.requestPasswordReset(email)
      toast('If that email exists, a reset link was sent')
      btn.textContent = 'Sent'
    } catch (err) {
      errorEl.textContent = err.message || 'Request failed'
      errorEl.style.display = 'block'
      btn.disabled = false
      btn.textContent = 'Send reset link'
    }
  })
}
