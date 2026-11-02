import { describe, it, expect } from 'vitest';
import { call, newUser, freshIp } from './helpers.js';

describe('persistent posts feeds', () => {
  it('persists text posts and returns them in Discover', async () => {
    const u = await newUser();
    const created = await call('POST', '/posts', {
      cookie: u.cookie,
      ip: freshIp(),
      body: { kind: 'text', body: 'Persistent PIKK post from D1.' },
    });
    expect(created.status).toBe(201);
    const discover = await call('GET', '/posts', { cookie: u.cookie, ip: freshIp() });
    expect(discover.status).toBe(200);
    const saved = discover.json.posts.find(p => p.id === created.json.post.id);
    expect(saved).toBeTruthy();
    expect(saved.body).toBe('Persistent PIKK post from D1.');
    expect(saved.author).toBe(u.handle);
  });

  it('keeps Following feed limited to self and followed users', async () => {
    const a = await newUser();
    const b = await newUser();
    const bPost = await call('POST', '/posts', {
      cookie: b.cookie,
      ip: freshIp(),
      body: { kind: 'text', body: 'Follow-only post from B.' },
    });
    expect(bPost.status).toBe(201);

    let feed = await call('GET', '/feed', { cookie: a.cookie, ip: freshIp() });
    expect(feed.status).toBe(200);
    expect(feed.json.posts.some(p => p.id === bPost.json.post.id)).toBe(false);

    const follow = await call('POST', '/follows', {
      cookie: a.cookie,
      ip: freshIp(),
      body: { handle: b.handle },
    });
    expect(follow.status).toBe(200);

    feed = await call('GET', '/feed', { cookie: a.cookie, ip: freshIp() });
    expect(feed.json.posts.some(p => p.id === bPost.json.post.id)).toBe(true);
  });

  it('requires a verified account to create a post', async () => {
    const u = await newUser({ verify: false });
    const r = await call('POST', '/posts', {
      cookie: u.cookie,
      ip: freshIp(),
      body: { kind: 'text', body: 'This should not publish yet.' },
    });
    expect(r.status).toBe(403);
    expect(r.json.error.code).toBe('email_unverified');
  });
});
