// Content sniffing by magic bytes. Returns { type, contentType } or null. Never trusts client-declared types.
const ascii = (b, o, n) => String.fromCharCode(...b.subarray(o, o + n));
export function sniff(b) {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: 'photo', contentType: 'image/jpeg' };
  if (b[0] === 0x89 && ascii(b, 1, 3) === 'PNG' && b[4] === 0x0d && b[5] === 0x0a) return { type: 'photo', contentType: 'image/png' };
  if (ascii(b, 0, 6) === 'GIF87a' || ascii(b, 0, 6) === 'GIF89a') return { type: 'photo', contentType: 'image/gif' };
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 4) === 'WEBP') return { type: 'photo', contentType: 'image/webp' };
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 4) === 'WAVE') return { type: 'audio', contentType: 'audio/wav' };
  if (ascii(b, 0, 4) === 'OggS') return { type: 'audio', contentType: 'audio/ogg' };
  if (ascii(b, 0, 4) === 'fLaC') return { type: 'audio', contentType: 'audio/flac' };
  if (ascii(b, 0, 3) === 'ID3' || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0 && (b[1] & 0x06) !== 0)) return { type: 'audio', contentType: 'audio/mpeg' };
  if (b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return { type: 'video', contentType: 'video/webm' };
  if (ascii(b, 4, 4) === 'ftyp') {
    const brand = ascii(b, 8, 4);
    if (brand === 'M4A ' || brand === 'M4B ') return { type: 'audio', contentType: 'audio/mp4' };
    if (brand === 'qt  ') return { type: 'video', contentType: 'video/quicktime' };
    if (/^(isom|iso[2-9]|mp41|mp42|avc1|M4V |dash|3gp[0-9])$/.test(brand)) return { type: 'video', contentType: 'video/mp4' };
  }
  return null;
}
