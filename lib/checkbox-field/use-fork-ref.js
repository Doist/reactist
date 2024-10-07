"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");exports.useForkRef=function(...r){return e.useMemo(()=>{if(r.some(Boolean))return e=>{r.forEach(r=>function(e,r){"function"==typeof e?e(r):e&&(e.current=r)}(r,e))}},r)};
//# sourceMappingURL=use-fork-ref.js.map
