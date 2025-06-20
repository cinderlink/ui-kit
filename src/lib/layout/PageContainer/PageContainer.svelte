<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		classes?: string;
		children?: Snippet;
	}

	let { classes = '', children }: Props = $props();
</script>

<div class="page-container {classes}">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="postcss">
	.page-container {
		@apply w-full px-8 py-8 pb-16;
		@apply max-w-7xl mx-auto;
	}
</style>
