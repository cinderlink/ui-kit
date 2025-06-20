<script lang="ts">
	import type { Size } from '$lib/theme/types';
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		size?: Size;
		toggled?: boolean;
		disabled?: boolean;
		onchange?: (event: Event) => void;
		label?: Snippet;
		on?: Snippet;
		off?: Snippet;
	}

	let {
		id,
		size = $bindable('md'),
		toggled = $bindable(false),
		disabled = false,
		onchange,
		label,
		on,
		off
	}: Props = $props();

	$effect(() => {
		if (disabled) {
			toggled = false;
		}
	});
</script>

<div class="toggle__container">
	{#if label}
		{@render label()}
	{/if}
	<label class="toggle toggle--{size}" class:toggle--disabled={disabled} for="toggle__input--{id}">
		<input
			id="toggle__input--{id}"
			type="checkbox"
			class="toggle__input"
			{disabled}
			{onchange}
			bind:checked={toggled}
		/>
		<div class="toggle__slider-container">
			<div class="toggle__slider" class:toggle__slider--toggled={toggled}></div>
			<div class="toggle__text toggle__text-on" class:toggle__text--visible={toggled}>
				{#if on}
					{@render on()}
				{:else}
					<span class="text-xs">On</span>
				{/if}
			</div>
			<div class="toggle__text toggle__text-off" class:toggle__text--visible={!toggled}>
				{#if off}
					{@render off()}
				{:else}
					<span class="text-xs">Off</span>
				{/if}
			</div>
		</div>
	</label>
</div>

<style lang="postcss">
	.toggle__container {
		@apply flex flex-col gap-2 overflow-hidden;
	}
	.toggle {
		@apply flex w-full items-center justify-between rounded-full cursor-pointer my-2;
	}

	.toggle__input {
		@apply hidden absolute opacity-0 pointer-events-none;
	}

	.toggle__text {
		@apply absolute inset-y-0 flex items-center justify-center;
		@apply transition-opacity duration-300 z-10;
	}

	.toggle__text--visible {
		@apply opacity-100;
	}

	.toggle__text:not(.toggle__text--visible) {
		@apply opacity-0;
	}

	.toggle__text-on {
		@apply left-2 text-white font-semibold;
	}

	.toggle__text-off {
		@apply right-2 text-gray-600 dark-(text-gray-400) font-semibold;
	}

	.toggle__slider-container {
		@apply w-full h-10 rounded-full box-content flex items-center justify-between relative;
		@apply bg-gray-200 dark-(bg-gray-700) px-3 py-1 text-sm;
		@apply transition-all duration-300 ease-in-out shadow-inner;
	}

	.toggle__slider {
		@apply w-8 h-8 rounded-full absolute;
		@apply transition-all duration-300 ease-in-out;
		@apply bg-white shadow-lg border border-gray-300;
		@apply transform translate-x-0 left-1;
	}

	.toggle__slider--toggled {
		@apply transform translate-x-16 bg-white;
	}

	.toggle__input:checked + .toggle__slider-container {
		@apply bg-purple-500 dark-(bg-purple-600);
	}

	.toggle__input:checked + .toggle__slider-container .toggle__text-off {
		@apply text-purple-200;
	}

	.toggle--disabled {
		@apply cursor-not-allowed;
	}
	.toggle--disabled .toggle__slider-container {
		@apply bg-neutral-500;
	}
</style>
