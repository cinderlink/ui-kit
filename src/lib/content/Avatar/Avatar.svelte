<script lang="ts">
	import type { Size } from '$lib/theme/types';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		image?: string | undefined;
		name?: string | undefined;
		status?: 'online' | 'offline' | 'busy' | 'away' | undefined;
		size?: Size;
		classes?: string;
		imageSlot?: Snippet;
		corner?: Snippet;
	}

	let { 
		image = $bindable(),
		name = $bindable(),
		status = $bindable(),
		size = $bindable('md'),
		classes = '',
		imageSlot,
		corner
	}: Props = $props();
</script>

<div class="avatar avatar--{size} {status ? `avatar--${status}` : ''} {classes}">
	{#if imageSlot}
		{@render imageSlot()}
	{:else if image}
		<img src={image} alt={name} class="avatar__image" transition:fade />
	{/if}

	{#if corner}
		<div class="avatar__badge">
			{@render corner()}
		</div>
	{/if}
</div>

<style lang="postcss">
	.avatar {
		@apply rounded-full block relative shadow;
		@apply hover-(scale-102 rotate-1 shadow-lg) transition-transform duration-300 transform-gpu;
	}
	.avatar :global(img) {
		@apply rounded-full object-cover w-full h-full;
	}
	.avatar--sm {
		@apply w-12 h-12;
	}
	.avatar--md {
		@apply w-16 h-16;
	}
	.avatar--lg {
		@apply w-20 h-20;
	}
	.avatar--xl {
		@apply w-24 h-24;
	}

	.avatar--sm.avatar--online {
		@apply border-3 border-green-500;
	}

	.avatar--md.avatar--online {
		@apply border-5 border-green-500;
	}

	.avatar--lg.avatar--online {
		@apply border-7 border-green-500;
	}

	.avatar--xl.avatar--online {
		@apply border-9 border-green-500;
	}

	.avatar--sm.avatar--offline {
		@apply border-3 border-gray-500;
	}

	.avatar--md.avatar--offline {
		@apply border-5 border-gray-500;
	}

	.avatar--lg.avatar--offline {
		@apply border-7 border-gray-500;
	}

	.avatar--xl.avatar--offline {
		@apply border-9 border-gray-500;
	}

	.avatar--sm.avatar--busy {
		@apply border-3 border-red-500;
	}

	.avatar--md.avatar--busy {
		@apply border-5 border-red-500;
	}

	.avatar--lg.avatar--busy {
		@apply border-7 border-red-500;
	}

	.avatar--xl.avatar--busy {
		@apply border-9 border-red-500;
	}

	.avatar--sm.avatar--away {
		@apply border-3 border-yellow-500;
	}

	.avatar--md.avatar--away {
		@apply border-5 border-yellow-500;
	}

	.avatar--lg.avatar--away {
		@apply border-7 border-yellow-500;
	}

	.avatar--xl.avatar--away {
		@apply border-9 border-yellow-500;
	}

	.avatar__badge {
		@apply absolute -bottom-1 -right-2;
	}
</style>
