<script lang="ts" module>
  import type { StoryDef } from '$lib/ddl/stories';
  export const story: StoryDef = {
    group: 'interactive',
    id: 'imageupload',
    title: 'Image Upload',
    description: 'Image upload component'
  };
</script>

<script lang="ts">
  import Typography from '$lib/content/Typography/Typography.svelte';
  import ImageUpload from './ImageUpload.svelte';
  import Panel from '$lib/content/Panel/Panel.svelte';
</script>

<svelte:head>
  <title>Image Upload - Interactive Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Image Upload</Typography>

<Panel variant="surface" classes="mt-4">
  <ImageUpload />
</Panel>
