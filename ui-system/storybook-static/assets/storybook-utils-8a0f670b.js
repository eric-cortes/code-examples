import{r as i}from"./index-76fb7be0.js";var f={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=i,a=Symbol.for("react.element"),c=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,y=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function l(o,e,p){var r,t={},n=null,_=null;p!==void 0&&(n=""+p),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(_=e.ref);for(r in e)m.call(e,r)&&!x.hasOwnProperty(r)&&(t[r]=e[r]);if(o&&o.defaultProps)for(r in e=o.defaultProps,e)t[r]===void 0&&(t[r]=e[r]);return{$$typeof:a,type:o,key:n,ref:_,props:t,_owner:y.current}}s.Fragment=c;s.jsx=l;s.jsxs=l;f.exports=s;var O=f.exports;const d=(o,e="select")=>({control:e,options:Object.keys(o)});export{O as j,d as o};
//# sourceMappingURL=storybook-utils-8a0f670b.js.map
