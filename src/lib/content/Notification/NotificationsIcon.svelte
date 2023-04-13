<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import NotificationsCount from './NotificationsCount.svelte';

	export let icon: string = 'i-tabler-bell';
	export let count: number = 0;
	let toggle = false;
	const dispatch = createEventDispatcher();
	function onToggle() {
		toggle = !toggle;
		dispatch('toggle', toggle);
	}
</script>

<div class="notifications-icon">
	<div class="notifications-icon__icon {icon}" on:click={onToggle} on:keypress={onToggle} />
	<NotificationsCount {count} />
	<slot {toggle} />
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
