// SINGLE SOURCE OF TRUTH for the biometric consent text + version (backend and the #/biometric-policy page).
// DRAFT — lawyer review required. Changing the text changes its SHA-256, so users must re-consent.
export const CONSENT_VERSION = '2026-11-02.draft1';
export const CONSENT_TEXT = `PIKK Biometric Information Notice and Written Consent (DRAFT — lawyer review required)

1. What is collected. To verify that you are 18 or older, our vendor Persona Identities, Inc. ("Persona") collects a photo of your government ID and a selfie/liveness video, and creates face geometry (a biometric identifier) from them to compare your face with your ID photo.
2. Purpose. This is used only to verify your age (18+) and identity for PIKK Dating and as a contestant in 18+ contests. It is not used for advertising, profiling or any other purpose.
3. Who processes it. Persona processes this data as PIKK's vendor. PIKK itself never receives or stores your ID images, selfie, face geometry or date of birth. PIKK stores only: whether you are verified 18+, the method, the date and Persona's reference number.
4. Retention and destruction. Persona keeps the data only under the retention policy PIKK configures and destroys it when the verification purpose is satisfied, and in all cases no later than the earlier of (a) when the purpose is satisfied or (b) 3 years after your last interaction with PIKK (Illinois), or within the time required by Texas and Washington law, whichever is sooner. See the PIKK Biometric Retention Policy at #/biometric-policy.
5. No sale. PIKK and Persona will not sell, lease, trade or otherwise profit from your biometric data.
6. Your choice. You may decline. If you decline, you can still use PIKK, view and vote in contests, but you cannot use Dating or enter 18+ contests as a contestant.

By checking the box and typing your full legal name, you give written consent (electronic signature) to the collection, storage and use of your biometric identifiers and information as described above.`;

