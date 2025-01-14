"use client";
var W=e=>typeof e=="function",f=(e,t)=>W(e)?e(t):e;var F=(()=>{let e=0;return()=>(++e).toString()})(),S=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();import{useEffect as H,useState as j}from"react";var J=20;var U=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,J)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:o}=t;return U(e,{type:e.toasts.find(r=>r.id===o.id)?1:0,toast:o});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(r=>r.id===a||a===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+s}))}}},A=[],P={toasts:[],pausedAt:void 0},u=e=>{P=U(P,e),A.forEach(t=>{t(P)})},Q={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={})=>{let[t,o]=j(P);H(()=>(A.push(o),()=>{let s=A.indexOf(o);s>-1&&A.splice(s,1)}),[t]);let a=t.toasts.map(s=>{var r,n,i;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((r=e[s.type])==null?void 0:r.removeDelay)||(e==null?void 0:e.removeDelay),duration:s.duration||((n=e[s.type])==null?void 0:n.duration)||(e==null?void 0:e.duration)||Q[s.type],style:{...e.style,...(i=e[s.type])==null?void 0:i.style,...s.style}}});return{...t,toasts:a}};var Y=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(o==null?void 0:o.id)||F()}),h=e=>(t,o)=>{let a=Y(t,e,o);return u({type:2,toast:a}),a.id},c=(e,t)=>h("blank")(e,t);c.error=h("error");c.success=h("success");c.loading=h("loading");c.custom=h("custom");c.dismiss=e=>{u({type:3,toastId:e})};c.remove=e=>u({type:4,toastId:e});c.promise=(e,t,o)=>{let a=c.loading(t.loading,{...o,...o==null?void 0:o.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let r=t.success?f(t.success,s):void 0;return r?c.success(r,{id:a,...o,...o==null?void 0:o.success}):c.dismiss(a),s}).catch(s=>{let r=t.error?f(t.error,s):void 0;r?c.error(r,{id:a,...o,...o==null?void 0:o.error}):c.dismiss(a)}),e};import{useEffect as $,useCallback as L}from"react";var q=(e,t)=>{u({type:1,toast:{id:e,height:t}})},G=()=>{u({type:5,time:Date.now()})},x=new Map,K=1e3,Z=(e,t=K)=>{if(x.has(e))return;let o=setTimeout(()=>{x.delete(e),u({type:4,toastId:e})},t);x.set(e,o)},O=e=>{let{toasts:t,pausedAt:o}=D(e);$(()=>{if(o)return;let r=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let d=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(d<0){i.visible&&c.dismiss(i.id);return}return setTimeout(()=>c.dismiss(i.id),d)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,o]);let a=L(()=>{o&&u({type:6,time:Date.now()})},[o]),s=L((r,n)=>{let{reverseOrder:i=!1,gutter:d=8,defaultPosition:p}=n||{},g=t.filter(m=>(m.position||p)===(r.position||p)&&m.height),E=g.findIndex(m=>m.id===r.id),b=g.filter((m,R)=>R<E&&m.visible).length;return g.filter(m=>m.visible).slice(...i?[b+1]:[0,b]).reduce((m,R)=>m+(R.height||0)+d,0)},[t]);return $(()=>{t.forEach(r=>{if(r.dismissed)Z(r.id,r.removeDelay);else{let n=x.get(r.id);n&&(clearTimeout(n),x.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:q,startPause:G,endPause:a,calculateOffset:s}}};import*as l from"react";import{styled as B,keyframes as z}from"goober";import*as y from"react";import{styled as w,keyframes as de}from"goober";import{styled as ee,keyframes as I}from"goober";var te=I`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,oe=I`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,re=I`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,k=ee("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${oe} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;import{styled as se,keyframes as ae}from"goober";var ie=ae`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=se("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ie} 1s linear infinite;
`;import{styled as ne,keyframes as N}from"goober";var ce=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,pe=N`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,_=ne("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ce} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${pe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;var me=w("div")`
  position: absolute;
`,ue=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,le=de`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,fe=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${le} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,M=({toast:e})=>{let{icon:t,type:o,iconTheme:a}=e;return t!==void 0?typeof t=="string"?y.createElement(fe,null,t):t:o==="blank"?null:y.createElement(ue,null,y.createElement(V,{...a}),o!=="loading"&&y.createElement(me,null,o==="error"?y.createElement(k,{...a}):y.createElement(_,{...a})))};var Te=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ye=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ge="0%{opacity:0;} 100%{opacity:1;}",he="0%{opacity:1;} 100%{opacity:0;}",xe=B("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,be=B("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Se=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=S()?[ge,he]:[Te(a),ye(a)];return{animation:t?`${z(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${z(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},C=l.memo(({toast:e,position:t,style:o,children:a})=>{let s=e.height?Se(e.position||t||"top-center",e.visible):{opacity:0},r=l.createElement(M,{toast:e}),n=l.createElement(be,{...e.ariaProps},f(e.message,e));return l.createElement(xe,{className:e.className,style:{...s,...o,...e.style}},typeof a=="function"?a({icon:r,message:n}):l.createElement(l.Fragment,null,r,n))});import{css as Ae,setup as Pe}from"goober";import*as T from"react";Pe(T.createElement);var ve=({id:e,className:t,style:o,onHeightUpdate:a,children:s})=>{let r=T.useCallback(n=>{if(n){let i=()=>{let d=n.getBoundingClientRect().height;a(e,d)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return T.createElement("div",{ref:r,className:t,style:o},s)},Ee=(e,t)=>{let o=e.includes("top"),a=o?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:S()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...a,...s}},Re=Ae`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,v=16,De=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:a,children:s,containerStyle:r,containerClassName:n})=>{let{toasts:i,handlers:d}=O(o);return T.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:v,left:v,right:v,bottom:v,pointerEvents:"none",...r},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},i.map(p=>{let g=p.position||t,E=d.calculateOffset(p,{reverseOrder:e,gutter:a,defaultPosition:t}),b=Ee(g,E);return T.createElement(ve,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?Re:"",style:b},p.type==="custom"?f(p.message,p):s?s(p):T.createElement(C,{toast:p,position:g}))}))};var kt=c;export{_ as CheckmarkIcon,k as ErrorIcon,V as LoaderIcon,C as ToastBar,M as ToastIcon,De as Toaster,kt as default,f as resolveValue,c as toast,O as useToaster,D as useToasterStore};
//# sourceMappingURL=index.mjs.map