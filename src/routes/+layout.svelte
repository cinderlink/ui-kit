<script lang="ts">
	import 'virtual:uno.css';
	import '../app.css';
	import Theme from '$lib/theme/Theme.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import { SidebarLayout, sidebarStore } from '$lib/layout/SidebarLayout';
	import Logo from '$lib/Logo.svelte';
	import Drawer from '$lib/content/Drawer/Drawer.svelte';
	import Input from '$lib/interactive/Input/Input.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import { page } from '$app/stores';
	
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	
	// Search state
	let searchQuery = $state('');
	
	interface NavItem {
		label: string;
		href: string;
	}

	interface ComponentGroup extends NavItem {
		components?: NavItem[];
	}

	interface NavSection {
		label: string;
		items: ComponentGroup[];
	}
	
	// Navigation structure with all components
	const navigation: NavSection[] = [
		{
			label: "Getting Started",
			items: [
				{ label: "Installation", href: "/guides/installation" },
				{ label: "Quick Start", href: "/guides/quickstart" },
				{ label: "Examples", href: "/guides/examples" }
			]
		},
		{
			label: "Theming",
			items: [
				{ label: "Overview", href: "/themes/overview" },
				{ label: "Colors", href: "/themes/colors" },
				{ label: "Customization", href: "/themes/customization" },
				{ label: "Contrast", href: "/themes/contrast" }
			]
		},
		{
			label: "Components",
			items: [
				{ 
					label: "Content", 
					href: "/components/content",
					components: [
						{ label: "Avatar", href: "/components/content/avatar" },
						{ label: "Card", href: "/components/content/card" },
						{ label: "Drawer", href: "/components/content/drawer" },
						{ label: "Emoji", href: "/components/content/emoji" },
						{ label: "Notification", href: "/components/content/notification" },
						{ label: "Panel", href: "/components/content/panel" },
						{ label: "Reaction", href: "/components/content/reaction" },
						{ label: "Typography", href: "/components/content/typography" }
					]
				},
				{ 
					label: "Interactive", 
					href: "/components/interactive",
					components: [
						{ label: "Button", href: "/components/interactive/button" },
						{ label: "Dropdown", href: "/components/interactive/dropdown" },
						{ label: "Image Upload", href: "/components/interactive/imageupload" },
						{ label: "Input", href: "/components/interactive/input" },
						{ label: "List", href: "/components/interactive/list" },
						{ label: "Modal", href: "/components/interactive/modal" },
						{ label: "Select", href: "/components/interactive/select" },
						{ label: "Toggle", href: "/components/interactive/toggle" }
					]
				},
				{ 
					label: "Indicator", 
					href: "/components/indicator",
					components: [
						{ label: "Loading Indicator", href: "/components/indicator/loadingindicator" },
						{ label: "Progress Bar", href: "/components/indicator/progressbar" },
						{ label: "Status Indicator", href: "/components/indicator/statusindicator" }
					]
				},
				{ 
					label: "Layout", 
					href: "/components/layout",
					components: [
						{ label: "Centered Panel Layout", href: "/components/layout/centeredpanellayout" },
						{ label: "Page", href: "/components/layout/page" },
						{ label: "Sidebar", href: "/components/layout/sidebar" },
						{ label: "Sidebar Layout", href: "/components/layout/sidebarlayout" }
					]
				},
				{ 
					label: "Navigation", 
					href: "/components/navigation",
					components: [
						{ label: "Breadcrumb", href: "/components/navigation/breadcrumb" }
					]
				},
				{ 
					label: "Markup", 
					href: "/components/markup",
					components: [
						{ label: "Code", href: "/components/markup/code" },
						{ label: "Code Editor", href: "/components/markup/codeeditor" },
						{ label: "Markdown", href: "/components/markup/markdown" },
						{ label: "Syntax", href: "/components/markup/syntax" }
					]
				},
				{ 
					label: "Data", 
					href: "/components/data",
					components: [
						{ label: "Datatable", href: "/components/data/datatable" }
					]
				}
			]
		}
	];
	
	// Handle navigation clicks
	function handleNavClick() {
		// Only close sidebar on mobile, don't interfere with navigation
		if (sidebarStore.isMobile) {
			sidebarStore.close();
		}
	}
	
	// Filter navigation based on search query
	function filterNavigation(navigation: NavSection[], query: string): NavSection[] {
		if (!query.trim()) return navigation;
		
		const lowerQuery = query.toLowerCase();
		
		return navigation.map(section => {
			const filteredItems = section.items.filter(item => {
				// Check if group matches
				if (item.label.toLowerCase().includes(lowerQuery)) return true;
				
				// Check if any component matches
				if (item.components) {
					return item.components.some(comp => 
						comp.label.toLowerCase().includes(lowerQuery)
					);
				}
				
				return false;
			}).map(item => {
				// If group matches, show all components
				if (item.label.toLowerCase().includes(lowerQuery)) return item;
				
				// Otherwise filter components
				if (item.components) {
					return {
						...item,
						components: item.components.filter(comp => 
							comp.label.toLowerCase().includes(lowerQuery)
						)
					};
				}
				
				return item;
			});
			
			return {
				...section,
				items: filteredItems
			};
		}).filter(section => section.items.length > 0);
	}
	
	const filteredNavigation = $derived(filterNavigation(navigation, searchQuery));
	
	// Track which sections have active items
	const activeSections = $derived.by(() => {
		const active = new Set<string>();
		navigation.forEach(section => {
			section.items.forEach(item => {
				if (item.href === $page.url.pathname) {
					active.add(section.label + '-' + item.label);
				}
				if (item.components) {
					item.components.forEach(comp => {
						if (comp.href === $page.url.pathname) {
							active.add(section.label + '-' + item.label);
						}
					});
				}
			});
		});
		return active;
	});
