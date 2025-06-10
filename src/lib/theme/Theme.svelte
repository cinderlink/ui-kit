<script lang="ts">

	import './Theme.css';
	import { theme, initTheme } from './store.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Initialize theme persistence
	initTheme();

	$effect(() => {
		if (theme.darkMode && typeof document !== 'undefined') {
			document?.body.classList.add('dark');
		} else if (typeof document !== 'undefined') {
			document?.body.classList.remove('dark');
		}
	});
</script>

<div id="theme">
	{@render children?.()}
</div>
