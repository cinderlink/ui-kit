<script lang="ts">
	import Markdown from '$lib/markup/Markdown/Markdown.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	interface Props {
		code?: string;
		lang?: string;
		dark?: boolean;
	}

	let { code = '', lang = 'svelte', dark = false }: Props = $props();
	let copied = $state(false);
	async function copyCode() {
		const copy = await import('copy-to-clipboard');
		copied = true;
		copy.default(code);
		setTimeout(() => {
			copied = false;
		}, 100);
	}
</script>

<div class="code">
	{#if lang === 'md'}
		<Markdown value={code} />
		<div
			class="i-tabler-copy code__icon"
			class:code__copied={copied}
			role="button"
			tabindex="0"
			aria-label="Copy code"
			onclick={copyCode}
			onkeypress={copyCode}
		></div>
	{:else}
		<Syntax {code} language={lang} {dark} />
		<div
			class="i-tabler-copy code__icon"
			class:code__copied={copied}
			role="button"
			tabindex="0"
			aria-label="Copy code"
			onclick={copyCode}
			onkeypress={copyCode}
		></div>
	{/if}
</div>

<style lang="postcss">
	.code {
		@apply relative;
	}
	.code__icon {
		@apply absolute right-1 top-3;
		@apply text-neutral-500 hover-text-neutral-600 dark-text-neutral-400 dark-hover-text-neutral-300;
		@apply cursor-pointer;
	}

	.code__copied {
		@apply text-green-500 dark-text-green-400 hover-text-green-500 dark-hover-text-green-400;
	}
</style>
