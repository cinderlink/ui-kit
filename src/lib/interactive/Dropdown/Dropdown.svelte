<script lang="ts">
	import type { Option } from './types';
	import type { TypographyElement } from '$lib/content/Typography/types';
	import { clickoutside } from '$lib/actions';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Typography from '$lib/content/Typography/Typography.svelte';
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
	function onToggle(val: boolean) {
		toggled = val;
		dispatch('toggled', toggled);
	}

	function onKeyPress(event: KeyboardEvent) {
		if (!toggled && event.key === 'Enter') {
			onToggle(true);
		} else if (event.key === 'Escape') {
			onToggle(false);
		}
		dispatch('keydown', event);
	}
</script>

<div {id} class="dropdown {width}">
	{#if label && type === 'select'}
		<Typography {el}>{label}</Typography>
	{/if}
	<div
		use:clickoutside
		onclickoutside={() => {
			onToggle(false);
		}}
		class="dropdown__container dropdown--{size} {width} {classes}"
	>
		<div
			class="dropdown__select dropdown__select--{variant}"
			class:dropdown__select--square={square}
			data-testid="dropdown-trigger"
			role="button"
			tabindex="0"
			aria-haspopup="listbox"
			aria-expanded={toggled}
			onclick={() => onToggle(!toggled)}
			onkeypress={onKeyPress}
		>
			{#if button}{@render button({ toggle: onToggle, })}{:else}
				<div class="dropdown__selected">{type === 'select' ? selected.label : label}</div>
				<div class="dropdown__icon {icon}" class:dropdown__icon--rotate={toggled}></div>
			{/if}
		</div>
		{#if toggled}
			<div
				transition:slide={{ duration: 200 }}
				class="dropdown__menu dropdown__menu--{align} {size}"
			>
				{@render children?.({ toggle: onToggle, })}
			</div>
		{/if}
	</div>
</div>
