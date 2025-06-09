<script lang="ts">
	import type { Snippet } from 'svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';

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

<Panel variant="offset">
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
						class="i-tabler-chevron-down text-2xl transform transition-transform duration-200"
						class:rotate-180={collapsed}
					/>
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
</Panel>

<style>
	.drawer {
		@apply w-full;
		@apply flex flex-col gap-2;
	}
	.drawer__header {
		@apply flex justify-between items-center;
	}
	.drawer__actions {
		@apply display-none;
	}

	.drawer__header:hover .drawer__actions {
		@apply flex;
	}
	.drawer__label {
		@apply flex-1 flex items-center justify-start;
	}

	.drawer__toggle {
		@apply w-full;
		@apply flex items-center justify-start gap-4;
		@apply cursor-pointer;
	}
	.drawer__content {
		@apply w-full h-auto;
		@apply overflow-hidden;
		@apply transition-all duration-300;
	}
	.drawer--collapsed .drawer__content {
		@apply h-0;
		@apply opacity-0;
	}
</style>
