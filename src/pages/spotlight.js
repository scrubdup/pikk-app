import {
  getState,
  followUser,
  unfollowUser,
  isAdmin,
  getSpotlightState,
  getSpotlightHouseTrack,
  advanceSpotlightHouseTrack,
  joinSpotlightQueue,
  leaveSpotlightQueue,
  removeFromSpotlightQueue,
  skipSpotlight,
  endSpotlightSet,
  castKeepGoing,
  simulateFanKeepGoing,
  castPlayAnother,
  simulateFanPlayAnother,
  reactSpotlight,
  sendSpotlightChat,
  listSpotlightHistory,
  tickSpotlight,
} from '../store.js';
import { esc, toast, shellPage, timeAgo, ytEmbedSrc } from '../ui.js';
import { asset } from '../asset.js';
import { navigate } from '../router.js';

let clockTimer = null;

function refresh() {
  navigate('#/spotlight');
}

function stopClock() {
  if (clockTimer) {
    clearInterval(clockTimer);
    clockTimer = null;
  }
}

function fmtClock(msLeft) {
  const s = Math.max(0, Math.ceil(msLeft / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function typeLabel(type) {
  if (type === 'freestyle') return 'Live Freestyle';
  if (type === 'beat') return 'Beat';
  if (type === 'music_video') return 'Music Video';
  return 'Song';
}

function isFollowing(targetId) {
  const user = getState().user;
  if (!user || !targetId) return false;
  return (user.following || []).includes(targetId);
}

function canMod() {
  // Demo admin only; ordinary fans keep their own leave/end-set controls.
  return isAdmin();
}

function renderSignIn() {
  return shellPage(
    '24/7 Spotlight',
    `<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,
    { lead: 'Continuous music showcase · votes ≠ paid advantage · TEST MODE' }
  );
}

function renderRules(thresholds) {
  return `
    <div class="card sp-rules">
      <h3>How 24/7 Spotlight works</h3>
      <ul class="sp-rules-list">
        <li><strong>Always-on stage</strong> — FIFO queue. Current performer, next-up, and estimated wait are visible.</li>
        <li><strong>Join once</strong> — Song, Beat, Music Video, or Live Freestyle. One active queue spot per user.</li>
        <li><strong>Live Freestyle</strong> — ${Math.round((thresholds.freestyleMs || 60000) / 1000)}s timer. Fans press <strong>Keep Going</strong> (threshold ${thresholds.keepGoing}). Max ${thresholds.maxExtensions} extensions · <strong>3 min total</strong>.</li>
        <li><strong>Uploaded Music</strong> — After End set, audience votes <strong>Play Another?</strong> (threshold ${thresholds.playAnother}). Max <strong>${thresholds.maxUploadStreak}</strong> in a row, then next in queue.</li>
        <li><strong>Votes extend stage time or pick the next track</strong> — they are <em>not</em> wagers, cash prizes, or paid voting advantage. Distinct from Gift Battles.</li>
        <li><strong>House catalog</strong> plays when the queue is empty — real DatBoiSkeet YouTube (Music Videos · Interviews · BTS/vlogs). Labeled <em>House · …</em> · never a fake live act · original source only.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · no real uploads / WebRTC · background music pause wiring later.</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/music">Music / Coming Soon</a>
        <a class="btn ghost" href="#/live">Live</a>
        <a class="btn ghost" href="#/giftbattles">Gift Battles</a>
        <a class="btn ghost" href="#/openmic">Open Mic</a>
      </div>
    </div>`;
}

function renderHouse(house, { showSkip = true } = {}) {
  const chip = house.chipLabel || house.status || 'House rotation';
  const embed = house.embed ? ytEmbedSrc(house.embed, 'rel=0') : '';
  return `
    <div class="card sp-stage sp-house" role="status">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${esc(chip)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      ${
        embed
          ? `<div class="sp-house-embed hero-video" style="margin-top:12px">
               <iframe src="${esc(embed)}" title="${esc(house.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`
          : ''
      }
      <div class="sp-now">
        ${house.cover ? `<img class="sp-cover" src="${esc(asset(house.cover))}" alt="" />` : ''}
        <div>
          <div class="sp-now-title">${esc(house.title)}</div>
          <div class="sp-now-meta">${esc(house.artist || 'DatBoiSkeet')} · house catalog</div>
          <p class="muted sp-note">${esc(house.note || 'Approved catalog filler · not a live act')}</p>
          ${
            house.youtube
              ? `<p style="margin:8px 0 0"><a class="btn ghost" href="${esc(house.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`
              : ''
          }
        </div>
      </div>
      ${
        showSkip && canMod()
          ? `<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`
          : ''
      }
    </div>`;
}

function renderStage(np, thresholds) {
  if (!np || np.house) {
    const house = np && np.house
      ? {
          id: np.id,
          title: np.title,
          artist: np.artist,
          embed: np.embed,
          youtube: np.youtube,
          chipLabel: np.chipLabel || 'House · Music Video',
          note: np.note,
          cover: np.cover,
          kind: np.houseKind,
        }
      : getSpotlightHouseTrack();
    return renderHouse(house);
  }

  const user = getState().user;
  const isFreestyle = np.type === 'freestyle';
  const msLeft = isFreestyle && np.endsAt ? Math.max(0, np.endsAt - Date.now()) : null;
  const kgVotes = Object.keys(np.keepGoingVotes || {}).length;
  const paVotes = Object.keys(np.playAnotherVotes || {}).length;
  const followId = np.userId;
  const following = isFollowing(followId);
  const isSelf = user && user.id === np.userId;
  const reactions = np.reactions || { fire: 0, heart: 0, clap: 0 };

  const timerBlock = isFreestyle
    ? `<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${np.extensions || 0}/${thresholds.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${fmtClock(msLeft || 0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${kgVotes}/${thresholds.keepGoing} · refresh recovers endsAt</div>
       </div>`
    : `<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${np.playCount || 1}/${thresholds.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`;

  const voteBlock = np.awaitingPlayAnother
    ? `<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${paVotes}/${thresholds.playAnother} · window ends ${np.playAnotherDeadline ? timeAgo(np.playAnotherDeadline) : 'soon'} (deadline-based)</p>
         <div class="row wrap" style="gap:8px">
           <button class="btn primary" id="spPlayAnother">Play Another</button>
           <button class="btn ghost" id="spSimPlayAnother">+2 fan votes (demo)</button>
         </div>
       </div>`
    : isFreestyle
      ? `<div class="card sp-vote">
           <h3>Keep Going</h3>
           <p class="muted">Votes extend stage time only — not paid advantage · ${kgVotes}/${thresholds.keepGoing}</p>
           <div class="row wrap" style="gap:8px">
             <button class="btn primary" id="spKeepGoing" ${(np.extensions || 0) >= thresholds.maxExtensions ? 'disabled' : ''}>Keep Going</button>
             <button class="btn ghost" id="spSimKeepGoing" ${(np.extensions || 0) >= thresholds.maxExtensions ? 'disabled' : ''}>+2 fan votes (demo)</button>
           </div>
         </div>`
      : '';

  const followBtn = isSelf
    ? ''
    : following
      ? `<button class="btn ghost sp-follow" data-follow="${esc(followId)}" data-on="1">Following</button>`
      : `<button class="btn ghost sp-follow" data-follow="${esc(followId)}" data-on="0">Follow</button>`;

  return `
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${esc(typeLabel(np.type))}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="sp-now">
        <div class="sp-avatar" aria-hidden="true">${esc((np.username || '?').slice(0, 2).toUpperCase())}</div>
        <div>
          <div class="sp-now-title">${esc(np.title)}</div>
          <div class="sp-now-meta">${esc(np.artist || np.username)} · ${esc(np.username)}</div>
          <div class="row wrap sp-perf-actions" style="gap:8px;margin-top:8px">
            ${followBtn}
            <a class="btn ghost" href="#/profile">Profile</a>
            <a class="btn ghost" href="#/music">Music</a>
            <a class="btn ghost" href="#/giftbattles">Gifts</a>
            <a class="btn ghost" href="#/live">Live</a>
          </div>
        </div>
      </div>
      ${timerBlock}
      <div class="row wrap sp-reacts" style="gap:8px;margin-top:10px">
        <button class="btn ghost sp-react" data-kind="fire">🔥 ${reactions.fire || 0}</button>
        <button class="btn ghost sp-react" data-kind="heart">❤️ ${reactions.heart || 0}</button>
        <button class="btn ghost sp-react" data-kind="clap">👏 ${reactions.clap || 0}</button>
      </div>
    </div>
    ${voteBlock}`;
}

function renderQueue(queue, nowPlaying, user) {
  const waitMin = (i) => Math.max(1, (i + (nowPlaying ? 1 : 0)) * 2);
  const rows = (queue || [])
    .map(
      (q, i) => `
      <li class="sp-q-row">
        <div>
          <strong>${esc(q.username)}</strong>
          <span class="muted"> · ${esc(typeLabel(q.type))} · ${esc(q.title)}</span>
          <div class="muted" style="font-size:12px">${i === 0 ? 'Next up' : `#${i + 1}`} · ~${waitMin(i)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${
            user && q.userId === user.id
              ? `<button class="btn ghost sp-leave-q">Leave</button>`
              : ''
          }
          ${
            canMod()
              ? `<button class="btn ghost sp-remove-q" data-qid="${esc(q.id)}" title="Admin · TEST MODE">Remove</button>`
              : ''
          }
        </div>
      </li>`
    )
    .join('');

  const inQueue = user && (queue || []).some((q) => q.userId === user.id);
  const onStage = user && nowPlaying && !nowPlaying.house && nowPlaying.userId === user.id;

  return `
    <div class="card sp-queue">
      <h3>FIFO queue</h3>
      <p class="muted" style="margin-top:0">${queue.length ? queue.length + ' waiting' : 'Queue empty — house catalog on stage'}${nowPlaying && !nowPlaying.house ? ' · now: ' + esc(nowPlaying.username) : nowPlaying && nowPlaying.house ? ' · house: ' + esc(nowPlaying.chipLabel || 'House') : ''}</p>
      <ul class="sp-list">${rows || '<li class="muted">No one waiting</li>'}</ul>
      ${
        inQueue || onStage
          ? `<p class="muted">You already have a spot (${onStage ? 'on stage' : 'in queue'}). One active spot per user.</p>
             ${inQueue ? '<button class="btn ghost" id="spLeaveQueue">Leave queue</button>' : ''}`
          : `<form id="spJoinForm" class="sp-join">
               <label class="field"><span>Type</span>
                 <select name="type" id="spType">
                   <option value="song">Song</option>
                   <option value="beat">Beat</option>
                   <option value="music_video">Music Video</option>
                   <option value="freestyle">Live Freestyle</option>
                 </select>
               </label>
               <label class="field"><span>Title</span>
                 <input name="title" id="spTitle" maxlength="80" placeholder="Track or freestyle label" />
               </label>
               <label class="field"><span>Artist</span>
                 <input name="artist" id="spArtist" maxlength="60" placeholder="${esc(user?.username || 'You')}" />
               </label>
               <p class="muted" style="font-size:12px">Upload processing is out of scope — demo joins with metadata only. Rights confirmation implied (TEST MODE).</p>
               <button class="btn primary" type="submit">Join queue</button>
             </form>`
      }
    </div>`;
}

function renderMod(np) {
  if (!canMod()) return '';
  const adminChip = 'Admin · TEST MODE';
  const real = np && !np.house;
  return `
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${esc(adminChip)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${np ? '' : 'disabled'}>Skip current</button>
        ${
          real && np.type !== 'freestyle' && !np.awaitingPlayAnother
            ? `<button class="btn ghost" id="spEndSet">End set</button>`
            : ''
        }
      </div>
    </div>`;
}

function renderPerformerEndSet(np) {
  const user = getState().user;
  if (!np || np.house || np.type === 'freestyle' || np.awaitingPlayAnother) return '';
  if (!user) return '';
  // Performer can always end own set; mod button also in mod card
  if (user.id !== np.userId) return '';
  return `
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`;
}

function renderChat(np) {
  if (!np || np.house) return '';
  const rows = (np.chat || [])
    .slice(-20)
    .map(
      (c) =>
        `<div class="sp-chat-row ${c.system ? 'system' : ''}"><strong>${esc(c.username)}</strong>${esc(c.text)}</div>`
    )
    .join('');
  return `
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${rows || '<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`;
}

function renderHistory(history) {
  if (!history.length) {
    return `
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`;
  }
  const items = history
    .slice(0, 12)
    .map(
      (h) =>
        `<li><strong>${esc(h.username)}</strong> · ${esc(typeLabel(h.type))} · ${esc(h.title)}
         <span class="muted"> · ${esc(h.reason || 'ended')} · ${timeAgo(h.endedAt)}</span></li>`
    )
    .join('');
  return `
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${items}</ul>
    </div>`;
}

export function renderSpotlight() {
  tickSpotlight();
  const user = getState().user;
  if (!user) return renderSignIn();

  const st = getSpotlightState();
  const history = listSpotlightHistory(12);

  return shellPage(
    '24/7 Spotlight',
    `${renderRules(st.thresholds)}
     ${renderStage(st.nowPlaying, st.thresholds)}
     ${renderPerformerEndSet(st.nowPlaying)}
     ${renderMod(st.nowPlaying)}
     ${renderQueue(st.queue, st.nowPlaying, user)}
     ${renderChat(st.nowPlaying)}
     ${renderHistory(history)}`,
    { lead: 'Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE' }
  );
}

export function bindSpotlight(root) {
  stopClock();
  tickSpotlight();

  const st = getSpotlightState();
  const np = st.nowPlaying;
  if (np && np.type === 'freestyle' && np.endsAt) {
    const clock = root.querySelector('#spClock');
    clockTimer = setInterval(() => {
      tickSpotlight();
      const cur = getSpotlightState().nowPlaying;
      if (!cur || cur.type !== 'freestyle' || !cur.endsAt) {
        stopClock();
        refresh();
        return;
      }
      const left = Math.max(0, cur.endsAt - Date.now());
      if (clock) clock.textContent = fmtClock(left);
      if (left <= 0) {
        stopClock();
        tickSpotlight();
        refresh();
      }
    }, 250);
  }

  // Play Another deadline auto-refresh
  if (np && np.awaitingPlayAnother && np.playAnotherDeadline) {
    const ms = Math.max(0, np.playAnotherDeadline - Date.now()) + 50;
    setTimeout(() => {
      tickSpotlight();
      refresh();
    }, Math.min(ms, 35000));
  }

  root.querySelector('#spJoinForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = root.querySelector('#spType')?.value || 'song';
    const title = root.querySelector('#spTitle')?.value || '';
    const artist = root.querySelector('#spArtist')?.value || '';
    const res = joinSpotlightQueue({ type, title, artist });
    if (res.error === 'signin') return toast('Sign in first');
    if (res.error === 'already_queued') return toast('You already have a queue/stage spot');
    toast(type === 'freestyle' ? 'Freestyle — you\'re up or in queue' : 'Joined Spotlight queue');
    refresh();
  });

  root.querySelector('#spLeaveQueue')?.addEventListener('click', () => {
    const res = leaveSpotlightQueue();
    if (res.error) return toast('Not in queue');
    toast('Left queue');
    refresh();
  });

  root.querySelectorAll('.sp-leave-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      leaveSpotlightQueue();
      toast('Left queue');
      refresh();
    });
  });

  root.querySelectorAll('.sp-remove-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = removeFromSpotlightQueue(btn.getAttribute('data-qid'));
      if (res.error) return toast('Cannot remove: ' + res.error);
      toast('Removed from queue (admin demo)');
      refresh();
    });
  });

  const doSkip = () => {
    const before = getSpotlightState().nowPlaying;
    const result = skipSpotlight();
    if (result.error) return toast('Cannot skip: ' + result.error);
    const after = getSpotlightState().nowPlaying;
    if (after && after.house) toast('Next house · ' + (after.chipLabel || 'House'));
    else if (after) toast('Skipped · ' + (after.username || 'next') + ' on stage');
    else toast('Skipped');
    refresh();
  };
  root.querySelector('#spSkip')?.addEventListener('click', doSkip);
  root.querySelector('#spSkipHouse')?.addEventListener('click', doSkip);

  const endSet = () => {
    const res = endSpotlightSet();
    if (res.error === 'max_streak' || res.ok) {
      toast(res.error === 'max_streak' ? 'Max 3 in a row — advancing' : 'Play Another? vote open');
      refresh();
      return;
    }
    if (res.error) toast('Cannot end set: ' + res.error);
    else refresh();
  };
  root.querySelector('#spEndSet')?.addEventListener('click', endSet);
  root.querySelector('#spEndSetSelf')?.addEventListener('click', endSet);

  root.querySelector('#spKeepGoing')?.addEventListener('click', () => {
    const res = castKeepGoing();
    if (res.error === 'already_voted') return toast('Already voted');
    if (res.error === 'max_extensions') return toast('Max extensions reached');
    if (res.error) return toast(res.error);
    toast('Keep Going counted');
    refresh();
  });

  root.querySelector('#spSimKeepGoing')?.addEventListener('click', () => {
    simulateFanKeepGoing(2);
    toast('+2 simulated fan votes');
    refresh();
  });

  root.querySelector('#spPlayAnother')?.addEventListener('click', () => {
    const res = castPlayAnother();
    if (res.error === 'already_voted') return toast('Already voted');
    if (res.error) return toast(res.error);
    toast('Play Another vote counted');
    refresh();
  });

  root.querySelector('#spSimPlayAnother')?.addEventListener('click', () => {
    simulateFanPlayAnother(2);
    toast('+2 simulated fan votes');
    refresh();
  });

  root.querySelectorAll('.sp-follow').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-follow');
      const on = btn.getAttribute('data-on') === '1';
      if (on) {
        unfollowUser(id);
        toast('Unfollowed');
      } else {
        followUser(id);
        toast('Following');
      }
      refresh();
    });
  });

  root.querySelectorAll('.sp-react').forEach((btn) => {
    btn.addEventListener('click', () => {
      reactSpotlight(btn.getAttribute('data-kind') || 'fire');
      refresh();
    });
  });

  root.querySelector('#spChatForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = root.querySelector('#spChatInput');
    const res = sendSpotlightChat(input?.value || '');
    if (res.error === 'empty') return;
    if (res.error) return toast(res.error);
    if (input) input.value = '';
    refresh();
  });
}
