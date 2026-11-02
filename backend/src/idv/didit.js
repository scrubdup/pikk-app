// Didit adapter — BACKUP provider, STUB ONLY (not connected, never verifies anyone).
// Intended shape (verify against docs.didit.me before building): hosted verification session
// created server-side + signed webhook with decision; optional low-cost selfie-only age
// estimation (method 'age_estimate') for contest voters. Fits the same adapter interface.
export const diditAdapter = {
  id: 'didit',
  method: 'government_id+selfie',
  supportsAgeEstimate: true,
  signatureHeader: null,
  isConfigured: () => false, // fail closed until implemented
  async createSession() { const e = new Error('didit_not_implemented'); e.code = 'provider_not_connected'; throw e; },
  async verifyWebhook() { return false; },
  parseEvent() { return null; },
};
