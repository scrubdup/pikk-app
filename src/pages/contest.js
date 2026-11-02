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
    <p class="muted">TEST MODE: this is a self-confirmation. Real age verification will be required once PIKK Safety and the backend are live. <a href="#/verify-age">Verify age / ID</a></p>
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
      <li>18+ only. Contestants are women 18+ whose account gender is female and who have completed ID/age verification on the server. Everyone shown in an entry must be 18 or older.</li>
      <li>Live, solo entries only. Contestants compete by going live alone. No recorded uploads, co-hosts, guests, duos or groups, and no one else on camera.</li>
      <li>Watching and voting are open to every viewer who confirms they are 18+. No ID check is needed to watch or vote.</li>
      <li>No nudity or sexual content. Keep clothing on and keep it dance-focused.</li>
      <li>Follow the <a href="#/guidelines">PIKK community guidelines</a>. No harassment, hate or minors.</li>
      <li>See something wrong? Use Report on the entry, or contact <a href="#/support">Support</a>. Reports are reviewed by moderators.</li>
    </ul>
    <div id="twerkEntry" aria-live="polite"><p class="pikk-contest-soon" role="status">Entries &amp; voting coming soon. Live, solo entries only. Contestant entries need a PIKK account checked by the server.</p></div>
  </section>`;
}

export const renderTwerkContest = () => (isTwerkGateConfirmed() ? renderTwerkRules() : renderTwerkGate());
/** Entry panel HTML from the SERVER eligibility result. Entry UI only when can_enter is true. */
export function renderEntryPanel(e) {
  if (!e) return '<p class="muted">Sign in to see whether you can enter. Watching and voting stay open.</p>';
  if (e.can_enter) return `<form id="twerkEntryForm" class="card"><h2>Go live to compete</h2>
      <p class="muted">Live, solo entries only. Just you on camera.</p>
      <label>Title <input id="twerkEntryTitle" maxlength="120" required></label>
      <div class="pikk-contest-actions"><button type="submit" class="pikk-contest-enter" id="twerkGoLive">Go live (solo)</button></div></form>`;
  if (!e.gender_ok) return `<p class="muted">This contest is for women contestants. You can watch and vote.</p>${e.gender_set ? '' : '<p class="muted">Account gender not set. <a href="#/profile">Set it on your profile</a> if you are a woman who wants to enter.</p>'}`;
  return '<p>To enter as a contestant, complete ID/age verification first.</p><a class="pikk-contest-enter" href="#/verify-age">Verify age / ID</a>';
}

export function bindTwerkContest(root = document.getElementById('app')) {
  root?.querySelector('#twerkGateYes')?.addEventListener('click', () => { confirmTwerkGate(); root.innerHTML = renderTwerkRules(); root.querySelector('h1')?.focus?.(); bindTwerkContest(root); });
  const host = root?.querySelector('#twerkEntry');
  if (!host) return;
  import('../api/verification-client.js').then(async (api) => {
    if (!api.isVerificationApiConfigured()) return;
    let e = null; try { e = await api.verificationApi.contestEligibility('twerk'); } catch (err) { if (err?.status !== 401) return; }
    host.innerHTML = renderEntryPanel(e);
    const submit = async (live) => {
      const title = host.querySelector('#twerkEntryTitle')?.value?.trim();
      if (!title) return;
      try { await api.verificationApi.submitEntry('twerk', title, live); host.innerHTML = '<p role="status">Entry received. It will be reviewed by moderators before it appears.</p>'; }
      catch (err) { if (err?.code === 'age_verification_required') location.hash = '#/verify-age'; else host.insertAdjacentHTML('beforeend', `<p role="alert">${String(err?.message || 'Could not submit').replace(/[<>&]/g, '')}</p>`); }
    };
    host.querySelector('#twerkEntryForm')?.addEventListener('submit', (ev) => { ev.preventDefault(); submit(true); });
  });
}
