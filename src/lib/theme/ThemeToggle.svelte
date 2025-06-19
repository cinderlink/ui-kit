<script lang="ts">
	import { theme } from '$lib/theme';
	import { onDestroy } from 'svelte';
	let dark: boolean = theme.darkMode;
	const unsub = theme.subscribe((v: boolean) => (dark = v));
	onDestroy(unsub);

	function onToggle() {
		theme.toggle();
	}
</script>

<button
	type="button"
	class="theme-toggle"
	data-testid="theme-toggle"
	onclick={onToggle}
	aria-label="Toggle theme"
>
	<div class="toggle-container">
		<div class="icon-wrapper" class:dark-mode={dark}>
			{#if dark}
				<div class="i-tabler-sun icon sun-icon"></div>
			{:else}
				<div class="i-tabler-moon icon moon-icon"></div>
			{/if}
		</div>
	</div>
</button>

<style lang="postcss">
	.theme-toggle {
		@apply relative p-1.5 rounded-lg cursor-pointer;
		@apply transition-all duration-300 ease-out;
		/* Use glass system variables */
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border-light);
		box-shadow: var(--glass-shadow);
		width: 2rem;
		height: 2rem;
	}
	
	.theme-toggle:hover {
		transform: translateY(-1px);
		background: var(--glass-bg-surface);
		box-shadow: var(--glass-shadow-hover);
		border-color: rgba(147, 51, 234, 0.3);
	}
	
	.theme-toggle:active {
		transform: scale(0.95);
		transition-duration: 150ms;
	}
	
	.toggle-container {
		@apply relative w-full h-full overflow-hidden;
	}
	
	.icon-wrapper {
		@apply absolute inset-0 flex items-center justify-center;
		@apply transition-all duration-500 ease-out;
		transform: rotate(0deg) scale(1);
	}
	
	.icon-wrapper.dark-mode {
		transform: rotate(180deg) scale(1.1);
	}
	
	.icon {
		@apply w-4 h-4 transition-all duration-500 ease-out;
	}
	
	.sun-icon {
		@apply text-yellow-400;
		filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5));
		animation: sun-glow 2s ease-in-out infinite;
	}
	
	.moon-icon {
		@apply text-purple-600 dark:text-purple-300;
		filter: drop-shadow(0 0 6px rgba(147, 51, 234, 0.3));
		animation: moon-pulse 3s ease-in-out infinite;
	}
	
	@keyframes sun-glow {
		0%, 100% { 
			filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5));
			transform: scale(1);
		}
		50% { 
			filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.8));
			transform: scale(1.05);
		}
	}
	
	@keyframes moon-pulse {
		0%, 100% { 
			filter: drop-shadow(0 0 6px rgba(147, 51, 234, 0.3));
			opacity: 0.9;
		}
		50% { 
			filter: drop-shadow(0 0 10px rgba(147, 51, 234, 0.5));
			opacity: 1;
		}
	}
</style>
