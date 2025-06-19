<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	import Typography from '$lib/content/Typography/Typography.svelte';
	export const story: StoryDef = {
		group: 'markup',
		id: 'markdown',
		title: 'Markdown',
		description: 'Markdown component'
	};
</script>

<script lang="ts">
	import Emoji from '$lib/content/Emoji/Emoji.svelte';
	import Markdown from '$lib/markup/Markdown/Markdown.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import List from '$lib/interactive/List/List.svelte';
	import ListItem from '$lib/interactive/List/ListItem.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
	import Input from '$lib/interactive/Input/Input.svelte';

	let value = $state('');
	let list: string[] = $state([]);

	function handSubmit(renderedMarkdown: string) {
		list = [...list, renderedMarkdown];
		value = '';
	}
</script>

<svelte:head>
	<title>{story.title} - Content Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>{story.title}</Typography>
<div class="story h-full">
	<Markdown bind:value>
		{#snippet children({ renderedMarkdown })}
			<Panel>
				<List>
					{#each list as item}
						<ListItem variant="square" classes="flex-col items-start justify-start">
							{@html item}
						</ListItem>
					{/each}
				</List>
			</Panel>
			<div class="h-full">
				<form
					class="h-full flex items-end"
					onsubmit={(e: SubmitEvent) => {
						e.preventDefault();
						handSubmit(renderedMarkdown);
					}}
				>
					<Input id="markdown-input" type="markdown" bind:value />
					<Emoji onselected={(emoji) => (value += emoji)} />
					<Button type="submit">Submit</Button>
				</form>
			</div>
		{/snippet}
	</Markdown>
</div>