</script>

<Theme>
	<SidebarLayout>
		{#snippet sidebar()}
			<div class="sidebar-content">
				<!-- Compact Header -->
				<div class="sidebar-header flex items-center gap-2">
					<Logo />
					<Typography el="h3" classes="text-xs font-medium text-gray-700 dark:text-gray-300">
						@cinderlink/ui-kit
					</Typography>
					<!-- Global theme toggle -->
					<ThemeToggle />
				</div>
				
				<!-- Search using Input component -->
				<div class="sidebar-search">
					<Input 
						id="sidebar-search"
						type="search"
						placeholder="Search..."
						bind:value={searchQuery}
						size="sm"
						classes="w-full"
						icon="i-tabler-search"
					/>
				</div>
				
				<!-- Navigation Section -->
				<nav class="sidebar-nav">
					{#if filteredNavigation.length === 0}
						<div class="no-results">
							<div class="i-tabler-search-off text-2xl mb-2"></div>
							<Typography el="p" classes="text-sm text-gray-500 dark:text-gray-400">
								No components found
							</Typography>
						</div>
					{/if}
					{#each filteredNavigation as section}
						<div class="nav-section">
							<Typography el="h4" classes="nav-section-title">
								{section.label}
							</Typography>
							<div class="nav-items">
								{#each section.items as item}
									<Drawer 
										label={item.label} 
										classes="nav-drawer"
										collapsed={!activeSections.has(section.label + '-' + item.label)}
									>
										{#if item.components}
											<div class="nav-subitems">
												{#each item.components as component}
													<a 
														href={component.href}
														class="nav-sublink"
														class:active={$page.url.pathname === component.href}
														onclick={handleNavClick}
													>
														{component.label}
													</a>
												{/each}
											</div>
										{:else}
											<a 
												href={item.href}
												class="nav-sublink"
												class:active={$page.url.pathname === item.href}
												onclick={handleNavClick}
											>
												View {item.label}
											</a>
										{/if}
									</Drawer>
								{/each}
							</div>
						</div>
					{/each}
				</nav>
				
			</div>
		{/snippet}
		<main>
			{@render children?.()}
		</main>
	</SidebarLayout>
</Theme>

<style lang="postcss">
	/* Sidebar content layout */
	.sidebar-content {
		@apply flex flex-col h-full;
		padding: 0;
	}
	
	/* Compact header section */
	.sidebar-header {
		@apply flex flex-col items-center gap-1.5 p-2 mb-2;
		@apply border-b border-gray-200/10 dark:border-gray-700/10;
	}
	
	/* Search section */
	.sidebar-search {
		@apply px-2 mb-4;
	}
	
	/* Navigation section */
	.sidebar-nav {
		@apply flex-1 overflow-y-auto overflow-x-hidden;
		@apply pl-2 pr-1 pb-3;
		/* Subtle scrollbar aligned to right */
		scrollbar-width: thin;
		scrollbar-color: rgba(147, 51, 234, 0.1) transparent;
	}
	
	.sidebar-nav::-webkit-scrollbar {
		width: 4px;
	}
	
	.sidebar-nav::-webkit-scrollbar-track {
		background: transparent;
		margin-right: 0;
	}
	
	.sidebar-nav::-webkit-scrollbar-thumb {
		background: rgba(147, 51, 234, 0.15);
		border-radius: 2px;
		margin-right: 0;
	}
	
	.sidebar-nav::-webkit-scrollbar-thumb:hover {
		background: rgba(147, 51, 234, 0.25);
	}
	
	/* No results state */
	.no-results {
		@apply flex flex-col items-center justify-center;
		@apply text-center py-6;
		@apply text-gray-400 dark:text-gray-500;
	}
	
	/* Navigation sections */
	.nav-section {
		@apply mb-3;
	}
	
	:global(.nav-section-title) {
		@apply text-xs font-semibold uppercase tracking-wider;
		@apply text-gray-500 dark:text-gray-400;
		@apply mb-1.5 px-1;
	}
	
	.nav-items {
		@apply space-y-0.5;
	}
	
	/* Clean drawer styling */
	:global(.nav-drawer) {
		@apply mb-0.5;
	}
	
	:global(.nav-drawer .drawer__toggle) {
		@apply text-sm px-1 py-1;
		@apply rounded-md whitespace-nowrap;
		@apply flex items-center justify-between w-full;
	}
	
	/* Navigation links */
	.nav-subitems {
		@apply space-y-0.5 mt-1 ml-2;
	}
	
	.nav-sublink {
		@apply block px-2 py-1.5 text-xs rounded-md;
		@apply text-gray-600 dark:text-gray-400;
		@apply hover:text-gray-900 dark:hover:text-gray-100;
		@apply hover:bg-gray-100 dark:hover:bg-gray-800/50;
		@apply transition-colors duration-150;
		@apply no-underline;
	}
	
	.nav-sublink.active {
		@apply text-purple-600 dark:text-purple-400;
		@apply bg-purple-50 dark:bg-purple-900/20;
		@apply font-medium;
	}
	
	:global(.nav-sub-button) {
		@apply text-left opacity-80;
	}
	
	:global(.nav-sub-button:hover) {
		@apply opacity-100;
	}
	
	
	/* Main content with parallax background */
	main {
		@apply h-full w-full overflow-y-auto overflow-x-hidden relative;
		background: 
			radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.04) 0%, transparent 50%),
			linear-gradient(135deg, rgba(255, 255, 255, 0.01), rgba(147, 51, 234, 0.01));
		backdrop-filter: blur(0.5px);
		animation: gentle-float 12s ease-in-out infinite;
	}
	
	@keyframes gentle-float {
		0%, 100% { 
			background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
		}
		33% { 
			background-position: 100% 0%, 0% 100%, 100% 50%, 50% 100%;
		}
		66% { 
			background-position: 0% 100%, 100% 0%, 0% 100%, 100% 0%;
		}
	}
	
	/* Dark mode adjustments - MUCH DARKER */
	:global(.dark) main {
		background: 
			radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.02) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.015) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.01) 0%, transparent 50%),
			linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(10, 10, 15, 0.98));
	}
</style>