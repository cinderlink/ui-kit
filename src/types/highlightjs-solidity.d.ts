declare module 'highlightjs-solidity' {
  import type { HLJSApi } from 'highlight.js';
  
  function registerSolidity(hljs: HLJSApi): void;
  export default registerSolidity;
}