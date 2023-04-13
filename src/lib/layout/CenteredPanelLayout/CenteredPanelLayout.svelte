<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
</script>

<div class="w-full sm-(w-7/8) md-(w-50vw) lg-(w-40vw) xl-(w-30vw) max-h-full overflow-auto py-2">
	<Panel size="lg" classes="shadow-xl">
		<div class=" flex flex-col items-center justify-center gap-8">
			<div class="flex w-full justify-end">
				<ThemeToggle />
			</div>
			<slot name="brand">
				<Logo />
			</slot>
			<div class="flex flex-col gap-4 items-center justify-center w-full h-full overflow-hidden">
				<slot />
			</div>
		</div>
	</Panel>
</div>
