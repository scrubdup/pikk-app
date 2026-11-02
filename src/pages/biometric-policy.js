import { shellPage } from '../ui.js';
export const BIOMETRIC_POLICY_VERSION = '2026-11-02.draft1';
export function renderBiometricPolicy() {
  return shellPage('Biometric Retention Policy', `<div class="card">
    <p class="chip">Draft · lawyer review required · v${BIOMETRIC_POLICY_VERSION}</p>
    <h3>What is collected</h3><p>For 18+ age/identity verification only, our vendor Persona collects your government ID photo and a selfie/liveness capture and derives face geometry to match them.</p>
    <h3>What PIKK keeps</h3><p>PIKK stores no biometric identifiers or information: no ID images, selfies, face geometry or date of birth. PIKK keeps only the 18+ result, method, date, Persona's reference number and your signed consent record.</p>
    <h3>Retention and destruction</h3><p>Persona retains biometric data only under the retention policy PIKK configures and must destroy it when the initial purpose (age/identity verification) is satisfied, and in any case no later than 3 years after your last interaction with PIKK (Illinois 740 ILCS 14/15(a)), or sooner where Texas (Bus. &amp; Com. Code §503.001) or Washington (RCW 19.375) law requires.</p>
    <h3>No sale</h3><p>PIKK and Persona will not sell, lease, trade or otherwise profit from biometric data, and will not disclose it except as required by law.</p>
    <h3>Your choices</h3><p>Verification is optional. You may decline and still use PIKK, including watching and voting in contests. Questions or deletion requests: <a href="#/support">Support</a>.</p>
  </div>`, { lead: 'Public policy for biometric data used in age verification.' });
}
