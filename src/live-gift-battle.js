// t401u/t402u — viewer-vs-viewer Gift Battle inside a Live stream or Group Room.
// Flow: a viewer sends a gift "for all viewers" → a "Challenge to Gift Battle" tab is offered to everyone else
// for 30s → the FIRST tap starts a 60s battle (gifter vs challenger) → more total gift points wins.
// Own local TEST MODE state only — does NOT touch the store.js gift-battle model (owned by the Battles bot).
// No charges, no server/payment events, no random numbers, no lasting title or badge.
import { getGiftSticker } from './gifts-stickers.js';

export const CHALLENGE_WINDOW_MS = 30000;
export const BATTLE_MS = 60000;
export const GB_GIFTS = Object.freeze([['rose', 1], ['turn-up', 5], ['diamond-drip', 10]]);
export const DEMO_PLACEHOLDER = 'Demo viewer (placeholder)';

/* ---------- pure logic ---------- */
export function openChallengeWindow({ gifter, giftPts = 1, now = Date.now() }) {
  return { status: 'open', gifter: String(gifter), giftPts, openedAt: now, expiresAt: now + CHALLENGE_WINDOW_MS, challenger: null };
}
export function isWindowOpen(w, now = Date.now()) { return !!w && w.status === 'open' && now < w.expiresAt; }
/** First tap wins. Returns { ok, window, battle } or { ok:false, reason }. Never mutates the input. */
export function tryAccept(w, challenger, now = Date.now()) {
  if (!w) return { ok: false, reason: 'none' };
  if (w.status !== 'open') return { ok: false, reason: 'taken', window: w };
  if (now >= w.expiresAt) return { ok: false, reason: 'expired', window: { ...w, status: 'expired' } };
  if (String(challenger) === w.gifter) return { ok: false, reason: 'self', window: w };
  const window = { ...w, status: 'accepted', challenger: String(challenger) };
  return { ok: true, window, battle: startBattle(w.gifter, challenger, now, w.giftPts) };
}
export function startBattle(gifter, challenger, now = Date.now(), openingPts = 0) {
  return { a: { name: String(gifter), total: openingPts }, b: { name: String(challenger), total: 0 }, startedAt: now, endsAt: now + BATTLE_MS };
}
export function timeLeftMs(b, now = Date.now()) { return Math.max(0, b.endsAt - now); }
export function isOver(b, now = Date.now()) { return timeLeftMs(b, now) === 0; }
export function addGift(b, side, pts, now = Date.now()) {
  if (isOver(b, now) || !['a', 'b'].includes(side) || !(pts > 0)) return b;
  return { ...b, [side]: { ...b[side], total: b[side].total + pts } };
}
export function computeWinner(b) {
  if (b.a.total === b.b.total) return { result: 'tie', name: null };
  const w = b.a.total > b.b.total ? b.a : b.b;
  return { result: b.a.total > b.b.total ? 'a' : 'b', name: w.name };
}

/* ---------- t403u/t404u winners: badge (24h), W-L record, daily top-10 (pure) ---------- */
export const BADGE_MS = 24 * 3600000;
export const DAY_MS = 24 * 3600000;
export const STRIP_MAX = 10;
export const emptyRecords = () => ({ results: [] }); // { a, b, aTotal, bTotal, winner|null, at }
/** Append a finished battle. Pure. */
export function recordResult(rec, battle, now = Date.now()) {
  const w = computeWinner(battle);
  const r = { a: battle.a.name, b: battle.b.name, aTotal: battle.a.total, bTotal: battle.b.total, winner: w.name, at: now };
  return { results: [...(rec?.results || []), r].slice(-500) };
}
/** Winner badge lasts 24h from the most recent win. */
export function hasWinnerBadge(rec, name, now = Date.now()) {
  return (rec?.results || []).some((r) => r.winner === name && now - r.at < BADGE_MS && now >= r.at);
}
export function battleRecord(rec, name) {
  let w = 0, l = 0, t = 0;
  for (const r of rec?.results || []) {
    if (r.a !== name && r.b !== name) continue;
    if (!r.winner) t++; else if (r.winner === name) w++; else l++;
  }
  return { w, l, t };
}
/** The daily list resets every 24h (fixed 24h windows). */
export const dayKey = (now) => Math.floor(now / DAY_MS);
/** Today's battle winners ranked by total gifts sent in the battles they won today. */
export function dailyWinners(rec, now = Date.now()) {
  const k = dayKey(now); const by = new Map();
  for (const r of rec?.results || []) {
    if (!r.winner || dayKey(r.at) !== k) continue;
    const gifts = r.winner === r.a ? r.aTotal : r.bTotal;
    const cur = by.get(r.winner) || { name: r.winner, gifts: 0, wins: 0 };
    cur.gifts += gifts; cur.wins += 1; by.set(r.winner, cur);
  }
  return [...by.values()].sort((x, y) => y.gifts - x.gifts || y.wins - x.wins || x.name.localeCompare(y.name)).map((x, i) => ({ rank: i + 1, ...x }));
}
export const stripWinners = (rec, now = Date.now()) => dailyWinners(rec, now).slice(0, STRIP_MAX);
/** 5 columns x 2 rows, filled column-first: #1 (c1,r1), #2 (c1,r2), #3 (c2,r1)… */
export function gridCell(rank) { const i = rank - 1; return { col: Math.floor(i / 2) + 1, row: (i % 2) + 1 }; }

