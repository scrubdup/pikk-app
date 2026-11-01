import { SELF, env } from 'cloudflare:test';
export const ORIGIN = 'https://scrubdup.github.io';
let ipSeq = 0;
export const freshIp = () => `10.0.${Math.floor(++ipSeq / 250)}.${ipSeq % 250}`;

export async function call(method, path, { body, cookie, ip = `10.200.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}`, origin = ORIGIN, headers = {} } = {}) {
  const h = { 'CF-Connecting-IP': ip, ...headers };
  if (origin) h.Origin = origin;
  if (cookie) h.Cookie = cookie;
  if (body !== undefined) h['Content-Type'] = 'application/json';
  const res = await SELF.fetch(`https://api.test${path}`, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) });
  const text = await res.text();
  return { res, status: res.status, json: text ? JSON.parse(text) : null, cookie: (res.headers.get('Set-Cookie') || '').split(';')[0] };
}

let n = 0;
export async function newUser({ verify = true } = {}) {
  n++;
  const handle = `user_${n}_${Math.random().toString(36).slice(2, 7)}`;
  const email = `${handle}@example.com`;
  const password = 'correct horse 42';
  const r = await call('POST', '/auth/signup', { body: { email, password, handle, display_name: `User ${n}` }, ip: freshIp() });
  if (r.status !== 201) throw new Error(`signup failed ${r.status} ${JSON.stringify(r.json)}`);
  if (verify) {
    const v = await call('POST', '/auth/verify', { body: { token: r.json.verification.token }, ip: freshIp() });
    if (v.status !== 200) throw new Error('verify failed');
  }
  return { handle, email, password, id: r.json.user.id, cookie: r.cookie };
}

export async function makeAdmin(userId) {
  await env.DB.prepare(`INSERT OR IGNORE INTO user_roles(user_id, role, granted_at) VALUES (?, 'admin', ?)`).bind(userId, new Date().toISOString()).run();
}

export async function grantRole(userId, role) {
  await env.DB.prepare(`INSERT OR IGNORE INTO user_roles(user_id, role, granted_at) VALUES (?, ?, ?)`).bind(userId, role, new Date().toISOString()).run();
}
export async function staff(role) { const u = await newUser(); await grantRole(u.id, role); return u; }
export async function post(u, body = 'hello') {
  const r = await call('POST', '/posts', { cookie: u.cookie, body: { body } });
  if (r.status !== 201) throw new Error(`post failed ${r.status} ${JSON.stringify(r.json)}`);
  return r.json.post.id;
}
