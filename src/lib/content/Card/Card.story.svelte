<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'content',
		id: 'card',
		title: 'Card',
		description: 'Card component'
	};
</script>

<script lang="ts">
	import Card from '../Card/Card.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
</script>

<svelte:head>
	<title>{story.title} - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>{story.title}</Typography>
<p>{story.description}</p>

<div class="story">
	<Panel variant="surface">
		<Typography el="h3">Default Card</Typography>
		<Card title="Example Card"
			>This is the card content. It can contain any HTML or Svelte components.</Card
		>
		<Typography el="h4">Usage</Typography>
		<Syntax code={`<Card title="Example Card">Card content goes here</Card>`} />
	</Panel>
	<Panel variant="surface">
		<Typography el="h3">Outlined Card</Typography>
		<Card title="Outlined Style" variant="outlined" color="neutral"
			>This card has an outlined variant with neutral colors.</Card
		>
		<Typography el="h4">Usage</Typography>
		<Syntax code={`<Card title="Outlined Style" variant="outlined">Content</Card>`} />
	</Panel>
	<Panel variant="surface">
		<Typography el="h3">Secondary Card</Typography>
		<Card title="Secondary Style" variant="secondary"
			>This card uses the secondary variant styling.</Card
		>
		<Typography el="h4">Usage</Typography>
		<Syntax code={`<Card title="Secondary Style" variant="secondary">Content</Card>`} />
	</Panel>
	<Panel variant="surface">
		<Typography el="h3">Content Alignment</Typography>
		<Card title="Left Aligned" align="items-start"
			>This card content is aligned to the start (left) instead of center.</Card
		>
		<Typography el="h4">Usage</Typography>
		<Syntax code={`<Card title="Left Aligned" align="items-start">Content</Card>`} />
	</Panel>
</div>
