<script lang="ts" module>
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
	import type { Reaction as ReactionType } from '../Reaction/types';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	let reactions: ReactionType[] = $state([]);
	const reactionAdd = (data: { reaction: ReactionType; id: string }) => {
		const { reaction } = data;
		const exist = reactions.find((r) => r.emoji === reaction.emoji);
		if (exist) {
			exist.count++;
			reactions = reactions.map((r) => (r.emoji === exist.emoji ? exist : r));
			return;
		}
		reactions = [...reactions, { ...reaction, count: 1 }];
	};

	const reactionClick = (data: { reaction: ReactionType; id: string }) => {
		const { reaction } = data;
		const exist = reactions.find((r) => r.emoji === reaction.emoji && r.count > 1);
		if (exist) {
			exist.count--;
			reactions = reactions.map((r) => (r.emoji === exist.emoji ? exist : r));
			return;
		}
		reactions = reactions.filter((r) => r.emoji !== reaction.emoji);
	};
</script>

<svelte:head>
	<title>{story.title} - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>{story.title}</Typography>

<Panel>
	<Reaction id="1" {reactions} onreactionadd={reactionAdd} onreactionclick={reactionClick}>
		<Panel variant="surface">
			<Typography el="p">Panel With reaction</Typography>
		</Panel>
	</Reaction>
</Panel>

<Syntax
	code={`<Reaction id="1" on:reaction={readReactions}>
	<Panel variant="surface">
		<Typography el="p">Panel With reaction</Typography>
	</Panel>
</Reaction>
`}
/>
