<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';

	const colorPalettes = [
		{
			name: 'Purple',
			description: 'Primary brand color used for buttons, links, and accents',
			shades: [
				{ name: '50', value: '#faf5ff', class: 'bg-purple-50' },
				{ name: '100', value: '#f3e8ff', class: 'bg-purple-100' },
				{ name: '200', value: '#e9d5ff', class: 'bg-purple-200' },
				{ name: '300', value: '#d8b4fe', class: 'bg-purple-300' },
				{ name: '400', value: '#c084fc', class: 'bg-purple-400' },
				{ name: '500', value: '#a855f7', class: 'bg-purple-500' },
				{ name: '600', value: '#9333ea', class: 'bg-purple-600' },
				{ name: '700', value: '#7c3aed', class: 'bg-purple-700' },
				{ name: '800', value: '#6b21a8', class: 'bg-purple-800' },
				{ name: '900', value: '#581c87', class: 'bg-purple-900' }
			]
		},
		{
			name: 'Green',
			description: 'Success states, positive actions, and nature themes',
			shades: [
				{ name: '50', value: '#f0fdf4', class: 'bg-green-50' },
				{ name: '100', value: '#dcfce7', class: 'bg-green-100' },
				{ name: '200', value: '#bbf7d0', class: 'bg-green-200' },
				{ name: '300', value: '#86efac', class: 'bg-green-300' },
				{ name: '400', value: '#4ade80', class: 'bg-green-400' },
				{ name: '500', value: '#22c55e', class: 'bg-green-500' },
				{ name: '600', value: '#16a34a', class: 'bg-green-600' },
				{ name: '700', value: '#15803d', class: 'bg-green-700' },
				{ name: '800', value: '#166534', class: 'bg-green-800' },
				{ name: '900', value: '#14532d', class: 'bg-green-900' }
			]
		},
		{
			name: 'Blue',
			description: 'Information, links, and trustworthy elements',
			shades: [
				{ name: '50', value: '#eff6ff', class: 'bg-blue-50' },
				{ name: '100', value: '#dbeafe', class: 'bg-blue-100' },
				{ name: '200', value: '#bfdbfe', class: 'bg-blue-200' },
				{ name: '300', value: '#93c5fd', class: 'bg-blue-300' },
				{ name: '400', value: '#60a5fa', class: 'bg-blue-400' },
				{ name: '500', value: '#3b82f6', class: 'bg-blue-500' },
				{ name: '600', value: '#2563eb', class: 'bg-blue-600' },
				{ name: '700', value: '#1d4ed8', class: 'bg-blue-700' },
				{ name: '800', value: '#1e40af', class: 'bg-blue-800' },
				{ name: '900', value: '#1e3a8a', class: 'bg-blue-900' }
			]
		},
		{
			name: 'Yellow',
			description: 'Warnings, highlights, and attention-grabbing elements',
			shades: [
				{ name: '50', value: '#fefce8', class: 'bg-yellow-50' },
				{ name: '100', value: '#fef3c7', class: 'bg-yellow-100' },
				{ name: '200', value: '#fde68a', class: 'bg-yellow-200' },
				{ name: '300', value: '#fcd34d', class: 'bg-yellow-300' },
				{ name: '400', value: '#fbbf24', class: 'bg-yellow-400' },
				{ name: '500', value: '#f59e0b', class: 'bg-yellow-500' },
				{ name: '600', value: '#d97706', class: 'bg-yellow-600' },
				{ name: '700', value: '#b45309', class: 'bg-yellow-700' },
				{ name: '800', value: '#92400e', class: 'bg-yellow-800' },
				{ name: '900', value: '#78350f', class: 'bg-yellow-900' }
			]
		},
		{
			name: 'Red',
			description: 'Errors, destructive actions, and urgent alerts',
			shades: [
				{ name: '50', value: '#fef2f2', class: 'bg-red-50' },
				{ name: '100', value: '#fee2e2', class: 'bg-red-100' },
				{ name: '200', value: '#fecaca', class: 'bg-red-200' },
				{ name: '300', value: '#fca5a5', class: 'bg-red-300' },
				{ name: '400', value: '#f87171', class: 'bg-red-400' },
				{ name: '500', value: '#ef4444', class: 'bg-red-500' },
				{ name: '600', value: '#dc2626', class: 'bg-red-600' },
				{ name: '700', value: '#b91c1c', class: 'bg-red-700' },
				{ name: '800', value: '#991b1b', class: 'bg-red-800' },
				{ name: '900', value: '#7f1d1d', class: 'bg-red-900' }
			]
		},
		{
			name: 'Gray',
			description: 'Text, borders, backgrounds, and neutral elements',
			shades: [
				{ name: '50', value: '#f9fafb', class: 'bg-gray-50' },
				{ name: '100', value: '#f3f4f6', class: 'bg-gray-100' },
				{ name: '200', value: '#e5e7eb', class: 'bg-gray-200' },
				{ name: '300', value: '#d1d5db', class: 'bg-gray-300' },
				{ name: '400', value: '#9ca3af', class: 'bg-gray-400' },
				{ name: '500', value: '#6b7280', class: 'bg-gray-500' },
				{ name: '600', value: '#4b5563', class: 'bg-gray-600' },
				{ name: '700', value: '#374151', class: 'bg-gray-700' },
				{ name: '800', value: '#1f2937', class: 'bg-gray-800' },
				{ name: '900', value: '#111827', class: 'bg-gray-900' }
			]
		}
	];

	let colorUsage = `<!-- Using color classes in components -->
<Button variant="default">Purple button (primary)</Button>
<Button variant="green">Green button (success)</Button>
<Button variant="red">Red button (danger)</Button>

<!-- Background colors -->
<div class="bg-purple-50 dark:bg-purple-900">
  Light purple background that adapts to theme
</div>

<!-- Text colors -->
<p class="text-gray-900 dark:text-white">
  Readable text in both themes
</p>

<!-- Border colors -->
<div class="border border-purple-200 dark:border-purple-700">
  Themed borders
</div>`;

	let customColors = `// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      // Extend existing colors
      purple: {
        // Override specific shades
        500: '#9333ea', // Custom primary purple
        600: '#7c3aed'
      },
      
      // Add brand colors
      brand: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b'
      },
      
      // Semantic colors
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  }
});`;

	let semanticColors = `<!-- Semantic color usage -->
<div class="bg-green-50 border border-green-200 text-green-800">
  Success message
</div>

<div class="bg-yellow-50 border border-yellow-200 text-yellow-800">
  Warning message  
</div>

<div class="bg-red-50 border border-red-200 text-red-800">
  Error message
</div>

<div class="bg-blue-50 border border-blue-200 text-blue-800">
  Info message
</div>`;
</script>

