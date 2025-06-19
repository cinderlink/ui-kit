<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import SidebarToggle from '../SidebarToggle/SidebarToggle.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import type { Snippet } from 'svelte';
	
	interface BreadcrumbItem {
		label: string;
		href?: string;
	}
	
	interface Props {
		/**
		 * Page title
		 */
		title?: string;
		/**
		 * Page subtitle/description
		 */
		subtitle?: string;
		/**
		 * Breadcrumb items
		 */
		breadcrumbs?: BreadcrumbItem[];
		/**
		 * Show sidebar toggle (default true)
		 */
		showSidebarToggle?: boolean;
		/**
		 * Page content variant
		 */
		variant?: 'default' | 'glass' | 'minimal';
		/**
		 * Maximum width constraint
		 */
		maxWidth?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
		/**
		 * Custom classes
		 */
		classes?: string;
		/**
		 * Header actions (buttons, etc)
		 */
		actions?: Snippet;
		/**
		 * Page content
		 */
		children?: Snippet;
	}
	
	let {
		title,
		subtitle,
		breadcrumbs = [],
		showSidebarToggle = true,
		variant = 'default',
		maxWidth = 'full',
		classes = '',
		actions,
		children
	}: Props = $props();
	
	// Determine container classes based on variant and maxWidth
	let containerClasses = $derived(() => {
		const base = 'page';
		const widthClass = maxWidth === 'full' ? 'w-full' : 
			maxWidth === 'none' ? '' :
			`max-w-${maxWidth} mx-auto`;
		
		return `${base} ${widthClass} ${classes}`;
	});
</script>

<main class={containerClasses}>
	<!-- Page Header -->
	<header class="page__header">
		<!-- Mobile Header Bar -->
		<div class="page__mobile-bar">
			{#if showSidebarToggle}
				<SidebarToggle mobileOnly={true} />
			{/if}
			
			{#if title}
				<Typography el="h1" classes="page__mobile-title">
					{title}
				</Typography>
			{/if}
			
			{#if actions}
				<div class="page__mobile-actions">
					{@render actions()}
				</div>
			{/if}
		</div>
		
		<!-- Desktop Header -->
		<div class="page__desktop-header">
			<!-- Breadcrumbs -->
			{#if breadcrumbs.length > 0}
				<Breadcrumb 
					sections={breadcrumbs.map(item => ({
						label: item.label,
						path: item.href || ''
					}))}
				/>
			{/if}
			
			<!-- Title Section -->
			{#if title || subtitle || actions}
				<div class="page__title-section">
					<div class="page__title-content">
						{#if title}
							<Typography el="h1" classes="page__title">
								{title}
							</Typography>
						{/if}
						
						{#if subtitle}
							<Typography el="p" classes="page__subtitle">
								{subtitle}
							</Typography>
						{/if}
					</div>
					
					{#if actions}
						<div class="page__actions">
							{@render actions()}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</header>
	
	<!-- Page Content -->
	<div class="page__content">
		{#if variant === 'glass'}
			<Panel variant="glass" depth={2} classes="page__glass-container">
				{@render children?.()}
			</Panel>
		{:else if variant === 'minimal'}
			{@render children?.()}
		{:else}
			<div class="page__default-container">
				{@render children?.()}
			</div>
		{/if}
	</div>
</main>

<style lang="postcss">
	.page {
		@apply flex flex-col min-h-full;
		@apply px-4 lg:px-8;
	}
	
	.page__header {
		@apply mb-6 lg:mb-8;
	}
	
	/* Mobile Header Bar */
	.page__mobile-bar {
		@apply flex items-center justify-between gap-4 py-4;
		@apply lg:hidden;
		@apply border-b border-gray-200/50 dark:border-purple-500/20;
	}
	
	.page__mobile-title {
		@apply flex-1 text-lg font-bold text-center;
		@apply text-gray-900 dark:text-white;
		@apply truncate;
	}
	
	.page__mobile-actions {
		@apply flex items-center gap-2;
	}
	
	/* Desktop Header */
	.page__desktop-header {
		@apply hidden lg:block;
	}
	
	.page__breadcrumbs {
		@apply mb-4;
	}
	
	.page__title-section {
		@apply flex items-start justify-between gap-6;
	}
	
	.page__title-content {
		@apply flex-1;
	}
	
	.page__title {
		@apply text-2xl lg:text-3xl font-bold;
		@apply text-gray-900 dark:text-white;
		@apply mb-2;
	}
	
	.page__subtitle {
		@apply text-base lg:text-lg;
		@apply text-gray-600 dark:text-gray-300;
		@apply leading-relaxed;
	}
	
	.page__actions {
		@apply flex items-center gap-3;
		@apply flex-shrink-0;
	}
	
	/* Page Content */
	.page__content {
		@apply flex-1;
	}
	
	.page__default-container {
		@apply space-y-6;
	}
	
	.page__glass-container {
		@apply p-6 lg:p-8;
	}
	
	/* Responsive adjustments */
	@media (max-width: 1023px) {
		.page {
			@apply px-3;
		}
		
		.page__mobile-bar {
			@apply py-3;
		}
	}
	
	/* Focus management for accessibility */
	.page__title:focus {
		@apply outline-none;
	}
	
	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.page__mobile-bar {
			@apply border-b-2 border-gray-900 dark:border-white;
		}
	}
</style>