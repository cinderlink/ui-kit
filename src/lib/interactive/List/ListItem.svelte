<script lang="ts">
	import Panel from '$lib/content/Panel/Panel.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { FadeParams } from 'svelte/transition';
	interface Props {
		data?: Record<string, any> | undefined;
		href?: string | undefined;
		el?: any;
		interactive?: boolean;
		style?: string;
		transition?: FadeParams & { enable?: boolean } | undefined;
		classes?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		data = undefined,
		href = undefined,
		el = href ? 'a' : 'div',
		interactive = el !== 'div',
		style = 'flex flex-row gap-2 items-center justify-between w-full whitespace-nowrap',
		transition = undefined,
		classes = '',
		children,
		...rest
	}: Props = $props();

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', data);
	}
</script>

<Panel
	this={el}
	{...href ? { href } : {}}
	{interactive}
	{transition}
	on:click={handleClick}
	on:keypress={handleClick}
	{...rest}
>
	<div class="{style} {classes}">
		{@render children?.()}
	</div>
</Panel>
