<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Reaction } from './types';
	import ReactionList from './ReactionList.svelte';
	import ReactionMenu from './ReactionMenu.svelte';
	export let id: number = 0;
	export let reactions: Reaction[] = [];

	const dispatch = createEventDispatcher();

	function onReactionAdd(event: CustomEvent) {
		const emoji = event.detail;
		let reaction: Reaction = { id: '1', emoji, count: 1 };
		dispatch('reaction-add', { reaction, id });
	}

	function onReactionClick(event: CustomEvent) {
		const reaction = event.detail;
		dispatch('reaction-click', { reaction, id });
	}
</script>

<div {id} class="reaction__container">
	<slot />
	<ReactionList {reactions} on:reaction-click={onReactionClick} />
	<ReactionMenu on:reaction-add={onReactionAdd} />
</div>

<style>
	.reaction__container {
		@apply relative;
	}
</style>
