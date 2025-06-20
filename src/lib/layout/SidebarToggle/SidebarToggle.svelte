<script lang="ts">
	import { sidebarStore } from '../SidebarLayout/store.svelte';

	interface Props {
		classes?: string;
		mobileOnly?: boolean;
	}

	let { classes = '', mobileOnly = false }: Props = $props();
</script>

<button
	class="sidebar-toggle {classes}"
	class:lg:hidden={mobileOnly}
	onclick={() => sidebarStore.toggle()}
	aria-label={sidebarStore.isOpen ? 'Close sidebar' : 'Open sidebar'}
	title={sidebarStore.isOpen ? 'Close sidebar' : 'Open sidebar'}
>
	<span class="hamburger" class:hamburger--active={sidebarStore.isOpen}>
		<span class="hamburger__line"></span>
		<span class="hamburger__line"></span>
		<span class="hamburger__line"></span>
	</span>
</button>

<style lang="postcss">
	.sidebar-toggle {
		@apply relative z-50;
		@apply w-10 h-10 p-0;
		@apply flex items-center justify-center;
		@apply rounded-lg transition-all duration-300;
		@apply cursor-pointer;

		/* Glass morphism button */
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
	}

	.sidebar-toggle:hover {
		@apply border-purple-300/30 dark:border-purple-500/30;
		transform: scale(1.05);
		box-shadow: var(--glass-shadow-hover);
		background:
			linear-gradient(to bottom right, rgba(147, 51, 234, 0.05), rgba(147, 51, 234, 0.02)),
			var(--glass-bg);
	}

	.sidebar-toggle:active {
		transform: scale(0.95);
	}

	/* Hamburger icon */
	.hamburger {
		@apply relative w-5 h-4 flex flex-col justify-between;
	}

	.hamburger__line {
		@apply block w-full h-0.5 rounded-full;
		@apply bg-gray-700 dark:bg-gray-200;
		@apply transition-all duration-300 ease-out;
		transform-origin: center;
	}

	/* Animated hamburger to X */
	.hamburger--active .hamburger__line:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger--active .hamburger__line:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.hamburger--active .hamburger__line:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}
</style>
