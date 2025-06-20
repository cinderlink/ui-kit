<script lang="ts">
	import { createEventDispatcher, type Snippet } from 'svelte';
	import Avatar from '$lib/content/Avatar/Avatar.svelte';
	import Input from '../Input/Input.svelte';
	import type { Size } from '$lib/theme/types';

	interface Props {
		label?: string;
		buffer?: ArrayBuffer | undefined;
		image?: string | undefined;
		inputRef?: HTMLInputElement | undefined;
		selected?: boolean;
		size?: Size;
		previewSnippet?: Snippet<[{ image: string | undefined }]>;
	}

	let {
		label = '',
		buffer = $bindable(undefined),
		image = $bindable(''),
		inputRef = $bindable(undefined),
		selected = $bindable(false),
		size = 'md',
		previewSnippet
	}: Props = $props();
	const dispatch = createEventDispatcher();

	async function updateImagePreview() {
		const files = inputRef?.files;
		if (!files || !files.length) return;
		buffer = await new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve(e.target?.result as ArrayBuffer);
			};
			reader.readAsArrayBuffer(files[0]);
		});
		image = await new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve(e.target?.result as string);
			};
			reader.readAsDataURL(files[0]);
		});
		selected = true;
		dispatch('change', { buffer, image, selected, files });
	}

	const preview_render = $derived(previewSnippet);
</script>

<Input
	{size}
	id="avatar"
	{label}
	placeholder="Avatar"
	type="file"
	inputClasses="justify-center items-center relative"
	bind:inputRef
	onchange={updateImagePreview}
>
	{#snippet previewSlot()}
		{#if preview_render}{@render preview_render({ image })}{:else}
			<Avatar image={image || undefined} {size} classes="bg-gray-400 dark-bg-blue-100" />
		{/if}
	{/snippet}
	{#snippet buttonSlot()}
		<div
			class="input--file__button input--file__button--{size}"
			role="button"
			tabindex="0"
			onclick={() => {
				if (inputRef) inputRef.click();
			}}
			onkeypress={() => {
				if (inputRef) inputRef.click();
			}}
		>
			<div class="input--file__text">
				{#if selected}
					Change
				{:else}
					Upload
				{/if}
			</div>
			<div class="input--file__icon">
				<div class="i-tabler-pencil"></div>
			</div>
		</div>
	{/snippet}
</Input>

<style lang="postcss">
	.input--file__button {
		@apply absolute flex justify-start items-end cursor-pointer;
		@apply bg-transparent hover-bg-purple-900/70  w-15 h-15 rounded-full;
	}
	.input--file__text {
		@apply absolute justify-center items-center;
		@apply rounded-full text-xs font-bold text-purple-50;
		@apply w-full h-full;
		@apply hidden;
	}
	.input--file__button:hover .input--file__text {
		@apply flex;
	}
	.input--file__icon {
		@apply flex justify-center items-center;
		@apply bg-purple-50 text-purple-700 dark-bg-purple-700 dark-text-purple-50;
		@apply border-1px border-purple-700/20 dark-border-purple-50/30;
		@apply w-28px h-28px rounded-full;
		@apply text-base;
	}

	.input--file__button--sm {
		@apply w-12 h-12;
	}
	.input--file__button--md {
		@apply w-16 h-16;
	}
	.input--file__button--lg {
		@apply w-20 h-20;
	}
	.input--file__button--xl {
		@apply w-24 h-24;
	}
</style>
