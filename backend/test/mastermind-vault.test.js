import { describe, it, expect } from 'vitest';
import { vaultPanel } from '../src/ops.js';

const NOW = Date.parse('2026-11-01T03:00:00.000Z');
const body = (o = {}) => ({
  status: 'ok', version: 'vault-slice1-0.1.0', checked_at: new Date(NOW - 5000).toISOString(),
  storage: { binding: 'MEDIA', reachable: true, error: null },
  counts_by_state: { pending_upload: 1, uploaded: 2, ready: 3, rejected: 4, failed: 5, deleted: 6 },
  last_error: { media_id: 'med_secret123', state: 'failed', message: 'jane.doe@example.com upload of "Jane Doe nude.png" failed', at: '2026-11-01T02:59:00.000Z' },
  ...o,
});
const res = (b, status = 200) => async () => new Response(JSON.stringify(b), { status, headers: { 'Content-Type': 'application/json' } });

describe('Master Mind vault panel (/vault/health mapping)', () => {
  it('absent handler, 404, non-2xx or throw => unknown with "not available" note', async () => {
    for (const vh of [undefined, res({}, 404), res({}, 500), async () => { throw new Error('boom'); }, async () => null]) {
      const p = await vaultPanel(vh, NOW);
      expect(p.status).toBe('unknown'); expect(p.checkedAt).toBeNull();
      expect(p.detail.reason).toMatch(/Vault health isn't available/);
    }
  });
  it('ok => healthy with counts', async () => {
    const p = await vaultPanel(res(body()), NOW);
    expect(p.status).toBe('healthy');
    expect(p.detail.countsByState).toEqual({ pending_upload: 1, uploaded: 2, ready: 3, rejected: 4, failed: 5, deleted: 6 });
    expect(p.checkedAt).toBe(body().checked_at);
  });
  it('degraded => degraded', async () => {
    expect((await vaultPanel(res(body({ status: 'degraded' })), NOW)).status).toBe('degraded');
  });
  it('storage.reachable false => down', async () => {
    expect((await vaultPanel(res(body({ status: 'degraded', storage: { binding: 'MEDIA', reachable: false, error: 'binding MEDIA missing' } })), NOW)).status).toBe('down');
  });
  it('old or missing checked_at => stale', async () => {
    expect((await vaultPanel(res(body({ checked_at: new Date(NOW - 3600e3).toISOString() })), NOW)).status).toBe('stale');
    expect((await vaultPanel(res(body({ checked_at: undefined })), NOW)).status).toBe('stale');
  });
  it('no PII: drops media_id, message and storage error text', async () => {
    const p = await vaultPanel(res(body()), NOW);
    expect(p.detail.lastError).toEqual({ state: 'failed', at: '2026-11-01T02:59:00.000Z' });
    const s = JSON.stringify(p);
    for (const bad of ['med_secret123', 'jane', 'Jane', 'example.com', 'nude', 'message', 'media_id']) expect(s).not.toContain(bad);
  });
});
