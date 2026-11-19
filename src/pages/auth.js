/**
 * Real authentication page
 * Uses the production auth service when the API is available.
 */

import { signup, login, getAuthState, logout } from '../auth/service.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

export function renderAuth(route) {
  const mode = route?.query?.mode === 'signup' ? 'signup' : 'login'

  return shellPage(
    mode === 'signup' ? 'Create account' : 'Sign in',
    `
    <section class="pikk-profile-guest-hero" aria-label="PIKK account">
      <p class="kicker">PIKK · ACCOUNT</p>
      <h2>${mode === 'signup' ? 'Create your PIKK account' : 'Welcome back'}</h2>
      <p>Real accounts with secure sessions. Your data stays on the server once the backend is live.</p>
    </section>

    <div class="card" id="authCard">
      <div class="field">
        <label>Email</label>
        <input id="authEmail" type="email" placeholder="you@email.com" autocomplete="email" />
      </div>
      <div class="field">
        <label>Password</label>
        <input id="authPassword" type="password" placeholder="Min 8 characters" autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}" />
      </div>
      ${mode === 'signup' ? `
      <div class="field">
        <label>Display name (optional)</label>
        <input id="authDisplayName" type="text" placeholder="How you appear on PIKK" maxlength="40" />
      </div>` : ''}
      <button class="btn primary block" id="authSubmit">
        ${mode === 'signup' ? 'Create account' : 'Sign in'}
      </button>
      <p class="muted" id="authError" style="color:var(--danger);margin-top:10px;display:none"></p>
      <p style="margin-top:14px;font-size:13px">
        ${mode === 'signup'
          ? `Already have an account? <a href="#/auth?mode=login">Sign in</a>`
          : `Need an account? <a href="#/auth?mode=signup">Create one</a>`}
      </p>
      <p class="muted" style="margin-top:8px;font-size:12px">
        <a href="#/profile">Prefer local demo mode instead?</a>
      </p>
    </div>
    `
  )
}

export function bindAuth(route) {
  const mode = route?.query?.mode === 'signup' ? 'signup' : 'login'
  const submit = document.getElementById('authSubmit')
  const errorEl = document.getElementById('authError')

  if (!submit) return

  submit.addEventListener('click', async () => {
    const email = document.getElementById('authEmail')?.value?.trim()
    const password = document.getElementById('authPassword')?.value || ''
    const displayName = document.getElementById('authDisplayName')?.value?.trim()

    errorEl.style.display = 'none'
    submit.disabled = true
    submit.textContent = mode === 'signup' ? 'Creating…' : 'Signing in…'

    try {
      if (mode === 'signup') {
        await signup({ email, password, displayName })
        toast('Account created')
      } else {
        await login({ email, password })
        toast('Signed in')
      }
      navigate('#/profile')
    } catch (err) {
      errorEl.textContent = err.message || 'Something went wrong'
      errorEl.style.display = 'block'
      submit.disabled = false
      submit.textContent = mode === 'signup' ? 'Create account' : 'Sign in'
    }
  })
}
