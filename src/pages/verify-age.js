import { shellPage, esc, toast } from '../ui.js';
import { verificationApi, STATUS_COPY, statusFromError, safeHostedUrl, isVerificationApiConfigured, validConsentSignature } from '../api/verification-client.js';

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
  const consentStep = async (status) => {
    let c;
    try { c = await verificationApi.consentText(); } catch (err) { return paint(statusFromError(err)); }
    host.innerHTML = `<div class="card" id="bioConsent">
      <h3>Biometric notice &amp; written consent</h3>
      <p class="chip">Draft · lawyer review required</p>
      <pre style="white-space:pre-wrap;font:inherit">${esc(c.text)}</pre>
      <p><a href="#/biometric-policy">Read the PIKK Biometric Retention Policy</a></p>
      <label><input type="checkbox" id="bioAgree"> I have read this notice and I consent.</label>
      <label style="display:block;margin-top:8px">Type your full legal name as your signature
        <input type="text" id="bioName" autocomplete="name" maxlength="120"></label>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn primary" id="bioSign" disabled>Sign and continue</button>
        <a class="btn ghost" href="#/dating">I decline</a>
      </div></div>`;
    const agree = host.querySelector('#bioAgree'); const name = host.querySelector('#bioName'); const btn = host.querySelector('#bioSign');
    const upd = () => { btn.disabled = !validConsentSignature(agree.checked, name.value); };
    agree.addEventListener('change', upd); name.addEventListener('input', upd);
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      try { await verificationApi.consent({ version: c.version, sha256: c.sha256, fullName: name.value.trim() }); toast('Consent recorded'); paint(status, true); }
      catch (err) { toast(err?.message || 'Could not record consent'); upd(); }
    });
  };
  const paint = (status, consented = false) => {
    host.innerHTML = card(status);
    host.querySelector('#verifyAgeStart')?.addEventListener('click', async (ev) => {
      ev.target.disabled = true;
      if (needConsent && !consented) return consentStep(status);
      try {
        const r = await verificationApi.start();
        const url = safeHostedUrl(r?.hosted_url);
        if (!url) throw Object.assign(new Error('bad url'), { code: 'provider_error' });
        window.location.assign(url);
      } catch (err) {
        if (err?.code === 'biometric_consent_required') return consentStep(status);
        toast(err?.code === 'provider_not_connected' ? STATUS_COPY.not_connected.text : 'Could not start verification. Try again later.');
        paint(statusFromError(err) === 'signin' ? 'signin' : status);
      }
    });
  };
  let needConsent = true;
  try { const st = await verificationApi.status(); needConsent = st?.consent_required !== false; paint(st?.status || 'not_connected'); }
  catch (err) { paint(statusFromError(err)); }
}
