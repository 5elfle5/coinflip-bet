"use client";
"use strict";var X=Object.create;var R=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var G=Object.getPrototypeOf,K=Object.prototype.hasOwnProperty;var Z=(e,t)=>{for(var o in t)R(e,o,{get:t[o],enumerable:!0})},H=(e,t,o,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of q(t))!K.call(e,s)&&s!==o&&R(e,s,{get:()=>t[s],enumerable:!(a=Y(t,s))||a.enumerable});return e};var W=(e,t,o)=>(o=e!=null?X(G(e)):{},H(t||!e||!e.__esModule?R(o,"default",{value:e,enumerable:!0}):o,e)),ee=e=>H(R({},"__esModule",{value:!0}),e);var Ve={};Z(Ve,{CheckmarkIcon:()=>F,ErrorIcon:()=>w,LoaderIcon:()=>C,ToastBar:()=>$,ToastIcon:()=>U,Toaster:()=>Q,default:()=>ke,resolveValue:()=>u,toast:()=>n,useToaster:()=>_,useToasterStore:()=>V});module.exports=ee(Ve);var te=e=>typeof e=="function",u=(e,t)=>te(e)?e(t):e;var j=(()=>{let e=0;return()=>(++e).toString()})(),D=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})();var k=require("react"),oe=20;var J=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,oe)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:o}=t;return J(e,{type:e.toasts.find(r=>r.id===o.id)?1:0,toast:o});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(r=>r.id===a||a===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+s}))}}},O=[],I={toasts:[],pausedAt:void 0},l=e=>{I=J(I,e),O.forEach(t=>{t(I)})},re={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={})=>{let[t,o]=(0,k.useState)(I);(0,k.useEffect)(()=>(O.push(o),()=>{let s=O.indexOf(o);s>-1&&O.splice(s,1)}),[t]);let a=t.toasts.map(s=>{var r,c,i;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((r=e[s.type])==null?void 0:r.removeDelay)||(e==null?void 0:e.removeDelay),duration:s.duration||((c=e[s.type])==null?void 0:c.duration)||(e==null?void 0:e.duration)||re[s.type],style:{...e.style,...(i=e[s.type])==null?void 0:i.style,...s.style}}});return{...t,toasts:a}};var ae=(e,t="blank",o)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...o,id:(o==null?void 0:o.id)||j()}),A=e=>(t,o)=>{let a=ae(t,e,o);return l({type:2,toast:a}),a.id},n=(e,t)=>A("blank")(e,t);n.error=A("error");n.success=A("success");n.loading=A("loading");n.custom=A("custom");n.dismiss=e=>{l({type:3,toastId:e})};n.remove=e=>l({type:4,toastId:e});n.promise=(e,t,o)=>{let a=n.loading(t.loading,{...o,...o==null?void 0:o.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let r=t.success?u(t.success,s):void 0;return r?n.success(r,{id:a,...o,...o==null?void 0:o.success}):n.dismiss(a),s}).catch(s=>{let r=t.error?u(t.error,s):void 0;r?n.error(r,{id:a,...o,...o==null?void 0:o.error}):n.dismiss(a)}),e};var h=require("react");var ie=(e,t)=>{l({type:1,toast:{id:e,height:t}})},ne=()=>{l({type:5,time:Date.now()})},P=new Map,ce=1e3,pe=(e,t=ce)=>{if(P.has(e))return;let o=setTimeout(()=>{P.delete(e),l({type:4,toastId:e})},t);P.set(e,o)},_=e=>{let{toasts:t,pausedAt:o}=V(e);(0,h.useEffect)(()=>{if(o)return;let r=Date.now(),c=t.map(i=>{if(i.duration===1/0)return;let d=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(d<0){i.visible&&n.dismiss(i.id);return}return setTimeout(()=>n.dismiss(i.id),d)});return()=>{c.forEach(i=>i&&clearTimeout(i))}},[t,o]);let a=(0,h.useCallback)(()=>{o&&l({type:6,time:Date.now()})},[o]),s=(0,h.useCallback)((r,c)=>{let{reverseOrder:i=!1,gutter:d=8,defaultPosition:p}=c||{},g=t.filter(m=>(m.position||p)===(r.position||p)&&m.height),z=g.findIndex(m=>m.id===r.id),E=g.filter((m,B)=>B<z&&m.visible).length;return g.filter(m=>m.visible).slice(...i?[E+1]:[0,E]).reduce((m,B)=>m+(B.height||0)+d,0)},[t]);return(0,h.useEffect)(()=>{t.forEach(r=>{if(r.dismissed)pe(r.id,r.removeDelay);else{let c=P.get(r.id);c&&(clearTimeout(c),P.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:ie,startPause:ne,endPause:a,calculateOffset:s}}};var f=W(require("react")),S=require("goober");var y=W(require("react")),b=require("goober");var x=require("goober"),de=x.keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,me=x.keyframes`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ue=x.keyframes`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,w=(0,x.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
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
    animation: ${ue} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;var M=require("goober"),le=M.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,C=(0,M.styled)("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${le} 1s linear infinite;
`;var v=require("goober"),fe=v.keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Te=v.keyframes`
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
}`,F=(0,v.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Te} 0.2s ease-out forwards;
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
`;var ye=(0,b.styled)("div")`
  position: absolute;
`,ge=(0,b.styled)("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,he=b.keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,xe=(0,b.styled)("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${he} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:o,iconTheme:a}=e;return t!==void 0?typeof t=="string"?y.createElement(xe,null,t):t:o==="blank"?null:y.createElement(ge,null,y.createElement(C,{...a}),o!=="loading"&&y.createElement(ye,null,o==="error"?y.createElement(w,{...a}):y.createElement(F,{...a})))};var be=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Se=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ae="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",ve=(0,S.styled)("div")`
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
`,Ee=(0,S.styled)("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Re=(e,t)=>{let a=e.includes("top")?1:-1,[s,r]=D()?[Ae,Pe]:[be(a),Se(a)];return{animation:t?`${(0,S.keyframes)(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${(0,S.keyframes)(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},$=f.memo(({toast:e,position:t,style:o,children:a})=>{let s=e.height?Re(e.position||t||"top-center",e.visible):{opacity:0},r=f.createElement(U,{toast:e}),c=f.createElement(Ee,{...e.ariaProps},u(e.message,e));return f.createElement(ve,{className:e.className,style:{...s,...o,...e.style}},typeof a=="function"?a({icon:r,message:c}):f.createElement(f.Fragment,null,r,c))});var N=require("goober"),T=W(require("react"));(0,N.setup)(T.createElement);var De=({id:e,className:t,style:o,onHeightUpdate:a,children:s})=>{let r=T.useCallback(c=>{if(c){let i=()=>{let d=c.getBoundingClientRect().height;a(e,d)};i(),new MutationObserver(i).observe(c,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return T.createElement("div",{ref:r,className:t,style:o},s)},Oe=(e,t)=>{let o=e.includes("top"),a=o?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:D()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(o?1:-1)}px)`,...a,...s}},Ie=N.css`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,L=16,Q=({reverseOrder:e,position:t="top-center",toastOptions:o,gutter:a,children:s,containerStyle:r,containerClassName:c})=>{let{toasts:i,handlers:d}=_(o);return T.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:L,left:L,right:L,bottom:L,pointerEvents:"none",...r},className:c,onMouseEnter:d.startPause,onMouseLeave:d.endPause},i.map(p=>{let g=p.position||t,z=d.calculateOffset(p,{reverseOrder:e,gutter:a,defaultPosition:t}),E=Oe(g,z);return T.createElement(De,{id:p.id,key:p.id,onHeightUpdate:d.updateHeight,className:p.visible?Ie:"",style:E},p.type==="custom"?u(p.message,p):s?s(p):T.createElement($,{toast:p,position:g}))}))};var ke=n;0&&(module.exports={CheckmarkIcon,ErrorIcon,LoaderIcon,ToastBar,ToastIcon,Toaster,resolveValue,toast,useToaster,useToasterStore});
//# sourceMappingURL=index.js.map