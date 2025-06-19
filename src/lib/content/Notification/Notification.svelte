<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { NotificationType } from './types';
	import Panel from '$lib/content/Panel/Panel.svelte';

	interface Props {
		notification: NotificationType;
		classes?: string;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		ondismiss?: (notification: NotificationType) => void;
		ongoToLink?: (notification: NotificationType) => void;
	}

	let {
		notification,
		classes = '',
		header,
		children,
		footer,
		ondismiss,
		ongoToLink
	}: Props = $props();

	function onDismiss() {
		ondismiss?.(notification);
	}

	function goToLink() {
		onDismiss();
		ongoToLink?.(notification);
	}
</script>

{#if !notification.dismissed}
	<Panel
		variant="surface"
		depth={2}
		size="sm"
		transition={{ enable: true, duration: 300 }}
		classes="notification {classes}"
	>
		<div class="notification__header">
			{@render header?.()}
			<button class="notification__close" onclick={onDismiss} aria-label="Dismiss notification">
				<i class="icon i-tabler-x"></i>
			</button>
		</div>
		<div class="notification__body">
			{@render children?.()}
		</div>
		{#if footer || notification.link}
			<div class="notification__footer">
				{@render footer?.()}
				{#if notification.link}
					<button class="notification__link" onclick={goToLink} aria-label="Go to link">
						<i class="icon i-tabler-external-link"></i>
					</button>
				{/if}
			</div>
		{/if}
	</Panel>
{/if}

<style lang="postcss">
	:global(.notification) {
		@apply w-full overflow-hidden;
	}

	.notification__header {
		@apply flex justify-between items-center mb-2;
		@apply text-sm font-semibold;
		@apply text-gray-700 dark:text-gray-300;
	}

	.notification__body {
		@apply flex-1;
		@apply text-sm;
		@apply text-gray-600 dark:text-gray-400;
	}

	.notification__footer {
		@apply flex justify-between items-center mt-3 pt-3;
		@apply border-t border-gray-200 dark:border-gray-700;
		@apply text-xs text-gray-500 dark:text-gray-500;
	}

	.notification__close,
	.notification__link {
		@apply p-1 rounded-lg;
		@apply transition-colors duration-200;
		@apply hover:bg-gray-200 dark:hover:bg-gray-700;
		background: none;
		border: none;
		cursor: pointer;
	}

	.icon {
		@apply text-gray-500 hover:text-gray-700;
		@apply dark:text-gray-400 dark:hover:text-gray-200;
		@apply text-lg;
	}
</style>
