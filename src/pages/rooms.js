/**
 * PIKK Rooms — polished directory aligned with Live 78 topics
 * Brand: black / red / blue · TEST MODE text rooms
 */

import { getState, setState } from '../store.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'
import { LIVE_DISCOVERY_GROUPS } from '../live-discovery.js'

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Flatten discovery groups into room definitions */
function allTopicRooms() {
  const rooms = []
  for (const group of LIVE_DISCOVERY_GROUPS) {
    for (const name of group.names) {
      const id = `${group.id}-${slug(name)}`
      rooms.push({
        id,
        section: group.id,
        sectionTitle: group.title,
        icon: group.icon,
        name,
        tag: group.title.toUpperCase(),
        desc: group.description,
        color:
          group.id === 'women' || group.id === 'dating'
            ? '#ff4d6d'
            : group.id === 'men'
              ? '#2f6bff'
              : group.id === 'sports'
                ? '#27ae60'
                : group.id === 'talent'
                  ? '#9b59b6'
                  : group.id === 'news'
                    ? '#f39c12'
                    : '#2f6bff',
        gate:
          group.id === 'women'
            ? 'women'
            : group.id === 'men'
              ? 'men'
              : group.id === 'dating'
                ? 'dating'
                : null,
      })
    }
  }
  return rooms
}

const ROOMS = allTopicRooms()

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

