<script lang="ts">
	import './Theme.css';
	import { theme } from '$lib/theme';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// Initialize theme reactive effects in component scope
	theme.init();
</script>

<div id="theme">
	{@render children?.()}
</div>
