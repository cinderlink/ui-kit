<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import NotificationsCount from './NotificationsCount.svelte';

	interface Props {
		icon?: string;
		count?: number;
		toggle?: boolean;
		children?: import('svelte').Snippet<[any]>;
	}

	let {
		icon = 'i-tabler-bell',
		count = 0,
		toggle = false,
		children
	}: Props = $props();
	const dispatch = createEventDispatcher();
	function onToggle() {
		dispatch('toggle', toggle);
	}
</script>

<div class="notifications-icon">
	<div class="notifications-icon__icon {icon}" onclick={onToggle} onkeypress={onToggle}></div>
	<NotificationsCount {count} />
	{@render children?.({ toggle, })}
</div>

<style>
	.notifications-icon {
		@apply relative inline-block;
	}
	.notifications-icon__icon {
		@apply text-purple-300 hover-text-purple-700 dark-text-purple-100 dark-hover-text-purple-50;
		@apply text-2xl cursor-pointer;
	}

	.notifications-icon :global(.notifications-count) {
		@apply absolute -top-1 -left-1;
	}
</style>
