import { describe, it, expect, vi, afterEach } from 'vitest';
import { sendVerificationEmail, verificationUrl } from '../src/email.js';

afterEach(() => vi.unstubAllGlobals());

describe('verification email delivery', () => {
  it('builds the frontend verification hash route', () => {
    expect(verificationUrl({ PUBLIC_APP_URL: 'https://scrubdup.github.io/pikk-app/' }, 'abc+/='))
      .toBe('https://scrubdup.github.io/pikk-app/#/verify-email?token=abc%2B%2F%3D');
  });

  it('exposes the token only in local test mode', async () => {
    const r = await sendVerificationEmail({ EXPOSE_VERIFY_TOKEN: 'true' }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1' });
    expect(r).toEqual({ delivery: 'exposed_for_local_testing', token: 'secret-token' });
  });

  it('reports provider-not-configured without exposing the token', async () => {
    const r = await sendVerificationEmail({ EXPOSE_VERIFY_TOKEN: 'false' }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1' });
    expect(r).toEqual({ delivery: 'email_provider_not_configured' });
    expect(JSON.stringify(r)).not.toContain('secret-token');
  });

  it('sends through Resend when secrets and sender are configured', async () => {
    const fetchMock = vi.fn(async (_url, init) => {
      expect(init.headers.Authorization).toBe('Bearer re_test');
      expect(init.headers['Idempotency-Key']).toBe('pikk-verify-usr_1');
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
    }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(r).toEqual({ delivery: 'email_sent', provider: 'resend', message_id: 'email_123' });
  });

  it('does not fail account creation when provider delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('bad', { status: 500 })));
    const r = await sendVerificationEmail({
      EXPOSE_VERIFY_TOKEN: 'false',
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <verify@example.com>',
    }, { to: 'a@example.com', token: 'secret-token', userId: 'usr_1' });
    expect(r).toEqual({ delivery: 'email_send_failed' });
  });
});
