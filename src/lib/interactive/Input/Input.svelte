<script lang="ts">
	import Emoji from '$lib/content/Emoji/Emoji.svelte';
	import type { Size } from '$lib/theme/types';
	import type { Snippet } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Toggle from '../Toggle/Toggle.svelte';

	interface Props {
		id: string;
		name?: string | undefined;
		label?: string | undefined;
		error?: string | undefined;
		type?: 
			| 'text'
			| 'password'
			| 'number'
			| 'email'
			| 'search'
			| 'textarea'
			| 'file'
			| 'markdown'
			| 'checkbox'
			| 'toggle';
		disabled?: boolean;
		classes?: string;
		inputClasses?: string;
		preview?: boolean;
		previewClasses?: string;
		value?: string | number | undefined;
		toggled?: boolean | undefined;
		files?: FileList | undefined;
		placeholder?: string;
		width?: `w-${string}` | 'w-full';
		variant?: 'default' | 'inverted' | 'custom';
		size?: Size | 'slim';
		readonly?: boolean;
		autocomplete?: 'on' | 'off';
		emoji?: boolean;
		imgRef?: HTMLImageElement | undefined;
		inputRef?: HTMLInputElement | undefined;
		textareaRef?: HTMLTextAreaElement | undefined;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onchange?: (event: Event) => void;
		onkeypress?: (event: KeyboardEvent) => void;
		labelSlot?: Snippet;
		prepend?: Snippet;
		previewSlot?: Snippet;
		buttonSlot?: Snippet<[{ input: HTMLInputElement | undefined }]>;
		buttonText?: Snippet;
		append?: Snippet;
		icon?: string;
		errorSlot?: Snippet;
	}

	let {
		id,
		name = undefined,
		label = undefined,
		error = undefined,
		type = 'text',
		disabled = false,
		classes = '',
		inputClasses = 'justify-between items-center',
		preview = false,
		previewClasses = '',
		value = $bindable(''),
		toggled = $bindable(false),
		files = $bindable(undefined),
		placeholder = '',
		width = 'w-full',
		variant = 'default',
		size = 'md',
		readonly = false,
		autocomplete = 'off',
		emoji = false,
		imgRef = $bindable(undefined),
		inputRef = $bindable(undefined),
		textareaRef = $bindable(undefined),
		onfocus,
		onblur,
		onchange,
		onkeypress,
		labelSlot,
		prepend,
		previewSlot,
		buttonSlot,
		buttonText,
		append,
		icon,
		errorSlot
	}: Props = $props();

	let computedPreviewClasses = $derived(preview ? 'flex-col gap-2 items-center justify-center' : previewClasses);
	let empty = $derived(value === '');
</script>

<div
	class="input__container {width} input--{type} input--{size} input--{variant} {classes}"
	class:input--empty={empty}
	class:input--error={error}
