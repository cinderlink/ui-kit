<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import EmojiList from '../Emoji/EmojiList.svelte';

	let showEmojis = false;

	const dispatch = createEventDispatcher();
	function toggleEmojis() {
		showEmojis = !showEmojis;
	}

	function onReaction(event: CustomEvent) {
		const emoji = event.detail;
		dispatch('reaction-add', emoji);
		showEmojis = false;
	}
</script>

<div class="reaction-menu__toggle" on:click={toggleEmojis} on:keypress={toggleEmojis}>
	<div class="i-tabler-mood-smile-filled" />
</div>
{#if showEmojis}
	<div class="relative">
		<div class="reaction-menu__emojis">
			<EmojiList on:selected={onReaction} />
		</div>
	</div>
{/if}

<style>
	.reaction-menu__toggle {
		@apply absolute text-2xl text-purple-200 bg-purple-50 dark-bg-purple-800 rounded-full right-2 -bottom-3;
		@apply border-2px border-purple-200/20 cursor-pointer z-100;
	}
	.reaction-menu__emojis {
		@apply absolute -bottom-330px right-0 mb-2 z-105;
		@apply rounded-md;
		@apply overflow-y-auto shadow-lg w-300px h-300px border-1px border-purple-100/50 dark-border-purple-300/30;
	}
	.reaction-menu__emojis :global(.emojis) {
		@apply flex flex-row flex-wrap justify-around;
	}
</style>
