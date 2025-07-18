<script lang="ts">
	import type { Size, Status } from '$lib/theme/types';
	import StatusIndicator from './StatusIndicator.svelte';

	interface Props {
		status?: 'online' | 'offline' | 'away' | 'connecting' | 'idle';
		size?: Size;
		classes?: string;
	}

	let { status = 'offline', size = 'xs', classes = '' }: Props = $props();
	let indicatorStatus = $derived(
		{
			online: 'success',
			offline: 'neutral',
			away: 'error',
			connecting: 'warning',
			idle: 'warning'
		}[status] as Status
	);
	let colors = $derived(
		{
			online: 'text-green-600 dark:text-green-400',
			offline: 'text-gray-600 dark:text-gray-400',
			away: 'text-red-600 dark:text-red-400',
			connecting: 'text-blue-500 dark:text-blue-400',
			idle: 'text-yellow-600 dark:text-yellow-400'
		}[status]
	);
</script>

<div class="indicator__online indicator__online--{status} indicator__online--{size}">
	<StatusIndicator status={indicatorStatus} {size} {classes} />
	<span class={colors}>
		{status}
	</span>
</div>

<style lang="postcss">
	.indicator__online {
		@apply inline-flex flex-row items-center gap-2;
	}
	.indicator__online.indicator__online--online {
		@apply text-green-700 dark-(text-green-400);
	}
	.indicator__online.indicator__online--offline {
		@apply text-gray-600 dark-(text-gray-400);
	}
	.indicator__online.indicator__online--away {
		@apply text-red-600 dark-(text-red-400);
	}
	.indicator__online.indicator__online--connecting {
		@apply text-blue-500 dark-(text-blue-400);
	}
	.indicator__online.indicator__online--idle {
		@apply text-yellow-600 dark-(text-yellow-400);
	}
	.indicator__online.indicator__online--xs {
		@apply text-xs;
	}
	.indicator__online.indicator__online--sm {
		@apply text-sm;
	}
	.indicator__online.indicator__online--md {
		@apply text-base;
	}
	.indicator__online.indicator__online--lg {
		@apply text-lg;
	}
	.indicator__online.indicator__online--xl {
		@apply text-xl;
	}
	.indicator__online.indicator__online--2xl {
		@apply text-2xl;
	}
</style>
