<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'button',
		title: 'Button',
		description: 'Button component'
	};
</script>

<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Button from './Button.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
</script>

<svelte:head>
	<title>Button - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Button</Typography>

<div class="mb-8 p-4 rounded-xl bg-blue-100/20 dark:bg-blue-900/20 border border-blue-500/30">
	<Typography el="p" classes="text-blue-800 dark:text-blue-200">
		✨ <strong>Enhanced Glassmorphism:</strong> Our buttons feature refined glass effects with improved
		depth, clarity, and light refraction. Subtle enhancements that make the glass effect more convincing
		without distracting animations.
	</Typography>
</div>

<!-- Glass Demo on Photo Background -->
<div class="story mb-12 relative rounded-2xl overflow-hidden">
	<div
		class="absolute inset-0 z-0"
		style="background-image: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&h=800&fit=crop'); background-size: cover; background-position: center;"
	></div>
	<div class="relative z-10 p-8">
		<Panel variant="frosted" depth={3} classes="mb-6">
			<Typography el="h2" classes="mb-4">Glass Effects on Photo Background</Typography>
			<Typography el="p" classes="mb-6">
				See how our glass components beautifully blur and refract the background image
			</Typography>
		</Panel>

		<div class="flex flex-wrap gap-4">
			<Button variant="glass">Glass Button</Button>
			<Button variant="frosted">Frosted Button</Button>
			<Button variant="purple">Purple Tint</Button>
			<Button variant="outlined">Outlined Glass</Button>
		</div>
	</div>
</div>

<!-- Glass Variants -->
<div class="story mb-12">
	<Panel variant="glass" depth={2}>
		<Typography el="h2" classes="mb-6">Glass Variants</Typography>

		<div class="showcase sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Glass (Default)</Typography>
				<Button>Pure Glass</Button>
				<Typography el="p" classes="text-sm mt-2 opacity-70">Clear with enhanced blur</Typography>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Frosted</Typography>
				<Button variant="frosted">Frosted Glass</Button>
				<Typography el="p" classes="text-sm mt-2 opacity-70">Softer, more opaque</Typography>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Outlined</Typography>
				<Button variant="outlined">Outlined</Button>
				<Typography el="p" classes="text-sm mt-2 opacity-70">Subtle glass border</Typography>
			</div>
		</div>

		<Typography el="h3" classes="mb-4">Ghost Variant</Typography>
		<div class="flex gap-4 items-center mb-8">
			<Button variant="ghost">Ghost Button</Button>
			<Typography el="span" classes="text-sm opacity-70">Minimal glass effect on hover</Typography>
		</div>
	</Panel>
</div>

<!-- Color Variants -->
<div class="story mb-12">
	<Panel variant="glass" depth={3}>
		<Typography el="h2" classes="mb-6">Color Variants</Typography>

		<Typography el="h3" classes="mb-4">Tinted Glass</Typography>
		<div class="showcase sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Purple</Typography>
				<Button variant="purple">Purple</Button>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Pink</Typography>
				<Button variant="pink">Pink</Button>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Green</Typography>
				<Button variant="green">Green</Button>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Blue</Typography>
				<Button variant="blue">Blue</Button>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Yellow</Typography>
				<Button variant="yellow">Yellow</Button>
			</div>
			<div class="text-center">
				<Typography el="h4" classes="mb-2">Red</Typography>
				<Button variant="red">Red</Button>
			</div>
		</div>

		<div class="p-4 rounded-xl bg-purple-100/20 dark:bg-purple-900/20 border border-purple-500/30">
			<Typography el="p" classes="text-purple-800 dark:text-purple-200 text-sm">
				<strong>Glass Tints:</strong> Each color variant maintains the glass effect with a subtle tint.
				Colors adapt beautifully to both light and dark modes with appropriate contrast.
			</Typography>
		</div>
	</Panel>
</div>

<!-- Sizes -->
<div class="story mb-12">
	<Panel variant="frosted" depth={2}>
		<Typography el="h2" classes="mb-6">Sizes</Typography>

		<div class="flex items-center gap-4 flex-wrap mb-8">
			<Button size="xs">XS Button</Button>
			<Button size="sm">SM Button</Button>
			<Button size="md">MD Button</Button>
			<Button size="lg">LG Button</Button>
			<Button size="xl">XL Button</Button>
			<Button size="slim">Slim Button</Button>
		</div>

		<Typography el="h3" classes="mb-4">Size Comparison</Typography>
		<div class="space-y-3">
			<div class="flex items-center gap-4">
				<Button size="xs" variant="purple">Extra Small</Button>
				<Typography el="span" classes="text-sm opacity-70"
					>Perfect for compact UI elements</Typography
				>
			</div>
			<div class="flex items-center gap-4">
				<Button size="md" variant="green">Medium (Default)</Button>
				<Typography el="span" classes="text-sm opacity-70"
					>Standard size for most use cases</Typography
				>
			</div>
			<div class="flex items-center gap-4">
				<Button size="xl" variant="blue">Extra Large</Button>
				<Typography el="span" classes="text-sm opacity-70">Great for primary CTAs</Typography>
			</div>
		</div>
	</Panel>
</div>

<!-- Interactive States -->
<div class="story mb-12">
	<Panel variant="glass" depth={1}>
		<Typography el="h2" classes="mb-6">Interactive States</Typography>

		<Typography el="h3" classes="mb-4">Click and Hover</Typography>
		<div class="flex gap-4 items-center flex-wrap mb-8">
			<Button onclick={() => alert('Clicked!')}>Click Me</Button>
			<Button variant="purple" onclick={() => alert('Purple clicked!')}>Purple Action</Button>
			<Button variant="frosted" onclick={() => alert('Frosted clicked!')}>Frosted Click</Button>
		</div>

		<Typography el="h3" classes="mb-4">Disabled State</Typography>
		<div class="flex gap-4 items-center flex-wrap mb-8">
			<Button disabled>Disabled Glass</Button>
			<Button variant="purple" disabled>Disabled Purple</Button>
			<Button variant="outlined" disabled>Disabled Outlined</Button>
		</div>

		<Typography el="h3" classes="mb-4">Link Buttons</Typography>
		<div class="flex gap-4 items-center flex-wrap">
			<Button href="#">Glass Link</Button>
			<Button href="#" variant="purple">Purple Link</Button>
			<Button href="#" link>Text Link Style</Button>
		</div>

		<div
			class="mt-8 p-4 rounded-xl bg-green-100/20 dark:bg-green-900/20 border border-green-500/30"
		>
			<Typography el="p" classes="text-green-800 dark:text-green-200 text-sm">
				<strong>Interaction Effects:</strong> Hover to see the subtle light refraction sweep across the
				button. Click for a gentle compression effect. All animations respect user preferences for reduced
				motion.
			</Typography>
		</div>
	</Panel>
</div>

<style lang="postcss">
	.showcase {
		@apply grid gap-2 rounded-lg py-4 px-6;
	}
</style>
