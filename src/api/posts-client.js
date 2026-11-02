const BUILD_API_BASE = String(import.meta.env?.VITE_PIKK_API_BASE || '').trim().replace(/\/$/, '');
function apiBase(){
  const runtime=typeof window!=='undefined'&&typeof window.__PIKK_API_BASE__==='string'?window.__PIKK_API_BASE__.trim():'';
  return (runtime||BUILD_API_BASE).replace(/\/$/,'');
}
export function isPostsApiConfigured(){return !!apiBase();}
async function request(path,{method='GET',body}={}){
  const base=apiBase();
  if(!base){const e=new Error('PIKK API is not configured');e.code='api_not_configured';throw e;}
  const res=await fetch(base+path,{method,credentials:'include',headers:body===undefined?undefined:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
  let data=null;try{data=await res.json();}catch{}
  if(!res.ok){const e=new Error(data?.error?.message||`Request failed (${res.status})`);e.status=res.status;e.code=data?.error?.code||'request_failed';e.details=data?.error?.details||null;throw e;}
  return data;
}
export const postsApi={
  discover:()=>request('/posts'),
  following:()=>request('/feed'),
  createText:(body)=>request('/posts',{method:'POST',body:{kind:'text',body}}),
  follow:(handle)=>request('/follows',{method:'POST',body:{handle}}),
  like:(id)=>request('/posts/'+encodeURIComponent(id)+'/like',{method:'POST',body:{}}),
  unlike:(id)=>request('/posts/'+encodeURIComponent(id)+'/like',{method:'DELETE',body:{}}),
  comments:(id)=>request('/posts/'+encodeURIComponent(id)+'/comments'),
  comment:(id,body)=>request('/posts/'+encodeURIComponent(id)+'/comments',{method:'POST',body:{body}}),
};
