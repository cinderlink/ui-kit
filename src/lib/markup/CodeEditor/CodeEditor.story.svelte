<script lang="ts">
	import CodeEditor from './CodeEditor.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Typography from '$lib/content/Typography/Typography.svelte';

	let jsCode = $state(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

	let svelteCode = $state(`<` + `script lang="ts">
  import { theme } from '$lib/theme/store.svelte';
  
  interface Props {
    message: string;
    count?: number;
  }
  
  let { message, count = 0 }: Props = $props();
  
  let doubled = $derived(count * 2);
<` + `/script>

<div class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
  <h1>{message}</h1>
  <p>Count: {count}, Doubled: {doubled}</p>
</div>`);

	let jsonCode = $state(`{
  "name": "@cinderlink/ui-kit",
  "version": "1.0.0-next.0",
  "type": "module",
  "dependencies": {
    "svelte": "^5.33.11",
    "codemirror": "^6.0.1"
  }
}`);

	let markdownCode = $state(`# CodeMirror Integration

This is a **modern** code editor built with [CodeMirror 6](https://codemirror.net/).

## Features

- Syntax highlighting for multiple languages
- Dark/light theme support  
- Auto-completion
- Keyboard shortcuts
- Copy to clipboard functionality

\`\`\`javascript
// Example code block
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> Built with Svelte 5 and UnoCSS`);

	let cssCode = $state(`.button {
  @apply px-4 py-2 rounded-md border-1;
  @apply bg-purple-500 hover:bg-purple-600;
  @apply dark:(bg-purple-700 hover:bg-purple-800);
  @apply text-white font-medium transition-colors;
}

.button:disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply hover:bg-purple-500 dark:hover:bg-purple-700;
}`);

	let readOnlyCode = 'console.log("This editor is read-only");';
</script>

<div class="flex flex-col gap-6 p-6">
	<Typography el="h1">CodeEditor Component</Typography>
	<Typography el="p">
		A modern code editor built with CodeMirror 6, featuring syntax highlighting, themes, and advanced editing capabilities.
	</Typography>

	<div class="grid gap-6">
		<!-- JavaScript Example -->
		<Card>
			<Typography el="h3" classes="mb-4">JavaScript</Typography>
			<div class="h-200px">
				<CodeEditor bind:code={jsCode} language="javascript" />
			</div>
		</Card>

		<!-- Svelte Example -->
		<Card>
			<Typography el="h3" classes="mb-4">Svelte</Typography>
			<div class="h-300px">
				<CodeEditor bind:code={svelteCode} language="svelte" />
			</div>
		</Card>

		<!-- JSON Example -->
		<Card>
			<Typography el="h3" classes="mb-4">JSON</Typography>
			<div class="h-200px">
				<CodeEditor bind:code={jsonCode} language="json" />
			</div>
		</Card>

		<!-- Markdown Example -->
		<Card>
			<Typography el="h3" classes="mb-4">Markdown</Typography>
			<div class="h-300px">
				<CodeEditor bind:code={markdownCode} language="markdown" />
			</div>
		</Card>

		<!-- CSS Example -->
		<Card>
			<Typography el="h3" classes="mb-4">CSS</Typography>
			<div class="h-250px">
				<CodeEditor bind:code={cssCode} language="css" />
			</div>
		</Card>

		<!-- Read-only Example -->
		<Card>
			<Typography el="h3" classes="mb-4">Read-only Editor</Typography>
			<div class="h-100px">
				<CodeEditor 
					code={readOnlyCode} 
					language="javascript" 
					readOnly={true}
					placeholder="This is read-only"
				/>
			</div>
		</Card>

		<!-- No Copy Button Example -->
		<Card>
			<Typography el="h3" classes="mb-4">Without Copy Button</Typography>
			<div class="h-100px">
				<CodeEditor 
					code="const noCopy = true;" 
					language="javascript" 
					canCopy={false}
				/>
			</div>
		</Card>

		<!-- Error State Example -->
		<Card>
			<Typography el="h3" classes="mb-4">Error State</Typography>
			<div class="h-100px">
				<CodeEditor 
					code="invalid json syntax" 
					language="json" 
					aria-invalid={true}
				/>
			</div>
		</Card>
	</div>
</div>