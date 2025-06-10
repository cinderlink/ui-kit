<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Dialog as BitsDialog } from 'bits-ui';

	interface Props {
		visible?: boolean;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet; // Represents the main content of the modal
		footer?: import('svelte').Snippet;
		// To match bits-ui Dialog.Content props if needed for more control by consumer
		contentProps?: BitsDialog.ContentProps;
		// To match bits-ui Dialog.Overlay props
		overlayProps?: BitsDialog.OverlayProps;
	}

	let {
		visible = $bindable(false),
		header,
		children,
		footer,
		contentProps = {},
		overlayProps = {}
	}: Props = $props();

	// Create a default onOpenChange for convenience if not provided by contentProps
	const defaultOnOpenChange = (open: boolean) => {
		visible = open;
	};
</script>

<BitsDialog.Root bind:open={visible} onOpenChange={contentProps.onOpenChange ?? defaultOnOpenChange}>
	<BitsDialog.Portal>
		<BitsDialog.Overlay
			class="modal__backdrop"
			{...overlayProps}
			forceMount
		>
			{#snippet child({ props: overlayContentProps, open: isOpen })}
				{#if isOpen}
					<div {...overlayContentProps} transition:fade />
				{/if}
			{/snippet}
		</BitsDialog.Overlay>
		<BitsDialog.Content class="modal__inner_bits_wrapper" {...contentProps}>
			<!-- modal__inner is now applied to the direct child of BitsDialog.Content to allow modal__inner_bits_wrapper to be styled by bits-ui itself if consumer passes classes -->
			<div class="modal__inner">
				{#if header}
					<div class="modal__header">
						{@render header()}
					</div>
				{/if}
				<div class="modal__content">
					{@render children?.()}
				</div>
				{#if footer}
					<div class="modal__footer">
						{@render footer()}
					</div>
				{/if}
			</div>
		</BitsDialog.Content>
	</BitsDialog.Portal>
</BitsDialog.Root>

<style>
	.modal__backdrop {
		@apply fixed inset-0 z-50 flex items-center justify-center;
		@apply bg-black bg-opacity-80;
		@apply backdrop-filter backdrop-blur-sm;
	}
	/* This new wrapper class allows consumers to style BitsDialog.Content directly via contentProps.class if they wish,
	   while our internal structure .modal__inner still applies its layout. */
	:global(.modal__inner_bits_wrapper) {
		@apply p-0 m-0 bg-transparent border-none shadow-none; /* Reset any potential bits-ui default styling on Content */
		/* Ensure it behaves like a simple wrapper for our modal__inner */
		display: contents; /* This might be useful, or flex if needed */
	}

	.modal__inner {
		@apply relative flex flex-col gap-4 w-full h-full items-center justify-center;
		@apply max-w-2xl max-h-2xl m-auto;
		/* text-white was here, but modal__content has text-neutral-900. This implies text color is set by sections. */
	}
	.modal__header {
		@apply flex flex-row items-center justify-between w-full;
		@apply text-white; /* Assuming header text should be white based on old modal__inner */
	}
	.modal__content {
		@apply flex flex-col items-start justify-start w-full;
		@apply px-6 py-4;
		@apply bg-white rounded-lg shadow-md text-neutral-900;
	}
	.modal__footer {
		@apply flex flex-row items-center justify-end w-full;
		@apply text-white; /* Assuming footer text should be white */
	}
</style>
