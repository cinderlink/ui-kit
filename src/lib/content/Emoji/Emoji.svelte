<script lang="ts">
	import { clickoutside } from '$lib/actions';
	import type MarkdownIt from 'markdown-it';
	import { onMount } from 'svelte';
	import EmojiList from './EmojiList.svelte';
	import MarkdownItLib from 'markdown-it';
	import * as emojiModule from 'markdown-it-emoji';

	interface Props {
		onselected?: (emoji: string) => void;
	}

	let { onselected }: Props = $props();

	let showEmojis = $state(false);

	let md: MarkdownIt | undefined = $state();

	onMount(() => {
		md = new MarkdownItLib();
		md.use(emojiModule.default);

		md.renderer.rules.emoji = function (token, idx) {
			return token[idx].content;
		};
	});

	function onClick(event: CustomEvent) {
		const emoji = event.detail;
		showEmojis = false;
		onselected?.(emoji);
	}

	function toggleEmojis() {
		showEmojis = !showEmojis;
	}
</script>

<div use:clickoutside onclickoutside={() => (showEmojis = false)} class="emojis__container">
	{#if md}
		{#if showEmojis}
			<EmojiList onselected={(emoji) => onClick({ detail: emoji } as CustomEvent)} />
		{/if}
		<div
			class="emojis__btn"
			class:active={showEmojis}
			onclick={toggleEmojis}
			onkeypress={toggleEmojis}
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
