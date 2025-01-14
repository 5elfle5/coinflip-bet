import{r as h}from"./jotai-BbwHuUxQ.js";const w="modulepreload",k=function(l){return"/"+l},f={},C=function(d,s,v){let a=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),t=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));a=Promise.allSettled(s.map(r=>{if(r=k(r),r in f)return;f[r]=!0;const o=r.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${i}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":w,o||(n.as="script"),n.crossOrigin="",n.href=r,t&&n.setAttribute("nonce",t),document.head.appendChild(n),o)return new Promise((u,m)=>{n.addEventListener("load",u),n.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})}))}function c(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return a.then(e=>{for(const t of e||[])t.status==="rejected"&&c(t.reason);return d().catch(c)})};/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var y={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(l,d,s,v)=>{const a=h.forwardRef(({color:c="currentColor",size:e=24,stroke:t=2,title:r,className:o,children:i,...n},u)=>h.createElement("svg",{ref:u,...y[l],width:e,height:e,className:["tabler-icon",`tabler-icon-${d}`,o].join(" "),strokeWidth:t,stroke:c,...n},[r&&h.createElement("title",{key:"svg-title"},r),...v.map(([m,g])=>h.createElement(m,g)),...Array.isArray(i)?i:[i]]));return a.displayName=`${s}`,a};/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var b=p("outline","refresh","IconRefresh",[["path",{d:"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4",key:"svg-0"}],["path",{d:"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var x=p("outline","trash","IconTrash",[["path",{d:"M4 7l16 0",key:"svg-0"}],["path",{d:"M10 11l0 6",key:"svg-1"}],["path",{d:"M14 11l0 6",key:"svg-2"}],["path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",key:"svg-3"}],["path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",key:"svg-4"}]]);export{x as I,C as _,b as a};
