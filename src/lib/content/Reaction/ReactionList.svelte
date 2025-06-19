<script lang="ts">
	import type { Reaction } from './types';

	interface Props {
		reactions?: Reaction[];
		onreactionclick?: (reaction: Reaction) => void;
	}

	let { reactions = [], onreactionclick }: Props = $props();

	function handleReactionClick(reaction: Reaction) {
		onreactionclick?.(reaction);
	}
</script>

<div class="reactions-list">
	{#each reactions as reaction}
		<div
			class="reactions-list__reaction"
			role="button"
			tabindex="0"
			onclick={() => handleReactionClick(reaction)}
			onkeypress={() => handleReactionClick(reaction)}
		>
			<div class="reactions-list__emoji text-2xl">{@html reaction.emoji}</div>
			<div class="reactions-list__count">{reaction.count}</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.reactions-list {
		@apply absolute right-50px -bottom-3;
		@apply flex items-center justify-end gap-1;
	}

	.reactions-list__reaction {
		@apply flex items-center bg-purple-50 dark-bg-purple-800 rounded-md px-2 border-1px border-purple-100/20 gap-1 cursor-pointer;
	}

	.reactions-list__count {
		@apply flex justify-center items-center;
		@apply text-xs font-bold text-purple-200 dark-text-purple-400 bg-white dark-bg-purple-200 rounded-full;
		@apply w-20px h-20px border-1px border-purple-100/20;
	}

	.reactions-list__emoji {
		@apply text-lg p-0 m-0;
	}
</style>
