<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'dropdown',
		title: 'Dropdown',
		description: 'Dropdown component'
	};
</script>

<script lang="ts">
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Dropdown from './Dropdown.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Toggle from '../Toggle/Toggle.svelte';
	let square = $state(false);
</script>

<svelte:head>
	<title>Dropdown - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<div class="story">
	<Panel variant="offset">
		<Typography el="h3">Customize</Typography>
		<Toggle id="toggle-dropdown" bind:toggled={square}>
			{#snippet on()}
						Square
					{/snippet}
			{#snippet off()}
						Rounded - Default
					{/snippet}
		</Toggle>
	</Panel>
	<Panel variant="offset">
		<Dropdown
			label="Options list"
			type="select"
			{square}
			options={[
				{ label: 'Select', value: '' },
				{ label: 'item 1', value: 'item-1' },
				{ label: 'item 2', value: 'item-2' }
			]}
			selected={{ label: 'Select', value: '' }}
		/>
	</Panel>
	<Panel variant="offset">
		<Dropdown label="custom content" width="w-full" {square}>
			{#snippet content()}
						<div class="p-4" >
					<Typography el="h4">Custom content</Typography>
					<Typography el="p">
						You can add custom content to the dropdown. This is useful for adding a search input or
						other interactive elements.
					</Typography>
				</div>
					{/snippet}
		</Dropdown>
	</Panel>
	<Panel variant="offset">
		<Typography el="h4">Usage</Typography>
		<hr />
		<Typography el="h6">Options list</Typography>
		<Syntax
			code={`<Dropdown
label="Dropdown"
options={[
	{ label: 'Select', value: '' },
	{ label: 'item 1', value: 'item-1' },
	{ label: 'item 2', value: 'item-2' }
]}
selected={{ label: 'Select', value: '' }}
/>`}
		/>

		<Typography el="h6">Custom content</Typography>
		<Syntax
			code={`
<Dropdown label="custom content" width="w-full">
	{#snippet content()}
		<div class="p-4">
			<Typography el="h4">Custom content</Typography>
			<Typography el="p">
				You can add custom content to the dropdown. This is useful for adding a search input or
				other interactive elements.
			</Typography>
		</div>
	{/snippet}
</Dropdown>
		`}
		/>
	</Panel>
</div>
