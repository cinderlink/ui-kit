<script lang="ts" module>
	import Typography from '$lib/content/Typography/Typography.svelte';
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'list',
		title: 'List',
		description: 'List component'
	};
</script>

<script lang="ts">
	import Avatar from '$lib/content/Avatar/Avatar.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import List from './List.svelte';
	import ListItem from './ListItem.svelte';
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
</script>

<svelte:head>
	<title>List - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<div class="story">
	<Panel variant="surface">
		<Typography>Users List</Typography>
		<List>
			<ListItem
				data={{ id: 1, name: 'user A' }}
				onclick={(e: CustomEvent) => console.log(e.detail)}
			>
				<div class="mr-2">
					<Avatar image="https://loremflickr.com/640/360" size="sm" status="online" />
				</div>
				{#snippet body()}
					<Typography el="p">User A</Typography>
					<span class="text-xs text-green">online</span>
				{/snippet}
			</ListItem>
			<ListItem>
				<div class="mr-2">
					<Avatar image="https://loremflickr.com/640/360" size="sm" status="offline" />
				</div>
				{#snippet body()}
					<Typography el="p">User B</Typography>
					<span class="text-xs">offline</span>
				{/snippet}
			</ListItem>
		</List>
	</Panel>

	<Panel variant="surface">
		<Typography>Items List</Typography>
		<List>
			<ListItem>
				{#snippet icon()}
					<div class="i-tabler-user mr-2"></div>
				{/snippet}
				{#snippet body()}
					<Typography el="h5">Items 1</Typography>
				{/snippet}
			</ListItem>
			<ListItem>
				{#snippet icon()}
					<div class="i-tabler-user mr-2"></div>
				{/snippet}
				{#snippet body()}
					<Typography el="h5">Item 2</Typography>
				{/snippet}
			</ListItem>
		</List>
	</Panel>

	<Panel variant="surface">
		<Typography el="h4">Usage</Typography>
		<hr />
		<Typography el="h6">Users List</Typography>
		<Syntax
			code={`<List>
	<ListItem>
		<div class="mr-2">
			<Avatar image="https://loremflickr.com/640/360" size="sm" status="online" />
		</div>
		<svelte:fragment slot="body">
			<Typography el="p">User A</Typography>
			<span class="text-xs">online</span>
		</svelte:fragment>
	</ListItem>
	<ListItem>
		<div class="mr-2">
			<Avatar image="https://loremflickr.com/640/360" size="sm" status="offline" />
		</div>
		<svelte:fragment slot="body">
			<Typography el="p">User B</Typography>
			<span class="text-xs">offline</span>
		</svelte:fragment>
	</ListItem>
	</List>`}
		/>
		<hr />
		<Typography el="h6">Items List</Typography>
		<Syntax
			code={`<List>
	<ListItem>
		<svelte:fragment slot="icon">
			<div class="i-tabler-user mr-2" />
		</svelte:fragment>
		<svelte:fragment slot="body">
			<Typography el="h5">Items 1</Typography>
		</svelte:fragment>
	</ListItem>
	<ListItem>
		<svelte:fragment slot="icon">
			<div class="i-tabler-user mr-2" />
		</svelte:fragment>
		<svelte:fragment slot="body">
			<Typography el="h5">Item 2</Typography>
		</svelte:fragment>
	</ListItem>
	</List>`}
		/>
	</Panel>
</div>
