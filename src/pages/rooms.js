/**
 * PIKK Rooms
 * Men's Room · Ladies Room · Dating Rooms
 * Currently local/demo presence. Real realtime + gender verification come later.
 */

import { getState, saveState } from '../store.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

const ROOMS = [
  {
    id: 'mens',
    name: "Men's Room",
    gate: 'men',
    tag: 'MEN ONLY · 18+',
    desc: 'A space for men to talk, network, and connect. Gender self-select for now (verification later).',
    color: '#2f6bff',
  },
  {
    id: 'ladies',
    name: "Ladies Room",
    gate: 'women',
    tag: 'WOMEN ONLY · 18+',
    desc: 'A space for women to talk, network, and connect. Gender self-select for now (verification later).',
    color: '#e91e8c',
  },
  {
    id: 'dating-lounge',
    name: 'Dating Lounge',
    gate: 'dating',
    tag: 'DATING · 18+ · OPT-IN',
    desc: 'Open dating conversation room. Mutual interest only. No pressure, no fake matches.',
    color: '#ff4d6d',
  },
  {
    id: 'dating-speed',
    name: 'Speed Dating',
    gate: 'dating',
    tag: 'SPEED DATING · PREVIEW',
    desc: 'Timed intro rounds. Coming with real matching + safety systems.',
    color: '#ff8c42',
  },
  {
    id: 'dating-live',
    name: 'Dating Live Room',
    gate: 'dating',
    tag: 'LIVE DATING · PREVIEW',
    desc: 'Live group dating energy. Links into the broader Live system later.',
    color: '#c44dff',
  },
]

function ensureRoomsState() {
  const s = getState()
  if (!s.rooms) {
    s.rooms = {
      presence: {},      // roomId -> [{ userId, username, gender?, at }]
      messages: {},      // roomId -> [{ id, userId, username, text, at }]
      myGender: null,    // 'men' | 'women' | null (self-select for demo)
      datingOptIn: false,
    }
    saveState(s)
  }
  return s.rooms
}

function canEnter(room, roomsState, user) {
  if (!user) return { ok: false, reason: 'Sign in required' }
  if (room.gate === 'men') {
    if (roomsState.myGender !== 'men') return { ok: false, reason: 'Men\'s Room requires male self-select' }
  }
  if (room.gate === 'women') {
    if (roomsState.myGender !== 'women') return { ok: false, reason: 'Ladies Room requires female self-select' }
  }
  if (room.gate === 'dating') {
    if (!roomsState.datingOptIn) return { ok: false, reason: 'Opt in to Dating to enter' }
  }
  return { ok: true }
}

