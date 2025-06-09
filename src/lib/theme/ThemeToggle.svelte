<script lang="ts">
	import { theme } from './store';

	function onToggle() {
		$theme.darkMode = !$theme.darkMode;
	}
</script>

<div
	class="theme-toggle {$theme.darkMode
		? 'i-tabler-sun text-yellow-200'
		: 'i-tabler-moon text-purple-700'}"
	data-testid="theme-toggle"
	onclick={onToggle}
	onkeypress={onToggle}
></div>

<style>
	.theme-toggle {
		@apply w-25px h-25px cursor-pointer;
	}
</style>
