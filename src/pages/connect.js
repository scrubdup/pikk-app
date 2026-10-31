/** §36 PIKK Connect — Monkey-style match shell + quiet multi-platform go-live (t198u). */
import { getConnectPrefs, updateConnectPrefs } from '../store.js';
import {
  listRestreamPlatforms,
  connectRestreamPlatform,
  disconnectRestreamPlatform,
  toggleRestreamSelected,
  getRestream,
  getActiveRestreamSession,
  startRestreamGoLive,
  endRestreamGoLive,
  getRestreamDestinationCap,
} from '../store.js';
import { toast, shellPage, esc } from '../ui.js';
import { navigate, getRoute } from '../router.js';

const BLOCK_MSG = 'Not available — WebRTC + age assurance required before launch';

function refreshConnect() {
  navigate('#/connect');
}

/** t198u · unlabeled multi-platform destinations (store still uses restream_* keys). */
function renderMultiPlatform() {
  const platforms = listRestreamPlatforms();
  const rs = getRestream();
  const selected = rs.selected || [];
  const session = getActiveRestreamSession();
  const capInfo = getRestreamDestinationCap();
  const cap = Number(capInfo?.max) || 0;
  const live = !!session;

  const cards = platforms
    .map((p) => {
      const on = selected.includes(p.id);
      const status = p.connected
        ? `<span class="chip">Linked${p.handle ? ' · ' + esc(p.handle) : ''}</span>`
        : `<span class="chip muted-chip">Not linked</span>`;
      return `
      <div class="connect-mp-plat ${p.connected ? 'on' : ''}" data-plat="${esc(p.id)}">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <strong>${esc(p.label)}</strong>
            <div class="muted" style="font-size:12px">${esc(p.hint || '')}</div>
          </div>
          ${status}
        </div>
        <div class="row wrap" style="gap:6px;margin-top:8px;align-items:center">
          ${
            p.connected
              ? `<button type="button" class="btn ghost connect-mp-disconnect" data-id="${esc(p.id)}">Unlink</button>
                 <label class="connect-mp-select">
                   <input type="checkbox" class="connect-mp-dest" data-id="${esc(p.id)}" ${on ? 'checked' : ''} ${live ? 'disabled' : ''} />
                   Include
                 </label>`
              : `<button type="button" class="btn primary connect-mp-connect" data-id="${esc(p.id)}">Link</button>`
          }
        </div>
      </div>`;
    })
    .join('');

  const selectedCount = selected.length;
  const goLiveBtn = live
    ? `<button type="button" class="btn danger" id="connectMpEnd">End multi-platform session</button>
       <span class="chip">LIVE · ${esc(String(session?.destinations?.length || selectedCount))} dest · TEST MODE</span>`
    : `<button type="button" class="btn primary" id="connectMpGoLive" ${selectedCount ? '' : 'disabled'}>Go live to selected</button>
       <span class="chip">${selectedCount}/${cap} selected · cap ${cap}</span>`;

  return `
    <div class="card connect-multistream" id="connect-multistream">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:flex-start">
        <div>
          <h3 style="margin:0 0 6px">Multi-platform go-live</h3>
          <p class="muted" style="margin:0;max-width:40rem;font-size:13px">
            Link destinations and go live to more than one platform from PIKK.
            DEMO · TEST MODE · no real RTMP / OAuth relay yet. Platform account policies still apply.
          </p>
        </div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="connect-mp-grid" style="margin-top:12px">${cards}</div>
      <div class="row wrap" style="margin-top:12px;gap:8px;align-items:center">
        ${goLiveBtn}
        <a class="btn ghost" href="#/live">Solo Live stage</a>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        PIKK Connect combines random video discovery and multi-platform live controls in one place.
      </p>
    </div>`;
}

