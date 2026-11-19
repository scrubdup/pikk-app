/**
 * PIKK Rooms
 * Men's Rooms · Ladies Rooms · Dating Rooms
 */

import { getState, setState } from '../store.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

const ROOMS = [
  // ── Men's Rooms ──────────────────────────────────
  {
    id: 'mens-main',
    section: 'mens',
    name: "Men's Main Lounge",
    gate: 'men',
    tag: 'MEN ONLY · 18+',
    desc: 'Main hangout for men. Open talk, network, everyday energy.',
    color: '#2f6bff',
  },
  {
    id: 'mens-sports',
    section: 'mens',
    name: 'Sports Room',
    gate: 'men',
    tag: 'MEN · SPORTS',
    desc: 'Games, teams, bets talk, highlights. Sports energy only.',
    color: '#27ae60',
  },
  {
    id: 'mens-hustle',
    section: 'mens',
    name: 'Business & Hustle',
    gate: 'men',
    tag: 'MEN · MONEY',
    desc: 'Business, side hustles, investing, moves. Serious talk.',
    color: '#f39c12',
  },
  {
    id: 'mens-music',
    section: 'mens',
    name: 'Music Talk',
    gate: 'men',
    tag: 'MEN · MUSIC',
    desc: 'Tracks, artists, studio talk, what you listening to.',
    color: '#9b59b6',
  },
  {
    id: 'mens-late',
    section: 'mens',
    name: 'Late Night',
    gate: 'men',
    tag: 'MEN · LATE',
    desc: 'After-hours energy. Real talk, less filter.',
    color: '#34495e',
  },

  // ── Ladies Rooms ─────────────────────────────────
  {
    id: 'ladies-main',
    section: 'ladies',
    name: "Ladies Main Lounge",
    gate: 'women',
    tag: 'WOMEN ONLY · 18+',
    desc: 'Main hangout for women. Open talk, support, everyday energy.',
    color: '#e91e8c',
  },
  {
    id: 'ladies-soft',
    section: 'ladies',
    name: 'Soft Life',
    gate: 'women',
    tag: 'WOMEN · SOFT LIFE',
    desc: 'Self-care, peace, lifestyle, soft energy.',
    color: '#ff9ff3',
  },
  {
    id: 'ladies-boss',
    section: 'ladies',
    name: 'Business & Boss',
    gate: 'women',
    tag: 'WOMEN · MONEY',
    desc: 'Business, careers, building, money moves.',
    color: '#f39c12',
  },
  {
    id: 'ladies-music',
    section: 'ladies',
    name: 'Music Talk',
    gate: 'women',
    tag: 'WOMEN · MUSIC',
    desc: 'Tracks, artists, playlists, what you vibing to.',
    color: '#9b59b6',
  },
  {
    id: 'ladies-late',
    section: 'ladies',
    name: 'Late Night',
    gate: 'women',
    tag: 'WOMEN · LATE',
    desc: 'After-hours real talk. Comfortable energy.',
    color: '#6c3483',
  },

  // ── Dating Rooms ─────────────────────────────────
  {
    id: 'dating-lounge',
    section: 'dating',
    name: 'Dating Lounge',
    gate: 'dating',
    tag: 'DATING · 18+ · OPT-IN',
    desc: 'Open dating conversation. Mutual interest only.',
    color: '#ff4d6d',
  },
  {
    id: 'dating-speed',
    section: 'dating',
    name: 'Speed Dating',
    gate: 'dating',
    tag: 'SPEED DATING · PREVIEW',
    desc: 'Timed intro rounds. Real matching comes later.',
    color: '#ff8c42',
  },
  {
    id: 'dating-live',
    section: 'dating',
    name: 'Dating Live Room',
    gate: 'dating',
    tag: 'LIVE DATING · PREVIEW',
    desc: 'Live group dating energy.',
    color: '#c44dff',
  },
]

function ensureRoomsState() {
  const s = getState()
  if (!s.rooms) {
    setState({
      rooms: {
        presence: {},
        messages: {},
        myGender: null,
        datingOptIn: false,
      },
    })
  }
  return getState().rooms
}

function canEnter(room, roomsState, user) {
  if (!user) return { ok: false, reason: 'Sign in required' }
  if (room.gate === 'men' && roomsState.myGender !== 'men') {
    return { ok: false, reason: "Men's rooms require male self-select" }
  }
  if (room.gate === 'women' && roomsState.myGender !== 'women') {
    return { ok: false, reason: "Ladies rooms require female self-select" }
  }
  if (room.gate === 'dating' && !roomsState.datingOptIn) {
    return { ok: false, reason: 'Opt in to Dating to enter' }
  }
  return { ok: true }
}

function sectionRooms(section) {
  return ROOMS.filter((r) => r.section === section)
}

