<script lang="ts">
	import emojiList from '../../emoji';
	import Panel from '$lib/content/Panel/Panel.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type MarkdownIt from 'markdown-it';

	let md: MarkdownIt;
	const dispatch = createEventDispatcher();
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
		dispatch('selected', emoji);
	}
</script>

{#if md}
	<div>
		<Panel el="div" classes="emojis">
			{#each Object.keys(emojiList) as key}
				<span class="emoji emoji__{key}" on:click={onClick} on:keypress={onClick}>
					{@html md.render(`:${key}:`)}
				</span>
			{/each}
		</Panel>
	</div>
{/if}

<style>
	.emoji {
		@apply text-3xl px-2 py-1 cursor-pointer;
	}
	.emoji:hover {
		@apply bg-purple-900;
	}
</style>
