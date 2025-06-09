<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	import Panel from '$lib/content/Panel/Panel.svelte';
	export const story: StoryDef = {
		group: 'content',
		id: 'syntax',
		title: 'Syntax',
		description: 'Syntax highlighting component'
	};
</script>

<script lang="ts">
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
</script>

<svelte:head>
	<title>Syntax - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Syntax</Typography>

<div class="story">
	<Panel>
		<Typography el="h3">Example</Typography>
		<Syntax language="svelte" code={`<Card title="[title]">[slotted content]</Card>`} />
		<Typography el="h4">Usage</Typography>
		<Syntax
			code={`<Syntax
	language="svelte"
	code={\`
		<Card title="[title]">[slotted content]</Card>
		\`}
			let:renderedMarkdown
		>
	{@html renderedMarkdown}
</Syntax>
		`}
		/>
	</Panel>
</div>
