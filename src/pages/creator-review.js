import { accountApi, isAccountApiConfigured } from '../api/account-client.js';
import { esc, shellPage, toast } from '../ui.js';

const FILTERS=['','declared','pending_review','approved','rejected'];

function reviewRows(rows=[]){
  if(!rows.length)return '<p class="muted">No role declarations match this filter.</p>';
  return rows.map(r=>`<article class="card creator-review-row" data-review-row="${esc(r.handle)}:${esc(r.role)}">
    <div class="row wrap"><strong>@${esc(r.handle)} · ${esc(r.role)}</strong><span class="chip">${esc(r.status)}</span></div>
    <p class="muted" style="margin:6px 0">${esc(r.display_name||'')} · ${esc(r.email||'')} · declared ${new Date(r.declared_at).toLocaleString()}</p>
    <div class="field"><label>Review reason</label><input class="creator-review-reason" maxlength="500" placeholder="Required reason for status change" /></div>
    <div class="row wrap">
      <button class="btn ghost creator-review-action" data-handle="${esc(r.handle)}" data-role="${esc(r.role)}" data-status="pending_review">Pending review</button>
      <button class="btn primary creator-review-action" data-handle="${esc(r.handle)}" data-role="${esc(r.role)}" data-status="approved">Approve</button>
      <button class="btn ghost creator-review-action" data-handle="${esc(r.handle)}" data-role="${esc(r.role)}" data-status="rejected">Reject</button>
    </div>
  </article>`).join('');
}

export function renderCreatorReview(route){
  if(!isAccountApiConfigured()) return shellPage('Creator Role Review','<div class="card"><h3>Backend review unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>');
  const filter=FILTERS.includes(route?.query?.status||'')?(route.query.status||''):'';
  const chips=FILTERS.map(f=>`<a class="chip${filter===f?' on':''}" href="#/creator-review${f?'?status='+f:''}">${f||'All'}</a>`).join('');
  return shellPage('Creator Role Review',`
    <section class="card"><p class="kicker">PIKK ADMIN · CREATOR TOOLS</p><h2>Review declared account roles</h2>
      <p class="muted">Requires a real backend Admin role. Approval here changes the account role review status only; payout eligibility, identity/tax checks and other provider approvals remain separate.</p>
      <div class="row wrap">${chips}</div>
    </section>
    <section id="creatorReviewQueue" data-filter="${esc(filter)}"><div class="card muted">Loading creator role declarations…</div></section>
  `,{lead:'Admin-only creator role review queue'});
}

export function bindCreatorReview(root){
  const host=root.querySelector('#creatorReviewQueue');if(!host)return;
  const filter=host.dataset.filter||'';
  const load=async()=>{
    try{
      const data=await accountApi.listRoleReviews(filter);
      host.innerHTML=reviewRows(data.roles||[]);
    }catch(err){
      host.innerHTML=err?.status===403?'<div class="card muted">Your signed-in account does not have Admin permission to review creator roles.</div>':err?.status===401?'<div class="card muted">Sign in with an Admin account from <a href="#/profile">Profile</a>.</div>':`<div class="card muted">Could not load role reviews: ${esc(err?.message||'Unknown error')}</div>`;
    }
  };
  host.addEventListener('click',async event=>{
    const button=event.target.closest('.creator-review-action');if(!button)return;
    const row=button.closest('.creator-review-row');
    const reason=row?.querySelector('.creator-review-reason')?.value?.trim()||'';
    if(reason.length<3)return toast('Enter a review reason');
    button.disabled=true;
    try{
      await accountApi.reviewRole({handle:button.dataset.handle,role:button.dataset.role,status:button.dataset.status,reason});
      toast('Role review saved');
      await load();
    }catch(err){toast(err?.message||'Could not save role review');button.disabled=false;}
  });
  load();
}
