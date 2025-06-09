<script lang="ts">
	import type { TypographyElement } from './types';
	interface Props {
		el?: TypographyElement;
		margin?: string;
		classes?: string;
		children?: import('svelte').Snippet;
		onclick?: (event: MouseEvent) => void;
		onkeypress?: (event: KeyboardEvent) => void;
	}

	let {
		el = 'h1',
		margin = 'mb-4',
		classes = '',
		children,
		onclick,
		onkeypress
	}: Props = $props();
</script>

<svelte:element this={el} class="typography {classes} {margin}" {onclick} {onkeypress}>
	{@render children?.()}
</svelte:element>

<style>
	h1.typography {
		@apply text-4xl;
	}
	h2.typography {
		@apply text-3xl;
	}
	h3.typography {
		@apply text-2xl;
	}
	h4.typography {
		@apply text-xl;
	}
	h5.typography {
		@apply text-lg;
	}
	h6.typography {
		@apply text-base;
	}
	p.typography {
		@apply text-base;
	}
	caption.typography {
		@apply text-sm;
	}
	strong.typography {
		@apply font-bold;
	}
</style>
