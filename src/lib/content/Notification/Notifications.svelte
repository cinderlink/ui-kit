<script lang="ts">
	import { clickoutside } from '$lib/actions';
	import { fade } from 'svelte/transition';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Notification from './Notification.svelte';
	import type { NotificationType } from './types';

	interface Props {
		notifications?: NotificationType[];
		header?: import('svelte').Snippet;
		onclickoutside?: () => void;
		ondismiss?: (uid: string) => void;
		ondismissedAll?: (notifications: NotificationType[]) => void;
		ongoToLink?: (notification: NotificationType) => void;
	}

	let { 
		notifications = [], 
		header,
		onclickoutside,
		ondismiss,
		ondismissedAll,
		ongoToLink
	}: Props = $props();

	function dismissAll() {
		ondismissedAll?.(notifications);
	}
</script>

{#if notifications.filter((n) => !n.dismissed).length > 0}
	<div use:clickoutside {onclickoutside} transition:fade class="notifications">
		<Panel classes="gap-2 p-4 border-1px border-purple-200/20 rounded-md overflow-hidden">
			<div class="notifications__header">
				{#if header}{@render header()}{:else}
					<span>Notifications title</span>
				{/if}
				<div class="notifications__dismiss" onclick={dismissAll} onkeypress={dismissAll}>
					Dismiss all
				</div>
			</div>
			{#each notifications as notification}
				<Notification
					{notification}
					ondismiss={() => {
						ondismiss?.(notification.uid);
					}}
					ongoToLink={() => {
						ongoToLink?.(notification);
					}}
				>
					{#snippet header()}
						<span class="font-bold">{notification.title}</span>
					{/snippet}

					<p>
						{notification.body}
					</p>

					{#snippet footer()}
						<span class="text-xs">{new Date(notification.createdAt).toDateString()}</span>
					{/snippet}
				</Notification>
			{/each}
		</Panel>
	</div>
{/if}

<style>
	.notifications__header {
		@apply flex justify-between items-center font-bold;
		@apply px-1;
	}

	.notifications__dismiss {
		@apply p-2 rounded-full;
		@apply text-xs text-purple-300 hover-text-purple-700 dark-text-purple-100 dark-hover-text-purple-50 cursor-pointer;
		@apply bg-gray-100 dark-bg-purple-800 dark-hover-bg-purple-700;
		@apply border-1px border-gray-300 dark-border-purple-200/20;
	}
</style>
