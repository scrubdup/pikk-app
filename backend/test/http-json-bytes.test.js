import { describe, it, expect } from 'vitest';
import { readJson } from '../src/http.js';

const req = (body, type = 'application/json') => new Request('https://pikk.test/submit', {
  method: 'POST', headers: { 'Content-Type': type }, body,
});

describe('readJson UTF-8 byte limits', () => {
  it('accepts a JSON object exactly at the byte limit', async () => {
    const body = JSON.stringify({ text: 'é' });
    expect(await readJson(req(body), new TextEncoder().encode(body).length)).toEqual({ text: 'é' });
  });
  it('rejects multibyte JSON that fits by JS string length but exceeds bytes', async () => {
    const body = JSON.stringify({ text: 'é'.repeat(20) });
    expect(body.length).toBeLessThan(new TextEncoder().encode(body).length);
    await expect(readJson(req(body), body.length)).rejects.toMatchObject({ status: 413, code: 'payload_too_large' });
  });
  it('rejects invalid UTF-8 rather than silently replacing bytes', async () => {
    const body = new Uint8Array([123, 34, 120, 34, 58, 34, 255, 34, 125]);
    await expect(readJson(req(body))).rejects.toMatchObject({ status: 400, code: 'invalid_json' });
  });
  it('stops reading after the first chunk that exceeds the limit', async () => {
    let reads = 0;
    const body = new ReadableStream({
      pull(controller) {
        reads++;
        controller.enqueue(new Uint8Array(32));
        if (reads > 3) controller.close();
      },
    });
    const request = new Request('https://pikk.test/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body, duplex: 'half',
    });
    await expect(readJson(request, 16)).rejects.toMatchObject({ status: 413, code: 'payload_too_large' });
    expect(reads).toBeLessThanOrEqual(2);
  });
  it('keeps rejecting non-object JSON', async () => {
    await expect(readJson(req('[1,2]'))).rejects.toMatchObject({ status: 400, code: 'invalid_json' });
  });
});
