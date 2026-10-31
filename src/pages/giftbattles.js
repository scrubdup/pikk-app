import {
  getState,
  addWalletCredit,
  listDemoBattleFans,
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
      <h3>How Gift Battles work</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Runs <strong>during Live</strong> — not its own stream product. Deep-link demo stays here.</p>
      <ul class="gb-rules-list">
        <li><strong>60-second</strong> viewer vs viewer countdown during a live (or sandbox demo).</li>
        <li>Gifts &amp; tips are <strong>voluntary fan support</strong> to the creator — <strong>not wagers</strong>.</li>
        <li>Battle winners get <strong>recognition only</strong>. They do <em>not</em> receive the opponent's money, stakes, or cash prizes.</li>
        <li>No entry fee, minimum spend, or pay-to-enter. Equal scores = tie.</li>
        <li>Battle winners are recognized for the <strong>rest of the calendar day</strong> · up to <strong>10</strong> names on the daily board.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · no real payments · no gambling.</p>
    </div>`;
}

function renderChampion(champ) {
  if (!champ) {
    return `
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
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
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${esc(champ.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${esc(fmtMoney(champ.score))} · ~${hrs}h ${mins}m left today
        · ${esc(champ.mode || 'demo')}
      </p>
    </div>`;
}

function renderLiveGate(liveActive, live) {
  if (liveActive) {
    return `
      <div class="card gb-live-banner">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <span class="chip">LIVE</span>
            <strong style="margin-left:8px">${esc(live.title || 'Live')}</strong>
            <p class="muted" style="margin:6px 0 0">Battles can use real live tip/gift stubs via sendLiveSupport.</p>
          </div>
          <a class="btn ghost" href="#/live">Open Live</a>
        </div>
      </div>`;
  }
  return `
    <div class="card">
      <h3>Go live or use sandbox</h3>
      <p class="muted">No active livestream. Start a demo stream on Live, or run a <strong>Demo battle sandbox</strong> with fake opponents (scores local + optional wallet debit).</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn primary" href="#/live">Go live first</a>
        <span class="chip">Sandbox available below</span>
      </div>
    </div>`;
}

function renderPending(battle) {
  return `
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${esc(battle.challenger.name)}</strong> challenged <strong>${esc(battle.opponent.name)}</strong></p>
      <p class="muted">Mode: ${esc(battle.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`;
}

function renderActive(battle) {
  const msLeft = Math.max(0, (battle.endsAt || 0) - Date.now());
  const clock = fmtClock(msLeft);
  return `
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${esc(clock)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${esc(battle.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${esc(fmtMoney(battle.scoreA))}">${esc(fmtMoney(battle.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${esc(battle.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${esc(fmtMoney(battle.scoreB))}">${esc(fmtMoney(battle.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${esc(battle.challenger.name)} ${esc(fmtMoney(battle.scoreA))} —
        ${esc(battle.opponent.name)} ${esc(fmtMoney(battle.scoreB))}
      </p>

      <h3 style="margin-top:16px">Send support (counts for you)</h3>
      <p class="muted" style="margin:0 0 8px">Voluntary gifts/tips to the creator. ${
        battle.mode === 'live'
          ? 'Uses Live tip/gift stubs when wallet has credits.'
          : 'Sandbox: scores local; wallet debited if balance allows.'
      }</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn" data-gb-gift="challenger" data-kind="tip" data-amt="1">Tip $1 (you)</button>
        <button type="button" class="btn primary" data-gb-gift="challenger" data-kind="gift" data-amt="2" data-label="🔥 Fire">Gift $2 (you)</button>
        <button type="button" class="btn" data-gb-gift="challenger" data-kind="gift" data-amt="5" data-label="💎 Diamond">Gift $5 (you)</button>
      </div>

      <h3 style="margin-top:16px">Demo · simulate opponent</h3>
      <p class="muted" style="margin:0 0 8px">Checker / sandbox: credit the opponent's score without switching accounts.</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn ghost" data-gb-gift="opponent" data-kind="tip" data-amt="1">Opp tip $1</button>
        <button type="button" class="btn ghost" data-gb-gift="opponent" data-kind="gift" data-amt="2" data-label="🔥 Fire">Opp gift $2</button>
      </div>
    </div>`;
}

function renderEnded(battle) {
  let headline = 'Tie';
  let sub = 'Equal voluntary support · recognition for both';
  if (battle.result === 'win' && battle.winnerName) {
    headline = `Winner · ${battle.winnerName}`;
    sub = 'Recognition only — no opponent funds transferred';
  } else if (battle.result === 'declined') {
    headline = 'Declined';
    sub = 'Challenge was declined';
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
        Final: ${esc(battle.challenger?.name || '?')} ${esc(fmtMoney(battle.scoreA))} —
        ${esc(battle.opponent?.name || '?')} ${esc(fmtMoney(battle.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`;
}

function renderChallengeForm(liveActive, prefs) {
  const fans = listDemoBattleFans();
  const opts = fans
    .map((f) => `<option value="${esc(f.id)}">${esc(f.name)} — ${esc(f.bio)}</option>`)
    .join('');
  return `
    <div class="card">
      <h3>Start a challenge</h3>
      <p class="muted">You are the challenger. Pick a demo opponent. ${
        liveActive
          ? 'Live mode will record your gifts through Live support stubs.'
          : 'No live session — sandbox mode.'
      }</p>
      ${
        !prefs.invitationsEnabled
          ? `<p class="gb-warn">Invitations are disabled in prefs — enable below to challenge.</p>`
          : ''
      }
      <label class="field">
        <span>Opponent</span>
        <select id="gbOpponent">${opts}</select>
      </label>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        ${
          liveActive
            ? `<button type="button" class="btn primary" id="gbStartLive" ${!prefs.invitationsEnabled ? 'disabled' : ''}>Challenge (Live mode)</button>`
            : ''
        }
        <button type="button" class="btn ${liveActive ? 'ghost' : 'primary'}" id="gbStartSandbox" ${!prefs.invitationsEnabled ? 'disabled' : ''}>
          Demo battle sandbox
        </button>
        <button type="button" class="btn ghost" id="gbTopUp">Add $10 demo wallet</button>
      </div>
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${esc(fmtMoney(getState().wallet?.balance || 0))}</strong> · TEST MODE</p>
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
    : '<li class="muted">No winners yet today · win a 60s battle</li>';
  return `
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${day.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
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
            <span class="muted"> · ${esc(h.challenger?.name || '?')} ${esc(fmtMoney(h.scoreA))} vs ${esc(h.opponent?.name || '?')} ${esc(fmtMoney(h.scoreB))} · ${esc(timeAgo(h.endedAt || h.createdAt || 0))} · ${esc(h.mode || '')}</span>
          </li>`;
        })
        .join('')
    : '<li class="muted">No battles yet.</li>';
  const topRows = tops.length
    ? tops
        .map(
          (t, i) =>
            `<li><span class="chip">#${i + 1}</span> <strong>${esc(t.username)}</strong> <span class="muted">${t.wins} win${t.wins === 1 ? '' : 's'} · ${esc(fmtMoney(t.points))} battle pts</span></li>`
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
  if (!user) return renderSignIn();

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
    ${renderRules()}
    ${renderChampion(champ)}
    ${renderDailyWinnersBoard()}
    ${renderLiveGate(liveActive, live)}
    ${battleBlock}
    ${renderHistoryAndTops()}
    ${renderPrefs(prefs)}
  `;

  return shellPage('Gift Battles', body, {
    lead: 'Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE',
    badge: battle?.status === 'active' ? 'BATTLE' : champ ? 'CHAMP' : undefined,
  });
}

export function bindGiftBattles(root) {
  stopCountdown();

  root.querySelector('#gbPrefInvites')?.addEventListener('change', (e) => {
    setGiftBattlePrefs({ invitationsEnabled: e.target.checked });
    toast(e.target.checked ? 'Invitations on' : 'Invitations off');
  });

  root.querySelector('#gbTopUp')?.addEventListener('click', () => {
    addWalletCredit(10, 'Gift battle demo top-up · TEST MODE');
    toast('+$10 demo wallet');
    const el = root.querySelector('#gbWalletBal');
    if (el) el.textContent = fmtMoney(getState().wallet?.balance || 0);
  });

  const start = (mode) => {
    const sel = root.querySelector('#gbOpponent');
    const opponentId = sel?.value;
    const fan = listDemoBattleFans().find((f) => f.id === opponentId);
    const res = startGiftBattle({
      opponentId,
      opponentName: fan?.name,
      mode,
    });
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'invites_disabled') return toast('Invitations disabled');
    if (res?.error === 'not_live') return toast('Not live — use sandbox');
    if (res?.error === 'battle_in_progress') return toast('Battle already in progress');
    if (res?.error === 'self') return toast('Pick another fan');
    toast('Challenge sent · waiting for accept');
    refresh();
  };

  root.querySelector('#gbStartLive')?.addEventListener('click', () => start('live'));
  root.querySelector('#gbStartSandbox')?.addEventListener('click', () => start('sandbox'));

  root.querySelector('#gbAccept')?.addEventListener('click', () => {
    const res = acceptGiftBattle();
    if (res?.error === 'no_pending') return toast('No pending challenge');
    if (res?.error === 'invites_disabled') return toast('Invitations disabled');
    toast('Battle started · 1:00');
    refresh();
  });

  root.querySelector('#gbDecline')?.addEventListener('click', () => {
    const res = declineGiftBattle();
    if (res?.error) return toast(String(res.error));
    toast('Challenge declined');
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
      if (res?.error === 'signin') return toast('Sign in first');
      if (res?.error === 'no_active' || res?.error === 'ended') return toast('No active battle');
      if (res?.error === 'offline') return toast('Live offline — use sandbox');
      if (res?.error === 'insufficient') return toast('Need wallet credits');
      toast(btn.dataset.gbGift === 'opponent' ? 'Opponent support (demo)' : 'Support sent · demo');
      if (res.battle?.status === 'ended') {
        toast(res.battle.result === 'win' ? `Winner · ${res.battle.winnerName}` : 'Tie!');
        refresh();
        return;
      }
      // Soft update scores without full nav when possible
      const a = root.querySelector('#gbScoreA');
      const b = root.querySelector('#gbScoreB');
      const t = root.querySelector('#gbScoreText');
      const battle = res.battle;
      if (a && b && battle) {
        a.textContent = fmtMoney(battle.scoreA);
        a.setAttribute('aria-label', `Challenger score ${fmtMoney(battle.scoreA)}`);
        b.textContent = fmtMoney(battle.scoreB);
        b.setAttribute('aria-label', `Opponent score ${fmtMoney(battle.scoreB)}`);
        if (t) {
          t.textContent = `Live score: ${battle.challenger.name} ${fmtMoney(battle.scoreA)} — ${battle.opponent.name} ${fmtMoney(battle.scoreB)}`;
        }
      } else {
        refresh();
      }
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
