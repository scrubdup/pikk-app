/**
 * Account settings helpers for real (server) users
 * Change password + delete account flows.
 */

import { api } from '../lib/api-client.js'
import { logout } from './service.js'
import { toast } from '../ui.js'
import { navigate } from '../router.js'

export function renderAccountSettingsCard() {
  return `
    <div class="card" id="accountSettingsCard">
      <h3>Account settings</h3>
      <p class="muted" style="font-size:13px">These actions use your real PIKK account (server session).</p>

      <div class="field" style="margin-top:12px">
        <label>Current password</label>
        <input id="acctCurrentPw" type="password" autocomplete="current-password" />
      </div>
      <div class="field">
        <label>New password</label>
        <input id="acctNewPw" type="password" autocomplete="new-password" />
      </div>
      <button class="btn block" id="acctChangePwBtn">Change password</button>

      <hr style="margin:18px 0;border:none;border-top:1px solid var(--line)" />

      <p class="muted" style="font-size:12px">Delete is permanent. You must confirm with your password.</p>
      <div class="field">
        <label>Password to confirm deletion</label>
        <input id="acctDeletePw" type="password" autocomplete="current-password" />
      </div>
      <button class="btn block" id="acctDeleteBtn" style="background:var(--danger,#c44);color:#fff">Delete account</button>

      <p id="acctSettingsMsg" class="muted" style="margin-top:10px;display:none"></p>
    </div>
  `
}

export function bindAccountSettings() {
  const msg = document.getElementById('acctSettingsMsg')

  document.getElementById('acctChangePwBtn')?.addEventListener('click', async () => {
    const currentPassword = document.getElementById('acctCurrentPw')?.value || ''
    const newPassword = document.getElementById('acctNewPw')?.value || ''
    msg.style.display = 'none'
    try {
      await api.changePassword({ currentPassword, newPassword })
      toast('Password updated')
      document.getElementById('acctCurrentPw').value = ''
      document.getElementById('acctNewPw').value = ''
    } catch (err) {
      msg.textContent = err.message || 'Failed'
      msg.style.display = 'block'
      msg.style.color = 'var(--danger,#c44)'
    }
  })

  document.getElementById('acctDeleteBtn')?.addEventListener('click', async () => {
    const password = document.getElementById('acctDeletePw')?.value || ''
    if (!confirm('Permanently delete your PIKK account? This cannot be undone.')) return
    msg.style.display = 'none'
    try {
      await api.deleteAccount(password)
      await logout()
      toast('Account deleted')
      navigate('#/home')
    } catch (err) {
      msg.textContent = err.message || 'Failed'
      msg.style.display = 'block'
      msg.style.color = 'var(--danger,#c44)'
    }
  })
}
