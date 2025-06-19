<script lang="ts">
	import { page } from '$app/state';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import { getStoryById } from '$lib/ddl/stories';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	const story = getStoryById(page.params.groupId, page.params.storyId);
</script>

<div class="page-content">
	<Breadcrumb
		sections={[
			{ label: 'components', path: '/components' },
			{ label: page.params.groupId, path: `/components/${page.params.groupId}` },
			{
				label: page.params.storyId,
				path: `/components/${page.params.groupId}/${page.params.storyId}`
			}
		]}
	>
		{#snippet actions()}
			<ThemeToggle />
		{/snippet}
	</Breadcrumb>

	{#if story}
		<div class="glass-story-panel">
			<story.default />
		</div>
	{:else}
		<div class="error-panel">
			<Typography el="h2" class="text-red-900 dark:text-red-100 mb-4 font-semibold"
				>404 - Component Story Not Found</Typography
			>
			<p class="text-red-800 dark:text-red-200">
				Component story not found: <strong>{page.params.groupId}/{page.params.storyId}</strong>
			</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	.page-content {
		@apply w-full px-8 py-8 pb-16 space-y-8 min-h-screen;
		/* Inherit background from layout - transparent for glass effect */
		background: transparent;
	}

	.glass-story-panel {
		@apply p-8 rounded-3xl backdrop-blur-xl;
		/* Use CSS variables for theme switching */
		background: var(--glass-bg);
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
		min-height: 400px;
	}

	.error-panel {
		@apply p-8 rounded-2xl backdrop-blur-lg;
		@apply border border-red-200/50 dark:border-red-500/30;
		background: linear-gradient(
			135deg,
			rgba(254, 226, 226, 0.6),
			rgba(254, 226, 226, 0.3),
			rgba(239, 68, 68, 0.05)
		);
		backdrop-filter: blur(16px);
		box-shadow:
			0 4px 16px rgba(239, 68, 68, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	:global(.dark) .error-panel {
		background: linear-gradient(
			135deg,
			rgba(127, 29, 29, 0.3),
			rgba(127, 29, 29, 0.2),
			rgba(239, 68, 68, 0.1)
		);
		box-shadow:
			0 4px 16px rgba(239, 68, 68, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}
</style>
