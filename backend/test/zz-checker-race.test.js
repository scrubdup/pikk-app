import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { enqueue, claim, complete, reclaimExpired, LEASE_SEC } from '../src/jobs.js';
const T = Date.parse('2026-01-01T00:00:00Z');
describe('checker race probe', () => {
  it('two concurrent reclaimers on one stuck job', async () => {
    await env.DB.prepare('DELETE FROM jobs').run();
    const j = await enqueue(env, { kind: 'k', key: 'race', maxAttempts: 3, now: T });
    await claim(env, j.id, T);
    const now = T + LEASE_SEC * 1000;
    const [a, b] = await Promise.all([reclaimExpired(env, now), reclaimExpired(env, now)]);
    expect([...a, ...b].length).toBe(1);
  });
  it('slow worker completes while reclaim is in flight', async () => {
    await env.DB.prepare('DELETE FROM jobs').run();
    const j = await enqueue(env, { kind: 'k', key: 'race2', maxAttempts: 3, now: T });
    const tok = await claim(env, j.id, T);
    const now = T + LEASE_SEC * 1000;
    const [r, c] = await Promise.all([reclaimExpired(env, now), complete(env, j.id, tok, now)]);
    const row = await env.DB.prepare('SELECT state, attempts FROM jobs WHERE id=?').bind(j.id).first();
    // Exactly one of reclaim / late complete wins, and the row reflects the winner.
    expect(r.length + (c ? 1 : 0)).toBe(1);
    expect(row.state).toBe(c ? 'succeeded' : 'failed');
    expect(row.attempts).toBe(1);
  });
});
