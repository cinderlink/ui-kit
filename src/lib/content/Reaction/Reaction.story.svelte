<script lang="ts" context="module">
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'content',
		id: 'reaction',
		title: 'Reaction',
		description: 'Reaction component'
	};
</script>

<script lang="ts">
	import Reaction from '../Reaction/Reaction.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';

	const readReactions = (e: CustomEvent) => {
		console.log(e.detail);
	};
</script>

<svelte:head>
	<title>{story.title} - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>{story.title}</Typography>

<Panel>
	<Reaction id="1" on:reaction={readReactions}>
		<Panel variant="offset">
			<Typography el="p">Panel With reaction</Typography>
		</Panel>
	</Reaction>
</Panel>

<Syntax
	code={`<Reaction id="1" on:reaction={readReactions}>
	<Panel variant="offset">
		<Typography el="p">Panel With reaction</Typography>
	</Panel>
</Reaction>
`}
/>
