<script lang="ts">
	import type { Color, Size } from '$lib/unocss';
	import { scale } from 'svelte/transition';

	interface Props {
		count?: number;
		color?: Color;
		size?: Size;
	}

	let { count = 0, color = 'green', size = 'xs' }: Props = $props();
</script>

{#if count > 0}
	<div
		transition:scale={{ duration: 200 }}
		class="notifications-count notifications-count--{size} notifications-count--{color}"
	>
		<span class="notifications-count__count">{count}</span>
	</div>
{/if}

<style lang="postcss">
	.notifications-count {
		@apply flex justify-center items-center shadow-md border-1px border-purple-200/20;
		@apply text-xs font-bold text-purple-50 bg-purple-500 rounded-full px-1;
	}

	.notifications-count--xs {
		@apply min-w-4 h-4;
		@apply text-xs;
	}

	.notifications-count--sm {
		@apply min-w-5 h-5;
		@apply text-sm;
	}

	.notifications-count--md {
		@apply min-w-6 h-6;
		@apply text-sm;
	}

	.notifications-count--lg {
		@apply min-w-7 h-7;
		@apply text-lg;
	}

	.notifications-count--xl {
		@apply min-w-8 h-8;
		@apply text-xl;
	}

	.notifications-count--2xl {
		@apply min-w-9 h-9;
		@apply text-2xl;
	}

	.notifications-count--purple {
		@apply text-purple-50 bg-purple-400;
	}

	.notifications-count--red {
		@apply text-red-50 bg-red-500;
	}

	.notifications-count--yellow {
		@apply text-gray-900 bg-yellow-500;
	}

	.notifications-count--green {
		@apply text-gray-900 bg-green-500;
	}

	.notifications-count--blue {
		@apply text-gray-900 bg-blue-500;
	}

	.notifications-count--gray {
		@apply text-gray-50 bg-gray-500;
	}

	.notifications-count--white {
		@apply text-gray-900 bg-gray-50;
	}

	.notifications-count--black {
		@apply text-gray-50 bg-gray-900;
	}
</style>
