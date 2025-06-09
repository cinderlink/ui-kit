<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition';
	import type { Size } from '$lib/unocss/types';

	interface Props {
		href?: string | undefined;
		el?: any;
		size?: Size;
		flex?: string;
		variant?: 
		| 'default'
		| 'dark'
		| 'light'
		| 'offset'
		| 'red'
		| 'green'
		| 'blue'
		| 'yellow';
		interactive?: boolean;
		rounded?: string;
		classes?: string;
		invert?: boolean;
		transition?: FadeParams & { enable?: boolean } | undefined;
		children?: import('svelte').Snippet;
		onclick?: (event: MouseEvent) => void;
		[key: string]: any
	}

	let {
		href = undefined,
		el = href ? 'a' : 'div',
		size = 'md',
		flex = 'flex flex-col gap-2',
		variant = 'default',
		interactive = false,
		rounded = 'rounded-md',
		classes = '',
		invert = false,
		transition = undefined,
		children,
		onclick,
		...rest
	}: Props = $props();

	const smart = (node: Element, args: any) => args?.enable && fade(node, args);
</script>

<svelte:element
	this={el}
	{onclick}
	in:smart={transition}
	class="panel panel--{variant} panel--{size} {classes} {flex} {rounded}"
	class:panel--invert={invert}
	class:panel--interactive={interactive}
	{...{ ...rest, ...(el === 'a' ? { href } : {}) }}
>
	{@render children?.()}
</svelte:element>

<style>
	.panel {
		@apply transition-all duration-200 ease-in-out;
	}

	.panel.panel--light {
		@apply bg-purple-50 text-purple-900;
	}

	.panel.panel--default {
		@apply bg-purple-50 text-purple-900;
		@apply dark-(bg-purple-900 text-purple-50);
	}
	.panel.panel--offset {
		@apply bg-white text-purple-900;
		@apply dark-(bg-purple-800 text-purple-50);
	}

	.panel.panel--default.panel--invert {
		@apply bg-purple-900 text-purple-50;
		@apply dark-(bg-purple-50 text-purple-900);
	}

	.panel.panel--default.panel--invert :global(a) {
		@apply text-purple-800 dark-(text-purple-50);
	}

	.panel.panel--dark {
		@apply bg-purple-900 text-purple-50;
	}

	a.panel,
	button.panel {
		@apply cursor-pointer;
	}

	.panel--xs {
		@apply p-1;
	}

	.panel--sm {
		@apply p-2 shadow-sm;
	}

	.panel--interactive.panel--sm {
		@apply hover-(shadow-md);
	}

	.panel--md {
		@apply p-1 md-(p-2) lg-(p-4) shadow-md;
	}

	.panel--interactive.panel--md {
		@apply hover-(shadow-lg);
	}

	.panel--lg {
		@apply p-8 shadow-lg;
	}

	.panel--interactive.panel--lg {
		@apply hover-(shadow-xl);
	}

	.panel--xl {
		@apply p-12 shadow-xl;
	}

	.panel--interactive.panel--xl {
		@apply hover-(shadow-2xl);
	}

	.panel--2xl {
		@apply p-16 shadow-2xl;
	}

	/* red */
	.panel--interactive.panel--2xl {
		@apply hover-(shadow-3xl);
	}
	.panel.panel--red {
		@apply bg-red-50 text-red-900 border-2 border-red-900;
	}
	.panel.panel--red.panel--invert {
		@apply bg-red-900 text-red-50 border-2 border-red-50;
	}

	/* green */
	.panel.panel--red.panel--invert :global(a) {
		@apply text-red-800;
	}
	.panel.panel--green {
		@apply bg-green-50 text-green-900 border-2 border-green-200;
	}
	.panel.panel--green.panel--invert {
		@apply bg-green-900 text-green-50 border-2 border-green-700;
	}
	.panel.panel--green.panel--invert :global(a) {
		@apply text-green-800;
	}

	/* blue */
	.panel.panel--blue {
		@apply bg-blue-200 text-blue-900 border-2 border-blue-200;
		@apply dark-(bg-blue-800/50 text-blue-300 border-2 border-blue-300);
	}
	.panel.panel--blue.panel--invert {
		@apply bg-blue-900 text-blue-200 border-2 border-blue-700;
	}
	.panel.panel--blue.panel--invert :global(a) {
		@apply text-blue-800;
	}

	/* yellow */
	.panel.panel--yellow {
		@apply bg-yellow-50 text-yellow-900 border-2 border-yellow-200;
	}
	.panel.panel--yellow.panel--invert {
		@apply bg-yellow-900 text-yellow-50 border-2 border-yellow-700;
	}
	.panel.panel--yellow.panel--invert :global(a) {
		@apply text-yellow-800;
	}
</style>
