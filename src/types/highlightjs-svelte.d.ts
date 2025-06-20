declare module 'highlightjs-svelte' {
	import type { HLJSApi } from 'highlight.js';

	function registerSvelte(hljs: HLJSApi): void;
	export default registerSvelte;
}
