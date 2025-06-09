<script lang="ts">
	import emojiList from '../../emoji';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import { onMount } from 'svelte';
	import type MarkdownIt from 'markdown-it';
	import Input from '$lib/interactive/Input/Input.svelte';

	interface Props {
		onselected?: (emoji: string) => void;
	}

	let { onselected }: Props = $props();

	let md: MarkdownIt = $state();
	let searchValue = $state('');
	onMount(async () => {
		const { default: markdown } = await import('markdown-it');
		const { default: emoji } = await import('markdown-it-emoji');

		md = markdown();
		md.use(emoji);

		md.renderer.rules.emoji = function (token, idx) {
			return token[idx].content;
		};
	});
	function onClick(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		const emoji = target.innerText;
		onselected?.(emoji);
	}

	let filtered = $derived(Object.keys(emojiList).filter((key) => {
		return key.includes(searchValue);
	}));
</script>

{#if md}
	<div>
		<Panel el="div" classes="emojis">
			<Input
				id="emoji-search"
				type="text"
				placeholder="search"
				size="sm"
				bind:value={searchValue}
			/>
			<div class="list__container">
				{#each filtered as key}
					<span class="emoji emoji__{key}" onclick={onClick} onkeypress={onClick}>
						{@html md.render(`:${key}:`)}
					</span>
				{/each}
			</div>
		</Panel>
	</div>
{/if}

<style>
	.emoji {
		@apply text-3xl px-2 py-1 cursor-pointer;
	}
	.emoji:hover {
		@apply bg-purple-100/50 dark-bg-purple-800;
		@apply scale-110;
	}

	.list__container {
		@apply flex flex-row flex-wrap justify-between items-start content-start;
		@apply overflow-y-auto w-300px h-400px;
	}
</style>
