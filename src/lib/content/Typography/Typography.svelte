<script lang="ts">
	import type { TypographyElement } from './types';
	interface Props {
		el?: TypographyElement;
		margin?: string;
		classes?: string;
		class?: string;
		children?: import('svelte').Snippet;
		onclick?: (event: MouseEvent) => void;
		onkeypress?: (event: KeyboardEvent) => void;
	}

	let {
		el = 'h1',
		margin = 'mb-4',
		classes = '',
		class: className = '',
		children,
		onclick,
		onkeypress
	}: Props = $props();
</script>

<!-- svelte:element is the correct syntax for dynamic HTML elements in Svelte 5 -->
<svelte:element this={el} class="typography {classes} {className} {margin}" {onclick} {onkeypress} role={onclick || onkeypress ? 'button' : undefined}>
	{@render children?.()}
</svelte:element>

<style lang="postcss">
	h1.typography {
		@apply text-2xl font-bold;
	}
	h2.typography {
		@apply text-xl font-semibold;
	}
	h3.typography {
		@apply text-lg font-semibold;
	}
	h4.typography {
		@apply text-base font-medium;
	}
	h5.typography {
		@apply text-sm font-medium;
	}
	h6.typography {
		@apply text-sm font-normal;
	}
	p.typography {
		@apply text-sm leading-relaxed;
	}
	caption.typography {
		@apply text-xs text-gray-600 dark:text-gray-400;
	}
	strong.typography {
		@apply font-bold;
	}
</style>
