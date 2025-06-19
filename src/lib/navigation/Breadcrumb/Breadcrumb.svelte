<script lang="ts">
	interface Props {
		sections?: { label: string; path: string }[];
		currentPath?: string;
		children?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
	}

	let { sections = [], currentPath, children, actions }: Props = $props();
</script>

<div class="breadcrumb">
	<div class="breadcrumb__nav">
		<a href="/" aria-label="Home">
			<div class="i-tabler-home text-purple-600 dark:text-purple-200"></div>
		</a>
		{#if children}{@render children()}{:else}
			{#each sections as section}
				{@const active = currentPath === section.path}
				<div class="breadcrumb__separator">/</div>
				<a href={section.path} class="breadcrumb__link" class:breadcrumb__link--active={active}
					>{section.label}</a
				>
			{/each}
		{/if}
	</div>
	{#if actions}
		<div class="breadcrumb__actions">
			{@render actions()}
		</div>
	{/if}
</div>

<style lang="postcss">
	.breadcrumb {
		@apply flex flex-row items-center justify-between gap-2 text-sm mb-8 mt-2 px-4 py-3 rounded-2xl;
		/* Glass breadcrumb */
		background: var(--glass-bg-surface);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border-light);
		box-shadow: var(--glass-shadow);
		transition: var(--glass-transition);
	}
	
	.breadcrumb__nav {
		@apply flex flex-row items-center gap-2;
	}
	
	.breadcrumb__actions {
		@apply flex items-center gap-2;
	}
	
	.breadcrumb:hover {
		box-shadow: var(--glass-shadow-hover);
		border-color: rgba(147, 51, 234, 0.2);
	}
	
	.breadcrumb__separator {
		@apply text-purple-600/60 dark:text-purple-300/60 mx-1;
	}
	
	.breadcrumb__link {
		@apply text-purple-600 dark:text-purple-200 font-medium;
		@apply px-2 py-1 rounded-lg transition-all duration-200 ease-out;
		@apply hover:bg-purple-100/50 dark:hover:bg-purple-800/30;
	}
	
	.breadcrumb__link--active {
		@apply text-purple-800 dark:text-purple-100 font-semibold;
		@apply bg-purple-100/70 dark:bg-purple-800/50;
		@apply border border-purple-200/50 dark:border-purple-600/30;
	}
</style>
