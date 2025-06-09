<script lang="ts">
	import type { Size } from '$lib/unocss';
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
		size = 'md',
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
			<div class="toggle__text toggle__text-on" class:toggle__text--visible={toggled}>
				{#if on}
					{@render on()}
				{:else}
					On
				{/if}
			</div>
			<div class="flex-1 flex items-center justify-center transition-all duration-200">
				<div class="toggle__slider" class:toggle__slider--toggled={toggled} />
			</div>
			<div class="toggle__text toggle__text-off" class:toggle__text--visible={!toggled}>
				{#if off}
					{@render off()}
				{:else}
					Off
				{/if}
			</div>
		</div>
	</label>
</div>

<style>
	.toggle__container {
		@apply flex flex-col gap-2 overflow-hidden;
	}
	.toggle {
		@apply flex w-full items-center justify-between rounded-full cursor-pointer my-2;
	}

	.toggle__input {
		@apply display-none;
	}

	.toggle__text {
		@apply hidden;
	}

	.toggle__text--visible {
		@apply flex w-full items-center justify-center overflow-hidden;
	}

	.toggle__text-on {
		@apply text-purple-50 dark-(text-purple-50);
	}

	.toggle__text-off {
		@apply text-purple-900 dark-(text-purple-900);
	}

	.toggle__slider-container {
		@apply w-full h-full rounded-full box-content flex items-center justify-between;
		@apply bg-purple-100 dark-(bg-purple-50) px-2 py-1 text-xl;
	}

	.toggle__slider {
		@apply w-24px h-24px rounded-full;
		@apply transition-all duration-200 ease-in-out;
		@apply bg-purple-50 dark-(bg-purple-50);
	}
	.toggle__slider:not(.toggle__slider--toggled) {
		@apply bg-purple-50 dark-(bg-purple-100);
	}

	.toggle__input:checked + .toggle__slider-container {
		@apply bg-purple-500 dark-(bg-purple-300);
	}

	.toggle--disabled {
		@apply cursor-not-allowed;
	}
	.toggle--disabled .toggle__slider-container {
		@apply bg-neutral-500;
	}
</style>