export function renderRooms(route) {
  const roomId = route?.parts?.[1] || null
  const roomsState = ensureRoomsState()
  const { user } = getState()

  // Single room view
  if (roomId) {
    const room = ROOMS.find((r) => r.id === roomId)
    if (!room) {
      return shellPage('Rooms', `<div class="card muted">Room not found.</div><a class="btn" href="#/rooms">Back</a>`)
    }

    const access = canEnter(room, roomsState, user)
    const messages = (roomsState.messages[roomId] || []).slice(-50)
    const presence = roomsState.presence[roomId] || []

    if (!access.ok) {
      return shellPage(room.name, `
        <div class="card">
          <span class="chip">${esc(room.tag)}</span>
          <h2>${esc(room.name)}</h2>
          <p>${esc(room.desc)}</p>
          <p class="muted" style="color:var(--danger)">${esc(access.reason)}</p>
          <a class="btn" href="#/rooms">Back to Rooms</a>
          ${!user ? `<a class="btn primary" href="#/auth" style="margin-left:8px">Sign in</a>` : ''}
        </div>
      `)
    }

    return shellPage(room.name, `
      <section class="pikk-rooms-header" style="border-left:4px solid ${room.color};padding-left:12px;margin-bottom:16px">
        <span class="chip">${esc(room.tag)}</span>
        <h2 style="margin:6px 0">${esc(room.name)}</h2>
        <p class="muted">${esc(room.desc)}</p>
        <p class="muted" style="font-size:12px">TEST MODE · Local presence only · Real realtime + verification later</p>
      </section>

      <div class="card">
        <h3>In the room · ${presence.length}</h3>
        <div class="row wrap" style="gap:6px">
          ${presence.length
            ? presence.map((p) => `<span class="chip">${esc(p.username)}</span>`).join('')
            : '<span class="muted">Just you for now</span>'}
        </div>
      </div>

      <div class="card" id="roomChat">
        <h3>Chat</h3>
        <div id="roomMessages" style="max-height:320px;overflow:auto;margin-bottom:12px">
          ${messages.length
            ? messages.map((m) => `
                <div style="padding:6px 0;border-bottom:1px solid var(--line)">
                  <strong>${esc(m.username)}</strong>
                  <span class="muted" style="font-size:11px;margin-left:6px">${new Date(m.at).toLocaleTimeString()}</span>
                  <div>${esc(m.text)}</div>
                </div>`).join('')
            : '<p class="muted">No messages yet. Say something.</p>'}
        </div>
        <div class="field">
          <input id="roomMsgInput" placeholder="Message the room…" maxlength="280" />
        </div>
        <button class="btn primary" id="roomSendBtn">Send</button>
        <button class="btn ghost" id="roomLeaveBtn" style="margin-left:8px">Leave room</button>
      </div>
    `)
  }

  // Rooms lobby
  return shellPage('PIKK Rooms', `
    <section class="pikk-profile-guest-hero" aria-label="PIKK Rooms">
      <p class="kicker">PIKK · ROOMS</p>
      <h2>Men's · Ladies · Dating</h2>
      <p>Gender-gated lounges and dating rooms. Self-select for now. Real verification and live presence come with the backend.</p>
      <span class="chip">TEST MODE · 18+</span>
    </section>

    <div class="card">
      <h3>Your settings</h3>
      <p class="muted" style="font-size:13px">Required before entering gated rooms. This is self-select only until verification exists.</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button class="btn ${roomsState.myGender === 'men' ? 'primary' : 'ghost'}" data-gender="men">I'm a man</button>
        <button class="btn ${roomsState.myGender === 'women' ? 'primary' : 'ghost'}" data-gender="women">I'm a woman</button>
        <button class="btn ${roomsState.datingOptIn ? 'primary' : 'ghost'}" id="datingOptInBtn">
          ${roomsState.datingOptIn ? 'Dating opt-in · ON' : 'Opt in to Dating'}
        </button>
      </div>
      <p class="muted" style="font-size:12px;margin-top:8px">
        Gender: <strong>${roomsState.myGender || 'not set'}</strong> ·
        Dating: <strong>${roomsState.datingOptIn ? 'opted in' : 'off'}</strong>
      </p>
    </div>

    <div class="pikk-dating-experience-grid" style="margin-top:16px">
      ${ROOMS.map((r) => `
        <a class="pikk-dating-experience" href="#/rooms/${r.id}" style="border-top:3px solid ${r.color}">
          <strong>${esc(r.name)}</strong>
          <small>${esc(r.tag)}</small>
          <p style="font-size:12px;margin:6px 0 0;opacity:.8">${esc(r.desc)}</p>
        </a>
      `).join('')}
    </div>

    <div class="card" style="margin-top:16px">
      <h3>Safety</h3>
      <p class="muted" style="font-size:13px">
        These rooms are demo-only right now. No real-time servers, no gender verification, no moderation queue yet.
        Report / block tools and server-side enforcement ship with Trust & Safety + real auth.
      </p>
    </div>
  `)
}

export function bindRooms(route) {
  const roomId = route?.parts?.[1] || null
  const roomsState = ensureRoomsState()
  const { user } = getState()

  // Lobby controls
  document.querySelectorAll('[data-gender]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = getState()
      s.rooms = s.rooms || ensureRoomsState()
      s.rooms.myGender = btn.dataset.gender
      saveState(s)
      toast(`Gender set to ${btn.dataset.gender}`)
      navigate('#/rooms')
    })
  })

  document.getElementById('datingOptInBtn')?.addEventListener('click', () => {
    const s = getState()
    s.rooms = s.rooms || ensureRoomsState()
    s.rooms.datingOptIn = !s.rooms.datingOptIn
    saveState(s)
    toast(s.rooms.datingOptIn ? 'Dating opt-in enabled' : 'Dating opt-in turned off')
    navigate('#/rooms')
  })

  if (!roomId || !user) return

  const room = ROOMS.find((r) => r.id === roomId)
  if (!room) return
  const access = canEnter(room, roomsState, user)
  if (!access.ok) return

  // Join presence
  const s = getState()
  s.rooms = s.rooms || ensureRoomsState()
  if (!s.rooms.presence[roomId]) s.rooms.presence[roomId] = []
  const already = s.rooms.presence[roomId].some((p) => p.userId === user.id)
  if (!already) {
    s.rooms.presence[roomId].push({
      userId: user.id,
      username: user.username || user.displayName || 'User',
      at: Date.now(),
    })
    saveState(s)
  }

  document.getElementById('roomSendBtn')?.addEventListener('click', () => {
    const input = document.getElementById('roomMsgInput')
    const text = input?.value?.trim()
    if (!text) return
    const st = getState()
    st.rooms = st.rooms || ensureRoomsState()
    if (!st.rooms.messages[roomId]) st.rooms.messages[roomId] = []
    st.rooms.messages[roomId].push({
      id: 'm_' + Date.now(),
      userId: user.id,
      username: user.username || user.displayName || 'User',
      text,
      at: Date.now(),
    })
    saveState(st)
    input.value = ''
    navigate(`#/rooms/${roomId}`) // refresh
  })

  document.getElementById('roomMsgInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('roomSendBtn')?.click()
  })

  document.getElementById('roomLeaveBtn')?.addEventListener('click', () => {
    const st = getState()
    if (st.rooms?.presence?.[roomId]) {
      st.rooms.presence[roomId] = st.rooms.presence[roomId].filter((p) => p.userId !== user.id)
      saveState(st)
    }
    navigate('#/rooms')
  })
}
