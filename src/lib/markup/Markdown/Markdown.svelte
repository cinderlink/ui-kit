<script lang="ts">
	import type MarkdownIt from 'markdown-it';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme';
	import darkTheme from 'svelte-highlight/styles/a11y-dark';
	import lightTheme from 'svelte-highlight/styles/a11y-light';

	let markdown: MarkdownIt | undefined = $state();
	onMount(async () => {
		const { default: hljs } = await import('highlight.js');
		const { default: md } = await import('markdown-it');
		const emojiModule = await import('markdown-it-emoji');
		const { default: hljsSvelte } = await import('highlightjs-svelte');
		const { default: hljsSolidity } = await import('highlightjs-solidity');
		markdown = md({
			highlight: function (str, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return (
							`<div class="p-4 my-2 bg-neutral-100 dark:bg-gray-900 rounded-md"><pre class="${classes}"><code>` +
							hljs.highlight(str, { language: lang }).value +
							'</code></pre></div>'
						);
					} catch {
						// Ignore highlighting errors
					}
				}

				return (
					`<pre class="${classes}"><code>` +
					(markdown?.utils.escapeHtml(str) || str) +
					'</code></pre>'
				);
			}
		});

		markdown.use(emojiModule.default);
		hljsSvelte(hljs);
		hljsSolidity(hljs);
	});

	interface Props {
		renderedMarkdown?: string;
		value?: string;
		children?: import('svelte').Snippet<[{ renderedMarkdown: string }]>;
	}

	let { renderedMarkdown = $bindable(''), value = $bindable(''), children }: Props = $props();
	const classes = 'h-auto w-full overflow-auto border-1px border-gray-300/10';
	// Theme style for highlighting (used in template)
	const currentThemeStyle = $derived(theme.darkMode ? darkTheme : lightTheme);

	$effect(() => {
		renderedMarkdown = markdown ? markdown.render(value as string) : '';
	});
</script>

<svelte:head>
	<style lang="postcss">
		{@html currentThemeStyle}
	</style>
</svelte:head>

{#if children}{@render children({ renderedMarkdown })}{:else}
	{@html renderedMarkdown}
{/if}
