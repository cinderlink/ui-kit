<script lang="ts">
	import type { FlexAlign, FlexJustify } from '$lib/unocss/types';
	import type { Snippet } from 'svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import './Card.css';

	interface Props {
		align?: FlexAlign;
		justify?: FlexJustify;
		href?: string | undefined;
		title?: string | undefined;
		classes?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
		titleSlot?: Snippet;
		footer?: Snippet;
		[key: string]: any;
	}

	let { 
		align = 'items-center',
		justify = 'justify-center',
		href = undefined,
		title = undefined,
		classes = '',
		onclick,
		children,
		titleSlot,
		footer,
		...restProps
	}: Props = $props();
</script>

<Panel {href} {onclick} {...restProps} classes="card group {classes}">
	{#if title || titleSlot}
		<div class="card__title">
			{#if titleSlot}
				{@render titleSlot()}
			{:else}
				<Typography el="h3">
					{title}
				</Typography>
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="card__content {align} {justify}">
			{@render children()}
		</div>
	{/if}
	{#if footer}
		<div class="card__footer">
			{@render footer()}
		</div>
	{/if}
</Panel>
