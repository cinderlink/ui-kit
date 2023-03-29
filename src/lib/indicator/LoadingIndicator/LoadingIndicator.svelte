<script lang="ts">
	import type { Size } from '$lib/unocss/types';

	export let size: Size = 'xl';
	export let icon = 'i-tabler-loader';
</script>

<div class="loading-indicator loading-indicator--{size}">
	<div class="{icon} animate-spin loading-indicator__icon" />
	<slot />
</div>

<style>
	.loading-indicator {
		@apply flex flex-row items-center justify-center;
	}
	.loading-indicator__icon {
		@apply text-purple-800 dark-(text-purple-300);
	}
	.loading-indicator--xs {
		@apply text-xs p-1 gap-2;
	}
	.loading-indicator--xs .loading-indicator__icon {
		@apply text-md;
	}
	.loading-indicator--sm {
		@apply text-sm p-2 gap-2;
	}
	.loading-indicator--sm .loading-indicator__icon {
		@apply text-lg;
	}
	.loading-indicator--md {
		@apply text-base px-4 py-2 gap-2;
	}
	.loading-indicator--md .loading-indicator__icon {
		@apply text-xl;
	}
	.loading-indicator--lg {
		@apply text-lg px-6 py-3 gap-3;
	}
	.loading-indicator--lg .loading-indicator__icon {
		@apply text-2xl;
	}
	.loading-indicator--xl {
		@apply text-xl px-8 py-4 gap-4;
	}
	.loading-indicator--xl .loading-indicator__icon {
		@apply text-3xl;
	}
	.loading-indicator--2xl {
		@apply text-2xl p-8 gap-6;
	}
	.loading-indicator--2xl .loading-indicator__icon {
		@apply text-4xl;
	}
	.loading-indicator :global(h1),
	.loading-indicator :global(h2),
	.loading-indicator :global(h3),
	.loading-indicator :global(h4),
	.loading-indicator :global(h5),
	.loading-indicator :global(h6) {
		@apply text-purple-800 dark-(text-purple-300);
		@apply m-0;
	}
</style>
