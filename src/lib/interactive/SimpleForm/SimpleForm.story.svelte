<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'simpleform', // lowercase id
		title: 'SimpleForm',
		description: 'A simple form demonstrating felte form library usage with Zod validation.'
	};
</script>

<script lang="ts">
	import SimpleForm from './SimpleForm.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
</script>

<svelte:head>
	<title>Simple Form - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<div class="story">
	<Panel variant="offset">
		<Typography el="h4">Felte Form Example</Typography>
		<Typography el="p" class="mb-4">
			This form uses 'felte' for state management and '@felte/validator-zod' for validation.
			Try submitting an empty form, an invalid email, or valid data.
		</Typography>
		<SimpleForm />
	</Panel>

	<Panel variant="offset">
		<Typography el="h4">Usage</Typography>
		<pre>
			<code>
&lt;script lang="ts"&gt;
  import SimpleForm from '$lib/interactive/SimpleForm/SimpleForm.svelte';
&lt;/script&gt;

&lt;SimpleForm /&gt;
			</code>
		</pre>
	</Panel>
</div>

<style>
	.mb-4 {
		margin-bottom: 1rem;
	}
</style>
