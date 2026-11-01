// t397u — PIKK Live: Go Live category/permissions fields + Group Rooms TEST MODE shell.
// No camera or microphone access anywhere. No invented audience numbers — counts are only this device's own demo actions.
import { LIVE_DISCOVERY_GROUPS } from './live-discovery.js';

export const GENERAL_LIVE = LIVE_DISCOVERY_GROUPS.find((g) => g.id === 'general').names;
export const ROOM_GROUPS = LIVE_DISCOVERY_GROUPS.filter((g) => g.id !== 'general');
export const ROOM_MODES = Object.freeze(['Video', 'Voice', 'Text']);
export const PIN_DURATIONS = Object.freeze([[2, '2 min'], [5, '5 min'], [15, '15 min'], [30, '30 min'], [60, '1 hour'], [120, '2 hours']]);
export const REACTIONS = Object.freeze(['🔥', '❤️', '😂', '👏', '💯']);
const e = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Go Live: exactly one of the 17 General categories + title + permissions. */
export function renderGoLiveCategoryFields() {
  const chips = GENERAL_LIVE.map((n) => `<button type="button" class="chip pikk-chip pikk-golive-cat" role="radio" aria-checked="false" aria-pressed="false" data-golive-cat="${e(n)}">${e(n)}</button>`).join('');
  return `
      <fieldset class="field pikk-golive-cats" id="liveCategoryPick">
        <legend>Category <span class="muted">(pick exactly one · ${GENERAL_LIVE.length} General Live)</span></legend>
        <div class="row wrap" role="radiogroup" aria-label="Go Live category" style="gap:6px">${chips}</div>
        <input type="hidden" id="liveCategory" value="" />
      </fieldset>
      <fieldset class="field pikk-golive-perms" id="livePermissions">
        <legend>Permissions</legend>
        <label>Who can chat <select id="livePermChat"><option value="everyone">Everyone</option><option value="followers">Followers</option><option value="subscribers">Subscribers</option><option value="off">Chat off</option></select></label>
        <label>Guest requests <select id="livePermGuests"><option value="approve">Request · host approves</option><option value="off">Off</option></select></label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermGifts" checked /> Allow gifts &amp; donations (demo coins)</label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermReplay" /> Save replay (Coming soon)</label>
      </fieldset>`;
}
export function bindGoLiveCategoryFields(root) {
  const hidden = root.querySelector('#liveCategory');
  root.querySelectorAll('.pikk-golive-cat').forEach((b) => b.addEventListener('click', () => {
    root.querySelectorAll('.pikk-golive-cat').forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); x.setAttribute('aria-checked', String(on)); });
    if (hidden) hidden.value = b.dataset.goliveCat;
  }));
}
export function readGoLiveFields(root) {
  const category = root.querySelector('#liveCategory')?.value || '';
  return {
    category: GENERAL_LIVE.includes(category) ? category : '',
    permissions: {
      chat: root.querySelector('#livePermChat')?.value || 'everyone',
      guests: root.querySelector('#livePermGuests')?.value || 'approve',
      gifts: !!root.querySelector('#livePermGifts')?.checked,
      replay: !!root.querySelector('#livePermReplay')?.checked,
    },
  };
}

