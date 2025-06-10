<script lang="ts">
	import type { FlexAlign, FlexJustify } from '$lib/unocss/types';
	import { createEventDispatcher } from 'svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import type { Option } from '../Dropdown/types';


	interface Props {
		align?: FlexAlign;
		justify?: FlexJustify;
		selected?: Option;
		value?: string | number | boolean;
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
		value = $bindable(''),
		variant = 'default',
		square = false,
		options = [],
		toggle = undefined,
		...rest
	}: Props = $props();

	const dispatch = createEventDispatcher();

	function onSelect(option: Option) {
		selected = option;
		value = option.value;
		toggle?.(false);
		dispatch('selected', option);
	}

	// Sync value with selected when value changes
	$effect(() => {
		if (value && options.length > 0) {
			const option = options.find(opt => opt.value === value);
			if (option && option !== selected) {
				selected = option;
			}
		}
	});
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
