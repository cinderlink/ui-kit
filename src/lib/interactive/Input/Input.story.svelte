<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'input',
		title: 'Input',
		description: 'Input component (text, password, number, email)'
	};
</script>

<script lang="ts">
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Input from './Input.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
</script>

<svelte:head>
	<title>Input - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography el="h1">Input</Typography>

<div class="story">
	<Panel variant="surface">
		<Typography el="h2">Text Input</Typography>
		<Input id="example_text" type="text" label="Text Input" placeholder="Text input" />
		<Typography el="h3">Usage</Typography>
		<Syntax
			language="svelte"
			code={`<Input id="example_text" type="text" placeholder="Text Input" />`}
		/>
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">With Label</Typography>
		<Input id="example_label" type="text" label="Label" placeholder="Text input" />
		<Typography el="h3">Usage</Typography>
		<Syntax
			code={`<Input id="example_label" label="Label" type="text" placeholder="Text Input" />`}
		/>
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">Custom Width</Typography>
		<Input id="example_width" width="w-full" type="text" label="Label" placeholder="Text input" />
		<Typography el="h3">Usage</Typography>
		<Syntax
			code={`<Input id="example_width" width="w-full" label="Label" type="text" placeholder="Text Input" />`}
		/>
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">Prepend & Append</Typography>
		<Input id="example_attach" type="text" label="Label" placeholder="Text input">
			{#snippet prepend()}
				<div class="i-tabler-search"></div>
			{/snippet}
			{#snippet append()}
				<div class="i-tabler-clock"></div>
			{/snippet}
		</Input>
		<Typography el="h3">Usage</Typography>
		<Syntax
			code={`<Input id="example_attach" type="text" label="Label" placeholder="Text input">
  <div class="i-tabler-search" slot="prepend"></div>
  <div class="i-tabler-clock" slot="append"></div>
</Input>`}
		/>
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">Errors</Typography>
		<Input
			id="example_error"
			type="text"
			label="Text Input with Error"
			placeholder="Text input"
			error="An example error message"
		/>
		<Typography el="h3">Usage</Typography>
		<Syntax
			code={`<Input id="example_error" type="text" placeholder="Text input" error="An example error message" />`}
		/>
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">Password Input</Typography>
		<Input id="example_password" type="password" label="Password" placeholder="Password" />
		<Typography el="h3">Usage</Typography>
		<Syntax code={`<Input id="example_password" type="password" placeholder="Password" />`} />
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">E-mail Input</Typography>
		<Input id="example_email" type="email" label="Email Address" placeholder="E-mail" />
		<Typography el="h3">Usage</Typography>
		<Syntax code={`<Input id="example_email" type="email" placeholder="E-mail" />`} />
	</Panel>
	<Panel variant="surface">
		<Typography el="h2">Number Input</Typography>
		<Input id="example_number" type="number" label="Number Input" placeholder="Number" />
		<Typography el="h3">Usage</Typography>
		<Syntax code={`<Input id="example_number" type="number" placeholder="Number" />`} />
	</Panel>
</div>
