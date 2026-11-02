import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { newUser, freshIp, ORIGIN } from './helpers.js';
import { route } from '../src/index.js';

const TOKEN='bootstrap-test-token-abcdefghijklmnopqrstuvwxyz-123456';

async function invoke(user, token=TOKEN, fakeEnvExtra={}) {
  const req=new Request('https://api.test/admin/bootstrap',{
    method:'POST',
    headers:{Origin:ORIGIN,Cookie:user?.cookie||'','CF-Connecting-IP':freshIp(),'Content-Type':'application/json'},
    body:JSON.stringify({token}),
  });
  return route(req,{DB:env.DB,ALLOWED_ORIGIN:ORIGIN,COOKIE_SAMESITE:'None',SESSION_TTL_HOURS:'720',EXPOSE_VERIFY_TOKEN:'true',BOOTSTRAP_ADMIN_TOKEN:TOKEN,...fakeEnvExtra},{});
}

describe('one-time admin bootstrap',()=>{
  it('requires configuration, a verified session, and the correct secret',async()=>{
    const u=await newUser();
    let res=await invoke(u,TOKEN,{BOOTSTRAP_ADMIN_TOKEN:''});
    expect(res.status).toBe(503);
    expect((await res.json()).error.code).toBe('bootstrap_not_configured');

    const unverified=await newUser({verify:false});
    res=await invoke(unverified);
    expect(res.status).toBe(403);
    expect((await res.json()).error.code).toBe('email_unverified');

    res=await invoke(u,'wrong-token-that-is-still-long-enough-abcdefghijklmnopqrstuvwxyz');
    expect(res.status).toBe(403);
    expect((await res.json()).error.code).toBe('bootstrap_denied');
  });

  it('grants exactly the first admin and then closes bootstrap',async()=>{
    const first=await newUser();
    const second=await newUser();

    const claimed=await invoke(first);
    expect(claimed.status).toBe(200);
    expect(await claimed.json()).toMatchObject({ok:true,role:'admin',bootstrap_closed:true});

    const role=await env.DB.prepare("SELECT role FROM user_roles WHERE user_id=? AND role='admin'").bind(first.id).first();
    expect(role?.role).toBe('admin');

    const closed=await invoke(second);
    expect(closed.status).toBe(409);
    expect((await closed.json()).error.code).toBe('bootstrap_closed');

    const admins=await env.DB.prepare("SELECT COUNT(*) AS n FROM user_roles WHERE role='admin'").first();
    expect(Number(admins.n)).toBe(1);
  });
});
