import { describe, it, expect } from 'vitest';
import { call, newUser, freshIp } from './helpers.js';

describe('persistent account profiles', () => {
  it('updates own display name, bio and avatar and returns them through /auth/me', async () => {
    const u=await newUser();
    const updated=await call('POST','/account/profile',{
      cookie:u.cookie,ip:freshIp(),
      body:{display_name:'Updated Creator',bio:'Persistent PIKK bio',avatar_url:'https://example.com/avatar.png'}
    });
    expect(updated.status).toBe(200);
    expect(updated.json.user.display_name).toBe('Updated Creator');
    expect(updated.json.user.bio).toBe('Persistent PIKK bio');
    expect(updated.json.user.avatar_url).toBe('https://example.com/avatar.png');

    const me=await call('GET','/auth/me',{cookie:u.cookie,ip:freshIp()});
    expect(me.status).toBe(200);
    expect(me.json.user.display_name).toBe('Updated Creator');
    expect(me.json.user.bio).toBe('Persistent PIKK bio');
    expect(me.json.user.avatar_url).toBe('https://example.com/avatar.png');
  });

  it('exposes safe public profile fields by handle', async () => {
    const u=await newUser();
    await call('POST','/account/profile',{
      cookie:u.cookie,ip:freshIp(),
      body:{display_name:'Public Name',bio:'Public bio',avatar_url:'/brand/pikk-logo-official.png'}
    });
    const pub=await call('GET','/users/'+u.handle,{cookie:u.cookie,ip:freshIp()});
    expect(pub.status).toBe(200);
    expect(pub.json.user).toMatchObject({
      handle:u.handle,display_name:'Public Name',bio:'Public bio',avatar_url:'/brand/pikk-logo-official.png'
    });
    expect(pub.json.user.email).toBeUndefined();
  });

  it('validates avatar URL and field lengths', async () => {
    const u=await newUser();
    const bad=await call('POST','/account/profile',{
      cookie:u.cookie,ip:freshIp(),
      body:{display_name:'Name',bio:'ok',avatar_url:'javascript:alert(1)'}
    });
    expect(bad.status).toBe(422);
  });
});
