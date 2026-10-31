import {
  getCreatorWallet,
  getCreatorSplits,
  summarizeCreatorEarnings,
  seedDemoCreatorEarnings,
  creditCreatorEarning,
  listCreatorGiftEarnings,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate, getRoute } from '../router.js';

function refresh(hash) {
  navigate(hash || '#/earnings');
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'tips', label: 'Tips' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'clippers', label: 'Clippers' },
  { id: 'referrals', label: 'Referrals' },
  { id: 'sponsorships', label: 'Sponsorships' },
  { id: 'merch', label: 'Merch' },
];

function activeFilter() {
  const cat = (getRoute().query?.cat || 'all').toLowerCase();
  return FILTERS.some((f) => f.id === cat) ? cat : 'all';
}

function lifetimeTotals(earnings) {
  return (earnings || []).reduce(
    (acc, e) => {
      acc.gross += Number(e.gross) || 0;
      acc.fees += Number(e.fees) || 0;
      acc.net += Number(e.net) || 0;
      acc.creatorShare += Number(e.creatorShare) || 0;
      acc.dbsShare += Number(e.dbsShare) || 0;
      return acc;
    },
    { gross: 0, fees: 0, net: 0, creatorShare: 0, dbsShare: 0 }
  );
}

function round2(n) {
  return Math.round(Number(n) * 100) / 100;
}

