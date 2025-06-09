<script lang="ts">
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import type { NotificationType } from './types';
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
	<div transition:fly={{ x: -100 }} class="notification {classes}">
		<div class="notification__header">
			{@render header?.()}
			<i class="icon i-tabler-x" onclick={onDismiss} onkeypress={onDismiss}></i>
		</div>
		<div class="notification__body">
			{@render children?.()}
		</div>
		<div class="notification__footer">
			{@render footer?.()}
			{#if notification.link}
				<i class="icon i-tabler-external-link" onclick={goToLink} onkeypress={goToLink}></i>
			{/if}
		</div>
	</div>
{/if}

<style>
	.notification {
		@apply w-full shadow-md;
		@apply flex flex-col border-1px border-purple-200/20 rounded-md overflow-hidden;
	}
	.notification__header {
		@apply flex justify-between items-center px-4 py-2 bg-gray-100 dark-bg-purple-800;
	}
	.notification__body {
		@apply flex-1 px-4 py-2;
	}
	.notification__footer {
		@apply flex justify-between items-center text-xs text-gray-500;
		@apply px-4 py-2 bg-gray-100 dark-bg-purple-800;
	}

	.icon {
		@apply text-purple-300 hover-(text-purple-700) dark-(text-purple-100) dark-hover-(text-purple-50);
		@apply text-lg cursor-pointer;
	}
</style>
