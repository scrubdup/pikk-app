import { supportApi, isSupportApiConfigured } from '../api/support-client.js';
import { esc, shellPage, toast } from '../ui.js';

function queueRows(tickets=[]) {
  if(!tickets.length) return '<p class="muted">No support tickets in the queue.</p>';
  return tickets.map(t=>`<button type="button" class="card support-staff-ticket" data-staff-ticket="${esc(t.id)}">
    <div class="row wrap"><strong>${esc(t.subject)}</strong><span class="chip">${esc(t.status)}</span></div>
    <p class="muted" style="margin:5px 0">@${esc(t.handle||'user')} · ${esc(t.email||'')} · ${esc(t.category)}</p>
    <small class="muted">${new Date(t.created_at).toLocaleString()}</small>
  </button>`).join('');
}
function detailHtml(data){
 const t=data?.ticket,m=data?.messages||[];if(!t)return '';
 return `<section class="card"><div class="row wrap"><h3 style="margin:0">${esc(t.subject)}</h3><span class="chip">${esc(t.status)}</span></div>
   <div class="support-thread" style="margin:12px 0">${m.map(x=>`<article class="support-thread-message ${x.is_staff?'is-staff':'is-user'}"><strong>${x.is_staff?'PIKK Support':'@'+esc(x.handle||'user')}</strong><p>${esc(x.body)}</p><small class="muted">${new Date(x.created_at).toLocaleString()}</small></article>`).join('')}</div>
   <form id="supportStaffReply" data-ticket-id="${esc(t.id)}"><div class="field"><label for="supportStaffMessage">Staff reply</label><textarea id="supportStaffMessage" name="message" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send support reply</button></form>
 </section>`;
}
export function renderSupportStaff(){
 if(!isSupportApiConfigured()) return shellPage('Support Staff Queue','<div class="card"><h3>Backend support queue unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>');
 return shellPage('Support Staff Queue',`<section class="card"><p class="kicker">PIKK SUPPORT · STAFF ONLY</p><h2>Submitted ticket queue</h2><p class="muted">Requires a real backend <code>support_agent</code> or <code>admin</code> role. Unauthorized accounts cannot read this queue.</p></section><div class="grid-2 support-staff-layout"><section class="card"><h3>Queue</h3><div id="supportStaffQueue"><p class="muted">Loading queue…</p></div></section><div id="supportStaffDetail"></div></div>`,{lead:'Persistent account-linked support tickets'});
}
export function bindSupportStaff(root){
 const queue=root.querySelector('#supportStaffQueue');const detail=root.querySelector('#supportStaffDetail');if(!queue)return;
 const load=async()=>{try{const d=await supportApi.staffList();queue.innerHTML=queueRows(d.tickets||[]);}
 catch(e){queue.innerHTML=e?.status===403?'<p class="muted">Your account is signed in but does not have Support Staff permission.</p>':e?.status===401?'<p class="muted">Sign in with a Support Staff account from <a href="#/profile">Profile</a>.</p>':`<p class="muted">Could not load staff queue: ${esc(e?.message||'Unknown error')}</p>`;}}; 
 queue.addEventListener('click',async e=>{const b=e.target.closest('[data-staff-ticket]');if(!b||!detail)return;try{const d=await supportApi.getTicket(b.dataset.staffTicket);detail.innerHTML=detailHtml(d);detail.scrollIntoView({block:'start'});}catch(err){toast(err?.message||'Could not open ticket');}});
 detail?.addEventListener('submit',async e=>{if(e.target.id!=='supportStaffReply')return;e.preventDefault();const form=e.target;const msg=form.elements.message.value.trim();if(!msg)return;try{await supportApi.reply(form.dataset.ticketId,msg);const d=await supportApi.getTicket(form.dataset.ticketId);detail.innerHTML=detailHtml(d);await load();toast('Support reply sent');}catch(err){toast(err?.message||'Could not send support reply');}});
 load();
}