>
	{#if labelSlot || label}
		{#if labelSlot}
			{@render labelSlot()}
		{:else}
			<label for={id}>{label}</label>
		{/if}
	{/if}
	<div class="input__wrapper input__wrapper--{size} {inputClasses} {width}">
		{#if prepend}{@render prepend()}{/if}
		{#if type === 'password'}
			<input
				{readonly}
				{id}
				{name}
				{disabled}
				type="password"
				bind:value
				{placeholder}
				class="input"
			/>
		{:else if type === 'number'}
			<input
				{readonly}
				{id}
				{name}
				{disabled}
				type="number"
				bind:value
				{placeholder}
				class="input"
			/>
		{:else if type === 'email'}
			<input
				{readonly}
				{id}
				{name}
				{disabled}
				type="email"
				bind:value
				{placeholder}
				class="input"
			/>
		{:else if type === 'text' || type === 'search'}
			{#if icon}
				<div class="{icon} text-gray-400 dark:text-gray-500 text-sm"></div>
			{/if}
			<input
				bind:this={inputRef}
				{readonly}
				{id}
				{name}
				{disabled}
				{autocomplete}
				type={type}
				{onfocus}
				{onblur}
				bind:value
				{placeholder}
				class="input"
			/>
			{#if emoji}
				<Emoji
					onselected={(emoji) => {
						value += emoji;
						inputRef?.focus();
					}}
				/>
			{/if}
		{:else if type === 'textarea'}
			<textarea {readonly} {id} {name} {disabled} bind:value {placeholder} class="input"></textarea>
			{#if emoji}
				<Emoji onselected={(emoji) => (value += emoji)} />
			{/if}
		{:else if type === 'file'}
			<input
				bind:this={inputRef}
				{onchange}
				{id}
				{name}
				{disabled}
				type="file"
				bind:value
				bind:files
				{placeholder}
				class="hidden"
			/>
			{#if previewSlot}
				{@render previewSlot()}
			{:else if preview}
				<div class="input__preview {computedPreviewClasses}">
					<img bind:this={imgRef} alt="Upload preview" />
				</div>
			{/if}
			{#if buttonSlot}
				{@render buttonSlot({ input: inputRef })}
			{:else}
				<Button
					type="button"
					rounded="rounded-lg"
					{size}
					onclick={() => {
						if (inputRef) inputRef.click();
					}}
				>
					{#if buttonText}
						{@render buttonText()}
					{:else}
						<div class="i-tabler-upload"></div>
						Upload
					{/if}
				</Button>
			{/if}
		{:else if type === 'markdown'}
			<textarea
				bind:this={textareaRef}
				rows="1"
				{readonly}
				{id}
				{name}
				{disabled}
				bind:value
				{onkeypress}
				{placeholder}
				class="input"
			></textarea>
			{#if emoji}
				<Emoji
					onselected={(emoji) => {
						value += emoji;
						textareaRef?.focus();
					}}
				/>
			{/if}
		{:else if ['checkbox', 'toggle'].includes(type)}
			<div class="w-full">
				<Toggle {id} {disabled} {onchange} bind:toggled />
			</div>
		{/if}
		{#if append}{@render append()}{/if}
	</div>
	{#if errorSlot || error}
		{#if errorSlot}
			{@render errorSlot()}
		{:else}
			<span class="error">{error}</span>
		{/if}
	{/if}
</div>

<style lang="postcss">
	.input__container {
		@apply flex flex-col gap-2 items-start justify-center;
	}
	.input__container label {
		@apply font-sans font-bold text-md text-purple-900 dark-(text-purple-50);
	}
	:global(.surface.input__wrapper) {
		@apply flex gap-2 items-center justify-center p-0;
	}
	.input {
		@apply w-full;
	}
	input.input {
		@apply font-sans font-normal text-md b-none outline-none bg-transparent;
	}
	textarea.input {
		@apply font-sans font-normal text-md b-none outline-none resize-none bg-transparent;
	}
	.input__wrapper {
		@apply rounded-lg flex flex-row gap-2 text-xl w-full;
		/* Glass effect for inputs */
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		-webkit-backdrop-filter: blur(var(--glass-blur-light)) saturate(var(--glass-saturation));
		border: var(--glass-border);
		box-shadow: var(--glass-shadow);
		transition: var(--glass-transition);
	}

	.input__preview {
		@apply relative flex overflow-hidden;
	}
	.input__wrapper--slim {
		@apply px-0 py-0;
	}
	.input__wrapper--xs {
		@apply px-8px py-4px;
	}
	.input__wrapper--sm {
		@apply px-12px py-8px;
	}
	.input__wrapper--md {
		@apply px-16px py-12px;
	}
	.input__wrapper--lg {
		@apply px-20px py-16px;
	}
	.input__wrapper--xl {
		@apply px-24px py-20px;
	}

	.input--default:not(.input--file) .input__wrapper {
		/* Glass with subtle tint */
		background: linear-gradient(
			135deg,
			rgba(147, 51, 234, 0.03) 0%,
			rgba(147, 51, 234, 0.01) 100%
		);
		@apply text-purple-900 dark:text-purple-50;
	}
	.input--inverted:not(.input--file) .input__wrapper {
		/* Darker glass variant */
		background: linear-gradient(
			135deg,
			rgba(147, 51, 234, 0.08) 0%,
			rgba(147, 51, 234, 0.04) 100%
		);
		@apply text-purple-50;
	}

	.input--file .input__wrapper {
		@apply border-none;
	}

	.input__wrapper:focus-within,
	.input__wrapper:hover {
		box-shadow: var(--glass-shadow-hover);
		border-color: rgba(147, 51, 234, 0.3);
	}
	
	/* Dark mode adjustments */
	:global(.dark) .input__wrapper {
		/* Inherit glass variables which adjust for dark mode */
	}
	.error {
		@apply w-full p-2;
		@apply font-sans font-normal text-(base red-600 left);
	}

	/* Size */
	.input__container.input--xs label {
		@apply text-xs;
	}
	.input__container.input--xs .input {
		@apply text-xs;
	}

	.input__container.input--sm label {
		@apply text-sm;
	}
	.input__container.input--sm .input {
		@apply text-sm;
	}

	.input__container.input--md label {
		@apply text-md;
	}
	.input__container.input--md .input {
		@apply text-md;
	}

	.input__container.input--lg label {
		@apply text-lg;
	}
	.input__container.input--lg .input {
		@apply text-lg;
	}

	.input__container.input--xl label {
		@apply text-xl;
	}

	.input__container.input--xl .input {
		@apply text-xl;
	}

	.input__container.input--lg .input__wrapper {
		@apply text-xl px-4 py-3;
	}
</style>