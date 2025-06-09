<script lang="ts">
	import Button from '$lib/interactive/Button/Button.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="sidebar">
	<div class="sidebar__content">
		{@render children?.()}
	</div>
	<div class="sidebar__toggle">
		<Button>
			<div class="i-tabler-menu"></div>
		</Button>
	</div>
</aside>
