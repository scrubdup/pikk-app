import { shellPage, esc, toast } from '../ui.js';
import { verificationApi, STATUS_COPY, statusFromError, safeHostedUrl, isVerificationApiConfigured } from '../api/verification-client.js';

function card(status, extra = '') {
  const c = STATUS_COPY[status] || STATUS_COPY.not_connected;
  const canStart = ['not_started', 'declined', 'expired'].includes(status);
  return `<div class="card" id="verifyAgeCard" data-status="${esc(status)}">
    <h3>Status: <span class="chip">${esc(c.label)}</span></h3>
    <p>${esc(c.text)}</p>${extra}
    ${canStart ? '<button type="button" class="btn primary" id="verifyAgeStart">Verify age / ID</button>' : ''}
    ${status === 'signin' ? '<a class="btn primary" href="#/profile">Sign in</a>' : ''}
    ${status === 'verified' ? '<a class="btn" href="#/dating">Go to Dating</a>' : ''}
  </div>`;
}

export function renderVerifyAge() {
  return shellPage('Verify age / ID', `
    <div id="verifyAgeRoot">${card(isVerificationApiConfigured() ? 'pending' : 'not_connected', isVerificationApiConfigured() ? '<p class="muted">Checking…</p>' : '')}</div>
    <div class="card muted"><h3>Privacy</h3><p>Verification is done by an outside provider. PIKK stores only whether you are 18+, the method, the date and the provider reference. PIKK never stores your ID images or date of birth.</p></div>`,
    { lead: 'Required for Dating and 18+ contests.' });
}

export async function bindVerifyAge(root) {
  const host = root.querySelector('#verifyAgeRoot');
  if (!host || !isVerificationApiConfigured()) return;
  const paint = (status) => {
    host.innerHTML = card(status);
    host.querySelector('#verifyAgeStart')?.addEventListener('click', async (ev) => {
      ev.target.disabled = true;
      try {
        const r = await verificationApi.start();
        const url = safeHostedUrl(r?.hosted_url);
        if (!url) throw Object.assign(new Error('bad url'), { code: 'provider_error' });
        window.location.assign(url);
      } catch (err) {
        toast(err?.code === 'provider_not_connected' ? STATUS_COPY.not_connected.text : 'Could not start verification. Try again later.');
        paint(statusFromError(err) === 'signin' ? 'signin' : status);
      }
    });
  };
  try { paint((await verificationApi.status())?.status || 'not_connected'); }
  catch (err) { paint(statusFromError(err)); }
}
