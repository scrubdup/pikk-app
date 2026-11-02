const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');
function apiBase(){
  const runtime=typeof window!=='undefined'&&typeof window.__PIKK_API_BASE__==='string'?window.__PIKK_API_BASE__.trim():'';
  return (runtime||BUILD_API_BASE).replace(/\/$/,'');
}
export function isMusicUploadApiConfigured(){return !!apiBase();}
async function decode(res){
  let data=null;try{data=await res.json();}catch{}
  if(!res.ok){const e=new Error(data?.error?.message||`Request failed (${res.status})`);e.status=res.status;e.code=data?.error?.code||'request_failed';e.details=data?.error?.details||null;throw e;}
  return data;
}
export const musicUploadApi={
  list:async()=>{
    const res=await fetch(apiBase()+'/media/music',{credentials:'include'});
    return decode(res);
  },
  upload:async({audio,title,artistName,albumTitle='',genre='',rightsCertified=false,explicitContent=false})=>{
    const base=apiBase();if(!base){const e=new Error('PIKK API is not configured');e.code='api_not_configured';throw e;}
    const form=new FormData();
    form.set('audio',audio);
    form.set('title',title);
    form.set('artist_name',artistName);
    if(albumTitle)form.set('album_title',albumTitle);
    if(genre)form.set('genre',genre);
    form.set('rights_certified',rightsCertified?'true':'false');
    form.set('explicit_content',explicitContent?'true':'false');
    const res=await fetch(base+'/media/music',{method:'POST',credentials:'include',body:form});
    return decode(res);
  }
};
