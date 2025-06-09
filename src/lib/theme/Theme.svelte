<script lang="ts">

	import '@unocss/reset/tailwind.css';
	import './Theme.css';
	import theme from './store';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	$effect(() => {
		if ($theme.darkMode && typeof document !== 'undefined') {
			document?.body.classList.add('dark');
		} else if (typeof document !== 'undefined') {
			document?.body.classList.remove('dark');
		}
	});
</script>

<div id="theme">
	{@render children?.()}
</div>