export function renderConnect() {
  const p = getConnectPrefs();
  const ready = p.ageConfirmed && p.rulesAccepted;
  return shellPage(
    'PIKK Connect',
    `<div class="connect-monkey" id="connectMonkey">
      <section class="pikk-connect-hero" aria-label="Find your community on PIKK">
        <div class="pikk-connect-hero-copy">
          <p class="kicker">PIKK CONNECT · PEOPLE &amp; COMMUNITIES</p>
          <h2>Real connections start here.</h2>
          <p>Find your people, join conversations, and explore the PIKK community. Real-time video matching remains unavailable until safety and infrastructure are ready.</p>
          <div class="pikk-connect-hero-actions">
            <a class="btn primary" href="#/communities">Explore communities</a>
            <a class="btn ghost" href="#/community">PIKK Lounge</a>
            <a class="btn ghost" href="#/messages">Messages</a>
          </div>
        </div>
        <div class="pikk-connect-hero-art" aria-hidden="true">
          <span class="pikk-connect-hero-person">♧</span>
          <span class="pikk-connect-hero-orbit orbit-one">✦</span>
          <span class="pikk-connect-hero-orbit orbit-two">◉</span>
          <span class="pikk-connect-hero-orbit orbit-three">✧</span>
        </div>
      </section>
      <nav class="pikk-connect-discover-nav" aria-label="Connect sections">
        <a href="#/communities"><span aria-hidden="true">♧</span> Communities</a>
        <a href="#/messages"><span aria-hidden="true">✉</span> Messages</a>
        <a href="#/connect#connect-random-chat"><span aria-hidden="true">◉</span> Random Chat</a>
        <a href="#/connect#connect-multistream"><span aria-hidden="true">▹</span> Broadcasting</a>
        <a href="#/dating"><span aria-hidden="true">♡</span> Dating</a>
      </nav>
      <section class="pikk-connect-feature-grid" aria-label="Discover ways to connect">
        <a class="pikk-connect-feature pikk-connect-feature-community" href="#/community">
          <span class="pikk-connect-feature-icon" aria-hidden="true">♧</span>
          <span class="pikk-connect-feature-copy"><strong>Communities</strong><small>Find groups and discussions</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="pikk-connect-feature pikk-connect-feature-messages" href="#/messages">
          <span class="pikk-connect-feature-icon" aria-hidden="true">✉</span>
          <span class="pikk-connect-feature-copy"><strong>Messages</strong><small>Open your conversations</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="pikk-connect-feature pikk-connect-feature-live" href="#/live">
          <span class="pikk-connect-feature-icon" aria-hidden="true">●</span>
          <span class="pikk-connect-feature-copy"><strong>PIKK Live</strong><small>Explore live creators · TEST MODE</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
      </section>
      <section class="card" aria-label="PIKK Connect experiences">
        <h2 style="margin:0 0 8px">Choose your connection</h2>
        <p class="muted small">One PIKK account, two separate experiences. Neither starts your camera automatically.</p>
        <div class="row wrap" style="gap:10px">
          <a class="btn primary" href="#/dating">♥ Dating · Swipe &amp; Match</a>
          <a class="btn ghost" href="#/connect#connect-random-chat">◉ Random Chat · 18+ TEST MODE</a>
        </div>
        <p class="muted small" style="margin:8px 0 0">Dating requires mutual interest. Random Chat is for spontaneous conversations, not automatic dating matches.</p>
      </section>
      <div id="connect-random-chat" class="connect-flag card">
        <p><span class="chip">TEST MODE</span> <span class="chip">Opt-in shell · no WebRTC</span> <span class="chip">18+</span></p>
        <p class="muted small" style="margin:6px 0 0">Monkey-style dual video discovery — PIKK branded. Admin can disable Connect anytime. Launch blocked until age assurance + moderation + WebRTC safety review.</p>
      </div>

      <div class="card connect-gates ${ready ? 'ready' : ''}">
        <div class="connect-gates-row">
          <label class="connect-check"><input type="checkbox" id="connect-age" ${p.ageConfirmed ? 'checked' : ''}/> I confirm I am 18+</label>
          <label class="connect-check ${p.ageConfirmed ? '' : 'connect-locked'}"><input type="checkbox" id="connect-rules" ${p.rulesAccepted ? 'checked' : ''} ${p.ageConfirmed ? '' : 'disabled'}/> Consent &amp; community rules</label>
        </div>
        <ul class="connect-rules muted small">
          <li>Opt-in only — both people must consent to every connection.</li>
          <li>No nudity, sexual content, harassment, hate, or minors. Zero tolerance.</li>
          <li>Never share personal info; End, Report, or Block instantly.</li>
          <li>Sessions may be moderated; violations lead to bans.</li>
        </ul>
        <p class="muted small" style="margin:6px 0 0">Self-attestation is not enough for launch; real age assurance is required.</p>
      </div>

      <div class="connect-stage card">
        <div class="connect-tiles" aria-label="Match stage">
          <div class="connect-tile connect-tile-you">
            <div class="connect-tile-art" aria-hidden="true">
              <div class="connect-silhouette"></div>
            </div>
            <div class="connect-tile-label"><span class="chip">You</span> <span class="muted small">Camera off · demo</span></div>
          </div>
          <div class="connect-tile connect-tile-them" id="connectThem">
            <div class="connect-tile-art" aria-hidden="true">
              <div class="connect-silhouette them"></div>
              <div class="connect-pulse-ring" hidden id="connectPulse"></div>
            </div>
            <div class="connect-tile-label">
              <span class="chip">Them</span>
              <span class="muted small" id="connectThemStatus">No matching service · TEST MODE</span>
            </div>
          </div>
        </div>

        <div class="connect-actions">
          ${
            ready
              ? `<button class="btn primary connect-btn-start" id="connect-start">View launch requirements</button>`
              : `<button class="btn primary connect-btn-start" disabled>Unavailable · review 18+ &amp; rules</button>`
          }
          <button class="btn primary connect-btn-next" disabled aria-label="Next (disabled)">Next</button>
          <button class="btn connect-btn-end" disabled aria-label="End (disabled)">End</button>
        </div>
        <div class="connect-controls" role="group" aria-label="Secondary controls (disabled)">
          <button class="btn ghost" disabled aria-label="Mute (disabled)">Mute</button>
          <button class="btn ghost" disabled aria-label="Camera (disabled)">Camera</button>
          <button class="btn ghost" disabled aria-label="Report (disabled)">Report</button>
          <button class="btn ghost" disabled aria-label="Block (disabled)">Block</button>
        </div>

        <div id="connect-blocked" class="connect-panel" hidden>
          <strong>${BLOCK_MSG}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${renderMultiPlatform()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,
    { lead: '1:1 discovery shell · multi-platform go-live · TEST MODE', badge: 'Shell · no WebRTC' }
  );
}

function bindMultiPlatform(root) {
  root.querySelectorAll('.connect-mp-connect').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const res = connectRestreamPlatform(id, '');
      if (res?.error) return toast(String(res.error));
      toast(`Linked ${id} · TEST MODE`);
      refreshConnect();
    });
  });
  root.querySelectorAll('.connect-mp-disconnect').forEach((btn) => {
    btn.addEventListener('click', () => {
      disconnectRestreamPlatform(btn.dataset.id);
      toast('Unlinked · TEST MODE');
      refreshConnect();
    });
  });
  root.querySelectorAll('.connect-mp-dest').forEach((inp) => {
    inp.addEventListener('change', () => {
      toggleRestreamSelected(inp.dataset.id);
      refreshConnect();
    });
  });
  root.querySelector('#connectMpGoLive')?.addEventListener('click', () => {
    const res = startRestreamGoLive();
    if (res?.error === 'signin') return toast('Sign in first');
    if (res?.error === 'none_selected') return toast('Select at least one destination');
    if (res?.error) return toast(String(res.error));
    toast('Multi-platform session started · TEST MODE');
    refreshConnect();
  });
  root.querySelector('#connectMpEnd')?.addEventListener('click', () => {
    endRestreamGoLive();
    toast('Session ended');
    refreshConnect();
  });
}

export function bindConnect(root = document, rerender) {
  const redraw = () => {
    if (typeof rerender === 'function') return rerender();
    root.innerHTML = renderConnect();
    bindConnect(root);
  };
  root.querySelector('#connect-age')?.addEventListener('change', (e) => {
    const checked = e.target.checked;
    updateConnectPrefs(
      checked ? { ageConfirmed: true } : { ageConfirmed: false, rulesAccepted: false }
    );
    redraw();
  });
  root.querySelector('#connect-rules')?.addEventListener('change', (e) => {
    updateConnectPrefs({ rulesAccepted: e.target.checked });
    redraw();
  });
  // Fail closed: this prototype has no verified age assurance or WebRTC matching.
  // Never animate a fake match, request media, or imply that another person exists.
  root.querySelector('#connect-start')?.addEventListener('click', () => {
    const blocked = root.querySelector('#connect-blocked');
    blocked?.removeAttribute('hidden');
    toast(BLOCK_MSG);
  });

  bindMultiPlatform(root);

  // Both Connect entry points must honor the router's in-page anchor.
  // Whitelist known sections so arbitrary hash fragments are never used as selectors.
  const anchor = getRoute().elementId;
  if (anchor === 'connect-random-chat' || anchor === 'connect-multistream') {
    requestAnimationFrame(() => {
      root.querySelector(`#${anchor}`)?.scrollIntoView({
        behavior: globalThis.window?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'instant' : 'smooth',
        block: 'start',
      });
    });
  }
}
