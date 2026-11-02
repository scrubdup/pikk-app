// t356u — Twerk Contest: 18+ self-confirmation gate (stored locally), then rules. Entries & voting not built yet.
export const TWERK_GATE_KEY = 'pikk.contest.twerk.age18';
const store = () => { try { return globalThis.localStorage || null; } catch { return null; } };
export const isTwerkGateConfirmed = () => store()?.getItem(TWERK_GATE_KEY) === 'yes';
export function confirmTwerkGate() { store()?.setItem(TWERK_GATE_KEY, 'yes'); }

export function renderTwerkGate() {
  return `<section class="pikk-contest pikk-contest-gate" aria-labelledby="twerkGateH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkGateH">Are you 18 or older?</h1>
    <p>This contest is for adults only. Confirm you are 18+ to continue. Your answer is saved only on this device.</p>
    <p class="muted">TEST MODE: this is a self-confirmation. Real age verification will be required once PIKK Safety and the backend are live.</p>
    <div class="pikk-contest-actions">
      <button type="button" class="pikk-contest-enter" id="twerkGateYes">I'm 18 or older</button>
      <a class="pikk-contest-leave" href="#/home">No, take me back</a>
    </div>
  </section>`;
}

export function renderTwerkRules() {
  return `<section class="pikk-contest pikk-contest-rules" aria-labelledby="twerkRulesH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkRulesH">Twerk Contest</h1>
    <h2>Rules</h2>
    <ul>
      <li>18+ only. Every entrant and everyone shown in an entry must be 18 or older.</li>
      <li>No nudity or sexual content. Keep clothing on and keep it dance-focused.</li>
      <li>Follow the <a href="#/guidelines">PIKK community guidelines</a>. No harassment, hate or minors.</li>
      <li>See something wrong? Use Report on the entry, or contact <a href="#/support">Support</a>. Reports are reviewed by moderators.</li>
    </ul>
    <p class="pikk-contest-soon" role="status">Entries &amp; voting coming soon. Nothing can be submitted yet.</p>
  </section>`;
}

export const renderTwerkContest = () => (isTwerkGateConfirmed() ? renderTwerkRules() : renderTwerkGate());
export function bindTwerkContest(root = document.getElementById('app')) {
  root?.querySelector('#twerkGateYes')?.addEventListener('click', () => { confirmTwerkGate(); root.innerHTML = renderTwerkRules(); root.querySelector('h1')?.focus?.(); });
}
