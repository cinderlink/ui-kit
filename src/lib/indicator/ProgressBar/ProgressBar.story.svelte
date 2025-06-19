<script lang="ts" module>
  import type { StoryDef } from '$lib/ddl/stories';
  export const story: StoryDef = {
    group: 'indicator',
    id: 'progressbar',
    title: 'Progress Bar',
    description: 'Progress bar component'
  };
</script>

<script lang="ts">
  import Typography from '$lib/content/Typography/Typography.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import Panel from '$lib/content/Panel/Panel.svelte';

  let progress = 40;
  const inc = () => {
    progress = progress >= 100 ? 0 : progress + 10;
  };
</script>

<svelte:head>
  <title>Progress Bar - Indicator Components - @cinderlink/ui-kit</title>
</svelte:head>

<Typography>Progress Bar</Typography>

<Panel variant="surface" classes="space-y-4 mt-4">
  <ProgressBar bind:progress={progress} />
  <button class="btn" onclick={inc}>Increase</button>
</Panel>

<style lang="postcss">
  .btn {
    @apply px-3 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition;
  }
</style>
