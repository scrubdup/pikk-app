import { esc, shellPage } from '../ui.js';
import { asset } from '../asset.js';
import { apiBase, loadOpsSummary, displayStatus, PANEL_LABELS } from '../mastermind.js';

const MESSAGES = {
  loading: ['Checking…', 'Contacting the PIKK API.'],
  not_connected: ['Not connected', 'The PIKK API is not connected to this build yet, so there is no live data to show. Nothing on this screen is simulated.'],
  unauthenticated: ['Not signed in', 'Sign in with the PIKK owner account to view Master Mind.'],
  forbidden: ['Not authorized', 'Master Mind is owner-only. The server refused this account.'],
  error: ['Unavailable', 'The PIKK API returned an error. No data is shown rather than guessing.'],
};

function stateCard(state) {
  const [title, body] = MESSAGES[state] || MESSAGES.error;
  return `<article class="card mastermind-state" data-mastermind-state="${esc(state)}"><strong>${esc(title)}</strong><p class="muted">${esc(body)}</p></article>`;
}

function detailRows(detail) {
  if (!detail || typeof detail !== 'object') return '';
  return Object.entries(detail).filter(([k]) => k !== 'recent').map(([k, v]) =>
    `<li><span class="muted">${esc(k)}</span> <strong>${esc(typeof v === 'object' ? JSON.stringify(v) : v)}</strong></li>`).join('');
}

export function renderPanels(summary, now = Date.now()) {
  return Object.entries(summary.panels).map(([name, p]) => {
    const st = displayStatus(p, now);
    return `<article class="card mastermind-panel" data-panel="${esc(name)}">
      <div class="row wrap"><strong>${esc(PANEL_LABELS[name] || name)}</strong><span class="chip mastermind-status-${esc(st)}">${esc(st)}</span></div>
      <p class="muted">Source: ${esc(p?.source || 'none')} · Checked: ${esc(p?.checkedAt ? new Date(p.checkedAt).toLocaleString() : 'never')}</p>
      <ul class="mastermind-detail">${detailRows(p?.detail)}</ul>
    </article>`;
  }).join('');
}

export function renderMastermind() {
  return shellPage('PIKK Master Mind', `
    <div class="mastermind">
      <header class="row wrap mastermind-head"><img src="${esc(asset('brand/pikk-official-approved.jpg'))}" alt="PIKK" width="40" height="40" loading="eager"/>
        <p class="muted">Owner-only, read-only operations view. Every status comes from the server; unknown means unknown.</p></header>
      <div id="mastermindBody">${stateCard('loading')}</div>
    </div>`, { badge: 'READ-ONLY' });
}

export async function bindMastermind(root = document) {
  const el = root.querySelector('#mastermindBody');
  if (!el) return;
  const r = await loadOpsSummary(apiBase(import.meta.env || {}));
  el.innerHTML = r.state === 'ok' ? renderPanels(r.summary) : stateCard(r.state);
}
