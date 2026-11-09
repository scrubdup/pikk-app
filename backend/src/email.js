const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const PROVIDER_TIMEOUT_MS = 5000;

function appUrl(env) {
  const raw = String(env.PUBLIC_APP_URL || 'https://scrubdup.github.io/pikk-app/').trim();
  return raw.endsWith('/') ? raw : raw + '/';
}

async function resendFetch(env, { idempotencyKey, to, subject, html, text }) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html, text }),
    signal: AbortSignal.timeout(PROVIDER_TIMEOUT_MS),
  });
  if (!res.ok) {
    return { delivery: 'email_send_failed', status: res.status };
  }
  let body = null;
  try { body = await res.json(); } catch {}
  return { delivery: 'email_sent', provider: 'resend', message_id: body?.id || null };
}

export function verificationUrl(env, token) {
  return `${appUrl(env)}#/verify-email?token=${encodeURIComponent(token)}`;
}

/** Idempotency key must be unique per token payload (not per user). */
export async function sendVerificationEmail(env, { to, token, userId, tokenHash }) {
  if (env.EXPOSE_VERIFY_TOKEN === 'true') {
    return { delivery: 'exposed_for_local_testing', token };
  }
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return { delivery: 'email_provider_not_configured' };
  }
  const url = verificationUrl(env, token);
  const key = tokenHash ? `pikk-verify/${tokenHash}` : `pikk-verify/${userId}/${await hashFallback(token)}`;
  try {
    return await resendFetch(env, {
      idempotencyKey: key.slice(0, 256),
      to,
      subject: 'Verify your PIKK email',
      html: `<p>Welcome to PIKK.</p><p><a href="${url}">Verify your email</a></p><p>This link expires in 24 hours.</p>`,
      text: `Welcome to PIKK. Verify your email: ${url}\nThis link expires in 24 hours.`,
    });
  } catch {
    return { delivery: 'email_send_failed' };
  }
}

async function hashFallback(token) {
  const data = new TextEncoder().encode(String(token || ''));
  const dig = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(dig)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export function passwordResetUrl(env, token) {
  return `${appUrl(env)}#/reset-password?token=${encodeURIComponent(token)}`;
}

/** Never logs the token. Idempotency-Key is unique per token hash. */
export async function sendPasswordResetEmail(env, { to, token, tokenHash }) {
  if (env.EXPOSE_VERIFY_TOKEN === 'true') {
    return { delivery: 'exposed_for_local_testing', token };
  }
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return { delivery: 'email_provider_not_configured' };
  }
  if (!tokenHash) {
    return { delivery: 'email_send_failed' };
  }
  const url = passwordResetUrl(env, token);
  try {
    return await resendFetch(env, {
      idempotencyKey: `pikk-pwreset/${tokenHash}`.slice(0, 256),
      to,
      subject: 'Reset your PIKK password',
      html: `<p>We received a request to reset your PIKK password.</p><p><a href="${url}">Choose a new password</a></p><p>This link expires in 1 hour. If you did not ask for this, you can ignore this email.</p>`,
      text: `Reset your PIKK password: ${url}\nThis link expires in 1 hour. If you did not ask for this, ignore this email.`,
    });
  } catch {
    return { delivery: 'email_send_failed' };
  }
}