export function renderEarnings() {
  const cw = getCreatorWallet();
  const splits = getCreatorSplits();
  const filter = activeFilter();
  const allEarnings = [...(cw.earnings || [])].sort((a, b) => (b.at || 0) - (a.at || 0));
  const earnings =
    filter === 'all'
      ? allEarnings
      : allEarnings.filter((e) => e.category === filter || (filter === 'subscriptions' && e.category === 'paid_content'));
  const life = lifetimeTotals(allEarnings);
  const summary = summarizeCreatorEarnings();
  const coinGiftLines = listCreatorGiftEarnings();
  const giftIntro =
    filter === 'gifts'
      ? `<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${coinGiftLines.length ? `${coinGiftLines.length} gift line(s) on device.` : 'Send a catalog gift on an active Live to populate.'}</p>
    </div>`
      : '';

  const filterChips = FILTERS.map((f) => {
    const href = f.id === 'all' ? '#/earnings' : `#/earnings?cat=${f.id}`;
    const count =
      f.id === 'all'
        ? allEarnings.length
        : allEarnings.filter(
            (e) => e.category === f.id || (f.id === 'subscriptions' && e.category === 'paid_content')
          ).length;
    const active = filter === f.id;
    return `<a class="chip earn-filter${active ? ' active' : ''}" href="${href}" data-cat="${esc(f.id)}" style="${
      active ? 'outline:1px solid var(--accent,#6dffb0);font-weight:700' : ''
    }">${esc(f.label)}${count ? ` · ${count}` : ''}</a>`;
  }).join('');

  const rateRows = Object.entries(splits)
    .map(
      ([key, s]) => `<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${esc(s.label)}</strong><br/><span class="muted" style="font-size:11px">${esc(key)}</span></td>
        <td style="padding:8px 4px">${s.creatorPct}%</td>
        <td style="padding:8px 4px">${s.dbsPct}%</td>
      </tr>`
    )
    .join('');

  const categoryOpts = Object.entries(splits)
    .map(([key, s]) => `<option value="${esc(key)}">${esc(s.label)}</option>`)
    .join('');

  const byCat =
    summary.filter((r) => r.count > 0).length > 0
      ? `<div style="overflow-x:auto;margin-top:8px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr class="muted" style="text-align:left">
            <th style="padding:6px 4px">Source</th>
            <th style="padding:6px 4px">Gross</th>
            <th style="padding:6px 4px">Fees</th>
            <th style="padding:6px 4px">Net</th>
            <th style="padding:6px 4px">You</th>
            <th style="padding:6px 4px">PIKK</th>
          </tr>
        </thead>
        <tbody>
          ${summary
            .filter((r) => r.count > 0)
            .map(
              (r) => `<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${esc(r.label)}</strong><br/><span class="muted" style="font-size:11px">${r.creatorPct}/${r.dbsPct} · ${r.count} line${r.count === 1 ? '' : 's'}</span></td>
            <td style="padding:8px 4px">${fmtMoney(r.gross)}</td>
            <td style="padding:8px 4px">${fmtMoney(r.fees)}</td>
            <td style="padding:8px 4px">${fmtMoney(r.net)}</td>
            <td style="padding:8px 4px"><strong>${fmtMoney(r.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${fmtMoney(r.dbsShare)}</td>
          </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>`
      : '';

  const ledger =
    earnings.length > 0
      ? `<ul class="list-plain">${earnings
          .map(
            (e) => `<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${esc(e.label || e.category)}</strong>
            ${e.payoutId ? '<span class="chip">In payout</span>' : '<span class="chip">Open</span>'}
            ${e.source === 'seed' ? '<span class="chip">Demo seed</span>' : ''}
            <br/><span class="muted" style="font-size:12px">${esc(e.note || '')} · ${timeAgo(e.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${fmtMoney(e.gross)} → fees ${fmtMoney(e.fees)} → net ${fmtMoney(e.net)} · creator ${e.creatorPct}% / PIKK ${e.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${fmtMoney(e.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${fmtMoney(e.dbsShare)}</span>
          </span>
        </li>`
          )
          .join('')}</ul>`
      : allEarnings.length === 0
        ? `<p class="muted" style="margin:0 0 12px">No earnings yet. Load demo lines or record a single demo earning below.</p>
           <button class="btn primary" id="earnSeed">Load demo earnings</button>`
        : `<p class="muted" style="margin:0">No lines in this category. <a href="#/earnings">Show all</a></p>`;

  const body = `
    <section class="pikk-earnings-hero" aria-label="Creator earnings overview">
      <div class="pikk-earnings-hero-copy">
        <span class="pikk-earnings-eyebrow">PIKK CREATOR STUDIO · ANALYTICS PREVIEW</span>
        <h2>Your work. <em>Your earnings.</em></h2>
        <p>Track your creator share across gifts, subscriptions, tips and more in one place. Every amount shown here is browser-local demo data, not a real balance.</p>
        <div class="pikk-earnings-hero-actions">
          <a class="btn primary" href="#/wallet">Open Wallet</a>
          <a class="btn ghost" href="#/music">Explore Music</a>
        </div>
      </div>
      <div class="pikk-earnings-hero-art" aria-hidden="true">
        <span class="pikk-earnings-hero-orbit"></span>
        <span class="pikk-earnings-hero-symbol">PIKK</span>
        <span class="pikk-earnings-hero-mini">CREATOR STUDIO</span>
      </div>
    </section>
    <div class="pikk-earnings-dashboard">
    <div class="card pikk-earnings-intro">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">Analytics &amp; ledger · payouts on Wallet</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Transparent breakdown of clipping, referrals, merch affiliates, subscriptions, gifts, and tips — with PIKK commission splits. Request payouts on <a href="#/wallet">Wallet</a>.</p>
    </div>

    <div class="card pikk-earnings-summary">
      <h3>Summary</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:26px;font-weight:900">${fmtMoney(cw.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${fmtMoney(cw.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${fmtMoney(round2(life.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${fmtMoney(round2(life.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${fmtMoney(round2(life.gross))}</span>
        <span class="chip">Fees ${fmtMoney(round2(life.fees))}</span>
        <span class="chip">Net ${fmtMoney(round2(life.net))}</span>
        <span class="chip">Threshold ${fmtMoney(cw.threshold)}</span>
      </div>
      <div class="row wrap" style="margin-top:12px">
        <a class="btn primary" href="#/wallet">Open Wallet &amp; request payout</a>
        <button class="btn" id="earnSeed">${allEarnings.length ? 'Reload demo earnings' : 'Load demo earnings'}</button>
      </div>
    </div>

    <div class="card">
      <h3>Commission rates · TEST MODE</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Admin-adjustable examples. Default fees (2.9% + $0.30) apply to gross first; splits apply to eligible net. <strong>Live catalog gifts</strong> (t185u): listed USD treated as net (0% external fee chip) then <strong>80/20</strong>. Optional 85/15 is not enabled.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr class="muted" style="text-align:left">
              <th style="padding:6px 4px">Category</th>
              <th style="padding:6px 4px">Creator %</th>
              <th style="padding:6px 4px">PIKK %</th>
            </tr>
          </thead>
          <tbody>${rateRows}</tbody>
        </table>
      </div>
      ${byCat ? `<h4 style="margin:16px 0 0;font-size:14px">Totals by source (this device)</h4>${byCat}` : ''}
    </div>

    <div class="card">
      <h3>Earnings ledger</h3>
      ${giftIntro}
      <div class="row wrap" style="margin:0 0 12px;gap:6px">${filterChips}</div>
      ${ledger}
    </div>

    <div class="card">
      <h3>Record demo earning</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Adds one line via <code>creditCreatorEarning</code> (same shape as Wallet / Live tips). Not a real charge.</p>
      <form id="earnDemoForm" style="display:grid;gap:10px;max-width:420px">
        <div class="field"><label>Category</label><select name="category" id="earnCat">${categoryOpts}</select></div>
        <div class="field"><label>Gross amount (USD)</label><input name="gross" id="earnGross" type="number" min="0.01" step="0.01" value="10" required /></div>
        <div class="field"><label>Note (optional)</label><input name="note" id="earnNote" type="text" maxlength="120" placeholder="Manual demo earning" /></div>
        <button class="btn primary" type="submit">Record demo earning</button>
      </form>
    </div>
    </div>
  `;

  return shellPage('Creator Earnings', body, {
    lead: 'Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27).',
  });
}

export function bindEarnings(root) {
  root.querySelector('#earnSeed')?.addEventListener('click', () => {
    const force = (getCreatorWallet().earnings || []).length > 0;
    const res = seedDemoCreatorEarnings({ force: true });
    toast(force ? 'Demo earnings reloaded' : `Loaded ${res.seeded || 0} demo lines`);
    refresh(filterHash(activeFilter()));
  });

  root.querySelector('#earnDemoForm')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const cat = root.querySelector('#earnCat')?.value || 'tips';
    const gross = Number(root.querySelector('#earnGross')?.value);
    const note = (root.querySelector('#earnNote')?.value || '').trim() || 'Manual demo earning';
    if (!(gross > 0)) return toast('Enter a positive gross amount');
    const earning = creditCreatorEarning({
      category: cat,
      gross,
      note,
      source: 'manual_demo',
    });
    toast(`Recorded ${fmtMoney(earning.creatorShare)} creator share`);
    refresh(filterHash(cat));
  });
}

function filterHash(cat) {
  if (!cat || cat === 'all') return '#/earnings';
  return `#/earnings?cat=${cat}`;
}
