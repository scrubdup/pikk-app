/**
 * PIKK Broadcast Studio
 * Scaffold aligned with PIKK_Broadcast_Master_Plan.
 * No real ingest or multistream until backend workers + OAuth are live.
 */

import { getState } from '../store.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

const DESTINATIONS = [
  { id: 'pikk', name: 'PIKK Live', status: 'ready', icon: '●' },
  { id: 'youtube', name: 'YouTube Live', status: 'disconnected', icon: '▶' },
  { id: 'twitch', name: 'Twitch', status: 'disconnected', icon: '◆' },
  { id: 'kick', name: 'Kick', status: 'disconnected', icon: '▣' },
  { id: 'tiktok', name: 'TikTok LIVE', status: 'unavailable', icon: '♪' },
  { id: 'instagram', name: 'Instagram Live', status: 'unavailable', icon: '◎' },
  { id: 'facebook', name: 'Facebook Live', status: 'unavailable', icon: 'f' },
  { id: 'custom', name: 'Custom RTMP', status: 'disconnected', icon: '⇄' },
]

let localSession = null

export function renderBroadcast() {
  const { user } = getState()

  if (!user) {
    return shellPage('Broadcast Studio', `
      <div class="card">
        <h2>Broadcast Studio</h2>
        <p class="muted">Sign in to open the studio.</p>
        <a class="btn primary" href="#/auth">Sign in</a>
      </div>
    `)
  }

  const status = localSession?.status || 'idle'

  return shellPage('Broadcast Studio', `
    <section class="pikk-profile-guest-hero">
      <p class="kicker">PIKK · BROADCAST</p>
      <h2>Go Live Everywhere</h2>
      <p>One source → PIKK Live + authorized destinations. Real multistream requires backend ingest + platform OAuth.</p>
      <span class="chip">STUDIO SHELL · TEST MODE</span>
    </section>

    <div class="card">
      <h3>Preview</h3>
      <div id="broadcastPreview" style="background:#111;border-radius:12px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:#666;margin-bottom:12px">
        Camera preview placeholder
      </div>
      <div class="row wrap" style="gap:8px">
        <button class="btn ghost" id="bcCamBtn">Camera</button>
        <button class="btn ghost" id="bcMicBtn">Mic</button>
        <button class="btn ghost" id="bcScreenBtn">Screen</button>
      </div>
      <p class="muted" style="font-size:12px;margin-top:8px">Device access is not started until real WebRTC/RTMP ingest is wired.</p>
    </div>

    <div class="card">
      <h3>Stream details</h3>
      <div class="field">
        <label>Title</label>
        <input id="bcTitle" placeholder="What are you going live about?" maxlength="100" value="${esc(localSession?.title || '')}" />
      </div>
    </div>

    <div class="card">
      <h3>Destinations</h3>
      <p class="muted" style="font-size:13px;margin-bottom:12px">Only PIKK Live is marked ready in this shell. Others require OAuth + eligibility.</p>
      <div class="pikk-dating-experience-grid">
        ${DESTINATIONS.map((d) => `
          <div class="pikk-dating-experience" data-dest="${d.id}" style="cursor:default;opacity:${d.status === 'unavailable' ? 0.5 : 1}">
            <strong>${d.icon} ${esc(d.name)}</strong>
            <small class="chip">${esc(d.status)}</small>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <h3>Session</h3>
      <p>Status: <strong id="bcStatus">${esc(status)}</strong></p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button class="btn primary" id="bcStartBtn" ${status === 'live' ? 'disabled' : ''}>Go Live</button>
        <button class="btn ghost" id="bcStopBtn" ${status !== 'live' ? 'disabled' : ''}>End Stream</button>
      </div>
      <p class="muted" style="font-size:12px;margin-top:10px">
        Start/stop here only updates local stub state. No real media leaves this device until ingest workers exist.
      </p>
    </div>

    <div class="card">
      <h3>Roadmap (from Master Plan)</h3>
      <ul class="muted" style="font-size:13px;line-height:1.6">
        <li>M1 — Real PIKK Live ingest + playback</li>
        <li>M2 — One external destination (YouTube or Twitch)</li>
        <li>M3 — YouTube + Twitch + Kick + custom RTMP</li>
        <li>M4 — Conditional TikTok / Instagram / Facebook</li>
        <li>M5 — Bot monitoring, recordings, moderation</li>
      </ul>
    </div>
  `)
}

export function bindBroadcast() {
  document.getElementById('bcStartBtn')?.addEventListener('click', () => {
    const title = document.getElementById('bcTitle')?.value?.trim() || 'Untitled broadcast'
    localSession = {
      id: 'local_' + Date.now(),
      title,
      status: 'live',
      startedAt: new Date().toISOString(),
    }
    toast('Studio started (stub only — no real stream)')
    navigate('#/broadcast')
  })

  document.getElementById('bcStopBtn')?.addEventListener('click', () => {
    if (localSession) {
      localSession.status = 'ended'
      localSession.endedAt = new Date().toISOString()
    }
    toast('Stream ended (stub)')
    navigate('#/broadcast')
  })

  document.getElementById('bcCamBtn')?.addEventListener('click', () => {
    toast('Camera preview requires WebRTC ingest — not wired yet')
  })
  document.getElementById('bcMicBtn')?.addEventListener('click', () => {
    toast('Mic control requires WebRTC ingest — not wired yet')
  })
  document.getElementById('bcScreenBtn')?.addEventListener('click', () => {
    toast('Screen share requires WebRTC ingest — not wired yet')
  })
}
