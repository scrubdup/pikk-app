import { describe, it, expect } from 'vitest';
import { call, newUser, freshIp } from './helpers.js';

describe('two-user persistent social records (local D1)', () => {
  it('profiles, posts, likes, comments and follows persist across isolated identities', async () => {
    const alice = await newUser();
    const bob = await newUser();

    // Profiles: each can read the other by handle (no email in public payload)
    const bobProfile = await call('GET', `/users/${bob.handle}`, { cookie: alice.cookie, ip: freshIp() });
    expect(bobProfile.status).toBe(200);
    expect(bobProfile.json.user.handle).toBe(bob.handle);
    expect(bobProfile.json.user).not.toHaveProperty('email');

    const aliceProfile = await call('GET', `/users/${alice.handle}`, { cookie: bob.cookie, ip: freshIp() });
    expect(aliceProfile.status).toBe(200);
    expect(aliceProfile.json.user.handle).toBe(alice.handle);

    // Alice posts; Bob does not yet see it on Following
    const created = await call('POST', '/posts', {
      cookie: alice.cookie,
      ip: freshIp(),
      body: { kind: 'text', body: 'Two-user social persistence post.' },
    });
    expect(created.status).toBe(201);
    const postId = created.json.post.id;

    let bobFeed = await call('GET', '/feed', { cookie: bob.cookie, ip: freshIp() });
    expect(bobFeed.status).toBe(200);
    expect(bobFeed.json.posts.some((p) => p.id === postId)).toBe(false);

    // Bob follows Alice → Following feed includes the post
    const follow = await call('POST', '/follows', {
      cookie: bob.cookie,
      ip: freshIp(),
      body: { handle: alice.handle },
    });
    expect(follow.status).toBe(200);

    bobFeed = await call('GET', '/feed', { cookie: bob.cookie, ip: freshIp() });
    expect(bobFeed.json.posts.some((p) => p.id === postId)).toBe(true);

    // Bob likes and comments; Discover reflects counts for Alice
    const like = await call('POST', `/posts/${postId}/like`, { cookie: bob.cookie, ip: freshIp(), body: {} });
    expect(like.status).toBe(200);
    expect(like.json.liked).toBe(true);

    const comment = await call('POST', `/posts/${postId}/comments`, {
      cookie: bob.cookie,
      ip: freshIp(),
      body: { body: 'Nice persistent post, Alice.' },
    });
    expect(comment.status).toBe(201);

    const discover = await call('GET', '/posts', { cookie: alice.cookie, ip: freshIp() });
    const row = discover.json.posts.find((p) => p.id === postId);
    expect(row).toBeTruthy();
    expect(Number(row.like_count)).toBeGreaterThanOrEqual(1);
    expect(Number(row.comment_count)).toBeGreaterThanOrEqual(1);

    const comments = await call('GET', `/posts/${postId}/comments`, { cookie: alice.cookie, ip: freshIp() });
    expect(comments.json.comments.some((c) => c.author === bob.handle && c.body.includes('persistent'))).toBe(true);

    // Unlike does not invent local state — server authoritative
    const unlike = await call('DELETE', `/posts/${postId}/like`, { cookie: bob.cookie, ip: freshIp(), body: {} });
    expect(unlike.status).toBe(200);
    expect(unlike.json.liked).toBe(false);
  });
});
