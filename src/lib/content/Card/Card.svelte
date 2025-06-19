<script lang="ts">
	import type { FlexAlign, FlexJustify } from '$lib/unocss/types';
	import type { Snippet } from 'svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import './Card.css';

	interface Props {
		align?: FlexAlign;
		justify?: FlexJustify;
		href?: string | undefined;
		title?: string | undefined;
		variant?: 'default' | 'outlined' | 'secondary';
		color?: 'neutral' | 'purple' | 'green' | 'blue' | 'pink' | 'yellow' | 'red';
		classes?: string;
		class?: string;
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
		variant = 'default',
		color = 'neutral',
		classes = '',
		class: className = '',
		onclick,
		children,
		titleSlot,
		footer,
		...restProps
	}: Props = $props();
	
	// Determine the wrapper element and props
	let wrapperTag = $derived(onclick ? 'button' : 'div');
	let wrapperClass = $derived(`card card--${variant} card--${color} ${classes} ${className} ${href || onclick ? 'card--interactive' : ''}`);
</script>

{#if onclick}
	<button
		class={wrapperClass}
		{onclick}
		{...restProps}
	>
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
	</button>
{:else}
	<div
		class={wrapperClass}
		{...restProps}
	>
		{#if href}
			<a {href} class="card__link">
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
			</a>
		{:else}
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
		{/if}
	</div>
{/if}