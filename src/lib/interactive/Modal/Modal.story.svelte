<script lang="ts" module>
	import type { StoryDef } from '$lib/ddl/stories';
	export const story: StoryDef = {
		group: 'interactive',
		id: 'modal',
		title: 'Modal',
		description: 'Modal dialog component'
	};
</script>

<script lang="ts">
	import Syntax from '$lib/markup/Syntax/Syntax.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Button from '../Button/Button.svelte';
	import Modal from './Modal.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';

	let open = $state(false);
</script>

<svelte:head>
	<title>Modal - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Modal</Typography>

<div class="story">
	<Panel variant="offset">
		<Typography el="h4">Example</Typography>
		<Button onclick={() => (open = true)}>Open Modal</Button>
		<Modal bind:visible={open}>
			{#snippet header()}
					
					<Typography el="h3">Modal Title</Typography>
					<Button size="sm" variant="outlined" color="rose" onclick={() => (open = false)}
						>Close</Button
					>
				
					{/snippet}

			<Typography el="p">Modal content</Typography>

			{#snippet footer()}
					
					<Typography el="p">Modal footer</Typography>
				
					{/snippet}
		</Modal>

		<Typography el="h4">Usage</Typography>
		<Syntax
			code={`
<script lang="ts">
  let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>
<Modal bind:visible={open}>
  {#snippet header()}
    <Typography el="h3">Modal Title</Typography>
    <Button size="sm" variant="outlined" color="rose" onclick={() => (open = false)}>
      Close
    </Button>
  {/snippet}

  <Typography el="p">Modal content (this becomes the 'children' snippet)</Typography>

  {#snippet footer()}
    <Typography el="p">Modal footer</Typography>
  {/snippet}
</Modal>`}
		/>
	</Panel>
</div>
