import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, makeAdmin } from './helpers.js';
import cfg from '../wrangler.jsonc?raw';

const strip = (s) => s.replace(/("(?:[^"\\]|\\.)*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (m, str) => str ?? '');

describe('deploy config', () => {
  it('declares no top-level r2_buckets (R2 not provisioned/approved)', () => {
    const c = JSON.parse(strip(cfg).replace(/,(\s*[}\]])/g, '$1'));
    expect(c.r2_buckets).toBeUndefined();
    expect(c.d1_databases?.[0]?.binding).toBe('DB');
  });
});

async function withoutMedia(fn) { const s = env.MEDIA; try { env.MEDIA = undefined; return await fn(); } finally { env.MEDIA = s; } }

describe('Vault with no MEDIA binding', () => {
  it('upload create returns 503 vault_storage_not_configured', async () => {
    const u = await newUser();
    const r = await withoutMedia(() => call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: 256, access: 'private' } }));
    expect(r.status).toBe(503);
    expect(r.json.error.code).toBe('vault_storage_not_configured');
  });
  it('/vault/health reports storage not configured', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    const h = await withoutMedia(() => call('GET', '/vault/health', { cookie: adm.cookie }));
    expect(h.status).toBe(200);
    expect(h.json.status).toBe('degraded');
    expect(h.json.storage.configured).toBe(false);
    expect(h.json.storage.error).toMatch(/not configured/);
  });
});
