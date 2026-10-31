import {
  getState,
  isAdmin,
  addWalletCredit,
  listRestreamPlatforms,
  connectRestreamPlatform,
  disconnectRestreamPlatform,
  toggleRestreamSelected,
  getRestream,
  getRestreamIngest,
  rotateRestreamStreamKey,
  startRestreamGoLive,
  endRestreamGoLive,
  tickRestreamHealth,
  setRestreamDestinationError,
  listRestreamHistory,
  getActiveRestreamSession,
  getRestreamCampaignConfig,
  setRestreamCampaignConfig,
  getRestreamCampaign,
  enrollRestreamCampaign,
  cancelRestreamCampaign,
  getRestreamDestinationCap,
  isRestreamHouseAccount,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

let healthTimer = null;

function refresh() {
  navigate('#/restream');
}

function stopHealth() {
  if (healthTimer) {
    clearInterval(healthTimer);
    healthTimer = null;
  }
}

function fmtMoney(n) {
  return '$' + Number(n || 0).toFixed(2);
}

function healthDot(health) {
  const map = {
    streaming: 'ok',
    connected: 'ok',
    connecting: 'warn',
    error: 'err',
    ended: 'muted',
  };
  const cls = map[health] || 'muted';
  return `<span class="rs-health ${cls}" title="${esc(health || 'unknown')}" aria-label="${esc(health || 'unknown')}"></span>`;
}

function renderHero() {
  return `
    <div class="card rs-hero">
      <div class="row wrap" style="justify-content:space-between;gap:10px;align-items:flex-start">
        <div>
          <h3 style="margin:0 0 4px">PIKK Restream</h3>
          <p class="rs-free-sub" style="margin:0 0 8px;font-weight:800;color:#fff;letter-spacing:.01em">Free multi-platform go-live</p>
          <p class="muted" style="margin:0;max-width:42rem">
            Go live to YouTube, TikTok, Twitch, Facebook, Instagram, Kick, and Custom RTMP
            <strong>inside PIKK — so you don’t pay Restream.io</strong>. Platform account policies still apply.
            DEMO · TEST MODE · no real RTMP / OAuth relay yet.
          </p>
        </div>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        Phase 2 (coming later): real RTMP/SRT relay + OAuth per platform. Browser-only SPA cannot true-simulcast without a media server.
      </p>
      <div class="row wrap" style="margin-top:12px;gap:8px">
        <a class="btn ghost" href="#/live">Solo Live</a>
        <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
        <a class="btn ghost" href="#/spotlight">Spotlight</a>
        <a class="btn ghost" href="#/wallet">Wallet</a>
      </div>
    </div>`;
}

function renderPlatforms(platforms, selected, session) {
  const live = !!session;
  const cards = platforms
    .map((p) => {
      const on = selected.includes(p.id);
      const status = p.connected
        ? `<span class="chip">Connected${p.handle ? ' · ' + esc(p.handle) : ''}</span>`
        : `<span class="chip muted-chip">Not connected</span>`;
      return `
      <div class="rs-plat ${p.connected ? 'on' : ''}" data-plat="${esc(p.id)}">
        <div class="rs-plat-top">
          <span class="rs-plat-swatch" style="background:${esc(p.color)}"></span>
          <div>
            <strong>${esc(p.label)}</strong>
            <div class="muted" style="font-size:12px">${esc(p.hint)}</div>
          </div>
        </div>
        <div class="row wrap" style="gap:6px;margin-top:10px;align-items:center">
          ${status}
          ${
            p.connected
              ? `<button type="button" class="btn ghost rs-disconnect" data-id="${esc(p.id)}">Disconnect</button>
                 <label class="rs-select-lab">
                   <input type="checkbox" class="rs-select" data-id="${esc(p.id)}" ${on ? 'checked' : ''} ${live ? 'disabled' : ''} />
                   Dest
                 </label>`
              : `<button type="button" class="btn primary rs-connect" data-id="${esc(p.id)}">Connect</button>`
          }
        </div>
      </div>`;
    })
    .join('');

  const connectedCount = platforms.filter((p) => p.connected).length;
  const empty =
    connectedCount === 0
      ? `<p class="rs-empty" role="status">No platforms connected yet. Connect at least one to multi-select destinations.</p>`
      : '';

  return `
    <div class="card">
      <h3>Platform destinations</h3>
      <p class="muted" style="margin:0 0 12px">Connect / Disconnect persists in <code>dbs_v1.restream.platforms</code>. Multi-select for Go Live.</p>
      ${empty}
      <div class="rs-plat-grid">${cards}</div>
    </div>`;
}

function renderCampaign(user) {
  const cfg = getRestreamCampaignConfig();
  const camp = getRestreamCampaign();
  const cap = getRestreamDestinationCap();
  const house = isRestreamHouseAccount();
  const wallet = getState().wallet?.balance || 0;
  const tiers = ['bronze', 'silver', 'gold'].map((id) => cfg.tiers[id]);

  const tierCards = tiers
    .map((t) => {
      const active = camp.status === 'active' && camp.tier === t.id;
      const perks = (t.perks || []).map((x) => `<li>${esc(x)}</li>`).join('');
      return `
      <div class="rs-tier rs-tier-${esc(t.id)} ${active ? 'active' : ''}">
        <div class="row wrap" style="justify-content:space-between;gap:6px">
          <strong>${esc(t.label)}</strong>
          <span class="chip">${fmtMoney(t.price)} · TEST</span>
        </div>
        <ul class="rs-tier-perks">${perks}</ul>
        <div class="row wrap" style="gap:6px;margin-top:8px">
          ${
            active
              ? `<span class="chip">Enrolled</span>
                 <button type="button" class="btn ghost danger rs-cancel-tier">Cancel</button>`
              : `<button type="button" class="btn primary rs-enroll" data-tier="${esc(t.id)}">${
                  camp.status === 'active' ? 'Upgrade' : 'Enroll'
                }</button>`
          }
        </div>
      </div>`;
    })
    .join('');

  return `
    <div class="card rs-campaign">
      <h3>Streamer campaign tiers</h3>
      <p class="muted" style="margin:0 0 8px">
        <strong>Free baseline</strong> for house / DatBoiSkeet official (${esc(String(cfg.freeMaxDestinations))} slots; house unlimited).
        Paid Bronze / Silver / Gold for signed-up streamers — debit via Wallet demo (no real charges).
      </p>
      <div class="row wrap" style="gap:8px;margin-bottom:12px">
        <span class="chip">Wallet ${fmtMoney(wallet)}</span>
        <button type="button" class="btn ghost" id="rsSeedWallet">+ $25 demo credit</button>
        <span class="chip">${
          house
            ? 'House account · free unlimited'
            : camp.status === 'active'
              ? `Active · ${esc(camp.tier)} · cap ${cap.max}`
              : `Free baseline · cap ${cap.max}`
        }</span>
        ${cap.badge ? `<span class="chip rs-badge">${esc(cap.badge)}</span>` : ''}
        ${cap.placement ? `<span class="chip">Explore/Live placement</span>` : ''}
      </div>
      ${
        !user
          ? `<p class="muted">Sign in to enroll. <a href="#/profile">Sign in</a></p>`
          : `<div class="rs-tier-grid">${tierCards}</div>`
      }
    </div>`;
}

function renderAdminLite() {
  const cfg = getRestreamCampaignConfig();
  const admin = isAdmin();
  return `
    <div class="card rs-admin">
      <h3>Campaign admin ${admin ? '' : '· TEST MODE panel'}</h3>
      <p class="muted" style="margin:0 0 10px">Persist prices / caps / perks in <code>dbs_v1.restream.campaignConfig</code>.</p>
      <div class="rs-admin-grid">
        <label class="field"><span>Free max destinations</span>
          <input type="number" id="rsFreeMax" min="1" max="7" value="${esc(String(cfg.freeMaxDestinations))}" />
        </label>
        <label class="field"><span>Bronze price</span>
          <input type="number" id="rsBronzePrice" min="0" step="0.01" value="${esc(String(cfg.tiers.bronze.price))}" />
        </label>
        <label class="field"><span>Silver price</span>
          <input type="number" id="rsSilverPrice" min="0" step="0.01" value="${esc(String(cfg.tiers.silver.price))}" />
        </label>
        <label class="field"><span>Gold price</span>
          <input type="number" id="rsGoldPrice" min="0" step="0.01" value="${esc(String(cfg.tiers.gold.price))}" />
        </label>
        <label class="field"><span>Bronze slots</span>
          <input type="number" id="rsBronzeSlots" min="1" max="7" value="${esc(String(cfg.tiers.bronze.maxDestinations))}" />
        </label>
        <label class="field"><span>Silver slots</span>
          <input type="number" id="rsSilverSlots" min="1" max="7" value="${esc(String(cfg.tiers.silver.maxDestinations))}" />
        </label>
        <label class="field"><span>Gold slots</span>
          <input type="number" id="rsGoldSlots" min="1" max="7" value="${esc(String(cfg.tiers.gold.maxDestinations))}" />
        </label>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button type="button" class="btn primary" id="rsSaveConfig">Save config</button>
        ${
          admin
            ? `<span class="chip">Admin role</span>`
            : `<span class="chip">Demo edit allowed in TEST MODE</span>
               <button type="button" class="btn ghost" id="rsToggleAdmin">Toggle admin role</button>`
        }
      </div>
    </div>`;
}

function renderObs(ingest) {
  if (!ingest) return '';
  return `
    <div class="card rs-obs">
      <h3>OBS / encoder · PIKK ingest</h3>
      <p class="muted" style="margin:0 0 10px">
        Point OBS at this demo RTMP URL + stream key. <strong>No Restream fee inside PIKK.</strong>
        Stream Everywhere disclose: platforms own the outbound stream; v1 relays metadata only.
      </p>
      <label class="field"><span>RTMP URL</span>
        <div class="row" style="gap:8px">
          <input id="rsRtmpUrl" readonly value="${esc(ingest.rtmpUrl)}" style="flex:1" />
          <button type="button" class="btn" id="rsCopyUrl">Copy</button>
        </div>
      </label>
      <label class="field" style="margin-top:10px"><span>Stream key</span>
        <div class="row" style="gap:8px">
          <input id="rsStreamKey" readonly value="${esc(ingest.streamKey)}" style="flex:1" />
          <button type="button" class="btn" id="rsCopyKey">Copy</button>
        </div>
      </label>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button type="button" class="btn ghost" id="rsRotateKey">Rotate demo key</button>
        <span class="chip">Rotated ${timeAgo(ingest.rotatedAt)}</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">${esc(ingest.note || 'TEST MODE')}</p>
    </div>`;
}

function renderGoLive(user, platforms, selected, session, cap) {
  if (!user) {
    return `
      <div class="card">
        <h3>Go Live · multi-platform</h3>
        <p class="muted">Sign in to start a simulcast demo.</p>
        <a class="btn primary" href="#/profile">Sign in</a>
      </div>`;
  }

  if (session) {
    const rows = (session.destinations || [])
      .map(
        (d) => `
      <li class="rs-dest-row">
        <span>${healthDot(d.health)} <strong>${esc(d.label)}</strong>
          <span class="muted" style="font-size:12px"> · ${esc(d.status)}${d.lastError ? ' · ' + esc(d.lastError) : ''}</span>
        </span>
        <span class="row" style="gap:6px">
          ${
            d.health !== 'error'
              ? `<button type="button" class="btn ghost rs-stub-err" data-id="${esc(d.id)}">Error stub</button>`
              : ''
          }
        </span>
      </li>`
      )
      .join('');
    return `
      <div class="card rs-session">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <h3 style="margin:0">Simulcast live · TEST MODE</h3>
          <span class="chip live-chip"><span class="dot"></span> LIVE</span>
        </div>
        ${
          session.campaignBadge
            ? `<p class="chip rs-badge" style="margin:8px 0">${esc(session.campaignBadge)}${session.placement ? ' · placement on' : ''}</p>`
            : ''
        }
        <ul class="list-plain rs-dest-list">${rows}</ul>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Fake health checklist · connecting → streaming. No real relay.</p>
        <div class="row wrap" style="gap:8px;margin-top:12px">
          <button type="button" class="btn" id="rsTickHealth">Advance health</button>
          <button type="button" class="btn ghost danger" id="rsEndLive">End Go Live</button>
        </div>
      </div>`;
  }

  const connected = platforms.filter((p) => p.connected);
  let errBanner = '';
  if (!connected.length) {
    errBanner = `<p class="rs-warn" role="alert">Connect at least one platform before Go Live.</p>`;
  } else if (!selected.length) {
    errBanner = `<p class="rs-warn" role="alert">Select one or more destinations (Dest checkboxes).</p>`;
  } else if (selected.length > cap.max) {
    errBanner = `<p class="rs-warn" role="alert">Selected ${selected.length} exceeds your cap of ${cap.max} (${esc(cap.source)}). Upgrade tier or deselect.</p>`;
  }

  return `
    <div class="card">
      <h3>Go Live to selected</h3>
      <p class="muted" style="margin:0 0 8px">
        Cap <strong>${esc(String(cap.max))}</strong> destinations · source <code>${esc(cap.source)}</code>
        ${cap.badge ? ' · badge ' + esc(cap.badge) : ''}.
      </p>
      ${errBanner}
      <p class="muted" style="font-size:13px">Selected: ${
        selected.length
          ? selected.map((id) => esc(platforms.find((p) => p.id === id)?.label || id)).join(', ')
          : 'none'
      }</p>
      <button type="button" class="btn primary block" id="rsGoLive" ${
        !connected.length || !selected.length || selected.length > cap.max ? 'disabled' : ''
      }>Go Live · simulcast demo</button>
    </div>`;
}

function renderHistory(hist) {
  if (!hist.length) return '';
  return `
    <div class="card">
      <h3>Recent simulcasts (this device)</h3>
      <ul class="list-plain">
        ${hist
          .slice(0, 8)
          .map((h) => {
            const n = (h.destinations || []).length;
            return `<li>
              <span><strong>${esc(h.hostName)}</strong> · ${n} destination${n === 1 ? '' : 's'}
                ${h.campaignTier ? ' · ' + esc(h.campaignTier) : ''}
                <br/><span class="muted" style="font-size:12px">${timeAgo(h.endedAt || h.startedAt)}</span>
              </span>
              <span class="chip">Ended</span>
            </li>`;
          })
          .join('')}
      </ul>
    </div>`;
}

export function renderRestream() {
  const user = getState().user;
  const platforms = listRestreamPlatforms();
  const rs = getRestream();
  const selected = rs.selected || [];
  const session = getActiveRestreamSession();
  const ingest = getRestreamIngest();
  const cap = getRestreamDestinationCap();
  const hist = listRestreamHistory();

  const body = `
    ${renderHero()}
    ${renderCampaign(user)}
    ${renderPlatforms(platforms, selected, session)}
    ${renderGoLive(user, platforms, selected, session, cap)}
    ${renderObs(ingest)}
    ${renderAdminLite()}
    ${renderHistory(hist)}
  `;

  return shellPage('PIKK Restream', body, {
    lead: 'Free multi-platform go-live · avoid paying Restream.io · campaign tiers · OBS ingest demo · TEST MODE',
    badge: session ? 'LIVE' : undefined,
  });
}

export function bindRestream(root) {
  stopHealth();

  const session = getActiveRestreamSession();
  if (session) {
    healthTimer = setInterval(() => {
      tickRestreamHealth();
      // soft refresh destinations without full nav thrash every tick — full refresh every 2s ok for demo
    }, 2500);
  }

  root.querySelectorAll('.rs-connect').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const res = connectRestreamPlatform(id);
      if (res?.error) return toast(String(res.error));
      toast(`Connected ${id} · TEST MODE`);
      refresh();
    });
  });

  root.querySelectorAll('.rs-disconnect').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = disconnectRestreamPlatform(btn.dataset.id);
      if (res?.error) return toast(String(res.error));
      toast('Disconnected');
      refresh();
    });
  });

  root.querySelectorAll('.rs-select').forEach((cb) => {
    cb.addEventListener('change', () => {
      const res = toggleRestreamSelected(cb.dataset.id);
      if (res?.error) {
        cb.checked = !cb.checked;
        return toast(String(res.error));
      }
      refresh();
    });
  });

  root.querySelector('#rsGoLive')?.addEventListener('click', () => {
    const res = startRestreamGoLive();
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'no_platforms') return toast('Connect a platform first');
    if (res?.error === 'none_selected') return toast('Select destinations');
    if (res?.error === 'over_cap') return toast(`Over cap (${res.max}) — upgrade or deselect`);
    if (res?.error === 'already_live') return toast('Already live');
    if (res?.error) return toast(String(res.error));
    toast('Simulcast started · TEST MODE');
    refresh();
  });

  root.querySelector('#rsEndLive')?.addEventListener('click', () => {
    endRestreamGoLive();
    stopHealth();
    toast('Simulcast ended');
    refresh();
  });

  root.querySelector('#rsTickHealth')?.addEventListener('click', () => {
    tickRestreamHealth();
    refresh();
  });

  root.querySelectorAll('.rs-stub-err').forEach((btn) => {
    btn.addEventListener('click', () => {
      setRestreamDestinationError(btn.dataset.id, 'Demo error stub');
      toast('Marked error (stub)');
      refresh();
    });
  });

  const copy = async (sel, label) => {
    const el = root.querySelector(sel);
    const val = el?.value || '';
    try {
      await navigator.clipboard.writeText(val);
      toast(`Copied ${label}`);
    } catch {
      el?.select?.();
      toast('Select & copy manually');
    }
  };
  root.querySelector('#rsCopyUrl')?.addEventListener('click', () => copy('#rsRtmpUrl', 'RTMP URL'));
  root.querySelector('#rsCopyKey')?.addEventListener('click', () => copy('#rsStreamKey', 'stream key'));
  root.querySelector('#rsRotateKey')?.addEventListener('click', () => {
    rotateRestreamStreamKey();
    toast('Demo key rotated');
    refresh();
  });

  root.querySelector('#rsSeedWallet')?.addEventListener('click', () => {
    addWalletCredit(25, 'Restream demo credit · TEST MODE');
    toast('+$25 wallet demo');
    refresh();
  });

  root.querySelectorAll('.rs-enroll').forEach((btn) => {
    btn.addEventListener('click', () => {
      const res = enrollRestreamCampaign(btn.dataset.tier);
      if (res?.error === 'signin') return toast('Sign in first');
      if (res?.error === 'insufficient') {
        return toast(`Need ${fmtMoney(res.need)} — seed wallet credit`);
      }
      if (res?.error === 'already') return toast('Already on this tier');
      if (res?.error) return toast(String(res.error));
      toast(`Enrolled ${btn.dataset.tier} · charged ${fmtMoney(res.charged)} TEST MODE`);
      refresh();
    });
  });

  root.querySelector('.rs-cancel-tier')?.addEventListener('click', () => {
    const res = cancelRestreamCampaign();
    if (res?.error) return toast(String(res.error));
    toast('Campaign cancelled · free baseline');
    refresh();
  });

  root.querySelector('#rsSaveConfig')?.addEventListener('click', () => {
    const num = (sel, fallback) => {
      const v = Number(root.querySelector(sel)?.value);
      return Number.isFinite(v) ? v : fallback;
    };
    const cur = getRestreamCampaignConfig();
    const res = setRestreamCampaignConfig({
      _testModeAllow: true,
      freeMaxDestinations: num('#rsFreeMax', cur.freeMaxDestinations),
      tiers: {
        bronze: {
          ...cur.tiers.bronze,
          price: num('#rsBronzePrice', cur.tiers.bronze.price),
          maxDestinations: num('#rsBronzeSlots', cur.tiers.bronze.maxDestinations),
        },
        silver: {
          ...cur.tiers.silver,
          price: num('#rsSilverPrice', cur.tiers.silver.price),
          maxDestinations: num('#rsSilverSlots', cur.tiers.silver.maxDestinations),
        },
        gold: {
          ...cur.tiers.gold,
          price: num('#rsGoldPrice', cur.tiers.gold.price),
          maxDestinations: num('#rsGoldSlots', cur.tiers.gold.maxDestinations),
        },
      },
    });
    if (res?.error) return toast(String(res.error));
    toast('Campaign config saved');
    refresh();
  });

  root.querySelector('#rsToggleAdmin')?.addEventListener('click', async () => {
    const { setAdminRole, isAdmin: check } = await import('../store.js');
    setAdminRole(!check());
    toast(check() ? 'Admin on' : 'Admin off');
    refresh();
  });
}
