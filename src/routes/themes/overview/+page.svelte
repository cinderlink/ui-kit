<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import { theme } from '$lib/theme';

	let themeUsage = `<` + `script lang="ts">
  import { Theme, ThemeToggle } from '@cinderlink/ui-kit';
<` + `/script>

<!-- Wrap your app with Theme provider -->
<Theme>
  <header>
    <h1>My App</h1>
    <ThemeToggle />
  </header>
  
  <main>
    <!-- Your content automatically adapts to theme -->
  </main>
</Theme>`;

	let customTheme = `// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      // Custom purple scale
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87'
      },
      // Custom green scale
      green: {
        50: '#f0fdf4',
        500: '#22c55e',
        900: '#14532d'
      },
      // And more colors...
    }
  }
});`;

	let darkModeCSS = `/* Automatic dark mode classes */
.bg-white { background-color: white; }
.dark\\:bg-gray-900 { background-color: rgb(17 24 39); }

.text-gray-900 { color: rgb(17 24 39); }
.dark\\:text-white { color: white; }

/* UnoCSS variant groups for cleaner syntax */
.bg-white.dark\\:bg-gray-900 {
  background-color: white;
}
html.dark .bg-white.dark\\:bg-gray-900 {
  background-color: rgb(17 24 39);
}`;
</script>

<Breadcrumb
	sections={[
		{ label: 'themes', path: '/themes' },
		{ label: 'overview', path: '/themes/overview' }
	]}
/>

<div class="max-w-4xl mx-auto space-y-6">
	<Typography el="h1">Theming Overview</Typography>
	<Typography el="p">
		@cinderlink/ui-kit provides a comprehensive theming system built on UnoCSS with automatic dark mode support.
	</Typography>

	<!-- Theme Demo -->
	<Card>
		<div class="flex justify-between items-center mb-4">
			<Typography el="h2">Live Theme Demo</Typography>
			<ThemeToggle />
		</div>
		<Typography el="p" classes="mb-4">
			Toggle the theme above to see how all components adapt automatically:
		</Typography>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-3">
				<Button variant="glass">Primary Button</Button>
				<Button variant="outlined">Outlined Button</Button>
				<Button variant="frosted">Frosted Button</Button>
			</div>
			
			<div class="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg transition-colors">
				<Typography el="h4" classes="mb-2">Theme-aware Container</Typography>
				<Typography el="p">
					Current mode: <strong>{theme.darkMode ? 'Dark' : 'Light'}</strong>
				</Typography>
			</div>
		</div>
	</Card>

	<!-- How It Works -->
	<Card>
		<Typography el="h2" classes="mb-3">How It Works</Typography>
		<div class="space-y-4">
			<div>
				<Typography el="h4" classes="mb-2">1. Theme Provider</Typography>
				<Typography el="p" classes="mb-3">
					The Theme component manages the global theme state and applies the appropriate CSS classes:
				</Typography>
				<CodeEditor bind:code={themeUsage} language="svelte" readOnly />
			</div>
			
			<div>
				<Typography el="h4" classes="mb-2">2. CSS Class Strategy</Typography>
				<Typography el="p" classes="mb-3">
					Uses the "class" strategy to toggle dark mode via a CSS class on the document:
				</Typography>
				<ul class="space-y-1 text-sm ml-4">
					<li>• Light mode: No class applied</li>
					<li>• Dark mode: `.dark` class on `&lt;html&gt;`</li>
					<li>• All components use `dark:` prefixed classes</li>
				</ul>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-2">3. UnoCSS Integration</Typography>
				<Typography el="p">
					Built with UnoCSS's atomic CSS approach and variant groups for clean, maintainable styles.
				</Typography>
			</div>
		</div>
	</Card>

	<!-- Color System -->
	<Card>
		<Typography el="h2" classes="mb-3">Color System</Typography>
		<Typography el="p" classes="mb-4">
			The UI kit uses a carefully crafted color palette optimized for accessibility:
		</Typography>
		
		<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Purple</Typography>
				<div class="space-y-1">
					<div class="w-full h-8 bg-purple-100 rounded"></div>
					<div class="w-full h-8 bg-purple-500 rounded"></div>
					<div class="w-full h-8 bg-purple-900 rounded"></div>
				</div>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">Green</Typography>
				<div class="space-y-1">
					<div class="w-full h-8 bg-green-100 rounded"></div>
					<div class="w-full h-8 bg-green-500 rounded"></div>
					<div class="w-full h-8 bg-green-900 rounded"></div>
				</div>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">Blue</Typography>
				<div class="space-y-1">
					<div class="w-full h-8 bg-blue-100 rounded"></div>
					<div class="w-full h-8 bg-blue-500 rounded"></div>
					<div class="w-full h-8 bg-blue-900 rounded"></div>
				</div>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">Yellow</Typography>
				<div class="space-y-1">
					<div class="w-full h-8 bg-yellow-100 rounded"></div>
					<div class="w-full h-8 bg-yellow-500 rounded"></div>
					<div class="w-full h-8 bg-yellow-900 rounded"></div>
				</div>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">Gray</Typography>
				<div class="space-y-1">
					<div class="w-full h-8 bg-gray-100 rounded"></div>
					<div class="w-full h-8 bg-gray-500 rounded"></div>
					<div class="w-full h-8 bg-gray-900 rounded"></div>
				</div>
			</div>
		</div>
	</Card>

	<!-- Customization -->
	<Card>
		<Typography el="h2" classes="mb-3">Customization</Typography>
		<Typography el="p" classes="mb-4">
			Extend or override the default theme by configuring UnoCSS:
		</Typography>
		<CodeEditor bind:code={customTheme} language="javascript" readOnly />
	</Card>

	<!-- Technical Details -->
	<Card>
		<Typography el="h2" classes="mb-3">Technical Implementation</Typography>
		<div class="space-y-4">
			<div>
				<Typography el="h4" classes="mb-2">Dark Mode Classes</Typography>
				<Typography el="p" classes="mb-3">
					UnoCSS generates conditional classes based on the presence of `.dark`:
				</Typography>
				<CodeEditor bind:code={darkModeCSS} language="css" readOnly />
			</div>
			
			<div>
				<Typography el="h4" classes="mb-2">State Management</Typography>
				<Typography el="p">
					Theme state is managed using Svelte 5 runes with automatic persistence to sessionStorage.
				</Typography>
			</div>
		</div>
	</Card>

	<!-- Next Steps -->
	<Card>
		<Typography el="h2" classes="mb-3">Next Steps</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Learn More</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/themes/colors" class="text-purple-600 hover:text-purple-800">Color System</a></li>
					<li>• <a href="/themes/customization" class="text-purple-600 hover:text-purple-800">Custom Themes</a></li>
				</ul>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">See Examples</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/guides/examples" class="text-purple-600 hover:text-purple-800">Live Examples</a></li>
					<li>• <a href="/components/content" class="text-purple-600 hover:text-purple-800">Component Gallery</a></li>
				</ul>
			</div>
		</div>
	</Card>
</div>