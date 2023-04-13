<script lang="ts">
	import { clickoutside } from '$lib/actions';
	import type MarkdownIt from 'markdown-it';
	import { createEventDispatcher, onMount } from 'svelte';

	import EmojiList from './EmojiList.svelte';

	let showEmojis = false;

	const dispatch = createEventDispatcher();
	let md: MarkdownIt;

	onMount(async () => {
		const { default: markdown } = await import('markdown-it');
		const { default: emoji } = await import('markdown-it-emoji');

		md = markdown();
		md.use(emoji);

		md.renderer.rules.emoji = function (token, idx) {
			return token[idx].content;
		};
	});

	function onClick(event: CustomEvent) {
		const emoji = event.detail;
		showEmojis = false;
		dispatch('selected', emoji);
	}

	function toggleEmojis() {
		showEmojis = !showEmojis;
	}
</script>

<div use:clickoutside on:clickoutside={() => (showEmojis = false)} class="emojis__container">
	{#if md}
		{#if showEmojis}
			<EmojiList on:selected={onClick} />
		{/if}
		<div
			class="emojis__btn"
			class:active={showEmojis}
			on:click={toggleEmojis}
			on:keypress={toggleEmojis}
		>
			<span class="text-2xl text-gray-500">
				{@html md.render(':smiley:')}
			</span>
		</div>
	{/if}
</div>

<style>
	.emojis__container {
		@apply relative;
	}
	.emojis__btn {
		@apply cursor-pointer outline-none;
	}
	.emojis__btn.active {
		@apply scale-120;
	}
	.emojis__btn:not(.active):hover {
		@apply scale-120 transition-all duration-200 ease-in-out;
	}
	.emojis__container :global(.emojis) {
		@apply absolute bottom-full right-0 mb-2;
		@apply shadow-lg border-1px border-gray-100/20;
	}
</style>
