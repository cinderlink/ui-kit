<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot (sidebar to sidebar_1) making the component unusable -->
<script lang="ts">
	import Toggle from '$lib/interactive/Toggle/Toggle.svelte';
	import { theme } from '$lib/theme/store.svelte';
	import { sidebar } from './store';
	import './SidebarLayout.css';

	interface Props {
		autoCloseOnNavigate?: boolean;
		onNavigate?: () => void;
		children?: import('svelte').Snippet;
		sidebar?: import('svelte').Snippet;
	}

	let { 
		autoCloseOnNavigate = false, 
		onNavigate,
		children,
		sidebar: sidebarSlot
	}: Props = $props();

	// Optional SvelteKit integration - only if available
	$effect(() => {
		if (autoCloseOnNavigate && typeof window !== 'undefined') {
			const handleNavigation = () => {
				$sidebar.toggled = false;
				onNavigate?.();
			};
			
			// Listen for navigation changes (popstate works with most routers)
			window.addEventListener('popstate', handleNavigation);
			return () => window.removeEventListener('popstate', handleNavigation);
		}
	});
</script>

<div class="layout layout--sidebar">
	<aside class="layout__sidebar" class:layout__sidebar--toggled={$sidebar.toggled}>
		{#if sidebarSlot}
			{@render sidebarSlot()}
		{/if}
		<div class="align-self-end">
			<Toggle id="theme-toggle" bind:toggled={theme.darkMode}>
				{#snippet off()}
					<div class="px-4">
						<div class="i-tabler-sun text-yellow-200"></div>
					</div>
				{/snippet}
				{#snippet on()}
					<div class="px-4">
						<div class="i-tabler-moon text-purple-50"></div>
					</div>
				{/snippet}
			</Toggle>
		</div>
	</aside>
	<div class="layout__page">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
