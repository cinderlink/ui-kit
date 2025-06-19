<script lang="ts">
	import { fade } from 'svelte/transition';
	import Panel from '$lib/content/Panel/Panel.svelte';

	interface Props {
		visible?: boolean;
		header?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}

	let {
		visible = $bindable(false),
		header,
		children,
		footer
	}: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			visible = false;
		}
	}

	function handleEscape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			visible = false;
		}
	}
</script>

{#if visible}
	<div 
		class="modal__backdrop" 
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={handleEscape}
	>
		<Panel 
			variant="overlay" 
			depth={4}
			classes="modal__content"
			rounded="rounded-2xl"
		>
			{#if header}
				<div class="modal__header">
					{@render header()}
				</div>
			{/if}
			<div class="modal__body">
				{@render children?.()}
			</div>
			{#if footer}
				<div class="modal__footer">
					{@render footer()}
				</div>
			{/if}
		</Panel>
	</div>
{/if}

<style lang="postcss">
	.modal__backdrop {
		@apply fixed inset-0 z-50 flex items-center justify-center;
		@apply bg-black/60;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}
	
	:global(.modal__content) {
		@apply relative w-full max-w-2xl max-h-[90vh];
		@apply mx-4 overflow-hidden;
		@apply flex flex-col;
	}
	
	.modal__header {
		@apply flex items-center justify-between;
		@apply pb-4 border-b border-gray-200 dark:border-gray-700;
		@apply text-lg font-semibold;
	}
	
	.modal__body {
		@apply flex-1 overflow-y-auto;
		@apply py-4;
		@apply max-h-[60vh];
	}
	
	.modal__footer {
		@apply flex items-center justify-end gap-3;
		@apply pt-4 border-t border-gray-200 dark:border-gray-700;
	}

	/* Ensure scrollbar styling matches glass theme */
	.modal__body {
		scrollbar-width: thin;
		scrollbar-color: rgba(147, 51, 234, 0.3) transparent;
	}
	
	.modal__body::-webkit-scrollbar {
		width: 6px;
	}
	
	.modal__body::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 3px;
	}
	
	.modal__body::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, 
			rgba(147, 51, 234, 0.3), 
			rgba(168, 85, 247, 0.2)
		);
		border-radius: 3px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>