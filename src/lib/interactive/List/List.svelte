<script lang="ts">
	interface Props {
		flex?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { flex = 'flex flex-col gap-2', children, ...rest }: Props = $props();
</script>

<div class="list {flex}" {...rest}>
	{@render children?.()}
</div>

<style lang="postcss">
	.list {
		@apply list-style-none m-0 p-0;
	}
</style>