/** Group Rooms panel: topic → mode → start (TEST MODE shell). goalHtml = existing Live daily-goal card. */
export function renderGroupRoomsPanel({ user, goalHtml = '' } = {}) {
  const opts = ROOM_GROUPS.map((g) => `<optgroup label="${e(g.title)} (${g.names.length})">${g.names.map((n) => `<option value="${e(n)}">${e(n)}</option>`).join('')}</optgroup>`).join('');
  const modes = ROOM_MODES.map((m, i) => `<button type="button" class="chip pikk-chip pikk-room-mode${i ? '' : ' on'}" aria-pressed="${i ? 'false' : 'true'}" data-room-mode="${m}">${m}</button>`).join('');
  const reacts = REACTIONS.map((r) => `<button type="button" class="chip pikk-chip pikk-room-react" data-react="${r}" aria-label="React ${r}">${r}</button>`).join('');
  const pins = PIN_DURATIONS.map(([m, l]) => `<option value="${m}">${l}</option>`).join('');
  return `
    <div class="card live-disc-panel pikk-rooms" id="liveTabRooms" data-panel="rooms" data-test-mode>
      <div class="pikk-rooms-head"><h3 style="margin:0">Group Rooms</h3><span class="chip">TEST MODE</span></div>
      <p class="muted small">Pick a topic, then start a Video, Voice or Text session. Demo shell only — no camera or microphone is used and no real people join.</p>
      <div id="roomSetup">
        <label class="field">Topic (${ROOM_GROUPS.reduce((n, g) => n + g.names.length, 0)} rooms)
          <select id="roomTopic"><option value="">Choose a topic…</option>${opts}</select></label>
        <div class="row wrap" role="group" aria-label="Session type" style="gap:6px;margin:8px 0">${modes}</div>
        <button type="button" class="btn primary" id="roomStart">${user ? 'Start session' : 'Start demo session'}</button>
      </div>
      <section class="pikk-room-shell" id="roomShell" hidden aria-label="Group room (demo)">
        <div class="pikk-room-bar">
          <strong id="roomTitle">Room</strong> <span class="chip" id="roomModeChip">Video</span> <span class="chip">TEST MODE</span>
          <label class="row" style="gap:4px;margin-left:auto">View as <select id="roomRole"><option value="host">Host</option><option value="member">Member</option></select></label>
        </div>
        <div class="pikk-room-stage" id="roomStage">
          <div class="pikk-room-seat" data-seat="you"><span aria-hidden="true">◉</span><small>You · camera &amp; mic off (demo)</small></div>
          <div class="pikk-room-seat" data-seat="guest"><span aria-hidden="true">?</span><small>Open seat · placeholder, not a real user</small></div>
        </div>
        <div class="pikk-room-pinned" id="roomPinned" hidden role="status"></div>
        <p class="pikk-room-activity muted small" id="roomActivity" aria-live="polite">Demo-only activity (this device): 1 participant (you) · 0 messages · 0 reactions · 0 hand raises</p>
        <div class="row wrap" style="gap:6px">${reacts}
          <button type="button" class="chip pikk-chip" id="roomRaiseHand" aria-pressed="false">✋ Raise hand / Request to speak</button></div>
        <div class="pikk-room-host" id="roomHostTools">
          <h4 style="margin:10px 0 6px">Host tools</h4>
          <ul class="list-plain" id="roomQueue"><li class="muted small">No speaker requests yet.</li></ul>
          <div class="row wrap" style="gap:6px">
            <button type="button" class="chip pikk-chip" id="roomOpenMics" aria-pressed="false">Open microphones</button>
            <button type="button" class="chip pikk-chip" data-host-act="cohost">Make co-host</button>
            <button type="button" class="chip pikk-chip" data-host-act="mute">Mute</button>
            <button type="button" class="chip pikk-chip" data-host-act="remove">Remove</button>
            <button type="button" class="chip pikk-chip" data-host-act="block">Block / Report</button>
          </div>
          <div class="pikk-room-pin-tools row wrap" style="gap:6px;margin-top:8px">
            <input id="roomPinText" maxlength="120" placeholder="Thank a supporter (pinned acknowledgement)" style="flex:1 1 180px" />
            <select id="roomPinMins" aria-label="Pin duration">${pins}</select>
            <button type="button" class="chip pikk-chip" id="roomPinBtn">Pin thank-you</button>
          </div>
        </div>
        ${goalHtml}
        <div class="pikk-room-chat"><ul class="list-plain" id="roomChat" aria-label="Room chat"></ul>
          <form id="roomChatForm" class="row" style="gap:6px"><input id="roomChatInput" maxlength="200" placeholder="Message the room" style="flex:1" aria-label="Chat message" /><button class="btn" type="submit">Send</button></form></div>
        <button type="button" class="btn ghost" id="roomLeave">Leave Room</button>
        <p class="muted small">Safety: be respectful; Block / Report ends contact immediately. Real rooms launch only with moderation and age checks.</p>
      </section>
    </div>`;
}

