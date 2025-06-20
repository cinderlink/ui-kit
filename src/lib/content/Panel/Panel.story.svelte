<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'content',
		id: 'panel',
		title: 'Panel',
		description: 'Foundation glass morphism component'
	};
</script>

<script lang="ts">
	import Panel from './Panel.svelte';
	import Typography from '../Typography/Typography.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
</script>

<div class="space-y-12">
	<!-- Introduction -->
	<div>
		<Typography el="h1" classes="mb-4">Panel Component</Typography>
		<Typography el="p" classes="text-lg mb-6">
			The Panel component is the foundation of our liquid glass design system. It provides the glass
			morphism effects, depth layering, and theme adaptation that other components (like Card) build
			upon.
		</Typography>
	</div>

	<!-- Current Implementation -->
	<div>
		<Typography el="h2" classes="mb-6">Current Implementation</Typography>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
			<Panel>
				<Typography el="h4">Default Panel</Typography>
				<Typography el="p" classes="text-sm">Basic panel with default styling</Typography>
			</Panel>

			<Panel variant="frosted">
				<Typography el="h4">Frosted Variant</Typography>
				<Typography el="p" classes="text-sm">Frosted glass variant</Typography>
			</Panel>

			<Panel variant="purple">
				<Typography el="h4">Purple Variant</Typography>
				<Typography el="p" classes="text-sm">Purple themed variant</Typography>
			</Panel>

			<Panel variant="surface">
				<Typography el="h4">Offset Variant</Typography>
				<Typography el="p" classes="text-sm">Offset styling variant</Typography>
			</Panel>
		</div>

		<Typography el="h3" classes="mt-8 mb-4">Interactive Panels</Typography>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Panel interactive classes="cursor-pointer">
				<Typography el="p">Hover for shadow effect</Typography>
			</Panel>

			<Panel interactive variant="pink" classes="cursor-pointer">
				<Typography el="p">Pink interactive panel</Typography>
			</Panel>

			<Panel href="/components" interactive>
				<Typography el="p">Panel as link</Typography>
			</Panel>
		</div>
	</div>

	<!-- New Liquid Glass Implementation -->
	<div>
		<Typography el="h2" classes="mb-6">New Liquid Glass Implementation</Typography>
		<Typography el="p" classes="mb-6">
			The new implementation features theme-adaptive colors, proper depth layering, and beautiful
			glass effects that work with any color scheme.
		</Typography>

		<Typography el="h3" classes="mb-4">Depth Layers</Typography>
		<div class="space-y-4">
			<Panel depth={1}>
				<Typography el="h4">Layer 1: Main Container</Typography>
				<Typography el="p" classes="text-sm mb-4"
					>10% tint, 20px blur - Used for primary content sections</Typography
				>

				<Panel depth={2} classes="mt-4">
					<Typography el="h5">Layer 2: Sub-section</Typography>
					<Typography el="p" classes="text-sm mb-4"
						>15% tint, 16px blur - Used for grouped content</Typography
					>

					<div class="grid grid-cols-3 gap-2">
						<Panel depth={3} interactive size="sm">
							<Typography el="p" classes="text-xs text-center">Layer 3</Typography>
						</Panel>
						<Panel depth={3} interactive size="sm">
							<Typography el="p" classes="text-xs text-center">Layer 3</Typography>
						</Panel>
						<Panel depth={3} interactive size="sm">
							<Typography el="p" classes="text-xs text-center">Layer 3</Typography>
						</Panel>
					</div>
				</Panel>
			</Panel>

			<Panel depth={4} variant="overlay">
				<Typography el="h4">Layer 4: Overlay</Typography>
				<Typography el="p" classes="text-sm"
					>30% tint, 8px blur - Used for modals and dropdowns</Typography
				>
			</Panel>
		</div>

		<Typography el="h3" classes="mt-8 mb-4">Variants</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<Panel variant="glass" interactive>
				<Typography el="h5">Glass (Default)</Typography>
				<Typography el="p" classes="text-sm">Standard glass effect</Typography>
			</Panel>

			<Panel variant="frosted" interactive>
				<Typography el="h5">Frosted</Typography>
				<Typography el="p" classes="text-sm">Frosted glass effect</Typography>
			</Panel>

			<Panel variant="surface" interactive>
				<Typography el="h5">Surface</Typography>
				<Typography el="p" classes="text-sm">Very subtle, almost invisible glass</Typography>
			</Panel>

			<Panel variant="blue" interactive>
				<Typography el="h5">Blue</Typography>
				<Typography el="p" classes="text-sm">Blue themed glass</Typography>
			</Panel>

			<Panel variant="surface" interactive>
				<Typography el="h5">Surface</Typography>
				<Typography el="p" classes="text-sm">Subtle surface glass</Typography>
			</Panel>

			<Panel variant="overlay" interactive>
				<Typography el="h5">Overlay</Typography>
				<Typography el="p" classes="text-sm">High opacity for floating elements</Typography>
			</Panel>
		</div>

		<Typography el="h3" classes="mt-8 mb-4">Sizes</Typography>
		<div class="space-y-4">
			<Panel size="xs">Extra Small (xs) - padding: 0.5rem</Panel>
			<Panel size="sm">Small (sm) - padding: 0.75rem</Panel>
			<Panel size="md">Medium (md) - padding: 1rem</Panel>
			<Panel size="lg">Large (lg) - padding: 1.5rem</Panel>
			<Panel size="xl">Extra Large (xl) - padding: 2rem</Panel>
		</div>

		<Typography el="h3" classes="mt-8 mb-4">Interactive Examples</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Panel depth={2} interactive>
				<Typography el="h5" classes="mb-2">Hover Effects</Typography>
				<Typography el="p" classes="text-sm mb-4">
					Hover to see the refraction effect and subtle scale transform
				</Typography>
				<Button size="sm">Action</Button>
			</Panel>

			<Panel depth={2} variant="green" interactive>
				<Typography el="h5" classes="mb-2">Theme Integration</Typography>
				<Typography el="p" classes="text-sm mb-4">
					Automatically adapts to light/dark theme
				</Typography>
				<Button variant="outlined" size="sm">Toggle Theme</Button>
			</Panel>
		</div>

		<Typography el="h3" classes="mt-8 mb-4">Real-world Example</Typography>
		<Panel depth={1} classes="max-w-2xl">
			<Typography el="h4" classes="mb-4">Dashboard Widget</Typography>

			<div class="grid grid-cols-2 gap-4 mb-4">
				<Panel depth={2} variant="surface">
					<Typography el="h6" classes="text-sm text-gray-600 dark:text-gray-400"
						>Total Users</Typography
					>
					<Typography el="p" classes="text-2xl font-bold">1,234</Typography>
				</Panel>

				<Panel depth={2} variant="surface">
					<Typography el="h6" classes="text-sm text-gray-600 dark:text-gray-400"
						>Active Now</Typography
					>
					<Typography el="p" classes="text-2xl font-bold">89</Typography>
				</Panel>
			</div>

			<Panel depth={2} variant="surface" interactive>
				<Typography el="p" classes="text-center">View Details →</Typography>
			</Panel>
		</Panel>
	</div>

	<!-- API Documentation -->
	<div>
		<Typography el="h2" classes="mb-4">API</Typography>

		<Panel depth={2}>
			<Typography el="h4" classes="mb-4">Props</Typography>

			<div class="space-y-3">
				<div>
					<code class="text-purple-600 dark:text-purple-300">variant</code>
					<Typography el="p" classes="text-sm mt-1">
						'glass' | 'frosted' | 'purple' | 'pink' | 'green' | 'blue' | 'yellow' | 'red' |
						'surface' | 'overlay'
					</Typography>
				</div>

				<div>
					<code class="text-purple-600 dark:text-purple-300">depth</code>
					<Typography el="p" classes="text-sm mt-1">
						1 | 2 | 3 | 4 - Controls the glass blur and opacity based on UI hierarchy
					</Typography>
				</div>

				<div>
					<code class="text-purple-600 dark:text-purple-300">size</code>
					<Typography el="p" classes="text-sm mt-1">
						'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Padding size
					</Typography>
				</div>

				<div>
					<code class="text-purple-600 dark:text-purple-300">interactive</code>
					<Typography el="p" classes="text-sm mt-1">
						boolean - Enables hover effects and cursor pointer
					</Typography>
				</div>

				<div>
					<code class="text-purple-600 dark:text-purple-300">href</code>
					<Typography el="p" classes="text-sm mt-1">
						string - Renders as anchor tag when provided
					</Typography>
				</div>
			</div>
		</Panel>
	</div>
</div>
