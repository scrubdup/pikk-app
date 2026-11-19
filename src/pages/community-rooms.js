/**
 * Community Lounge Rooms (Phase 2 → now started)
 * Lounge · Conversation · Listening · Backstage · Live · Spotlight
 */

import { getState, setState } from '../store.js'
import { esc, toast, shellPage } from '../ui.js'
import { navigate } from '../router.js'

const COMMUNITY_ROOMS = [
  {
    id: 'lounge',
    name: 'Lounge',
    tag: 'OPEN · SOCIAL',
    desc: 'Main hangout. Casual talk, music talk, network energy.',
    color: '#2f6bff',
  },
  {
    id: 'conversation',
    name: 'Conversation',
    tag: 'DEEPER TALK',
    desc: 'Longer-form conversation. Less noise, more substance.',
    color: '#00c2a8',
  },
  {
    id: 'listening',
    name: 'Listening Room',
    tag: 'MUSIC · QUIET',
    desc: 'Drop tracks, react, listen together. Low chatter.',
    color: '#9b59b6',
  },
  {
    id: 'backstage',
    name: 'Backstage',
    tag: 'CREATORS',
    desc: 'Creator-leaning space. Process, collabs, industry talk.',
    color: '#f39c12',
  },
  {
    id: 'live-lounge',
    name: 'Live Lounge',
    tag: 'LIVE ENERGY',
    desc: 'Pre/post live energy. Ties into the main Live system later.',
    color: '#e74c3c',
  },
  {
    id: 'spotlight-room',
    name: 'Spotlight Room',
    tag: 'STAGE',
    desc: 'For people about to go on or just left Spotlight.',
    color: '#1abc9c',
  },
]

function ensureCommunityRooms() {
  const s = getState()
  if (!s.communityRooms) {
    setState({
      communityRooms: {
        presence: {},
        messages: {},
      },
    })
  }
  return getState().communityRooms
}

export function renderCommunityRooms(route) {
  const roomId = route?.parts?.[1] || null
  const state = ensureCommunityRooms()
  const { user } = getState()

  if (roomId) {
    const room = COMMUNITY_ROOMS.find((r) => r.id === roomId)
    if (!room) {
      return shellPage('Community', `<div class="card muted">Room not found.</div><a class="btn" href="#/community-rooms">Back</a>`)
    }

    if (!user) {
      return shellPage(room.name, `
        <div class="card">
          <h2>${esc(room.name)}</h2>
          <p>${esc(room.desc)}</p>
          <p class="muted">Sign in to enter.</p>
          <a class="btn primary" href="#/auth">Sign in</a>
          <a class="btn" href="#/community-rooms">Back</a>
        </div>
      `)
    }

    const messages = (state.messages[roomId] || []).slice(-50)
    const presence = state.presence[roomId] || []

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
        <div id="cRoomMessages" style="max-height:320px;overflow:auto;margin-bottom:12px">
          ${messages.length
            ? messages.map((m) => `
                <div style="padding:6px 0;border-bottom:1px solid var(--line)">
                  <strong>${esc(m.username)}</strong>
                  <span class="muted" style="font-size:11px;margin-left:6px">${new Date(m.at).toLocaleTimeString()}</span>
                  <div>${esc(m.text)}</div>
                </div>`).join('')
            : '<p class="muted">No messages yet.</p>'}
        </div>
        <div class="field"><input id="cRoomMsgInput" placeholder="Message…" maxlength="280" /></div>
        <button class="btn primary" id="cRoomSendBtn">Send</button>
        <button class="btn ghost" id="cRoomLeaveBtn" style="margin-left:8px">Leave</button>
      </div>
    `)
  }

  return shellPage('Community Lounge', `
    <section class="pikk-profile-guest-hero">
      <p class="kicker">PIKK · COMMUNITY</p>
      <h2>Lounge Rooms</h2>
      <p>Open social rooms for the network. Different energy, same house.</p>
      <span class="chip">TEST MODE</span>
    </section>

    <div class="pikk-dating-experience-grid">
      ${COMMUNITY_ROOMS.map((r) => `
        <a class="pikk-dating-experience" href="#/community-rooms/${r.id}" style="border-top:3px solid ${r.color}">
          <strong>${esc(r.name)}</strong>
          <small>${esc(r.tag)}</small>
          <p style="font-size:12px;margin:6px 0 0;opacity:.8">${esc(r.desc)}</p>
        </a>
      `).join('')}
    </div>

    <div class="card" style="margin-top:16px">
      <h3>Also available</h3>
      <div class="row wrap" style="gap:8px">
        <a class="btn" href="#/rooms">Men's · Ladies · Dating Rooms</a>
        <a class="btn" href="#/community">Community home</a>
        <a class="btn" href="#/connect">Connect / Random Chat</a>
      </div>
    </div>
  `)
}

export function bindCommunityRooms(route) {
  const roomId = route?.parts?.[1] || null
  const { user } = getState()
  if (!roomId || !user) return

  const room = COMMUNITY_ROOMS.find((r) => r.id === roomId)
  if (!room) return

  const current = ensureCommunityRooms()
  const presence = current.presence[roomId] || []
  if (!presence.some((p) => p.userId === user.id)) {
    setState({
      communityRooms: {
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

  document.getElementById('cRoomSendBtn')?.addEventListener('click', () => {
    const input = document.getElementById('cRoomMsgInput')
    const text = input?.value?.trim()
    if (!text) return
    const st = ensureCommunityRooms()
    const msgs = st.messages[roomId] || []
    setState({
      communityRooms: {
        ...st,
        messages: {
          ...st.messages,
          [roomId]: [...msgs, {
            id: 'cm_' + Date.now(),
            userId: user.id,
            username: user.username || user.displayName || 'User',
            text,
            at: Date.now(),
          }],
        },
      },
    })
    input.value = ''
    navigate(`#/community-rooms/${roomId}`)
  })

  document.getElementById('cRoomMsgInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('cRoomSendBtn')?.click()
  })

  document.getElementById('cRoomLeaveBtn')?.addEventListener('click', () => {
    const st = ensureCommunityRooms()
    setState({
      communityRooms: {
        ...st,
        presence: {
          ...st.presence,
          [roomId]: (st.presence[roomId] || []).filter((p) => p.userId !== user.id),
        },
      },
    })
    navigate('#/community-rooms')
  })
}
