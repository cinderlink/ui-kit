<script lang="ts">
	import type { Snippet } from 'svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';

	interface Props {
		classes?: string;
		collapsed?: boolean;
		label?: string;
		notificationsCount?: Snippet;
		toggle?: Snippet;
		actions?: Snippet;
		children?: Snippet;
	}

	let {
		classes = '',
		collapsed = $bindable(true),
		label = '',
		notificationsCount,
		toggle: toggleSlot,
		actions,
		children
	}: Props = $props();

	function toggle() {
		collapsed = !collapsed;
	}
</script>

	<div class="drawer {classes}" class:drawer--collapsed={collapsed}>
		<div class="drawer__header">
			<div class="drawer__notifications-count">
				{#if notificationsCount}
					{@render notificationsCount()}
				{/if}
			</div>

			<button class="drawer__toggle" onclick={toggle}>
				{#if toggleSlot}
					{@render toggleSlot()}
				{:else}
					<div class="drawer__label">
						<Typography el="h3" margin="m-0">{label}</Typography>
					</div>
					<div
						class="i-tabler-chevron-down text-sm transform transition-transform duration-200 ease-out text-gray-500 dark:text-gray-400"
						class:rotate-180={!collapsed}
					></div>
				{/if}
			</button>

			<div class="drawer__actions">
				{#if actions}
					{@render actions()}
				{/if}
			</div>
		</div>
		<div class="drawer__content">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>

<style lang="postcss">
	.drawer {
		@apply w-full relative;
		@apply flex flex-col gap-1;
	}
	
	.drawer__header {
		@apply flex justify-between items-center;
	}
	
	.drawer__actions {
		@apply hidden opacity-0 transition-all duration-200;
	}

	.drawer__header:hover .drawer__actions {
		@apply flex opacity-100;
	}
	
	.drawer__label {
		@apply flex items-center justify-start;
	}

	.drawer__toggle {
		@apply w-full px-2 py-1.5 rounded-lg;
		@apply flex items-center justify-between;
		@apply cursor-pointer transition-all duration-200 ease-out;
		@apply text-gray-700 dark:text-gray-300 text-sm font-medium;
		@apply hover:bg-gray-100 dark:hover:bg-gray-800/50;
		/* Simple, clean button without heavy glass effect */
		background: transparent;
		border: none;
		box-shadow: none;
	}
	
	.drawer__toggle:hover {
		@apply text-gray-900 dark:text-gray-100;
	}
	
	/* Dark mode uses the global glass variables which are already darker */
	
	.drawer__content {
		@apply w-full h-auto ml-0 pl-0 py-2;
		@apply overflow-hidden;
		@apply transition-all duration-500 ease-out;
		/* Clean transparent background for glass effect */
		background: transparent;
		border-radius: 0 0 6px 6px;
		margin-top: 2px;
	}
	
	.drawer--collapsed .drawer__content {
		@apply h-0 opacity-0 border-l-transparent;
		margin-left: 0;
		padding-left: 0;
		margin-top: 0;
	}
</style>