<Breadcrumb
	sections={[
		{ label: 'themes', path: '/themes' },
		{ label: 'colors', path: '/themes/colors' }
	]}
/>

<div class="max-w-6xl mx-auto space-y-6">
	<Typography el="h1">Color System</Typography>
	<Typography el="p">
		A comprehensive color palette designed for accessibility, readability, and visual harmony across light and dark themes.
	</Typography>

	<!-- Color Palettes -->
	{#each colorPalettes as palette}
		<Card>
			<Typography el="h2" classes="mb-2">{palette.name}</Typography>
			<Typography el="p" classes="mb-4">{palette.description}</Typography>
			
			<div class="grid grid-cols-5 md:grid-cols-10 gap-2">
				{#each palette.shades as shade}
					<div class="text-center">
						<div class="{shade.class} w-full h-12 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"></div>
						<Typography el="caption" classes="block">{shade.name}</Typography>
						<Typography el="caption" classes="block text-xs opacity-75">{shade.value}</Typography>
					</div>
				{/each}
			</div>
		</Card>
	{/each}

	<!-- Usage Examples -->
	<Card>
		<Typography el="h2" classes="mb-3">Usage Examples</Typography>
		<Typography el="p" classes="mb-4">
			How to use colors in your components:
		</Typography>
		<CodeEditor bind:code={colorUsage} language="svelte" readOnly />
	</Card>

	<!-- Semantic Colors -->
	<Card>
		<Typography el="h2" classes="mb-3">Semantic Colors</Typography>
		<Typography el="p" classes="mb-4">
			Use colors to convey meaning and state:
		</Typography>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
			<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-lg">
				<Typography el="h4" classes="text-green-800 dark:text-green-300 mb-1">Success</Typography>
				<Typography el="p" classes="text-green-700 dark:text-green-400">Green for positive outcomes</Typography>
			</div>
			
			<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg">
				<Typography el="h4" classes="text-yellow-800 dark:text-yellow-300 mb-1">Warning</Typography>
				<Typography el="p" classes="text-yellow-700 dark:text-yellow-400">Yellow for caution</Typography>
			</div>
			
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 rounded-lg">
				<Typography el="h4" classes="text-red-800 dark:text-red-300 mb-1">Error</Typography>
				<Typography el="p" classes="text-red-700 dark:text-red-400">Red for errors and dangers</Typography>
			</div>
			
			<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
				<Typography el="h4" classes="text-blue-800 dark:text-blue-300 mb-1">Information</Typography>
				<Typography el="p" classes="text-blue-700 dark:text-blue-400">Blue for neutral information</Typography>
			</div>
		</div>
		
		<CodeEditor bind:code={semanticColors} language="html" readOnly />
	</Card>

	<!-- Dark Mode Adaptation -->
	<Card>
		<Typography el="h2" classes="mb-3">Dark Mode Adaptation</Typography>
		<Typography el="p" classes="mb-4">
			Colors automatically adapt for optimal contrast and readability:
		</Typography>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-3">
				<Typography el="h4">Light Mode</Typography>
				<div class="bg-white border border-gray-200 p-4 rounded-lg">
					<Typography el="p" classes="text-gray-900 mb-2">Dark text on light background</Typography>
					<div class="flex gap-2">
						<div class="bg-purple-500 w-8 h-8 rounded"></div>
						<div class="bg-green-500 w-8 h-8 rounded"></div>
						<div class="bg-blue-500 w-8 h-8 rounded"></div>
					</div>
				</div>
			</div>
			
			<div class="space-y-3">
				<Typography el="h4">Dark Mode</Typography>
				<div class="bg-gray-900 border border-gray-700 p-4 rounded-lg">
					<Typography el="p" classes="text-white mb-2">Light text on dark background</Typography>
					<div class="flex gap-2">
						<div class="bg-purple-400 w-8 h-8 rounded"></div>
						<div class="bg-green-400 w-8 h-8 rounded"></div>
						<div class="bg-blue-400 w-8 h-8 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	</Card>

	<!-- Customization -->
	<Card>
		<Typography el="h2" classes="mb-3">Custom Colors</Typography>
		<Typography el="p" classes="mb-4">
			Extend or override the default color palette:
		</Typography>
		<CodeEditor bind:code={customColors} language="javascript" readOnly />
	</Card>

	<!-- Accessibility -->
	<Card>
		<Typography el="h2" classes="mb-3">Accessibility Guidelines</Typography>
		<div class="space-y-3">
			<div>
				<Typography el="h4" classes="mb-1">Contrast Ratios</Typography>
				<Typography el="p">All color combinations meet WCAG AA standards for contrast (4.5:1 minimum)</Typography>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-1">Color Blindness</Typography>
				<Typography el="p">Colors are chosen to be distinguishable for users with color vision deficiencies</Typography>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-1">Semantic Usage</Typography>
				<Typography el="p">Never rely solely on color to convey information - always provide additional context</Typography>
			</div>
		</div>
	</Card>

	<!-- Next Steps -->
	<Card>
		<Typography el="h2" classes="mb-3">Next Steps</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Customize Your Theme</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/themes/customization" class="text-purple-600 hover:text-purple-800">Theme Customization</a></li>
					<li>• <a href="/themes/overview" class="text-purple-600 hover:text-purple-800">Theming Overview</a></li>
				</ul>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">See In Action</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/components/content" class="text-purple-600 hover:text-purple-800">Component Examples</a></li>
					<li>• <a href="/guides/examples" class="text-purple-600 hover:text-purple-800">Live Examples</a></li>
				</ul>
			</div>
		</div>
	</Card>
</div>