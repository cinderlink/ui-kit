<script lang="ts">
	import { theme } from '$lib/theme';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
</script>

<div class="p-8 flex flex-col gap-4">
	<Typography el="h1">Dark Mode Test</Typography>
	
	<Panel variant="glass" classes="p-4">
		<Typography el="p">Current mode: {theme.darkMode ? 'Dark' : 'Light'}</Typography>
		<Typography el="p">Background should be: {theme.darkMode ? '#0a0a0f' : '#fafbfc'}</Typography>
	</Panel>
	
	<Panel variant="frosted" classes="p-4">
		<Typography el="p">This is a frosted glass panel</Typography>
	</Panel>
	
	<Panel variant="surface" classes="p-4">
		<Typography el="p">This is a surface glass panel</Typography>
	</Panel>
	
	<div class="flex gap-2">
		<Button variant="glass">Glass Button</Button>
		<Button variant="purple">Purple Button</Button>
		<Button variant="ghost">Ghost Button</Button>
	</div>
	
	<Button onclick={() => theme.toggle()}>
		Toggle Dark Mode
	</Button>
</div>

<style lang="postcss">
	/* Debug styles */
	:global(html) {
		background: red !important; /* Should not be visible */
	}
	
	:global(body) {
		background: orange !important; /* Should not be visible */
	}
	
	:global(.dark body) {
		background: green !important; /* Should not be visible in proper dark mode */
	}
</style>