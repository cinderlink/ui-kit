<script lang="ts">

	import darkTheme from 'svelte-highlight/styles/a11y-dark';
	import lightTheme from 'svelte-highlight/styles/a11y-light';
	import { onMount } from 'svelte';
	import theme from '$lib/theme/store';
	interface Props {
		code?: string;
		language?: string;
		ref?: HTMLElement | undefined;
		dark?: boolean;
	}

	let {
		code = '',
		language = 'svelte',
		ref = $bindable(undefined),
		dark = false
	}: Props = $props();
	let style = $state($theme.darkMode || dark ? darkTheme : lightTheme);
	$effect(() => {
		style = $theme.darkMode || dark ? darkTheme : lightTheme;
	});

	let hljs: any = $state();
	onMount(async () => {
		const hljsModule = await import('highlight.js');
		hljs = hljsModule.default;
		if (language === 'svelte') {
			const hljsSvelte = await import('highlightjs-svelte');
			hljsSvelte.default(hljs);
		}
	});

	run(() => {
		if (ref && hljs) {
			hljs.highlightElement(ref);
		} else {
			console.info({ ref, hljs });
		}
	});
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
