<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'content',
		id: 'typography',
		title: 'Typography',
		description: 'Typography elements'
	};
</script>

<script lang="ts">
	import Card from '../Card/Card.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from './Typography.svelte';
</script>

<svelte:head>
	<title>Typography - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Typography</Typography>

<div class="story">
	<Card title="Elements" align="items-start">
		<div class="flex flex-row gap-4">
			<Panel variant="surface">
				<Typography>h1</Typography>
				<Typography el="h2">h3</Typography>
				<Typography el="h3">h4</Typography>
				<Typography el="h4">h5</Typography>
				<Typography el="h5">h5</Typography>
				<Typography el="h6">h6</Typography>
				<Typography el="p">p</Typography>
			</Panel>
			<Panel variant="surface">
				<Syntax
					code={`<Typography>h1</Typography>
<Typography el="h2">h3</Typography>
<Typography el="h3">h4</Typography>
<Typography el="h4">h5</Typography>
<Typography el="h5">h5</Typography>
<Typography el="h6">h6</Typography>
<Typography el="p">p</Typography>`}
				/>
			</Panel>
		</div>
	</Card>
</div>
