<script lang="ts">
	import { sidebarStore } from './store.svelte';
	import { SidebarToggle } from '../SidebarToggle';
	import './SidebarLayout.css';
	import type { Snippet } from 'svelte';

	interface Props {
		autoCloseOnNavigate?: boolean;
		onNavigate?: () => void;
		children?: Snippet;
		sidebar?: Snippet;
	}

	let { 
		autoCloseOnNavigate = true, 
		onNavigate,
		children,
		sidebar: sidebarSlot
	}: Props = $props();

	// Handle navigation auto-close
	$effect(() => {
		if (autoCloseOnNavigate && typeof window !== 'undefined') {
			const handleNavigation = () => {
				sidebarStore.closeOnNavigation();
				onNavigate?.();
			};
			
			// Listen for navigation changes
			window.addEventListener('popstate', handleNavigation);
			
			return () => {
				window.removeEventListener('popstate', handleNavigation);
			};
		}
	});
	
	// Handle escape key to close sidebar
	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleKeydown = (e: KeyboardEvent) => {
				if (e.key === 'Escape' && sidebarStore.isOpen && sidebarStore.isMobile) {
					sidebarStore.close();
				}
			};
			
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class="layout layout--sidebar">
	<!-- Mobile backdrop -->
	{#if sidebarStore.isMobile && sidebarStore.isOpen}
		<button 
			class="layout__backdrop"
			onclick={() => sidebarStore.close()}
			aria-label="Close sidebar"
		></button>
	{/if}
	
	<aside 
		class="layout__sidebar" 
		class:layout__sidebar--open={sidebarStore.isOpen}
		class:layout__sidebar--mobile={sidebarStore.isMobile}
		class:layout__sidebar--locked={sidebarStore.isLocked && !sidebarStore.isMobile}
		aria-hidden={!sidebarStore.isOpen}
	>
		<!-- Toggle button in top right when sidebar is open -->
		{#if sidebarStore.isOpen}
			<div class="layout__sidebar-toggle">
				<SidebarToggle />
			</div>
		{/if}
		{#if sidebarSlot}
			{@render sidebarSlot()}
		{/if}
	</aside>
	
	<div class="layout__page">
		<!-- Toggle button positioned at the top-left of the page content when sidebar is closed -->
		{#if !sidebarStore.isOpen}
			<div class="layout__toggle-container">
				<SidebarToggle />
			</div>
		{/if}
		<div class="layout__content">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
