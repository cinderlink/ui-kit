<script lang="ts">
	import darkTheme from 'svelte-highlight/styles/a11y-dark';
	import lightTheme from 'svelte-highlight/styles/a11y-light';
	import { onMount } from 'svelte';
	import theme from '$lib/theme/store';
	export let code = '';
	export let language = 'svelte';
	export let ref: HTMLElement | undefined = undefined;
	export let dark = false;
	let style = $theme.darkMode || dark ? darkTheme : lightTheme;
	$: style = $theme.darkMode || dark ? darkTheme : lightTheme;

	let hljs: any;
	onMount(async () => {
		const hljsModule = await import('highlight.js');
		hljs = hljsModule.default;
		if (language === 'svelte') {
			const hljsSvelte = await import('highlightjs-svelte');
			hljsSvelte.default(hljs);
		}
	});

	$: if (ref && hljs) {
		hljs.highlightElement(ref);
	} else {
		console.info({ ref, hljs });
	}
</script>

<svelte:head>
	{@html style}
</svelte:head>

<pre class="{language} whitespace-pre-wrap" class:dark bind:this={ref}><code>{code}</code></pre>

<style>
	pre {
		@apply p-4 my-2 bg-neutral-100 dark-(bg-purple-900) rounded-md overflow-auto w-full border-1px border-gray-300/10;
	}
	pre.dark {
		@apply bg-purple-900;
	}
</style>
