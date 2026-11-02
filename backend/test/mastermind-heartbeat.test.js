import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, makeAdmin, staff, grantRole } from './helpers.js';
import { heartbeatStatus, runScheduled, recordHeartbeat, CRON_WORKER, WORKER_REGISTRY } from '../src/heartbeat.js';
import worker from '../src/index.js';

const I = WORKER_REGISTRY[CRON_WORKER].intervalSec;
const NOW = Date.parse('2026-11-02T16:00:00.000Z');
const ago = (s) => new Date(NOW - s * 1000).toISOString();
async function owner() { const u = await newUser(); await env.DB.prepare(`DELETE FROM user_roles WHERE role='owner'`).run(); await grantRole(u.id, 'owner'); return u; }
const clear = () => env.DB.prepare(`DELETE FROM worker_heartbeats`).run();
const summary = async (o) => (await call('GET', '/admin/ops/summary', { cookie: o.cookie })).json.panels.workers;

describe('heartbeat freshness mapping', () => {
  it('missing => unknown; fresh => healthy; fresh error => degraded; old => stale; very old => down', () => {
    expect(heartbeatStatus(null, I, NOW).status).toBe('unknown');
    expect(heartbeatStatus({ last_beat_at: ago(10), last_status: 'ok' }, I, NOW)).toEqual({ status: 'healthy', ageSec: 10 });
    expect(heartbeatStatus({ last_beat_at: ago(10), last_status: 'error' }, I, NOW).status).toBe('degraded');
    expect(heartbeatStatus({ last_beat_at: ago(I * 2 + 1), last_status: 'ok' }, I, NOW).status).toBe('stale');
    expect(heartbeatStatus({ last_beat_at: ago(I * 6 + 1), last_status: 'ok' }, I, NOW).status).toBe('down');
    expect(heartbeatStatus({ last_beat_at: 'garbage', last_status: 'ok' }, I, NOW).status).toBe('unknown');
  });
});

describe('workers panel in /admin/ops/summary', () => {
  it('no heartbeat yet => unknown (never fake healthy)', async () => {
    await clear(); const o = await owner();
    const p = await summary(o);
    expect(p.status).toBe('unknown'); expect(p.checkedAt).toBeNull();
    expect(p.detail.workers[0]).toMatchObject({ worker: CRON_WORKER, status: 'unknown', runCount: 0 });
  });
  it('scheduled() run records a heartbeat => healthy; old heartbeat => stale; very old => down', async () => {
    await clear(); const o = await owner();
    const waits = []; await worker.scheduled({}, env, { waitUntil: (p) => waits.push(p) }); await Promise.all(waits);
    let p = await summary(o);
    expect(p.status).toBe('healthy'); expect(p.detail.workers[0].runCount).toBe(1);
    await recordHeartbeat(env, CRON_WORKER, { status: 'ok', at: new Date(Date.now() - (I * 3) * 1000).toISOString() });
    expect((await summary(o)).status).toBe('stale');
    await recordHeartbeat(env, CRON_WORKER, { status: 'ok', at: new Date(Date.now() - (I * 7) * 1000).toISOString() });
    expect((await summary(o)).status).toBe('down');
  });
  it('a failed check records degraded with a sanitized code only', async () => {
    await clear(); const o = await owner();
    await recordHeartbeat(env, CRON_WORKER, { status: 'error', error: 'user jane@example.com broke it' });
    const p = await summary(o);
    expect(p.status).toBe('degraded'); expect(p.detail.workers[0].lastError).toBe('check_failed');
    expect(JSON.stringify(p)).not.toContain('example.com');
  });
  it('runScheduled reports ok and increments run_count', async () => {
    await clear();
    expect(await runScheduled(env)).toMatchObject({ ok: true, error: null });
    await runScheduled(env);
    expect((await env.DB.prepare(`SELECT run_count FROM worker_heartbeats WHERE worker=?`).bind(CRON_WORKER).first()).run_count).toBe(2);
  });
  it('ops summary never writes heartbeats', async () => {
    await clear(); const o = await owner();
    await call('GET', '/admin/ops/summary', { cookie: o.cookie });
    expect((await env.DB.prepare(`SELECT COUNT(*) AS n FROM worker_heartbeats`).first()).n).toBe(0);
  });
  it('non-owners get 403 (admin, moderator, support_agent, dmca, user); anonymous 401', async () => {
    const admin = await newUser(); await makeAdmin(admin.id);
    for (const u of [admin, await staff('moderator'), await staff('support_agent'), await staff('dmca'), await newUser()])
      expect((await call('GET', '/admin/ops/summary', { cookie: u.cookie })).status).toBe(403);
    expect((await call('GET', '/admin/ops/summary')).status).toBe(401);
  });
});