const STORE = 'pikk_gb_records_v1';
export function loadRecords() { try { return JSON.parse(localStorage.getItem(STORE)) || emptyRecords(); } catch { return emptyRecords(); } }
function saveRecords(r) { try { localStorage.setItem(STORE, JSON.stringify(r)); } catch {} }

/* ---------- UI (compact, non-blocking) ---------- */
const e = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function nameHtml(name, rec = loadRecords(), now = Date.now()) {
  const badge = hasWinnerBadge(rec, name, now) ? ' <span class="pikk-gb-badge" title="Battle Winner · 24h · TEST MODE">🏆 Battle Winner</span>' : '';
  return `<button type="button" class="pikk-gb-name" data-gb-name="${e(name)}">${e(name)}</button>${badge}`;
}
export function renderWinnersStrip(scope) {
  return `<div class="pikk-gb-strip" data-gb-strip="${e(scope)}" hidden></div>`;
}
function stripHtml(rec, now) {
  const top = stripWinners(rec, now); if (!top.length) return '';
  const chips = top.map((x) => { const c = gridCell(x.rank); return `<button type="button" class="pikk-gb-wchip" data-gb-open-list style="grid-column:${c.col};grid-row:${c.row}" aria-label="#${x.rank} ${e(x.name)} ${x.gifts} gifts"><b>#${x.rank}</b> ${e(x.name)}${hasWinnerBadge(rec, x.name, now) ? ' 🏆' : ''} <small>${x.gifts}</small></button>`; }).join('');
  const full = dailyWinners(rec, now).map((x) => `<li><b>#${x.rank}</b> ${nameHtml(x.name, rec, now)} · ${x.gifts} gifts (${x.wins} win${x.wins === 1 ? '' : 's'})</li>`).join('');
  return `<div class="pikk-gb-strip-grid" role="list" aria-label="Today's Battle Winners · top ${STRIP_MAX}">${chips}</div>
    <details class="pikk-gb-list"><summary>Today's Battle Winners · full list · TEST MODE (resets every 24h)</summary><ol class="list-plain">${full}</ol></details>`;
}
export function refreshWinnersStrips(root) {
  const rec = loadRecords(), now = Date.now();
  root.querySelectorAll('[data-gb-strip]').forEach((el) => { const h = stripHtml(rec, now); el.innerHTML = h; el.hidden = !h; });
}
/** Name taps anywhere under root → W-L record. */
export function bindBattleNames(root, toast) {
  if (root._gbNames) return; root._gbNames = true;
  root.addEventListener('click', (ev) => {
    const n = ev.target.closest('[data-gb-name]'); if (n) { const r = battleRecord(loadRecords(), n.dataset.gbName); toast(`${n.dataset.gbName} · Battle record ${r.w}-${r.l}${r.t ? `-${r.t}` : ''} (W-L${r.t ? '-T' : ''}) · TEST MODE`); return; }
    if (ev.target.closest('[data-gb-open-list]')) { const d = ev.target.closest('[data-gb-strip]')?.querySelector('details'); if (d) d.open = true; }
  });
}

