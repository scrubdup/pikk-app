const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function appUrl(env) {
  const raw = String(env.PUBLIC_APP_URL || 'https://scrubdup.github.io/pikk-app/').trim();
  return raw.endsWith('/') ? raw : raw + '/';
}

export function verificationUrl(env, token) {
  return `${appUrl(env)}#/verify-email?token=${encodeURIComponent(token)}`;
}

export async function sendVerificationEmail(env, { to, token, userId }) {
  if (env.EXPOSE_VERIFY_TOKEN === 'true') {
    return { delivery: 'exposed_for_local_testing', token };
  }
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    return { delivery: 'email_provider_not_configured' };
  }

  const url = verificationUrl(env, token);
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `pikk-verify-${userId}`,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [to],
      subject: 'Verify your PIKK email',
      html: `<p>Welcome to PIKK.</p><p><a href="${url}">Verify your email</a></p><p>This link expires in 24 hours.</p>`,
      text: `Welcome to PIKK. Verify your email: ${url}\nThis link expires in 24 hours.`,
    }),
  });

  if (!res.ok) {
    return { delivery: 'email_send_failed' };
  }
  let body = null;
  try { body = await res.json(); } catch {}
  return { delivery: 'email_sent', provider: 'resend', message_id: body?.id || null };
}
