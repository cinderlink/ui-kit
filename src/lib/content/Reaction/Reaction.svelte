<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Reaction } from './types';
	import EmojiList from '../Emoji/EmojiList.svelte';
	export let id = '';
	let reactions: Reaction[] = [];

	let showEmojis = false;
	const dispatch = createEventDispatcher();
	function toggleEmojis() {
		showEmojis = !showEmojis;
	}

	function onReaction(event: CustomEvent) {
		const emoji = event.detail;
		const reaction = reactions.find((r) => r.emoji === emoji);
		if (reaction) {
			reaction.count++;
			reactions = reactions.map((r) => (r.emoji === emoji ? reaction : r));
		} else {
			reactions = [...reactions, { emoji, count: 1 }];
		}

		dispatch('reaction', { reactions, id });
		showEmojis = false;
	}

	function increment(reaction: Reaction) {
		reaction.count++;
		reactions = reactions.map((r) => (r.emoji === reaction.emoji ? reaction : r));
		dispatch('reaction', { reactions, id });
	}
</script>

<div {id} class="reaction__container">
	<slot />
	<div class="reactions">
		{#each reactions as reaction}
			<div
				class="reaction"
				on:click={() => increment(reaction)}
				on:keypress={() => increment(reaction)}
			>
				<div class="reaction__emoji text-2xl">{@html reaction.emoji}</div>
				<div class="reaction__count">{reaction.count}</div>
			</div>
		{/each}
	</div>
	<div class="reaction__btn" on:click={toggleEmojis} on:keypress={toggleEmojis}>
		<div class="i-tabler-mood-smile-filled" />
	</div>
	{#if showEmojis}
		<div class="emojis__container">
			<div class="reaction__emojis">
				<EmojiList on:selected={onReaction} />
			</div>
		</div>
	{/if}
</div>

<style>
	.reaction__container {
		@apply relative;
	}

	.reaction__btn {
		@apply absolute text-2xl text-purple-200 bg-purple-50 dark-bg-purple-800 rounded-full right-2 -bottom-3;
		@apply border-2px border-purple-200/20 cursor-pointer;
	}

	.reactions {
		@apply absolute right-50px -bottom-3;
		@apply flex items-center justify-end gap-1;
	}

	.reaction {
		@apply flex items-center bg-purple-800 rounded-md px-2 border-1px border-purple-100/20 gap-1 cursor-pointer;
	}

	.reaction .reaction__count {
		@apply flex justify-center items-center;
		@apply text-xs font-bold text-purple-100 bg-purple-700 rounded-full;
		@apply w-20px h-20px border-1px border-purple-100/20;
	}

	.reaction .reaction__emoji {
		@apply text-lg p-0 m-0;
	}

	.emojis__container {
		@apply relative;
	}

	.reaction__emojis {
		@apply absolute -bottom-330px right-0 mb-2 z-10;
		@apply rounded-md;
		@apply overflow-y-auto shadow-lg w-300px h-300px border-1px border-gray-100/20;
	}

	.reaction__emojis :global(.emojis) {
		@apply flex flex-row flex-wrap justify-around;
	}
</style>
