<script lang="ts">
	import type { Reaction } from './types';
	import type { Snippet } from 'svelte';
	import ReactionList from './ReactionList.svelte';
	import ReactionMenu from './ReactionMenu.svelte';

	interface Props {
		id?: string;
		reactions?: Reaction[];
		children?: Snippet;
		onreactionadd?: (data: { reaction: Reaction; id: string }) => void;
		onreactionclick?: (data: { reaction: Reaction; id: string }) => void;
	}

	let { id = '', reactions = [], children, onreactionadd, onreactionclick }: Props = $props();

	function onReactionAdd(emoji: string) {
		let reaction: Reaction = { id: '1', emoji, count: 1 };
		onreactionadd?.({ reaction, id });
	}

	function onReactionClick(reaction: Reaction) {
		onreactionclick?.({ reaction, id });
	}
</script>

<div {id} class="reaction__container">
	{@render children?.()}
	<ReactionList {reactions} onreactionclick={onReactionClick} />
	<ReactionMenu onreactionadd={onReactionAdd} />
</div>

<style lang="postcss">
	.reaction__container {
		@apply relative w-full;
	}
</style>
