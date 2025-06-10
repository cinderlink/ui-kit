<script lang="ts">
	import { theme } from './store.svelte';

	function onToggle() {
		theme.darkMode = !theme.darkMode;
	}
</script>

<button
	type="button"
	class="theme-toggle {theme.darkMode
		? 'i-tabler-sun text-yellow-200'
		: 'i-tabler-moon text-purple-700'}"
	data-testid="theme-toggle"
	onclick={onToggle}
	aria-label="Toggle theme"
></button>

<style>
	.theme-toggle {
		@apply w-25px h-25px cursor-pointer;
		@apply border-none bg-transparent p-0;
	}
</style>
