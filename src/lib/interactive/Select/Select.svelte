<script lang="ts">
	import type { FlexAlign, FlexJustify } from '$lib/unocss/types';
	import { createEventDispatcher } from 'svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import type { Option } from '../Dropdown/types';


	interface Props {
		align?: FlexAlign;
		justify?: FlexJustify;
		selected?: Option;
		variant?: 'default' | 'dark' | 'light' | 'pink' | 'green' | 'blue' | 'yellow';
		square?: boolean;
		options?: Option[];
		toggle?: ((value?: boolean) => void) | undefined;
		[key: string]: any
	}

	let {
		align = 'items-start',
		justify = 'justify-start',
		selected = $bindable({ label: 'Select', value: 'select' }),
		variant = 'default',
		square = false,
		options = [],
		toggle = undefined,
		...rest
	}: Props = $props();

	const dispatch = createEventDispatcher();

	function onSelect(option: Option) {
		selected = option;
		toggle?.(false);
		dispatch('selected', option);
	}
</script>

<Dropdown {...rest} {variant} label={selected.label} >
	{#snippet children({ toggle })}
		{#if options.length > 0}
			<ul class="dropdown__list dropdown__list--{variant}" class:dropdown__list--square={square}>
				{#each options as option}
					<li
						class="{align} {justify}"
						onclick={() => onSelect(option)}
						onkeypress={() => onSelect(option)}
						class:active={option.value === selected.value}
					>
						{#if option.icon}
							<div class="list__icon {option.icon}"></div>
						{/if}
						{option.label}
					</li>
				{/each}
			</ul>
		{/if}
	{/snippet}
</Dropdown>
