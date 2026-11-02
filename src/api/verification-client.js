// Age/ID verification client. The server is the only source of truth; nothing here can mark anyone verified.
const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');
function base() {
  const runtime = typeof window !== 'undefined' && typeof window.__PIKK_API_BASE__ === 'string' ? window.__PIKK_API_BASE__.trim() : '';
  return (runtime || BUILD_API_BASE).replace(/\/$/, '');
}
export const isVerificationApiConfigured = () => !!base();

async function request(path, method = 'GET', body) {
  const b = base();
  if (!b) { const e = new Error('PIKK API is not configured'); e.code = 'api_not_configured'; throw e; }
  const res = await fetch(b + path, { method, credentials: 'include', headers: method === 'GET' ? undefined : { 'Content-Type': 'application/json' }, body: method === 'GET' ? undefined : JSON.stringify(body || {}) });
  let data = null; try { data = await res.json(); } catch {}
  if (!res.ok) { const e = new Error(data?.error?.message || `Request failed (${res.status})`); e.code = data?.error?.code || 'request_failed'; e.status = res.status; throw e; }
  return data;
}

export const STATUS_COPY = Object.freeze({
  not_connected: { label: 'Not available yet', text: 'ID verification provider not connected yet. Dating and 18+ contests stay locked until it is.' },
  not_started: { label: 'Not started', text: 'Verify you are 18+ with a government ID and a selfie through our verification partner. PIKK keeps only the result.' },
  pending: { label: 'Pending', text: 'Your verification is in progress. This page updates once the provider sends a result.' },
  needs_review: { label: 'Under review', text: 'Your verification needs a manual review by the provider.' },
  verified: { label: 'Verified 18+', text: 'You are verified 18+.' },
  declined: { label: 'Declined', text: 'Verification was not approved. Contact Support if you think this is a mistake.' },
  expired: { label: 'Expired', text: 'Your verification session expired. Start again.' },
  signin: { label: 'Sign in required', text: 'Sign in with a verified email to verify your age.' },
});

export const verificationApi = {
  status: () => request('/verification/age'),
  start: () => request('/verification/age/start', 'POST'),
  consentText: () => request('/verification/age/consent'),
  consent: ({ version, sha256, fullName }) => request('/verification/age/consent', 'POST', { agree: true, version, sha256, full_name: fullName }),
  contestEligibility: (contest) => request(`/contests/${encodeURIComponent(contest)}/eligibility`),
  submitEntry: (contest, title, live = false) => request(`/contests/${encodeURIComponent(contest)}/${live ? 'live' : 'entries'}`, 'POST', { title }),
  setGender: (gender) => request('/account/gender', 'POST', { gender }),
};

/** Map any error/state into a status key. Never returns 'verified' unless the server said so. */
export function statusFromError(err) {
  if (err?.code === 'api_not_configured' || err?.code === 'provider_not_connected') return 'not_connected';
  if (err?.status === 401 || err?.code === 'email_unverified') return 'signin';
  return 'not_connected';
}

/** Only https hosted URLs from the provider are opened. */
export function safeHostedUrl(u) {
  try { const x = new URL(u); return x.protocol === 'https:' ? x.href : null; } catch { return null; }
}

/** Written e-signature is valid only with the box checked and a first + last name typed. */
export function validConsentSignature(checked, fullName) {
  return checked === true && /\S+\s+\S+/.test(String(fullName || '').trim()) && String(fullName).trim().length >= 3;
}
