<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
	import ContrastAdapter from '$lib/theme/ContrastAdapter.svelte';

	const backgrounds = [
		{
			name: 'Very Dark',
			color: '#0a0a0a',
			image: null
		},
		{
			name: 'Dark',
			color: '#1f1f1f',
			image: null
		},
		{
			name: 'Medium Dark',
			color: '#404040',
			image: null
		},
		{
			name: 'Medium',
			color: '#808080',
			image: null
		},
		{
			name: 'Light',
			color: '#d0d0d0',
			image: null
		},
		{
			name: 'Very Light',
			color: '#f5f5f5',
			image: null
		},
		{
			name: 'Dark Image',
			color: null,
			image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=300&fit=crop'
		},
		{
			name: 'Light Image',
			color: null,
			image: 'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?w=400&h=300&fit=crop'
		}
	];
</script>

<svelte:head>
	<title>Contrast Adaptation - Themes - @cinderlink/ui-kit</title>
</svelte:head>

<Typography el="h1" classes="mb-8">Contrast Adaptation</Typography>

<Panel variant="glass" depth={2} classes="mb-8">
	<Typography el="p" classes="mb-4">
		The UI Kit includes an intelligent contrast adaptation system that automatically adjusts glass
		effects based on the background luminance. This ensures optimal readability and visual appeal
		across different backgrounds.
	</Typography>

	<Typography el="h2" classes="mb-4">How It Works</Typography>
	<Typography el="p" classes="mb-4">
		The <code>ContrastAdapter</code> component analyzes the background color or image and adjusts:
	</Typography>
	<ul class="list-disc list-inside space-y-2 mb-6">
		<li>Glass opacity and blur intensity</li>
		<li>Border and shadow visibility</li>
		<li>Text color for optimal contrast</li>
		<li>Highlight intensity</li>
	</ul>
</Panel>

<Panel variant="frosted" depth={3} classes="mb-8">
	<Typography el="h2" classes="mb-6">Automatic Contrast Examples</Typography>

	<div class="grid gap-6 md:grid-cols-2">
		{#each backgrounds as bg}
			<div class="relative rounded-xl overflow-hidden h-64">
				<!-- Background -->
				{#if bg.color}
					<div class="absolute inset-0" style="background-color: {bg.color}"></div>
				{:else if bg.image}
					<div
						class="absolute inset-0 bg-cover bg-center"
						style="background-image: url('{bg.image}')"
					></div>
				{/if}

				<!-- Contrast-adapted content -->
				<ContrastAdapter
					backgroundColor={bg.color || undefined}
					backgroundImage={bg.image || undefined}
					classes="absolute inset-0 p-6 flex flex-col justify-center items-center"
				>
					<Panel variant="glass" depth={3} classes="w-full max-w-sm">
						<Typography el="h3" classes="mb-3">{bg.name} Background</Typography>
						<Typography el="p" classes="mb-4 text-sm">
							Glass effects automatically adapt to ensure readability
						</Typography>
						<div class="flex gap-2">
							<Button size="sm">Action</Button>
							<Button size="sm" variant="purple">Purple</Button>
							<Button size="sm" variant="outlined">Outlined</Button>
						</div>
					</Panel>
				</ContrastAdapter>
			</div>
		{/each}
	</div>
</Panel>

<Panel variant="glass" depth={2} classes="mb-8">
	<Typography el="h2" classes="mb-4">Usage</Typography>

	<Typography el="h3" classes="mb-3">With Background Color</Typography>
	<pre class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 overflow-x-auto"><code
			>{`<ContrastAdapter backgroundColor="#1a1a1a">
  <Panel variant="glass">
    Content automatically adapts to dark background
  </Panel>
</ContrastAdapter>`}</code
		></pre>

	<Typography el="h3" classes="mb-3">With Background Image</Typography>
	<pre class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 overflow-x-auto"><code
			>{`<ContrastAdapter backgroundImage="/path/to/image.jpg">
  <Panel variant="glass">
    Analyzes average image color for adaptation
  </Panel>
</ContrastAdapter>`}</code
		></pre>

	<Typography el="h3" classes="mb-3">Auto-Detection</Typography>
	<pre class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 overflow-x-auto"><code
			>{`<ContrastAdapter autoDetect>
  <Panel variant="glass">
    Detects parent element's background color
  </Panel>
</ContrastAdapter>`}</code
		></pre>
</Panel>

<Panel variant="surface" depth={1}>
	<Typography el="h2" classes="mb-4">Programmatic Usage</Typography>

	<Typography el="p" classes="mb-4">
		You can also use the contrast utilities directly in your code:
	</Typography>

	<pre class="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-x-auto"><code
			>{`import { 
  getLuminance, 
  getGlassRecommendations,
  generateContrastVariables 
} from '@cinderlink/ui-kit';

// Calculate luminance
const luminance = getLuminance(255, 128, 0); // Orange

// Get recommendations
const recommendations = getGlassRecommendations(luminance);
// { variant: 'glass', opacityMultiplier: 0.8, ... }

// Generate CSS variables
const cssVars = generateContrastVariables(luminance);
// { '--glass-bg-opacity': '0.08', ... }`}</code
		></pre>
</Panel>
