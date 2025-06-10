<script lang="ts">
	import { json } from '@codemirror/lang-json';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import { css } from '@codemirror/lang-css';
	import { svelte } from '@replit/codemirror-lang-svelte';
	import { markdown } from '@codemirror/lang-markdown';
	import { languages } from '@codemirror/language-data';
	import { LanguageDescription } from '@codemirror/language';
	import { EditorView, keymap, placeholder as cmPlaceholder } from '@codemirror/view';
	import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
	import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
	import { autocompletion } from '@codemirror/autocomplete';
	import { defaultKeymap } from '@codemirror/commands';
	import { Compartment, EditorState, type Extension } from '@codemirror/state';
	import { history, historyKeymap } from '@codemirror/commands';
	import Button from '$lib/interactive/Button/Button.svelte';
	import { onDestroy, onMount, untrack } from 'svelte';
	import { theme } from '$lib/theme/store.svelte';

	type SupportedLanguage =
		| 'json'
		| 'javascript'
		| 'typescript'
		| 'svelte'
		| 'html'
		| 'css'
		| 'markdown'
		| 'auto';

	let {
		code = $bindable(''), // Make code bindable
		readOnly = false,
		canCopy = true,
		language = 'auto' as SupportedLanguage,
		lightTheme = tokyoNightDay,
		darkTheme = tokyoNightStorm,
		placeholder = '/* your code here */',
		// Add aria-invalid prop for styling
		'aria-invalid': ariaInvalid = false,
		...rest
	}: {
		code?: string; // Input code value
		language?: SupportedLanguage;
		readOnly?: boolean;
		canCopy?: boolean;
		lightTheme?: Extension;
		darkTheme?: Extension;
		placeholder?: string;
		'aria-invalid'?: boolean | 'true' | 'false'; // Allow boolean or string
		[key: string]: unknown;
	} = $props();

	let editorContainer: HTMLElement;
	let editor: EditorView;
	let themeConfig: Compartment;

	function getLanguageSupport(lang: SupportedLanguage) {
		switch (lang) {
			case 'json':
				return json();
			case 'javascript':
			case 'typescript':
				return javascript();
			case 'html':
				return html();
			case 'css':
				return css();
			case 'markdown':
				return markdown({
					codeLanguages: languages
				});
			case 'svelte':
				return svelte();
			default:
				return markdown({
					codeLanguages: [
						...languages,
						LanguageDescription.of({
							name: 'svelte',
							extensions: ['.svelte', '.svelte.ts'],
							load: async () => svelte()
						})
					]
				});
		}
	}

	// Initialize editor once the container is available
	onMount(() => {
		if (!editorContainer || editor) return;

		// Use the initial code value directly
		const initialContent = typeof code === 'string' ? code : String(code ?? '');

		themeConfig = new Compartment();

		const state = EditorState.create({
			// Use initialContent
			doc: initialContent,
			extensions: [
				getLanguageSupport(language),
				autocompletion(),
				keymap.of(defaultKeymap),
				history(),
				keymap.of(historyKeymap),
				EditorState.readOnly.of(readOnly),
				cmPlaceholder(placeholder),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const content = update.state.doc.toString();
						// Update the bindable 'code' state directly
						code = content;
					}
				}),
				themeConfig.of(theme.darkMode ? darkTheme : lightTheme)
			]
		});

		editor = new EditorView({
			state,
			parent: editorContainer
		});
	});

	// Track if editor needs placeholder styling (based on code prop)
	let showPlaceholder = $derived(code === '');

	// Effect to update editor view when code prop changes externally
	$effect(() => {
		// No longer need isUpdatingFromEditor check
		if (!editor) return;

		// Ensure code is a string for the editor
		const externalContent = typeof code === 'string' ? code : String(code ?? '');

		// Use untrack to prevent creating a dependency on editor state's doc
		untrack(() => {
			// Only dispatch if the external content differs from the editor's current content
			if (externalContent !== editor.state.doc.toString()) {
				editor.dispatch({
					changes: {
						from: 0,
						to: editor.state.doc.length,
						insert: externalContent
					}
				});
			}
		});
	});

	$effect(() => {
		// switch theme for dark & light mode
		if (!editor || !themeConfig) return;
		
		editor.dispatch({
			effects: themeConfig.reconfigure(theme.darkMode ? darkTheme : lightTheme)
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});

	// UI state
	let hasFocus = $state(false);

	function copyCode() {
		// Copy the bound code value
		navigator.clipboard.writeText(code ?? ''); // Add nullish coalescing for safety
		// Could add toast notification here if needed
	}

	function onFocus() {
		hasFocus = true;
	}

	function onBlur() {
		hasFocus = false;
	}
</script>

<div
	class="code__container"
	class:code__container--error={ariaInvalid === true || ariaInvalid === 'true'}
	class:code__container--placeholder={showPlaceholder}
	class:code__container--focus={hasFocus}
>
	<div
		class="code__editor"
		bind:this={editorContainer}
		onfocusin={onFocus}
		onfocusout={onBlur}
	></div>
	{#if canCopy}
		<div class="code__copy">
			<Button variant="outlined" size="sm" onclick={copyCode}>
				<div class="i-tabler-copy h-4 w-4"></div>
			</Button>
		</div>
	{/if}
</div>
<!-- Use the bound code value for the hidden input -->
<input type="hidden" value={code} {...rest} />

<style>
	.code__container {
		@apply relative flex h-full w-full flex-1;
	}

	.code__editor {
		@apply border-border flex h-full w-full flex-1 overflow-hidden rounded-md border;
		@apply border-gray-300/20 dark-(border-gray-700/30);
	}

	.code__copy {
		@apply text-muted-foreground absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity duration-200;
	}

	.code__container:hover .code__copy {
		@apply opacity-100;
	}

	.code__container.code__container--placeholder :global(.cm-line) {
		opacity: 0.5;
	}

	.code__container.code__container--error {
		@apply rounded-lg border-2 border-red-400;
	}

	.code__container.code__container--error .code__editor {
		/* Target editor wrapper */
		@apply border-red-400; /* Apply border to the editor div */
	}

	.code__container.code__container--focus {
		@apply ring-2 ring-purple-500/20 border-purple-500/50 dark-(ring-purple-400/20 border-purple-400/50);
	}

	:global(.cm-editor) {
		@apply flex-1 p-2;
	}

	:global(.cm-editor.cm-focused) {
		@apply outline-none;
	}
</style>