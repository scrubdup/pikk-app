import { describe, it, expect } from 'vitest';
import { call, newUser, freshIp } from './helpers.js';

async function createPost(user, body='Persistent engagement post') {
  const r = await call('POST', '/posts', {
    cookie: user.cookie, ip: freshIp(), body: { kind: 'text', body },
  });
  expect(r.status).toBe(201);
  return r.json.post;
}

describe('persistent post engagement', () => {
  it('persists likes, unlike and feed counts', async () => {
    const author = await newUser();
    const viewer = await newUser();
    const post = await createPost(author);

    const liked = await call('POST', '/posts/' + post.id + '/like', {
      cookie: viewer.cookie, ip: freshIp(), body: {},
    });
    expect(liked.status).toBe(200);
    expect(liked.json).toMatchObject({ liked: true, like_count: 1 });

    let feed = await call('GET', '/posts', { cookie: viewer.cookie, ip: freshIp() });
    let row = feed.json.posts.find(p => p.id === post.id);
    expect(Number(row.like_count)).toBe(1);
    expect(Number(row.liked_by_me)).toBe(1);

    const unliked = await call('DELETE', '/posts/' + post.id + '/like', {
      cookie: viewer.cookie, ip: freshIp(), body: {},
    });
    expect(unliked.status).toBe(200);
    expect(unliked.json).toMatchObject({ liked: false, like_count: 0 });

    feed = await call('GET', '/posts', { cookie: viewer.cookie, ip: freshIp() });
    row = feed.json.posts.find(p => p.id === post.id);
    expect(Number(row.like_count)).toBe(0);
    expect(Number(row.liked_by_me)).toBe(0);
  });

  it('persists comments and returns them with feed counts', async () => {
    const author = await newUser();
    const viewer = await newUser();
    const post = await createPost(author, 'Comment persistence post');

    const added = await call('POST', '/posts/' + post.id + '/comments', {
      cookie: viewer.cookie, ip: freshIp(), body: { body: 'This comment lives in D1.' },
    });
    expect(added.status).toBe(201);
    expect(added.json.comment.body).toBe('This comment lives in D1.');
    expect(added.json.comment_count).toBe(1);

    const comments = await call('GET', '/posts/' + post.id + '/comments', {
      cookie: author.cookie, ip: freshIp(),
    });
    expect(comments.status).toBe(200);
    expect(comments.json.comments.some(c => c.body === 'This comment lives in D1.' && c.author === viewer.handle)).toBe(true);

    const feed = await call('GET', '/posts', { cookie: author.cookie, ip: freshIp() });
    const row = feed.json.posts.find(p => p.id === post.id);
    expect(Number(row.comment_count)).toBe(1);
  });

  it('blocks engagement writes when either account blocks the other', async () => {
    const author = await newUser();
    const viewer = await newUser();
    const post = await createPost(author, 'Blocked engagement post');

    const blocked = await call('POST', '/blocks', {
      cookie: author.cookie, ip: freshIp(), body: { handle: viewer.handle },
    });
    expect(blocked.status).toBe(200);

    const like = await call('POST', '/posts/' + post.id + '/like', {
      cookie: viewer.cookie, ip: freshIp(), body: {},
    });
    expect(like.status).toBe(403);
    expect(like.json.error.code).toBe('blocked');

    const comment = await call('POST', '/posts/' + post.id + '/comments', {
      cookie: viewer.cookie, ip: freshIp(), body: { body: 'Blocked comment must not save.' },
    });
    expect(comment.status).toBe(403);
    expect(comment.json.error.code).toBe('blocked');
  });

  it('requires verified email for engagement writes', async () => {
    const author = await newUser();
    const viewer = await newUser({ verify: false });
    const post = await createPost(author);

    expect((await call('POST', '/posts/' + post.id + '/like', {
      cookie: viewer.cookie, ip: freshIp(), body: {},
    })).status).toBe(403);

    expect((await call('POST', '/posts/' + post.id + '/comments', {
      cookie: viewer.cookie, ip: freshIp(), body: { body: 'Not allowed yet.' },
    })).status).toBe(403);
  });
});
