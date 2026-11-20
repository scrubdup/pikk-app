import { shellPage } from '../ui.js'
import { getRoute } from '../router.js'

/** Dating landing — now links into real Rooms system */
export function renderDating() {
  return shellPage('PIKK Dating & Connections', `
    <section class="pikk-dating-hero" id="dating-discover" tabindex="-1" aria-label="PIKK Dating">
      <div class="pikk-dating-hero-copy">
        <span class="chip">18+ · Rooms live (demo)</span>
        <p class="kicker">PIKK DATING · FIND YOUR CONNECTION</p>
        <h2>Find your vibe. <span>Make it mutual.</span></h2>
        <p>Dating rooms are open in demo mode. Real matchmaking, age verification and safety systems still required before launch.</p>
        <div class="pikk-dating-hero-actions">
          <a class="btn primary" href="#/rooms">Open Dating Rooms</a>
          <a class="btn ghost" href="#/community-rooms">Community Lounge</a>
        </div>
        <small>TEST MODE · Local rooms · No real matches yet</small>
      </div>
      <div class="pikk-dating-symbol" aria-hidden="true">♡</div>
    </section>

    <nav class="pikk-dating-tabs" aria-label="Dating sections">
      <button type="button" data-dating-jump="dating-discover" class="is-active" aria-pressed="true">Discover</button>
      <button type="button" data-dating-jump="dating-rooms" aria-pressed="false">Rooms</button>
      <button type="button" data-dating-jump="dating-live" aria-pressed="false">Live</button>
      <button type="button" data-dating-jump="dating-safety" aria-pressed="false">Safety</button>
    </nav>

    <section class="pikk-dating-experience-grid" id="dating-rooms" tabindex="-1">
      <a class="pikk-dating-experience" href="#/rooms/dating-lounge"><span aria-hidden="true">♡</span><strong>Dating Lounge</strong><small>Open conversation</small></a>
      <a class="pikk-dating-experience" href="#/rooms/dating-speed"><span aria-hidden="true">⚡</span><strong>Speed Dating</strong><small>Preview</small></a>
      <a class="pikk-dating-experience" href="#/rooms/dating-live"><span aria-hidden="true">●</span><strong>Dating Live Room</strong><small>Preview</small></a>
      <a class="pikk-dating-experience" href="#/rooms"><span aria-hidden="true">▣</span><strong>All Rooms</strong><small>Men's · Ladies · Dating</small></a>
    </section>

    <div class="card pikk-dating-panel" id="dating-live" tabindex="-1">
      <span class="pikk-dating-panel-tag">LIVE CONNECTIONS</span>
      <h3>Dating Live & Broadcast</h3>
      <p class="muted">Live dating energy and the broader Live system. Broadcast Studio is separate under Create / Go Live.</p>
      <a class="btn primary" href="#/live">Open Live</a>
      <a class="btn ghost" href="#/broadcast">Broadcast Studio</a>
    </div>

    <div class="card pikk-dating-panel" id="dating-safety" tabindex="-1">
      <span class="pikk-dating-panel-tag">YOUR SAFETY FIRST</span>
      <h3>Privacy & safety</h3>
      <p class="muted">Dating will require verified adult eligibility, explicit opt-in, mutual consent, blocking, reporting and account deletion before full launch. Rooms today are local demo only.</p>
    </div>
  `, { lead: 'Dating · rooms · live connections' })
}

export function bindDating(root) {
  const valid = new Set(['dating-discover', 'dating-rooms', 'dating-live', 'dating-safety'])
  const buttons = [...root.querySelectorAll('[data-dating-jump]')]
  function activate(id, scroll = false) {
    if (!valid.has(id)) return
    const target = root.querySelector('#' + id)
    if (!target) return
    buttons.forEach((button) => {
      const selected = button.dataset.datingJump === id
      button.classList.toggle('is-active', selected)
      button.setAttribute('aria-pressed', String(selected))
    })
    if (scroll) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      target.focus({ preventScroll: true })
    }
  }
  buttons.forEach((button) => button.addEventListener('click', () => activate(button.dataset.datingJump, true)))
  const deepLink = getRoute().elementId
  if (valid.has(deepLink)) {
    window.setTimeout(() => {
      if (root.querySelector('#' + deepLink)) activate(deepLink, true)
    }, 80)
  }
}
