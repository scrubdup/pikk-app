import {
  getState,
  addWalletCredit,
  getCreatorWallet,
  seedDemoCreatorEarnings,
  requestCreatorPayout,
  setCreatorPayoutStatus,
  setCreatorVerification,
  summarizeCreatorEarnings,
  getCoinBalance,
  listCoinPacks,
  buyCoins,
  listCreatorGiftEarnings,
  COIN_PACKAGES,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/wallet');
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}

function fmtCoins(n) {
  return Number(n || 0).toLocaleString();
}

const STATUS_LABEL = {
  pending: 'Pending',
  completed: 'Completed',
  rejected: 'Rejected',
};

export function renderWallet() {
  const { wallet, user, coins } = getState();
  const fan = wallet || { balance: 0, history: [] };
  const coinBal = getCoinBalance();
  const coinHist = [...(coins?.history || [])].slice(0, 10);
  const packs = listCoinPacks();
  const cw = getCreatorWallet();
  const summary = summarizeCreatorEarnings().filter((r) => r.count > 0);
  const giftEarn = listCreatorGiftEarnings(user?.id);
  const hist = [...(fan.history || [])].slice(-12).reverse();
  const earnings = [...(cw.earnings || [])].slice(0, 20);
  const payouts = cw.payouts || [];
  const pending = payouts.find((p) => p.status === 'pending');
  const canPayout = !pending && cw.available >= cw.threshold;
  const verified = cw.verification === 'demo_verified';

  const fanHist =
    hist.length > 0
      ? `<ul class="list-plain">${hist
          .map(
            (h) => `<li>
          <span>${esc(h.note || 'Entry')}<br/><span class="muted" style="font-size:12px">${timeAgo(h.at)}</span></span>
          <strong style="color:${Number(h.amount) >= 0 ? 'var(--ok,#6dffb0)' : 'inherit'}">${Number(h.amount) >= 0 ? '+' : ''}${fmtMoney(h.amount)}</strong>
        </li>`
          )
          .join('')}</ul>`
      : '<p class="muted" style="margin:0">No fan USD credit activity yet.</p>';

  const packCards = packs
    .map((p) => {
      const id = `pack_${p.coins}`;
      return `<button type="button" class="card coin-pack-btn" data-coins="${p.coins}" id="${esc(id)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${fmtCoins(p.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${fmtMoney(p.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`;
    })
    .join('');

  const coinHistHtml =
    coinHist.length > 0
      ? `<ul class="list-plain">${coinHist
          .map((h) => {
            const amt = Number(h.amount) || 0;
            return `<li>
          <span>${esc(h.note || 'Coins')}<br/><span class="muted" style="font-size:12px">${timeAgo(h.at)}</span></span>
          <strong style="color:${amt >= 0 ? 'var(--ok,#6dffb0)' : 'inherit'}">${amt >= 0 ? '+' : ''}${fmtCoins(amt)}</strong>
        </li>`;
          })
          .join('')}</ul>`
      : '<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>';

  const giftEarnHtml =
    giftEarn.length > 0
      ? `<ul class="list-plain">${giftEarn
          .slice(0, 8)
          .map(
            (e) => `<li>
          <span>
            <strong>${esc(e.note || e.label || 'Live gift')}</strong>
            <span class="chip">80/20 NET</span>
            ${e.giftSlug ? `<span class="chip">${esc(e.giftSlug)}</span>` : ''}
            <br/><span class="muted" style="font-size:12px">gross ${fmtMoney(e.gross)} · fees ${fmtMoney(e.fees)} · net ${fmtMoney(e.net)} · ${timeAgo(e.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${fmtMoney(e.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${fmtMoney(e.dbsShare)}</span>
          </span>
        </li>`
          )
          .join('')}</ul>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Creator-only split view. Live viewers never see 80/20.</p>`
      : `<p class="muted" style="margin:0">No coin-gift earnings yet. When viewers send catalog gifts on Live, your <strong>80% of NET</strong> lands here (TEST MODE: listed USD = net, 0% external fee).</p>`;

  const breakdown =
    summary.length > 0
      ? `<div style="overflow-x:auto">
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
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`
      : `<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>`;

  const ledger =
    earnings.length > 0
      ? `<ul class="list-plain">${earnings
          .map(
            (e) => `<li>
          <span>
            <strong>${esc(e.label)}</strong>
            ${e.payoutId ? '<span class="chip">In payout</span>' : '<span class="chip">Open</span>'}
            ${e.source === 'seed' ? '<span class="chip">Demo seed</span>' : ''}
            ${e.source === 'live_gift' ? '<span class="chip">Coin gift</span>' : ''}
            <br/><span class="muted" style="font-size:12px">${esc(e.note)} · ${timeAgo(e.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${fmtMoney(e.creatorShare)}</strong><br/>
            <span class="muted">gross ${fmtMoney(e.gross)}</span>
          </span>
        </li>`
          )
          .join('')}</ul>`
      : '';

  const payoutList =
    payouts.length > 0
      ? payouts
          .map(
            (p) => `<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${esc(p.id)}">
        <div class="row wrap">
          <strong>${fmtMoney(p.amount)}</strong>
          <span class="chip">${esc(STATUS_LABEL[p.status] || p.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${timeAgo(p.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${esc(p.note || 'Payout')} · ${(p.earningIds || []).length} earning line(s)</p>
        ${
          p.status === 'pending'
            ? `<div class="row wrap">
                <button class="btn primary payout-status" data-id="${esc(p.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${esc(p.id)}" data-status="rejected">Reject · release hold</button>
              </div>`
            : p.reviewedAt
              ? `<p class="muted" style="margin:0;font-size:12px">Reviewed ${timeAgo(p.reviewedAt)}</p>`
              : ''
        }
      </div>`
          )
          .join('')
      : '<p class="muted">No payout requests yet.</p>';

  const body = `
    <div class="pikk-wallet-studio">
      <header class="pikk-wallet-hero" aria-label="PIKK Wallet overview">
        <div>
          <span class="pikk-wallet-eyebrow">PIKK · CREATOR & FAN WALLET</span>
          <h2>Your balance.<br/><em>Your next move.</em></h2>
          <p>Keep gift coins, fan credits and creator earnings in one clear place. All activity here is demo-only until payments and verification are connected.</p>
          <div class="pikk-wallet-hero-actions">
            <a class="btn" href="#/earnings">Creator earnings</a>
            <a class="btn ghost" href="#/live">Explore Live</a>
          </div>
        </div>
        <div class="pikk-wallet-hero-art" aria-hidden="true"><strong>◈</strong><small>PIKK WALLET</small></div>
      </header>
      <section class="pikk-wallet-metrics" aria-label="Wallet balance overview">
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${fmtCoins(coinBal)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${fmtMoney(fan.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${fmtMoney(cw.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${fmtMoney(cw.holds)}</strong><small>Payout review · demo</small></div>
      </section>
    <div class="card">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">${verified ? 'Identity / tax · demo verified' : 'Identity / tax verification · demo'}</span>
        <button class="btn ghost" id="cwVerify" style="margin-left:auto">${verified ? 'Clear demo verify' : 'Mark verified · demo'}</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Fan <strong>coins</strong> (Live gifts) stay separate from fan USD credits and creator redeemable balances. No real processors, KYC, or charges.</p>
    </div>

    <div class="card" id="wallet-coins">
      <div class="row wrap">
        <h3 style="margin:0">Gift coins</h3>
        <span class="chip">t185u · 100 coins = $2</span>
        <span class="chip">TEST MODE</span>
      </div>
      <div style="font-size:32px;font-weight:900;margin-top:8px">${fmtCoins(coinBal)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${fmtMoney(coinBal * 0.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${packCards}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${COIN_PACKAGES.map((p) => `${p.coins}/$${p.usd}`).join(' · ')}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${coinHistHtml}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${fmtMoney(fan.balance)}</div>
      <p class="muted" style="margin:4px 0 12px">Tips &amp; song requests on this device (<code>dbs_v1.wallet</code>). Separate from gift coins.</p>
      <div class="row wrap">
        <button class="btn primary" id="fanCredit5">Add $5 demo credit</button>
        <button class="btn" id="fanCredit25">Add $25</button>
        <a class="btn ghost" href="#/live">Go to Live</a>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent fan USD activity</h4>
      ${fanHist}
    </div>

    <div class="card">
      <h3>Creator redeemable balance</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:28px;font-weight:900">${fmtMoney(cw.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${fmtMoney(cw.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${fmtMoney(cw.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${pending ? '<span class="chip">Payout pending</span>' : ''}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${canPayout ? '' : 'disabled'}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(cw.earnings || []).length ? 'Reload demo earnings' : 'Load demo earnings'}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${
        !canPayout
          ? `<p class="muted" style="margin:10px 0 0;font-size:12px">${
              pending
                ? 'Finish or reject the pending payout before requesting another (anti double-payout).'
                : `Need at least ${fmtMoney(cw.threshold)} available · currently ${fmtMoney(cw.available)}.`
            }</p>`
          : '<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>'
      }
      <p class="chip" style="margin-top:10px">Signed in as ${esc(user?.username || 'guest')}</p>
    </div>

    <div class="card" id="wallet-gift-earnings">
      <h3>Live gift earnings · creator view</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">80% creator / 20% PIKK on NET catalog gifts. Not shown on Live / gift tray.</p>
      ${giftEarnHtml}
    </div>

    <div class="card">
      <h3>Earnings breakdown</h3>
      <p class="muted" style="margin:0 0 10px">Gifts, tips, subscriptions, referrals, Clippers, sponsorships, merch/affiliate — gross → fees → net → creator% / PIKK%.</p>
      ${breakdown}
      ${ledger ? `<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${ledger}` : ''}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${payoutList}
    </div>
    </div>
  `;

  return shellPage('Wallet & Payouts', body, {
    lead: 'Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE.',
  });
}

export function bindWallet(root) {
  root.querySelectorAll('.coin-pack-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.coins);
      const res = buyCoins(n);
      if (res?.error === 'bad_package') return toast('Unknown pack');
      if (res?.error) return toast('Could not buy coins');
      toast(`+${n.toLocaleString()} coins · TEST MODE`);
      refresh();
    });
  });

  root.querySelector('#fanCredit5')?.addEventListener('click', () => {
    addWalletCredit(5, 'Demo credit +$5');
    toast('+$5 fan credits');
    refresh();
  });
  root.querySelector('#fanCredit25')?.addEventListener('click', () => {
    addWalletCredit(25, 'Demo credit +$25');
    toast('+$25 fan credits');
    refresh();
  });

  root.querySelector('#cwSeed')?.addEventListener('click', () => {
    const force = (getCreatorWallet().earnings || []).length > 0;
    const res = seedDemoCreatorEarnings({ force: true });
    toast(force ? 'Demo earnings reloaded' : `Loaded ${res.seeded || 0} demo lines`);
    refresh();
  });

  root.querySelector('#cwPayout')?.addEventListener('click', () => {
    const res = requestCreatorPayout();
    if (res?.error === 'pending_exists') return toast('Payout already pending');
    if (res?.error === 'below_threshold') return toast('Below payout threshold');
    if (res?.error) return toast('Could not request payout');
    toast('Payout requested · held');
    refresh();
  });

  root.querySelector('#cwVerify')?.addEventListener('click', () => {
    const cw = getCreatorWallet();
    const next = cw.verification !== 'demo_verified';
    setCreatorVerification(next);
    toast(next ? 'Demo verified' : 'Verification cleared');
    refresh();
  });

  root.querySelectorAll('.payout-status').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = setCreatorPayoutStatus(btn.dataset.id, btn.dataset.status);
      if (res?.error) return toast('Could not update payout');
      toast('Payout ' + btn.dataset.status);
      refresh();
    });
  });
}
