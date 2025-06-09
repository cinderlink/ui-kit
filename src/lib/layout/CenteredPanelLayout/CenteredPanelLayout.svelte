<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	interface Props {
		brand?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let { brand, children }: Props = $props();
</script>

<div class="w-full sm-(w-7/8) md-(w-50vw) lg-(w-40vw) xl-(w-30vw) max-h-full overflow-auto py-2">
	<Panel size="lg" classes="shadow-xl">
		<div class=" flex flex-col items-center justify-center gap-8">
			<div class="flex w-full justify-end">
				<ThemeToggle />
			</div>
			{#if brand}{@render brand()}{:else}
				<Logo />
			{/if}
			<div class="flex flex-col gap-4 items-center justify-center w-full h-full overflow-hidden">
				{@render children?.()}
			</div>
		</div>
	</Panel>
</div>
