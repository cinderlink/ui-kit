<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import * as lang from 'svelte-highlight/languages';
	import darkTheme from 'svelte-highlight/styles/a11y-dark';
	import lightTheme from 'svelte-highlight/styles/a11y-light';
	import { theme } from '$lib/theme';
	import { onMount } from 'svelte';
	
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
	
	let style = $state(theme.darkMode || dark ? darkTheme : lightTheme);
	$effect(() => {
		style = theme.darkMode || dark ? darkTheme : lightTheme;
	});
	
	// Map string identifiers to language definition functions expected by Highlight
	const languageMap: Record<string, any> = {
		javascript: lang.javascript,
		js: lang.javascript,
		typescript: lang.typescript,
		ts: lang.typescript,
		svelte: (lang as any).svelte ?? lang.xml,
		css: lang.css,
		html: lang.xml,
		plaintext: (lang as any).plaintext ?? lang.xml
	};

	// Reactive language definition used by Highlight
	let languageDef = $state(languageMap[language] ?? languageMap['plaintext']);
	$effect(() => {
		languageDef = languageMap[language] ?? languageMap['plaintext'];
	});

	// Ensure code blocks are focusable for keyboard users (axe rule focusable-content)
	onMount(() => {
		if (ref) {
			ref.querySelectorAll('pre, pre code').forEach((el) => {
				(el as HTMLElement).setAttribute('tabindex', '0');
			});
		}
	});
</script>

<svelte:head>
	{@html style}
</svelte:head>

<div bind:this={ref} class="syntax-highlight">
	<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
	<Highlight language={languageDef as any} {code} />
</div>

<style lang="postcss">
	.syntax-highlight :global(pre) {
		@apply p-4 my-2 rounded-md overflow-auto w-full;
		/* Glass effect for code blocks */
		background: var(--glass-bg-surface);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
	}
	
	:global(.dark) .syntax-highlight :global(pre) {
		background: var(--glass-bg-surface);
		color: rgba(255, 255, 255, 0.9);
	}
</style>
