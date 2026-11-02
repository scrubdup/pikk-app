import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser } from './helpers.js';

describe('Vault content with no MEDIA binding', () => {
  it('GET /media/:id/content returns 503 vault_storage_not_configured (no crash)', async () => {
    const u = await newUser();
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: 64, access: 'private' } });
    expect(c.status).toBe(201);
    const id = c.json.upload.id;
    await env.DB.prepare("UPDATE media SET state='ready', detected_content_type='image/jpeg' WHERE id=?").bind(id).run();
    const s = env.MEDIA; let r;
    try { env.MEDIA = undefined; r = await call('GET', `/media/${id}/content`, { cookie: u.cookie }); } finally { env.MEDIA = s; }
    expect(r.status).toBe(503);
    expect(r.json.error.code).toBe('vault_storage_not_configured');
  });
});
