<script lang="ts">
	import type { Option } from './types';
	import type { TypographyElement } from '$lib/content/Typography/types';
	// import { clickoutside } from '$lib/actions'; // Will be replaced by bits-ui functionality
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Typography from '$lib/content/Typography/Typography.svelte';
	import { DropdownMenu as BitsDropdownMenu } from 'bits-ui';
	import './Dropdown.css';
	import type { Size } from '$lib/theme/types';

	const elSizes = {
		xs: 'p',
		sm: 'h6',
		md: 'h4',
		lg: 'h3',
		xl: 'h2',
		'2xl': 'h1'
	};
	interface Props {
		id?: string;
		label?: string | undefined;
		type?: 'select' | 'dropdown';
		square?: boolean;
		variant?: 'default' | 'dark' | 'light' | 'pink' | 'green' | 'blue' | 'yellow';
		align?: 'left' | 'right';
		size?: Size;
		width?: `w-${string}`;
		toggled?: boolean;
		icon?: string | false;
		classes?: string;
		selected?: Option;
		el?: any;
		options?: Option[];
		content?: import('svelte').Snippet;
		button?: import('svelte').Snippet<[any]>;
		children?: import('svelte').Snippet<[any]>;
	}

	let {
		id = 'dropdown',
		label = undefined,
		type = 'dropdown',
		square = false,
		variant = 'default',
		align = 'left',
		size = 'md',
		width = 'w-auto',
		toggled = $bindable(false),
		icon = 'i-tabler-chevron-down',
		classes = '',
		selected = { label: 'Select', value: 'select' },
		el = (elSizes[size as keyof typeof elSizes] as TypographyElement) || 'p',
		options = [],
		content,
		button,
		children
	}: Props = $props();

	const dispatch = createEventDispatcher();

	// onToggle will be handled by bind:open with BitsDropdownMenu.Root
	// function onToggle(val: boolean) {
	// 	toggled = val;
	// 	dispatch('toggled', toggled);
	// }

	// Keypress handling will be largely managed by bits-ui
	// function onKeyPress(event: KeyboardEvent) {
	// 	if (!toggled && event.key === 'Enter') {
	// 		onToggle(true);
	// 	} else if (event.key === 'Escape') {
	// 		onToggle(false);
	// 	}
	// 	dispatch('keydown', event);
	// }

	function handleOpenChange(open: boolean) {
		toggled = open;
		dispatch('toggled', toggled);
	}
</script>

<BitsDropdownMenu.Root {id} bind:open={toggled} onOpenChange={handleOpenChange}>
	{#if label && type === 'select'}
		<Typography {el}>{label}</Typography>
	{/if}
	<BitsDropdownMenu.Trigger
		class="dropdown__select dropdown__select--{variant} {width} {classes} dropdown--{size}"
		class:dropdown__select--square={square}
		aria-label={label || 'Open dropdown'}
	>
		{#if button}{@render button({ toggle: (val: boolean) => (toggled = val) })}
		{:else}
			<div class="dropdown__selected">{type === 'select' ? selected.label : label}</div>
			{#if icon}
				<div class="dropdown__icon {icon}" class:dropdown__icon--rotate={toggled}></div>
			{/if}
		{/if}
	</BitsDropdownMenu.Trigger>
	<BitsDropdownMenu.Portal>
		<BitsDropdownMenu.Content
			class="dropdown__menu dropdown__menu--{align} dropdown__menu--{variant} {size} {width}"
			class:dropdown__menu--square={square}
			sideOffset={5}
			forceMount
		>
			{#snippet child({ wrapperProps, props: contentProps, open: isOpen })}
				{#if isOpen}
					<div {...wrapperProps}>
						<div {...contentProps} transition:slide={{ duration: 200 }}>
							{#if content}
								{@render content({ toggle: (val: boolean) => (toggled = val) })}
							{:else if type === 'select' && options && options.length > 0}
								{#each options as option (option.value)}
									<BitsDropdownMenu.Item
										class="dropdown-item"
										class:active={selected?.value === option.value}
										on:click={() => {
											selected = option;
											toggled = false;
											dispatch('selected', selected);
										}}
									>
										{option.label}
										{#if option.icon}
											<span class="list__icon {option.icon}"></span>
										{/if}
									</BitsDropdownMenu.Item>
								{/each}
							{/if}
						</div>
					</div>
				{/if}
			{/snippet}
		</BitsDropdownMenu.Content>
	</BitsDropdownMenu.Portal>
</BitsDropdownMenu.Root>
