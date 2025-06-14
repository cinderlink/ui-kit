<script lang="ts">
	import type {
		BorderRadius,
		FlexAlign,
		FlexDirection,
		FlexJustify
	} from '$lib/unocss/types';
	import type { Size } from '$lib/theme/types';
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string | undefined;
		rounded?: BorderRadius;
		direction?: FlexDirection;
		align?: FlexAlign;
		justify?: FlexJustify;
		width?: `w-${string}`;
		height?: `h-${string}`;
		gap?: `gap-${string}`;
		size?: Size | 'slim';
		type?: 'button' | 'submit' | 'reset';
		variant?: 
		| 'default'
		| 'dark'
		| 'light'
		| 'pink'
		| 'green'
		| 'blue'
		| 'yellow'
		| 'red'
		| 'none'
		| 'outlined';
		elevation?: number;
		disabled?: boolean;
		invert?: boolean;
		link?: boolean;
		classes?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		href = undefined,
		rounded = 'rounded-lg',
		direction = 'flex-row',
		align = 'items-center',
		justify = 'justify-start',
		width = 'w-auto',
		height = 'h-auto',
		gap = 'gap-2',
		size = 'md',
		type = 'button',
		variant = 'default',
		elevation = 0,
		disabled = false,
		invert = false,
		link = false,
		classes = '',
		onclick,
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="button button--{variant} button--{size} button--elevation-{elevation} {rounded} {direction} {align} {justify} {width} {height} {gap} {classes}"
	class:button--invert={invert}
	class:button--link={link}
	{disabled}
	{href}
	{type}
	{...rest}
	{onclick}
>
	{@render children?.()}
</svelte:element>

<style>
	.button {
		@apply border-4 border-transparent;
		@apply flex flex-row gap-2;
		@apply font-900 transition-colors duration-200 ease-in-out;
		@apply rounded-lg;
	}
	.button:disabled {
		@apply cursor-not-allowed;
	}

	a.button.button--link {
		@apply underline font-weight-400;
	}

	.button--default {
		@apply bg-purple-50 text-purple-900 border-purple-900/50;
		@apply dark-(bg-purple-900 text-purple-50 border-purple-50/75);
	}
	.button--default:hover:not(:disabled) {
		@apply bg-purple-100 text-purple-800;
		@apply dark-(bg-purple-800 text-purple-50);
	}
	.button--default:disabled {
		@apply opacity-60;
		@apply bg-purple-50 text-purple-100 border-purple-100;
		@apply dark-(bg-purple-900 text-purple-100 border-purple-100);
	}

	.button--light {
		@apply bg-purple-50 text-purple-900;
	}

	.button--light:disabled {
		@apply bg-purple-50 text-purple-900 opacity-60;
	}

	.button--light:hover:not(:disabled) {
		@apply bg-purple-100 text-white;
	}

	.button--dark {
		@apply bg-purple-900 text-white;
	}

	.button--dark:disabled {
		@apply bg-purple-900 text-purple-100 opacity-60;
	}

	.button--dark:hover:not(:disabled) {
		@apply bg-purple-800;
	}

	.button--dark {
		@apply border-4 border-purple-50;
	}
	.button--dark:disabled {
		@apply border-purple-100;
	}

	.button--pink {
		@apply bg-pink-500 text-purple-900;
	}
	.button--pink:disabled {
		@apply bg-pink-500 text-pink-900 opacity-60;
	}
	.button--pink:hover:not(:disabled) {
		@apply bg-pink-400;
	}

	.button--green {
		@apply bg-green-500 text-purple-900;
	}
	.button--green:disabled {
		@apply bg-green-500 text-green-900 opacity-60;
	}
	.button--green:hover:not(:disabled) {
		@apply bg-green-400;
	}

	.button--blue {
		@apply bg-blue-500 dark(bg-blue-300) text-blue-900 dark(text-blue-900);
	}
	.button--blue:disabled {
		@apply bg-blue-500 text-blue-900 dark-(bg-blue-300 text-blue-500) opacity-60;
	}
	.button--blue:hover:not(:disabled) {
		@apply bg-blue-300 dark(bg-blue-200);
	}

	.button--yellow {
		@apply bg-yellow-500 text-purple-900;
	}
	.button--yellow:disabled {
		@apply bg-yellow-500 text-yellow-900 opacity-60;
	}
	.button--yellow:hover:not(:disabled) {
		@apply bg-yellow-400;
	}

	.button--none {
		@apply text-purple-500 dark-text-purple-100;
	}

	.button--red {
		@apply bg-transparent text-red-400 border-red-400;
	}
	.button--red:disabled {
		@apply text-neutral-400 border-neutral-400;
	}
	.button--red:hover:not(:disabled) {
		@apply bg-red-500 text-red-50;
	}

	.button--xs {
		@apply text-xs p-1 rounded-sm border-1;
	}

	.button--sm {
		@apply text-sm py-1 px-3 rounded-md border-2;
	}

	.button--md {
		@apply text-lg px-4 py-2;
	}

	.button--lg {
		@apply text-xl px-6 py-4;
	}

	.button--xl {
		@apply text-2xl p-6;
	}

	.button--2xl {
		@apply text-4xl p-6;
	}
</style>
