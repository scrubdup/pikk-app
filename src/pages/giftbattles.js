import { renderGiftBattleExplainer } from '../live-gift-battle.js';
import {
  getState,
  listDemoBattleStreamers,
  GB_DURATION_MS,
  GB_CHAMPION_MS,
  getGiftBattlePrefs,
  setGiftBattlePrefs,
  getActiveGiftBattle,
  startGiftBattle,
  acceptGiftBattle,
  declineGiftBattle,
  clearActiveGiftBattle,
  recordBattleGift,
  tickGiftBattle,
  listBattleHistory,
  getChampion,
  listTopBattleWinners,
  listDailyBattleWinners,
  getGiftBattleDayWindow,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';
import { getGiftSticker, giftStickerHtml } from '../gifts-stickers.js';

let countdownTimer = null;

function refresh(hash) {
  navigate(hash || '#/giftbattles');
}

function stopCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}

function fmtClock(msLeft) {
  const s = Math.max(0, Math.ceil(msLeft / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function renderSignIn() {
  return shellPage(
    'Gift Battles',
    `<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Gift battles need a local demo account so scores and history persist on this device.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,
    { lead: 'Runs during Live · not a separate stream · voluntary support · TEST MODE' }
  );
}

function renderRules() {
  return `
    <div class="card gb-rules">
      <h3>How PIKK Battles work</h3>
      <ul class="gb-rules-list">
        <li><strong>Streamer vs streamer.</strong> A live streamer invites another live streamer; the invited streamer accepts or declines. Viewers cannot be contestants.</li>
        <li>Split screen · <strong>${GB_DURATION_MS / 1000}-second</strong> countdown starts when the invite is accepted.</li>
        <li>Viewers send <strong>TEST gifts</strong> to a streamer&apos;s side. Score = TEST gift points <em>(scoring weights · owner verification needed)</em>.</li>
        <li>Higher score wins and the winner is announced. Equal scores = tie, no badge <em>(tie handling · owner verification needed)</em>.</li>
        <li>The winner gets a <strong>${GB_CHAMPION_MS / 3600000}-hour champion badge</strong>, counted from the moment of the win.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · TEST gifts only · no real payments, wallet charges or server events.</p>
    </div>`;
}

function renderChampion(champ) {
  if (!champ) {
    return `
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion. Win a battle to earn the 24-hour champion badge.</p>
      </div>`;
  }
  const left = Math.max(0, (champ.championUntil || 0) - Date.now());
  const hrs = Math.floor(left / 3600000);
  const mins = Math.floor((left % 3600000) / 60000);
  const crown = getGiftSticker('battle-crown', { className: 'gift-sticker gift-sticker--battle' }).html;
  return `
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${crown}</span>
        <div class="chip" data-gb-badge>Champion · 24-hour badge</div>
      </div>
      <h3 class="gb-champion-name">${esc(champ.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${esc(String(champ.score))} TEST pts · badge expires in ~${hrs}h ${mins}m
        (<time data-gb-badge-expires datetime="${new Date(champ.championUntil).toISOString()}">${esc(new Date(champ.championUntil).toLocaleString())}</time>)
      </p>
    </div>`;
}

function renderLiveGate(liveActive, live) {
  if (liveActive) {
    return `
      <div class="card gb-live-banner">
        <span class="chip">LIVE</span>
        <strong style="margin-left:8px">${esc(live.title || 'Live')}</strong>
        <p class="muted" style="margin:6px 0 0">You are streaming, so you can invite another live streamer.</p>
      </div>`;
  }
  return `
    <div class="card" data-gb-gate="not-streamer">
      <h3>Only streamers can battle</h3>
      <p class="muted">PIKK Battles are streamer vs streamer. Go live first, then invite another live streamer. Viewers cannot be contestants.</p>
      <a class="btn primary" href="#/live">Go live first</a>
    </div>`;
}

function splitScreen(battle) {
  const tile = (who, score, side) => `<div class="gb-split-tile" data-gb-tile="${side}" style="flex:1;min-width:0;text-align:center;border:2px dashed currentColor;border-radius:12px;padding:10px">
      <div class="muted" style="font-size:12px">TEST MODE · placeholder stream · no camera</div>
      <strong>${esc(who.name)}</strong>
      <div class="gb-score" id="gbScore${side}">${esc(String(score))} pts</div>
    </div>`;
  return `<div class="gb-split" role="group" aria-label="Split screen" style="display:flex;gap:8px;align-items:stretch">
      ${tile(battle.challenger, battle.scoreA, 'A')}<div class="gb-vs" aria-hidden="true" style="align-self:center">VS</div>${tile(battle.opponent, battle.scoreB, 'B')}
    </div>`;
}

function renderPending(battle) {
  return `
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Invite sent</h3>
      <p><strong>${esc(battle.challenger.name)}</strong> invited streamer <strong>${esc(battle.opponent.name)}</strong>. The countdown starts when they accept.</p>
      ${splitScreen(battle)}
      <p class="muted" style="margin-top:10px">Test control: act as the invited test streamer.</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn primary" id="gbAccept">Accept as ${esc(battle.opponent.name)}</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline as ${esc(battle.opponent.name)}</button>
      </div>
    </div>`;
}

function renderActive(battle) {
  const msLeft = Math.max(0, (battle.endsAt || 0) - Date.now());
  const gifts = (side, who) => [1, 5, 10].map((n) => `<button type="button" class="btn" data-gb-gift="${side}" data-kind="gift" data-amt="${n}">TEST gift ${n} → ${esc(who.name)}</button>`).join('');
  return `
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${esc(fmtClock(msLeft))}</span>
      </div>
      ${splitScreen(battle)}
      <h3 style="margin-top:16px">Viewers: send a TEST gift to a streamer</h3>
      <div class="row wrap" style="gap:8px">${gifts('challenger', battle.challenger)}</div>
      <div class="row wrap" style="gap:8px;margin-top:8px">${gifts('opponent', battle.opponent)}</div>
      <p class="muted" style="margin:8px 0 0">TEST points only · no wallet charge or payment.</p>
    </div>`;
}

function renderEnded(battle) {
  let headline = 'Tie';
  let sub = 'Equal scores · no badge (tie handling · owner verification needed)';
  if (battle.result === 'win' && battle.winnerName) {
    headline = `Winner · ${battle.winnerName}`;
    sub = '24-hour champion badge awarded from the moment of the win';
  } else if (battle.result === 'declined') {
    headline = 'Declined';
    sub = 'The invited streamer declined';
  }
  const winSticker = battle.result === 'win'
    ? getGiftSticker('battle-win', { className: 'gift-sticker gift-sticker--battle' }).html
    : '';
  return `
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${winSticker ? `<span class="gb-sticker-slot" aria-hidden="true">${winSticker}</span>` : ''}
        <div class="chip">${battle.result === 'win' ? 'Winner' : battle.result === 'tie' ? 'Tie' : 'Ended'}</div>
      </div>
      <h3 class="gb-winner-banner">${esc(headline)}</h3>
      <p class="muted">${esc(sub)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${esc(battle.challenger?.name || '?')} ${esc(String(battle.scoreA))} —
        ${esc(battle.opponent?.name || '?')} ${esc(String(battle.scoreB))} TEST pts
      </p>
      <button type="button" class="btn primary" id="gbClear">New battle</button>
    </div>`;
}

function renderChallengeForm(liveActive, prefs) {
  if (!liveActive) return '';
  const opts = listDemoBattleStreamers().map((f) => `<option value="${esc(f.id)}">${esc(f.name)} — ${esc(f.bio)}</option>`).join('');
  return `
    <div class="card">
      <h3>Invite a live streamer</h3>
      ${!prefs.invitationsEnabled ? '<p class="gb-warn">Invitations are disabled in prefs — enable below to invite.</p>' : ''}
      <label class="field"><span>Streamer</span><select id="gbOpponent">${opts}</select></label>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbInvite" ${!prefs.invitationsEnabled ? 'disabled' : ''}>Send battle invite</button>
      </div>
      <p class="muted" style="margin:10px 0 0">Test streamers only · TEST MODE</p>
    </div>`;
}

function renderDailyWinnersBoard() {
  const day = listDailyBattleWinners(10);
  const cells = day.length
    ? day
        .map((w, i) => {
          const st = giftStickerHtml('battle-win', { className: 'gift-sticker gift-sticker--xs' });
          return `<li class="gb-day-row">${st}<span class="chip">#${i + 1}</span><strong>${esc(w.username)}</strong></li>`;
        })
        .join('')
    : '<li class="muted">No winners yet today</li>';
  return `
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${day.length}/10 · won today · badge 24h</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Winners of battles that ended today · TEST MODE</p>
      <ol class="gb-list gb-day-list">${cells}</ol>
    </div>`;
}

function renderHistoryAndTops() {
  const hist = listBattleHistory(12);
  const tops = listTopBattleWinners(15);
  const histRows = hist.length
    ? hist
        .map((h) => {
          const label =
            h.result === 'win'
              ? `Winner ${h.winnerName}`
              : h.result === 'tie'
                ? 'Tie'
                : h.result || h.status;
          return `<li>
            <strong>${esc(label)}</strong>
            <span class="muted"> · ${esc(h.challenger?.name || '?')} ${esc(String(h.scoreA))} vs ${esc(h.opponent?.name || '?')} ${esc(String(h.scoreB))} pts · ${esc(timeAgo(h.endedAt || h.createdAt || 0))} · ${esc(h.mode || '')}</span>
          </li>`;
        })
        .join('')
    : '<li class="muted">No battles yet.</li>';
  const topRows = tops.length
    ? tops
        .map(
          (t, i) =>
            `<li><span class="chip">#${i + 1}</span> <strong>${esc(t.username)}</strong> <span class="muted">${t.wins} win${t.wins === 1 ? '' : 's'} · ${esc(String(t.points))} TEST pts</span></li>`
        )
        .join('')
    : '<li class="muted">Win a battle to appear here.</li>';
  return `
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${topRows}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${histRows}</ul>
    </div>`;
}

function renderPrefs(prefs) {
  return `
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${prefs.invitationsEnabled ? 'checked' : ''}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`;
}

export function renderGiftBattles() {
  const { user, live } = getState();
  // t401u: explainer is the main view; no sign-in wall.
  if (!user) return shellPage('Gift Battles', renderGiftBattleExplainer(), { lead: 'Runs inside Live & Group Rooms · voluntary support · TEST MODE' });

  // Finalize expired battles on render
  tickGiftBattle();
  const battle = getActiveGiftBattle();
  const prefs = getGiftBattlePrefs();
  const champ = getChampion();
  const liveActive = !!(live && !live.endedAt);

  let battleBlock = '';
  if (battle?.status === 'pending') battleBlock = renderPending(battle);
  else if (battle?.status === 'active') battleBlock = renderActive(battle);
  else if (battle?.status === 'ended') battleBlock = renderEnded(battle);
  else battleBlock = renderChallengeForm(liveActive, prefs);

  const body = `
    ${renderGiftBattleExplainer()}
    ${renderRules()}
    ${renderChampion(champ)}
    ${renderDailyWinnersBoard()}
    ${renderLiveGate(liveActive, live)}
    ${battleBlock}
    ${renderHistoryAndTops()}
    ${renderPrefs(prefs)}
  `;

  return shellPage('Gift Battles', body, {
    lead: 'Streamer vs streamer · 60s countdown · 24-hour champion badge · TEST MODE',
    badge: battle?.status === 'active' ? 'BATTLE' : champ ? 'CHAMP' : undefined,
  });
}

export function bindGiftBattles(root) {
  stopCountdown();

  root.querySelector('#gbPrefInvites')?.addEventListener('change', (e) => {
    setGiftBattlePrefs({ invitationsEnabled: e.target.checked });
    toast(e.target.checked ? 'Invitations on' : 'Invitations off');
  });

  root.querySelector('#gbInvite')?.addEventListener('click', () => {
    const res = startGiftBattle({ opponentId: root.querySelector('#gbOpponent')?.value });
    const msg = { signin: 'Sign in first', invites_disabled: 'Invitations disabled', not_streamer: 'Only live streamers can invite', opponent_not_streamer: 'You can only invite a live streamer', battle_in_progress: 'Battle already in progress', self: 'Pick another streamer' };
    if (res?.error) return toast(msg[res.error] || String(res.error));
    toast('Invite sent · waiting for the streamer to accept');
    refresh();
  });

  const pendingOpp = () => getActiveGiftBattle()?.opponent?.id;
  root.querySelector('#gbAccept')?.addEventListener('click', () => {
    const res = acceptGiftBattle({ actorId: pendingOpp() });
    if (res?.error) return toast(String(res.error));
    toast('Battle started · 1:00');
    refresh();
  });

  root.querySelector('#gbDecline')?.addEventListener('click', () => {
    const res = declineGiftBattle({ actorId: pendingOpp() });
    if (res?.error) return toast(String(res.error));
    toast('Invite declined');
    refresh();
  });

  root.querySelector('#gbClear')?.addEventListener('click', () => {
    const res = clearActiveGiftBattle();
    if (res?.error) return toast('Battle still running');
    refresh();
  });

  root.querySelectorAll('[data-gb-gift]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = recordBattleGift({
        side: btn.dataset.gbGift,
        kind: btn.dataset.kind || 'gift',
        amount: Number(btn.dataset.amt) || 2,
        label: btn.dataset.label || '',
      });
      if (res?.error) return toast(res.error === 'signin' ? 'Sign in first' : 'No active battle');
      if (res.battle?.status === 'ended') {
        toast(res.battle.result === 'win' ? `Winner · ${res.battle.winnerName}` : 'Tie!');
        refresh();
        return;
      }
      const a = root.querySelector('#gbScoreA');
      const b = root.querySelector('#gbScoreB');
      if (a && b) { a.textContent = `${res.battle.scoreA} pts`; b.textContent = `${res.battle.scoreB} pts`; } else refresh();
    });
  });

  // Countdown ticker for active battle
  const clock = root.querySelector('#gbClock');
  if (clock) {
    countdownTimer = setInterval(() => {
      const ended = tickGiftBattle();
      if (!ended || ended.status === 'ended') {
        stopCountdown();
        if (ended?.status === 'ended') {
          toast(ended.result === 'win' ? `Winner · ${ended.winnerName}` : 'Tie!');
        }
        refresh();
        return;
      }
      const msLeft = Math.max(0, (ended.endsAt || 0) - Date.now());
      clock.textContent = fmtClock(msLeft);
    }, 250);
  }
}
