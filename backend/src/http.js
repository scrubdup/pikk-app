export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status; this.code = code; this.details = details;
  }
}

export function corsHeaders(env, req) {
  const origin = req.headers.get('Origin');
  const h = { Vary: 'Origin' };
  if (origin && origin === env.ALLOWED_ORIGIN) {
    h['Access-Control-Allow-Origin'] = origin;
    h['Access-Control-Allow-Credentials'] = 'true';
    h['Access-Control-Allow-Methods'] = 'GET,POST,DELETE,OPTIONS';
    h['Access-Control-Allow-Headers'] = 'Content-Type';
    h['Access-Control-Max-Age'] = '600';
  }
  return h;
}

const SECURITY_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};

export function json(status, body, extra = {}) {
  const headers = new Headers({ ...SECURITY_HEADERS, ...extra });
  return new Response(JSON.stringify(body), { status, headers });
}

export function errorResponse(err, requestId) {
  if (err instanceof ApiError) {
    return json(err.status, { error: { code: err.code, message: err.message, ...(err.details ? { details: err.details } : {}) }, request_id: requestId });
  }
  console.error('unhandled', requestId, err && err.stack || err);
  return json(500, { error: { code: 'internal', message: 'Internal server error' }, request_id: requestId });
}

export async function readJson(req, maxBytes = 16 * 1024) {
  const ct = req.headers.get('Content-Type') || '';
  if (!ct.toLowerCase().startsWith('application/json')) throw new ApiError(415, 'unsupported_media_type', 'Content-Type must be application/json');
  const text = await req.text();
  if (text.length > maxBytes) throw new ApiError(413, 'payload_too_large', 'Request body too large');
  try {
    const v = JSON.parse(text);
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error();
    return v;
  } catch { throw new ApiError(400, 'invalid_json', 'Body must be a JSON object'); }
}

export function clientIp(req) {
  return req.headers.get('CF-Connecting-IP') || 'unknown';
}