export function renderRooms(route) {
  const roomId = route?.parts?.[1] || null
  const roomsState = ensureRoomsState()
  const { user } = getState()
  const q = new URLSearchParams(route?.query || '')
  const filterSection = q.get('section') || ''

  // ── Single room view ─────────────────────────────
  if (roomId) {
    const room = ROOMS.find((r) => r.id === roomId)
    if (!room) {
      return shellPage(
        'Rooms',
        `<div class="card muted">Room not found.</div><a class="btn" href="#/rooms">Back to directory</a>`,
      )
    }

    const access = canEnter(room, roomsState, user)
    const messages = (roomsState.messages[roomId] || []).slice(-50)
    const presence = roomsState.presence[roomId] || []

    if (!access.ok) {
      return shellPage(
        room.name,
        `
        <div class="card" style="border-top:3px solid ${room.color}">
          <span class="chip">${esc(room.tag)}</span>
          <h2 style="margin:8px 0">${esc(room.name)}</h2>
          <p class="muted">${esc(room.desc)}</p>
          <p style="color:var(--acc);font-weight:600">${esc(access.reason)}</p>
          <div class="row wrap" style="gap:8px;margin-top:12px">
            <a class="btn" href="#/rooms">Back</a>
            ${!user ? `<a class="btn primary" href="#/auth">Sign in</a>` : ''}
            ${room.gate === 'dating' && user ? `<button class="btn primary" id="datingOptInBtn">Opt in to Dating</button>` : ''}
          </div>
        </div>
      `,
      )
    }

    return shellPage(
      room.name,
      `
      <section class="pikk-live-directory-hero" style="border-left:4px solid ${room.color}">
        <p class="pikk-live-directory-kicker">${esc(room.sectionTitle)} · TEXT ROOM</p>
        <h3>${esc(room.name)}</h3>
        <p>${esc(room.desc)}</p>
        <p class="pikk-live-directory-note">TEST MODE · Local chat · Realtime later</p>
      </section>

      <div class="card">
        <h3>In the room · ${presence.length}</h3>
        <div class="row wrap" style="gap:6px">
          ${
            presence.length
              ? presence.map((p) => `<span class="chip">${esc(p.username)}</span>`).join('')
              : '<span class="muted">Just you for now</span>'
          }
        </div>
      </div>

      <div class="card">
        <h3>Chat</h3>
        <div id="roomMessages" style="max-height:320px;overflow:auto;margin-bottom:12px">
          ${
            messages.length
              ? messages
                  .map(
                    (m) => `
                <div style="padding:8px 0;border-bottom:1px solid var(--line)">
                  <strong style="color:var(--blue)">${esc(m.username)}</strong>
                  <span class="muted" style="font-size:11px;margin-left:6px">${new Date(m.at).toLocaleTimeString()}</span>
                  <div style="margin-top:2px">${esc(m.text)}</div>
                </div>`,
                  )
                  .join('')
              : '<p class="muted">No messages yet. Say something.</p>'
          }
        </div>
        <div class="field"><input id="roomMsgInput" placeholder="Message the room…" maxlength="280" autocomplete="off" /></div>
        <div class="row wrap" style="gap:8px;margin-top:8px">
          <button class="btn primary" id="roomSendBtn">Send</button>
          <button class="btn ghost" id="roomLeaveBtn">Leave</button>
          <a class="btn ghost" href="#/rooms">Directory</a>
        </div>
      </div>
    `,
    )
  }

  // ── Directory (78 topics) ────────────────────────
  const total = ROOMS.length
  const groupsHtml = LIVE_DISCOVERY_GROUPS.map((group) => {
    if (filterSection && group.id !== filterSection) return ''
    const entries = ROOMS.filter((r) => r.section === group.id)
    const cards = entries
      .map(
        (r) => `
      <a class="live-cat-card pikk-live-room-card" href="#/rooms/${r.id}" style="border-top:2px solid ${r.color}">
        <span class="pikk-live-room-emoji" aria-hidden="true">${group.icon}</span>
        <strong>${esc(r.name)}</strong>
        <p class="muted">${esc(group.description)}</p>
        <span class="pikk-live-room-action">Enter room <span aria-hidden="true">›</span></span>
      </a>`,
      )
      .join('')

    return `
      <details class="pikk-live-directory-group" id="pikk-rooms-group-${group.id}" ${group.id === 'coed' || filterSection ? 'open' : ''}>
        <summary class="pikk-live-directory-summary">
          <span class="pikk-live-directory-icon" aria-hidden="true">${group.icon}</span>
          <span class="pikk-live-directory-label">
            <strong>${esc(group.title)}</strong>
            <small>${esc(group.description)}</small>
          </span>
          <span class="pikk-live-directory-count">${entries.length} rooms</span>
          <span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span>
        </summary>
        <div class="live-cat-cards pikk-live-directory-cards">${cards}</div>
      </details>`
  }).join('')

  const sectionChips = [
    { id: '', label: 'All' },
    ...LIVE_DISCOVERY_GROUPS.map((g) => ({ id: g.id, label: g.title })),
  ]
    .map(
      (c) =>
        `<a class="chip ${filterSection === c.id || (!filterSection && c.id === '') ? 'primary' : ''}" href="#/rooms${c.id ? '?section=' + c.id : ''}">${esc(c.label)}</a>`,
    )
    .join('')

  return shellPage(
    'PIKK Rooms',
    `
    <section class="pikk-live-directory-hero">
      <p class="pikk-live-directory-kicker">PIKK · ROOMS</p>
      <h3>All ${total} topics</h3>
      <p>Same directory as Live. Text rooms now · voice/video when the media plane ships.</p>
      <p class="pikk-live-directory-note">TEST MODE · 18+ · Gated sections need self-select</p>
    </section>

    <div class="card">
      <h3>Your settings</h3>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button class="btn ${roomsState.myGender === 'men' ? 'primary' : 'ghost'}" data-gender="men">I'm a man</button>
        <button class="btn ${roomsState.myGender === 'women' ? 'primary' : 'ghost'}" data-gender="women">I'm a woman</button>
        <button class="btn ${roomsState.datingOptIn ? 'primary' : 'ghost'}" id="datingOptInBtn">
          ${roomsState.datingOptIn ? 'Dating · ON' : 'Opt in to Dating'}
        </button>
      </div>
      <p class="muted" style="font-size:12px;margin-top:8px">
        Gender: <strong>${roomsState.myGender || 'not set'}</strong> ·
        Dating: <strong>${roomsState.datingOptIn ? 'opted in' : 'off'}</strong>
      </p>
    </div>

    <div class="row wrap" style="gap:6px;margin:14px 0">${sectionChips}</div>

    <div class="pikk-live-directory" aria-label="Room category groups">
      ${groupsHtml}
    </div>

    <div class="card" style="margin-top:16px">
      <h3>Safety</h3>
      <p class="muted" style="font-size:13px">
        Demo text rooms. No realtime server yet. Gated sections use self-select only — not verified identity.
      </p>
    </div>
  `,
  )
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
    navigate(roomId ? `#/rooms/${roomId}` : '#/rooms')
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
          [roomId]: [
            ...presence,
            {
              userId: user.id,
              username: user.username || user.displayName || 'User',
              at: Date.now(),
            },
          ],
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
          [roomId]: [
            ...msgs,
            {
              id: 'm_' + Date.now(),
              userId: user.id,
              username: user.username || user.displayName || 'User',
              text,
              at: Date.now(),
            },
          ],
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