export function bindGroupRooms(root, { toast = () => {} } = {}) {
  const panel = root.querySelector('#liveTabRooms'); if (!panel) return;
  const $ = (s) => panel.querySelector(s);
  const st = { mode: 'Video', msgs: 0, reacts: 0, hands: 0, queue: [], open: false, pinTimer: null };
  const activity = () => { $('#roomActivity').textContent = `Demo-only activity (this device): 1 participant (you) · ${st.msgs} messages · ${st.reacts} reactions · ${st.hands} hand raises`; };
  const say = (who, text) => { const li = document.createElement('li'); li.innerHTML = `<strong>${e(who)}:</strong> ${e(text)}`; $('#roomChat').appendChild(li); };
  const renderQueue = () => {
    $('#roomQueue').innerHTML = st.queue.length ? st.queue.map((q, i) => `<li class="row" style="gap:6px">✋ ${e(q)} <button type="button" class="chip pikk-chip" data-approve="${i}">Approve speaker</button></li>`).join('') : '<li class="muted small">No speaker requests yet.</li>';
    panel.querySelectorAll('[data-approve]').forEach((b) => b.addEventListener('click', () => { const who = st.queue.splice(+b.dataset.approve, 1)[0]; say('System', `${who} approved to speak (demo)`); renderQueue(); }));
  };
  panel.querySelectorAll('.pikk-room-mode').forEach((b) => b.addEventListener('click', () => {
    st.mode = b.dataset.roomMode;
    panel.querySelectorAll('.pikk-room-mode').forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
  }));
  $('#roomStart').addEventListener('click', () => {
    const topic = $('#roomTopic').value; if (!topic) return toast('Pick a topic first');
    $('#roomTitle').textContent = topic; $('#roomModeChip').textContent = st.mode + (st.mode === 'Text' ? ' chat' : ' (demo · no camera/mic)');
    $('#roomStage').hidden = st.mode === 'Text';
    $('#roomSetup').hidden = true; $('#roomShell').hidden = false;
    say('System', `${st.mode} session started in ${topic} · TEST MODE`);
  });
  $('#roomRole').addEventListener('change', (ev) => { $('#roomHostTools').hidden = ev.target.value !== 'host'; });
  $('#roomChatForm').addEventListener('submit', (ev) => { ev.preventDefault(); const v = $('#roomChatInput').value.trim(); if (!v) return; say('You', v); st.msgs++; $('#roomChatInput').value = ''; activity(); });
  panel.querySelectorAll('.pikk-room-react').forEach((b) => b.addEventListener('click', () => { st.reacts++; activity(); }));
  $('#roomRaiseHand').addEventListener('click', (ev) => {
    const on = ev.currentTarget.getAttribute('aria-pressed') !== 'true';
    ev.currentTarget.setAttribute('aria-pressed', String(on)); ev.currentTarget.classList.toggle('on', on);
    if (on) { st.hands++; st.queue.push('You'); } else st.queue = st.queue.filter((q) => q !== 'You');
    renderQueue(); activity();
  });
  $('#roomOpenMics').addEventListener('click', (ev) => { st.open = !st.open; ev.currentTarget.setAttribute('aria-pressed', String(st.open)); ev.currentTarget.classList.toggle('on', st.open); say('System', `Open microphones ${st.open ? 'on' : 'off'} (demo)`); });
  panel.querySelectorAll('[data-host-act]').forEach((b) => b.addEventListener('click', () => {
    const a = b.dataset.hostAct; say('System', { cohost: 'Open seat made co-host', mute: 'Open seat muted', remove: 'Open seat removed', block: 'Open seat blocked & reported to moderation' }[a] + ' (demo · no real user)');
  }));
  $('#roomPinBtn').addEventListener('click', () => {
    const t = $('#roomPinText').value.trim(); if (!t) return toast('Write a thank-you first');
    const mins = +$('#roomPinMins').value; const until = Date.now() + mins * 60000; const pin = $('#roomPinned');
    clearInterval(st.pinTimer);
    const tick = () => { const left = until - Date.now(); if (left <= 0 || !document.body.contains(pin)) { pin.hidden = true; clearInterval(st.pinTimer); return; } pin.hidden = false; pin.innerHTML = `📌 <strong>Pinned thank-you</strong> · ${e(t)} <small>(${Math.ceil(left / 60000)} min left · TEST MODE)</small>`; };
    tick(); st.pinTimer = setInterval(tick, 15000);
  });
  $('#roomLeave').addEventListener('click', () => {
    clearInterval(st.pinTimer); $('#roomShell').hidden = true; $('#roomSetup').hidden = false; $('#roomChat').innerHTML = '';
    Object.assign(st, { msgs: 0, reacts: 0, hands: 0, queue: [] }); renderQueue(); activity(); toast('You left the room');
  });
}
