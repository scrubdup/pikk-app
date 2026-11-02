// PIKK Vault slice 3: cheap metadata probes. Never decode media; read only headers via R2 range reads.
// Returns { width, height, duration_ms } with null for anything not cheaply parseable.
const u16be = (b, o) => (b[o] << 8) | b[o + 1];
const u32be = (b, o) => ((b[o] << 24) >>> 0) + (b[o + 1] << 16) + (b[o + 2] << 8) + b[o + 3];
const u16le = (b, o) => b[o] | (b[o + 1] << 8);
const u32le = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16)) + ((b[o + 3] << 24) >>> 0);
const ascii = (b, o, n) => String.fromCharCode(...b.subarray(o, o + n));
const ok = (n) => (Number.isSafeInteger(n) && n > 0 ? n : null);

export function imageDims(ct, b) {
  try {
    if (ct === 'image/png' && b.length >= 24 && ascii(b, 12, 4) === 'IHDR') return { width: ok(u32be(b, 16)), height: ok(u32be(b, 20)) };
    if (ct === 'image/gif' && b.length >= 10) return { width: ok(u16le(b, 6)), height: ok(u16le(b, 8)) };
    if (ct === 'image/webp' && b.length >= 30) {
      const f = ascii(b, 12, 4);
      if (f === 'VP8 ') return { width: ok(u16le(b, 26) & 0x3fff), height: ok(u16le(b, 28) & 0x3fff) };
      if (f === 'VP8L') { const v = u32le(b, 21); return { width: (v & 0x3fff) + 1, height: ((v >>> 14) & 0x3fff) + 1 }; }
      if (f === 'VP8X') return { width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)), height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)) };
    }
    if (ct === 'image/jpeg') {
      let o = 2;
      while (o + 9 < b.length) {
        if (b[o] !== 0xff) return { width: null, height: null };
        const mk = b[o + 1];
        if (mk === 0xff) { o++; continue; }
        if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) return { width: ok(u16be(b, o + 7)), height: ok(u16be(b, o + 5)) };
        if (mk === 0xd8 || (mk >= 0xd0 && mk <= 0xd7) || mk === 0x01) { o += 2; continue; }
        o += 2 + u16be(b, o + 2);
      }
    }
  } catch { /* fall through */ }
  return { width: null, height: null };
}

export function wavDuration(b) {
  if (b.length < 44 || ascii(b, 0, 4) !== 'RIFF' || ascii(b, 8, 4) !== 'WAVE') return null;
  let o = 12; let byteRate = 0;
  while (o + 8 <= b.length) {
    const id = ascii(b, o, 4); const sz = u32le(b, o + 4);
    if (id === 'fmt ' && o + 16 <= b.length) byteRate = u32le(b, o + 16);
    if (id === 'data') return byteRate > 0 ? ok(Math.round((sz / byteRate) * 1000)) : null;
    o += 8 + sz + (sz & 1);
  }
  return null;
}

export function flacDuration(b) {
  if (b.length < 26 || ascii(b, 0, 4) !== 'fLaC' || (b[4] & 0x7f) !== 0) return null; // STREAMINFO must be first
  const s = 8; // STREAMINFO body
  const rate = (b[s + 10] << 12) | (b[s + 11] << 4) | (b[s + 12] >> 4);
  const total = (b[s + 13] & 0x0f) * 2 ** 32 + u32be(b, s + 14);
  return rate > 0 && total > 0 ? ok(Math.round((total / rate) * 1000)) : null;
}

/** Walk top-level MP4/MOV boxes with small range reads to find moov/mvhd. Bounded to 64 boxes. */
export async function mp4Duration(bucket, key, size) {
  let o = 0;
  for (let i = 0; i < 64 && o + 8 <= size; i++) {
    const h = new Uint8Array(await (await bucket.get(key, { range: { offset: o, length: Math.min(16, size - o) } })).arrayBuffer());
    let len = u32be(h, 0); const type = ascii(h, 4, 4); let hdr = 8;
    if (len === 1 && h.length >= 16) { len = u32be(h, 8) * 2 ** 32 + u32be(h, 12); hdr = 16; }
    else if (len === 0) len = size - o;
    if (len < hdr) return null;
    if (type === 'moov') {
      const n = Math.min(len - hdr, 4096);
      const m = new Uint8Array(await (await bucket.get(key, { range: { offset: o + hdr, length: n } })).arrayBuffer());
      let p = 0;
      while (p + 8 <= m.length) {
        const bl = u32be(m, p);
        if (ascii(m, p + 4, 4) === 'mvhd') {
          const v = m[p + 8];
          const [scale, dur] = v === 1 ? [u32be(m, p + 28), u32be(m, p + 32) * 2 ** 32 + u32be(m, p + 36)] : [u32be(m, p + 20), u32be(m, p + 24)];
          return scale > 0 ? ok(Math.round((dur / scale) * 1000)) : null;
        }
        if (bl < 8) return null;
        p += bl;
      }
      return null;
    }
    o += len;
  }
  return null;
}

export async function probe(bucket, key, contentType, size) {
  const head = new Uint8Array(await (await bucket.get(key, { range: { offset: 0, length: Math.min(size, 65536) } })).arrayBuffer());
  const out = { width: null, height: null, duration_ms: null };
  if (contentType.startsWith('image/')) Object.assign(out, imageDims(contentType, head));
  else if (contentType === 'audio/wav') out.duration_ms = wavDuration(head);
  else if (contentType === 'audio/flac') out.duration_ms = flacDuration(head);
  else if (['video/mp4', 'video/quicktime', 'audio/mp4'].includes(contentType)) out.duration_ms = await mp4Duration(bucket, key, size);
  // mp3, ogg, webm: not cheaply parseable without scanning frames -> null
  return out;
}