const clock = (ms) => { const s = Math.ceil(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

export function renderGiftForAllControls(scope) {
  return `<div class="pikk-gb-controls row wrap" data-gb-controls="${e(scope)}" style="gap:6px">
    <button type="button" class="chip pikk-chip" data-gb-giftall="me">🎁 Send gift for all viewers · demo</button>
    <button type="button" class="chip pikk-chip" data-gb-giftall="demo">Demo: placeholder sends gift for all</button>
  </div>
  <div class="pikk-gb" data-gb-slot="${e(scope)}" hidden aria-live="polite"></div>`;
}

function challengeHtml(w, me, now) {
  const mine = w.gifter === me;
  return `<div class="pikk-gb-tab" role="status">
    <span>🎁 <strong>${e(w.gifter)}</strong> sent a gift for all viewers</span>
    <button type="button" class="chip pikk-chip on" data-gb-accept>⚔️ Challenge to Gift Battle${mine ? ` <small>(as ${e(DEMO_PLACEHOLDER)})</small>` : ''}</button>
    <span class="pikk-gb-timer">${clock(w.expiresAt - now)}</span>
    <small class="muted">${mine ? 'Shown to other viewers for 30s · demo: tap to accept for the placeholder' : 'First tap wins · 30s'} · TEST MODE</small></div>`;
}
function battleHtml(b, me, now) {
  const tot = b.a.total + b.b.total; const pa = tot ? Math.round((b.a.total / tot) * 100) : 50; const over = isOver(b, now);
  const side = (k) => nameHtml(b[k].name);
  const gifts = (k) => GB_GIFTS.map(([slug, pts]) => `<button type="button" class="chip pikk-chip pikk-gb-gift" data-gb-side="${k}" data-gb-pts="${pts}" aria-label="Gift +${pts} for ${e(b[k].name)} · TEST MODE">${getGiftSticker(slug, { className: 'gift-sticker gift-sticker--sm' }).html}<small>+${pts}</small></button>`).join('');
  const w = over ? computeWinner(b) : null;
  return `<div class="pikk-gb-head"><strong>⚔️ Gift Battle</strong> <span class="chip">TEST MODE · demo gifts · no charges</span><span class="pikk-gb-timer" data-gb-timer>${over ? 'Ended' : clock(timeLeftMs(b, now))}</span></div>
    <div class="pikk-gb-bar" role="img" aria-label="${e(b.a.name)} ${b.a.total} vs ${e(b.b.name)} ${b.b.total}">
      <div class="pikk-gb-a" style="width:${pa}%"><span>${side('a')} · ${b.a.total}</span></div>
      <div class="pikk-gb-b" style="width:${100 - pa}%"><span>${b.b.total} · ${side('b')}</span></div></div>
    ${over ? `<p class="pikk-gb-winner" role="status">${getGiftSticker('battle-win', { className: 'gift-sticker gift-sticker--sm' }).html} <strong>${w.result === 'tie' ? 'Tie' : `${e(w.name)} wins`}</strong> · ${b.a.total}–${b.b.total} · TEST MODE</p><button type="button" class="chip pikk-chip" data-gb-close>Close</button>`
    : `<div class="pikk-gb-gifts"><div>${gifts('a')}</div><div>${gifts('b')}</div></div><small class="muted">Totals change only by taps on this device · the placeholder side moves only when you tap it.</small>`}`;
}

export function bindGiftForAll(root, { me = 'You', toast = () => {} } = {}) {
  bindBattleNames(root, toast); refreshWinnersStrips(root);
  root.querySelectorAll('[data-gb-slot]').forEach((slot) => {
    const ctr = root.querySelector(`[data-gb-controls="${slot.dataset.gbSlot}"]`); if (!ctr) return;
    const s = { w: null, b: null, t: null };
    const draw = () => {
      const now = Date.now();
      if (s.b) slot.innerHTML = battleHtml(s.b, me, now);
      else if (isWindowOpen(s.w, now)) slot.innerHTML = challengeHtml(s.w, me, now);
      else { slot.hidden = true; slot.innerHTML = ''; clearInterval(s.t); return; }
      slot.hidden = false;
      if (s.b && isOver(s.b, now)) { clearInterval(s.t); if (!s.b.recorded) { s.b = { ...s.b, recorded: true }; saveRecords(recordResult(loadRecords(), s.b, now)); refreshWinnersStrips(root); slot.innerHTML = battleHtml(s.b, me, now); } }
    };
    const tick = () => { clearInterval(s.t); s.t = setInterval(() => (document.body.contains(slot) ? draw() : clearInterval(s.t)), 1000); };
    ctr.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-gb-giftall]'); if (!b) return;
      if (s.b && !isOver(s.b)) return toast('A Gift Battle is already running');
      s.b = null; s.w = openChallengeWindow({ gifter: b.dataset.gbGiftall === 'me' ? me : DEMO_PLACEHOLDER });
      draw(); tick();
    });
    slot.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-gb-accept]')) {
        const challenger = s.w?.gifter === me ? DEMO_PLACEHOLDER : me;
        const r = tryAccept(s.w, challenger); s.w = r.window || s.w;
        if (!r.ok) return toast(r.reason === 'expired' ? 'Challenge expired' : 'Someone already accepted');
        s.b = r.battle; draw(); tick(); return;
      }
      const g = ev.target.closest('[data-gb-side]');
      if (g && s.b) { s.b = addGift(s.b, g.dataset.gbSide, Number(g.dataset.gbPts)); draw(); return; }
      if (ev.target.closest('[data-gb-close]')) { s.b = null; s.w = null; draw(); }
    });
  });
}

export function renderGiftBattleExplainer() {
  return `
    <div class="card pikk-gb-explainer" id="gbExplainer">
      <h3 style="margin:0 0 6px">Gift Battles happen inside Live &amp; Group Rooms</h3>
      <ol class="gb-rules-list">
        <li>A viewer sends a gift <strong>for all viewers</strong>.</li>
        <li>Everyone else sees a <strong>Challenge to Gift Battle</strong> tab for <strong>30 seconds</strong>.</li>
        <li>The <strong>first</strong> viewer to tap it starts a <strong>60-second</strong> battle: the original gifter vs the challenger.</li>
        <li>Both send gifts — whoever sends more total wins. The compact battle bar never blocks the video, chat or reactions.</li>
      </ol>
      <p class="muted small">Gifts are voluntary support — not wagers, no prizes. TEST MODE: demo gifts only, no charges; totals count only taps on this device. Roast Battles are separate (Roast Arena).</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn primary" href="#/live?tab=channels">Open Live</a>
        <a class="chip pikk-chip" href="#/live?tab=rooms">Group Rooms</a>
        <a class="chip pikk-chip" href="#/roast-arena">Roast Arena (separate)</a>
      </div>
    </div>`;
}
