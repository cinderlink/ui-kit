<script lang="ts">
	import { page } from '$app/stores';
	import groups, { getGroupById } from '$lib/ddl/groups';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import { getStoriesByGroupId } from '$lib/ddl/stories';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	let group: { default: any } | undefined = $derived(getGroupById($page.params.groupId));
</script>

<div class="w-full px-8 py-8 pb-16 space-y-8">
	<Breadcrumb
		sections={[
			{ label: 'components', path: '/components' },
			{ label: $page.params.groupId, path: `/components/${$page.params.groupId}` }
		]}
	/>

	{#if group}
		{@const stories = getStoriesByGroupId($page.params.groupId)}
		<div class="glass-content-panel">
			<group.default />
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
			{#each stories as { story }}
				<Card
					href="/components/{story.group}/{story.id}"
					title={story.title}
					align="items-start"
					class="transition-all duration-300 hover:shadow-lg hover:scale-102"
				>
					<Typography el="p" class="text-sm text-gray-800 dark:text-gray-200 leading-relaxed"
						>{story.description}</Typography
					>
				</Card>
			{/each}
		</div>
	{:else}
		<div class="error-panel">
			<Typography el="h2" class="text-red-900 dark:text-red-100 mb-4 font-semibold"
				>404 - Component Group Not Found</Typography
			>
			<p class="text-red-800 dark:text-red-200 mb-6">
				Component group not found: <strong>{$page.params.groupId}</strong>
			</p>
			<p class="text-red-800 dark:text-red-200 mb-4">Available component groups:</p>
			<ul class="space-y-2">
				{#each Object.values(groups) as { group }}
					<li><a href="/components/{group.id}" class="glass-link">{group.id}</a></li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style lang="postcss">
	.glass-content-panel {
		@apply p-6 rounded-2xl border border-white/25 backdrop-blur-lg;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.08),
			rgba(147, 51, 234, 0.02)
		);
		backdrop-filter: blur(16px);
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.05),
			inset 0 1px 0 rgba(255, 255, 255, 0.25);
	}

	.error-panel {
		@apply p-8 rounded-2xl border border-red-200/50 backdrop-blur-lg;
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

	.glass-link {
		@apply text-purple-600 dark:text-purple-400 font-medium;
		@apply px-3 py-2 rounded-lg transition-all duration-200 ease-out;
		@apply hover:bg-purple-100/50 dark:hover:bg-purple-800/30;
		@apply hover:text-purple-800 dark:hover:text-purple-200;
		text-decoration: none;
		background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.05));
		border: 1px solid rgba(147, 51, 234, 0.2);
		display: inline-block;
	}

	.glass-link:hover {
		background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.1));
		border-color: rgba(147, 51, 234, 0.4);
		transform: translateY(-1px);
	}
</style>
