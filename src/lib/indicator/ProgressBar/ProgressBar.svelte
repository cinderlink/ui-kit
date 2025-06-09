<script lang="ts">
	import type { Size } from "$lib/unocss";

	interface Props {
		progress?: number;
		size?: Size;
		children?: import('svelte').Snippet;
	}

	let { progress = 0, size = "md", children }: Props = $props();
</script>

<div class="progress__bar progress__bar--{size}">
	<div class="progress__fill" style="width: {progress}%"></div>
	<div class="progress__content">
		{@render children?.()}
	</div>
</div>

<style>
	.progress__bar {
		@apply relative w-full bg-purple-800 rounded;
	}

	.progress__fill {
		@apply absolute top-0 left-0 h-full bg-purple-300 rounded animate-pulse;
	}

	.progress__content {
		@apply absolute top-0 left-0 w-full h-full flex items-center justify-center;
	}

	.progress__content :global(.typography) {
		@apply text-white text-shadow mb-0;
	}

	.progress__bar--sm, .progress__bar--sm .progress__content {
		@apply h-6;
	}
	.progress__bar--md, .progress__bar--md .progress__content {
		@apply h-8;
	}
	.progress__bar--lg, .progress__bar--lg .progress__content {
		@apply h-10;
	}
	.progress__bar--xl, .progress__bar--xl .progress__content {
		@apply h-12;
	}
	.progress__bar--2xl, .progress__bar--2xl .progress__content {
		@apply h-16;
	}
</style>
