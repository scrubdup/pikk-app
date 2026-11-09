import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document;
globalThis.window = window;
globalThis.CustomEvent = window.CustomEvent;
globalThis.Blob = class Blob {
  constructor(parts = [], opts = {}) {
    this.parts = parts;
    this.type = opts.type || '';
    this.size = parts.reduce((n, p) => n + (p?.byteLength || p?.size || String(p).length), 0);
  }
  slice(start, end) {
    return new Blob(this.parts, { type: this.type });
  }
};
globalThis.File = class File extends globalThis.Blob {
  constructor(parts, name, opts = {}) {
    super(parts, opts);
    this.name = name;
    this.lastModified = Date.now();
  }
};

// Stub API base before importing modules that read import.meta env
window.__PIKK_API_BASE__ = 'https://api.test';
globalThis.window = window;

const calls = [];
let mediaStorage = true;
const mediaStore = new Map();

globalThis.fetch = async (url, opts = {}) => {
  const u = String(url);
  const method = (opts.method || 'GET').toUpperCase();
  calls.push({ u, method });
  const json = (status, body) => ({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (h) => (h === 'Content-Type' ? 'application/json' : null) },
    json: async () => body,
    text: async () => JSON.stringify(body),
  });

  if (u.endsWith('/health') && method === 'GET') {
    return json(200, { ok: true, capabilities: { media_storage: mediaStorage } });
  }
  if (u.includes('/media?') && method === 'GET') {
    return json(200, { media: [...mediaStore.values()], count: mediaStore.size });
  }
  if (u.endsWith('/media/uploads') && method === 'POST') {
    const body = JSON.parse(opts.body);
    const id = 'med_test_' + (mediaStore.size + 1);
    const row = {
      id, type: body.type, filename: body.filename, size: body.size,
      access: body.access || 'private', state: 'pending_upload',
    };
    mediaStore.set(id, row);
    return json(201, {
      upload: {
        id, mode: body.multipart ? 'multipart' : 'single',
        upload_url: `/media/uploads/${id}`,
        part_size: 8 * 1024 * 1024,
        part_count: body.multipart ? Math.ceil(body.size / (8 * 1024 * 1024)) : undefined,
      },
    });
  }
  if (/\/media\/uploads\/[^/]+$/.test(u) && method === 'PUT') {
    const id = u.split('/').pop();
    const row = mediaStore.get(id);
    if (row) row.state = 'uploaded';
    return json(200, { media: { id, state: 'uploaded' } });
  }
  if (/\/media\/uploads\/[^/]+\/parts\/\d+$/.test(u) && method === 'PUT') {
    return json(200, { ok: true });
  }
  if (/\/parts\/complete$/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').indexOf('uploads') + 1];
    const row = mediaStore.get(id);
    if (row) row.state = 'uploaded';
    return json(200, { media: { id, state: 'uploaded' } });
  }
  if (/\/media\/[^/]+\/complete$/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').length - 2];
    const row = mediaStore.get(id);
    if (row) row.state = 'ready';
    return json(202, { media: { ...row, state: 'ready' }, job: { id: 'job_1', state: 'queued' } });
  }
  if (/\/media\/[^/]+\/access-url/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').length - 2];
    return json(200, { url: `/media/${id}/content?sig=test&exp=1`, expires_at: new Date(Date.now() + 60000).toISOString() });
  }
  if (/\/media\/uploads\/[^/]+$/.test(u) && method === 'DELETE') {
    const id = u.split('/').pop();
    mediaStore.delete(id);
    return json(200, { media: { id, state: 'deleted', cancelled: true } });
  }
  if (/\/media\/med_/.test(u) && method === 'GET') {
    const id = u.split('/').pop().split('?')[0];
    const row = mediaStore.get(id);
    if (!row) return json(404, { error: { code: 'not_found', message: 'Not found' } });
    return json(200, { media: row });
  }
  return json(404, { error: { code: 'not_found', message: u } });
};

const { noteLiveAuthMe } = await import('../src/auth/readiness.js');
noteLiveAuthMe({ id: 'usr_dom_test' });

const { renderVaultMediaPanelHtml, bindVaultMediaPanel } = await import('../src/pages/vault-media-ui.js');
const { isVaultApiConfigured } = await import('../src/api/vault-client.js');

test('DOM: storage ready enables form, upload + list refresh via real event handlers', async () => {
  assert.equal(isVaultApiConfigured(), true);
  mediaStorage = true;
  mediaStore.clear();
  calls.length = 0;
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  // Allow health promise
  await new Promise((r) => setTimeout(r, 20));
  const form = root.querySelector('#vaultMediaUploadForm');
  assert.ok(form, 'form present');
  assert.equal(form.hidden, false, 'form enabled when media_storage true');
  assert.match(root.querySelector('#vaultMediaReadyStatus').textContent, /Media storage ready/);

  const fileInput = root.querySelector('#vaultMediaFile');
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, ...Array(200).fill(1)]);
  const file = new File([jpeg], 'shot.jpg', { type: 'image/jpeg' });
  // linkedom file input: assign via defineProperty
  Object.defineProperty(fileInput, 'files', { configurable: true, get: () => [file] });

  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await new Promise((r) => setTimeout(r, 80));

  assert.ok(calls.some((c) => c.method === 'POST' && c.u.includes('/media/uploads')), 'createUpload called');
  assert.ok(calls.some((c) => c.method === 'PUT' && /\/media\/uploads\//.test(c.u)), 'putBytes called');
  assert.ok(calls.some((c) => c.method === 'POST' && /\/complete$/.test(c.u)), 'complete called');
  assert.ok(calls.some((c) => c.method === 'GET' && c.u.includes('/media?')), 'listMine called');
  assert.match(root.querySelector('#vaultMediaList').innerHTML, /shot\.jpg|ready|med_test/);
});

test('DOM: media_storage false disables mutations and explains no local fallback', async () => {
  mediaStorage = false;
  mediaStore.clear();
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(root.querySelector('#vaultMediaUploadForm').hidden, true);
  assert.match(root.querySelector('#vaultMediaFormBlocked').textContent, /unavailable|disabled/i);
  assert.match(root.querySelector('#vaultMediaReadyStatus').textContent, /not ready|unbound|false/i);
});

test('DOM: cancel unfinished item calls DELETE and refreshes list', async () => {
  mediaStorage = true;
  mediaStore.clear();
  mediaStore.set('med_pending1', {
    id: 'med_pending1', type: 'photo', filename: 'x.jpg', size: 10,
    access: 'private', state: 'pending_upload',
  });
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 30));
  assert.match(root.querySelector('#vaultMediaList').innerHTML, /Cancel upload/);
  const btn = root.querySelector('.vault-media-cancel');
  calls.length = 0;
  btn.dispatchEvent(new window.Event('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 40));
  assert.ok(calls.some((c) => c.method === 'DELETE' && c.u.includes('/media/uploads/med_pending1')));
  assert.equal(mediaStore.has('med_pending1'), false);
});
