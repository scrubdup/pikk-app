import { accountApi, isAccountApiConfigured } from '../api/account-client.js';
import { esc, shellPage, toast } from '../ui.js';

export function renderAdminBootstrap(){
  if(!isAccountApiConfigured()) return shellPage('Admin Bootstrap','<div class="card"><h3>Backend API not connected</h3><p class="muted">Configure the production PIKK API endpoint before attempting the one-time Admin bootstrap.</p></div>');
  return shellPage('Admin Bootstrap',`
    <section class="card">
      <p class="kicker">PIKK MASTER MIND · ONE-TIME SETUP</p>
      <h2>Claim the first backend Admin</h2>
      <p class="muted">This works only when no backend Admin exists, your account is signed in and email-verified, and the Cloudflare <code>BOOTSTRAP_ADMIN_TOKEN</code> secret matches the value entered below.</p>
      <p class="support-warning"><strong>Security:</strong> do not save or share this token in chat, source code, screenshots or browser storage. After the first Admin is created, this endpoint permanently closes itself.</p>
      <form id="adminBootstrapForm">
        <div class="field"><label for="adminBootstrapToken">One-time bootstrap token</label><input id="adminBootstrapToken" name="token" type="password" minlength="32" maxlength="256" autocomplete="off" required /></div>
        <button class="btn primary" type="submit">Claim first Admin role</button>
        <p class="muted" id="adminBootstrapStatus" role="status" aria-live="polite"></p>
      </form>
    </section>`,{lead:'One-time backend security setup'});
}

export function bindAdminBootstrap(root){
  const form=root.querySelector('#adminBootstrapForm');if(!form)return;
  const status=root.querySelector('#adminBootstrapStatus');
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const input=form.elements.token;
    const token=input.value;
    const button=form.querySelector('button[type="submit"]');if(button)button.disabled=true;
    if(status)status.textContent='Checking one-time Admin bootstrap…';
    try{
      await accountApi.bootstrapAdmin(token);
      input.value='';
      if(status)status.innerHTML='First backend Admin created. Bootstrap is now closed. <a href="#/creator-review">Open Creator Review</a> or <a href="#/support-staff">Support Staff Queue</a>.';
      toast('Backend Admin created');
    }catch(err){
      input.value='';
      const messages={
        bootstrap_not_configured:'Cloudflare Admin bootstrap secret is not configured.',
        email_unverified:'Verify this account email before claiming Admin.',
        bootstrap_denied:'Bootstrap token is invalid.',
        bootstrap_closed:'A backend Admin already exists. Bootstrap is closed.',
        unauthenticated:'Sign in to the account that should become the first Admin.',
      };
      if(status)status.textContent=messages[err?.code]||err?.message||'Could not claim Admin';
      toast(messages[err?.code]||err?.message||'Could not claim Admin');
    }finally{if(button)button.disabled=false;}
  });
}