export function renderRooms(route) {
  const roomId = route?.parts?.[1] || null
  const roomsState = ensureRoomsState()
  const { user } = getState()

  // ── Single room view ─────────────────────────────
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
      <section style="border-left:4px solid ${room.color};padding-left:12px;margin-bottom:16px">
        <span class="chip">${esc(room.tag)}</span>
        <h2 style="margin:6px 0">${esc(room.name)}</h2>
        <p class="muted">${esc(room.desc)}</p>
        <p class="muted" style="font-size:12px">TEST MODE · Local presence · Realtime later</p>
      </section>

      <div class="card">
        <h3>In the room · ${presence.length}</h3>
        <div class="row wrap" style="gap:6px">
          ${presence.length
            ? presence.map((p) => `<span class="chip">${esc(p.username)}</span>`).join('')
            : '<span class="muted">Just you for now</span>'}
        </div>
      </div>

      <div class="card">
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
        <div class="field"><input id="roomMsgInput" placeholder="Message the room…" maxlength="280" /></div>
        <button class="btn primary" id="roomSendBtn">Send</button>
        <button class="btn ghost" id="roomLeaveBtn" style="margin-left:8px">Leave</button>
      </div>
    `)
  }

  // ── Lobby ────────────────────────────────────────
  const mens = sectionRooms('mens')
  const ladies = sectionRooms('ladies')
  const dating = sectionRooms('dating')

  function roomCards(list) {
    return list.map((r) => `
      <a class="pikk-dating-experience" href="#/rooms/${r.id}" style="border-top:3px solid ${r.color}">
        <strong>${esc(r.name)}</strong>
        <small>${esc(r.tag)}</small>
        <p style="font-size:12px;margin:6px 0 0;opacity:.8">${esc(r.desc)}</p>
      </a>
    `).join('')
  }

  return shellPage('PIKK Rooms', `
    <section class="pikk-profile-guest-hero">
      <p class="kicker">PIKK · ROOMS</p>
      <h2>Men's · Ladies · Dating</h2>
      <p>Specific rooms under each section. Self-select gender + dating opt-in to enter.</p>
      <span class="chip">TEST MODE · 18+</span>
    </section>

    <div class="card">
      <h3>Your settings</h3>
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

    <h3 style="margin:20px 0 10px">Men's Rooms</h3>
    <div class="pikk-dating-experience-grid">${roomCards(mens)}</div>

    <h3 style="margin:20px 0 10px">Ladies Rooms</h3>
    <div class="pikk-dating-experience-grid">${roomCards(ladies)}</div>

    <h3 style="margin:20px 0 10px">Dating Rooms</h3>
    <div class="pikk-dating-experience-grid">${roomCards(dating)}</div>

    <div class="card" style="margin-top:16px">
      <h3>Safety</h3>
      <p class="muted" style="font-size:13px">
        Demo only. No realtime server, no gender verification, no moderation queue yet.
        Real enforcement ships with Trust & Safety + backend auth.
      </p>
    </div>
  `)
}

export function bindRooms(route) {
  const roomId = route?.parts?.[1] || null
  const roomsState = ensureRoomsState()
  const { user } = getState()

  document.querySelectorAll('[data-gender]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setState({ rooms: { ...getState().rooms, myGender: btn.dataset.gender } })
      toast(`Gender set to ${btn.dataset.gender}`)
      navigate('#/rooms')
    })
  })

  document.getElementById('datingOptInBtn')?.addEventListener('click', () => {
    const current = getState().rooms || ensureRoomsState()
    setState({ rooms: { ...current, datingOptIn: !current.datingOptIn } })
    toast(!current.datingOptIn ? 'Dating opt-in enabled' : 'Dating opt-in turned off')
    navigate('#/rooms')
  })

  if (!roomId || !user) return
  const room = ROOMS.find((r) => r.id === roomId)
  if (!room) return
  if (!canEnter(room, roomsState, user).ok) return

  const current = getState().rooms || ensureRoomsState()
  const presence = current.presence[roomId] || []
  if (!presence.some((p) => p.userId === user.id)) {
    setState({
      rooms: {
        ...current,
        presence: {
          ...current.presence,
          [roomId]: [...presence, {
            userId: user.id,
            username: user.username || user.displayName || 'User',
            at: Date.now(),
          }],
        },
      },
    })
  }

  document.getElementById('roomSendBtn')?.addEventListener('click', () => {
    const input = document.getElementById('roomMsgInput')
    const text = input?.value?.trim()
    if (!text) return
    const st = getState().rooms || ensureRoomsState()
    const msgs = st.messages[roomId] || []
    setState({
      rooms: {
        ...st,
        messages: {
          ...st.messages,
          [roomId]: [...msgs, {
            id: 'm_' + Date.now(),
            userId: user.id,
            username: user.username || user.displayName || 'User',
            text,
            at: Date.now(),
          }],
        },
      },
    })
    input.value = ''
    navigate(`#/rooms/${roomId}`)
  })

  document.getElementById('roomMsgInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('roomSendBtn')?.click()
  })

  document.getElementById('roomLeaveBtn')?.addEventListener('click', () => {
    const st = getState().rooms || ensureRoomsState()
    setState({
      rooms: {
        ...st,
        presence: {
          ...st.presence,
          [roomId]: (st.presence[roomId] || []).filter((p) => p.userId !== user.id),
        },
      },
    })
    navigate('#/rooms')
  })
}
