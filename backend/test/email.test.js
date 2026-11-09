import { describe, it, expect, vi, afterEach } from 'vitest';
import { sendVerificationEmail, verificationUrl, sendPasswordResetEmail, passwordResetUrl } from '../src/email.js';

afterEach(() => vi.unstubAllGlobals());

describe('verification email delivery', () => {
  it('builds the frontend verification hash route', () => {
    expect(verificationUrl({ PUBLIC_APP_URL: 'https://scrubdup.github.io/pikk-app/' }, 'abc+/='))
      .toBe('https://scrubdup.github.io/pikk-app/#/verify-email?token=abc%2B%2F%3D');
  });

  it('exposes the token only in local test mode', async () => {
    const r = await sendVerificationEmail({ EXPOSE_VERIFY_TOKEN: 'true' }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1', tokenHash: 'abc' });
    expect(r).toEqual({ delivery: 'exposed_for_local_testing', token: 'secret-token' });
  });

  it('reports provider-not-configured without exposing the token', async () => {
    const r = await sendVerificationEmail({ EXPOSE_VERIFY_TOKEN: 'false' }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1', tokenHash: 'abc' });
    expect(r).toEqual({ delivery: 'email_provider_not_configured' });
    expect(JSON.stringify(r)).not.toContain('secret-token');
  });

  it('sends through Resend with per-token Idempotency-Key', async () => {
    const fetchMock = vi.fn(async (_url, init) => {
      expect(init.headers.Authorization).toBe('Bearer re_test');
      expect(init.headers['Idempotency-Key']).toBe('pikk-verify/hash_tok_1');
      expect(init.signal).toBeTruthy();
      const body = JSON.parse(init.body);
      expect(body.to).toEqual(['a@example.com']);
      expect(body.from).toBe('PIKK <verify@example.com>');
      expect(body.html).toContain('#/verify-email?token=secret-token');
      return new Response(JSON.stringify({ id: 'email_123' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);
    const r = await sendVerificationEmail({
      EXPOSE_VERIFY_TOKEN: 'false',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <verify@example.com>',
      PUBLIC_APP_URL: 'https://scrubdup.github.io/pikk-app/',
    }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1', tokenHash: 'hash_tok_1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(r).toEqual({ delivery: 'email_sent', provider: 'resend', message_id: 'email_123' });
  });

  it('does not fail account creation when provider delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('bad', { status: 500 })));
    const r = await sendVerificationEmail({
      EXPOSE_VERIFY_TOKEN: 'false',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <verify@example.com>',
    }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1', tokenHash: 'h1' });
    expect(r).toEqual({ delivery: 'email_send_failed', status: 500 });
  });

  it('maps provider timeout/throw to email_send_failed', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('timeout'); }));
    const r = await sendVerificationEmail({
      EXPOSE_VERIFY_TOKEN: 'false',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <verify@example.com>',
    }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1', tokenHash: 'h2' });
    expect(r).toEqual({ delivery: 'email_send_failed' });
  });
});

describe('password reset email delivery', () => {
  it('builds a reset hash URL without logging', () => {
    expect(passwordResetUrl({ PUBLIC_APP_URL: 'https://scrubdup.github.io/pikk-app/' }, 'tok+/=')).toBe(
      'https://scrubdup.github.io/pikk-app/#/reset-password?token=tok%2B%2F%3D'
    );
  });

  it('exposes token only when EXPOSE_VERIFY_TOKEN is true', async () => {
    const r = await sendPasswordResetEmail({ EXPOSE_VERIFY_TOKEN: 'true' }, { to: 'a@example.com', token: 'reset-secret-token', tokenHash: 'th' });
    expect(r).toEqual({ delivery: 'exposed_for_local_testing', token: 'reset-secret-token' });
  });

  it('reports provider not configured without leaking the token', async () => {
    const r = await sendPasswordResetEmail({ EXPOSE_VERIFY_TOKEN: 'false' }, { to: 'a@example.com', token: 'reset-secret-token', tokenHash: 'th' });
    expect(r).toEqual({ delivery: 'email_provider_not_configured' });
  });

  it('uses unique per-token Idempotency-Key and times out via AbortSignal', async () => {
    const keys = [];
    vi.stubGlobal('fetch', vi.fn(async (_url, init) => {
      keys.push(init.headers['Idempotency-Key']);
      expect(init.signal).toBeTruthy();
      return new Response(JSON.stringify({ id: 'm1' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }));
    const env = {
      EXPOSE_VERIFY_TOKEN: 'false',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <x@example.com>',
      PUBLIC_APP_URL: 'https://scrubdup.github.io/pikk-app/',
    };
    await sendPasswordResetEmail(env, { to: 'a@example.com', token: 't1', tokenHash: 'hashA' });
    await sendPasswordResetEmail(env, { to: 'a@example.com', token: 't2', tokenHash: 'hashB' });
    expect(keys).toEqual(['pikk-pwreset/hashA', 'pikk-pwreset/hashB']);
  });

  it('maps Resend 409 and network throw to email_send_failed', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{"name":"invalid_idempotent_request"}', { status: 409 })));
    const r409 = await sendPasswordResetEmail({
      EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>',
    }, { to: 'a@example.com', token: 't', tokenHash: 'h' });
    expect(r409.delivery).toBe('email_send_failed');
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network'); }));
    const rThrow = await sendPasswordResetEmail({
      EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>',
    }, { to: 'a@example.com', token: 't', tokenHash: 'h2' });
    expect(rThrow.delivery).toBe('email_send_failed');
  });
});
