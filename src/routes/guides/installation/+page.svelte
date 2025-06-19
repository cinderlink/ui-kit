<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';
	import PageContainer from '$lib/layout/PageContainer/PageContainer.svelte';

	let pnpmInstall = `pnpm add @cinderlink/ui-kit`;
	let npmInstall = `npm install @cinderlink/ui-kit`;
	let yarnInstall = `yarn add @cinderlink/ui-kit`;

	let basicUsage = `import { Button, Card, Typography } from '@cinderlink/ui-kit';

// In your Svelte component
<Card>
  <Typography el="h1">Hello World</Typography>
  <Button onclick={handleClick}>
    Click me
  </Button>
</Card>`;

	let viteConfig = `// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [
    UnoCSS(),
    svelte()
  ]
});`;

	let unoConfig = `// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  theme: {
    colors: {
      purple: {
        50: '#faf5ff',
        500: '#8b5cf6',
        900: '#581c87'
      }
    }
  }
});`;
</script>

<PageContainer>
	<Breadcrumb
		sections={[
			{ label: 'guides', path: '/guides' },
			{ label: 'installation', path: '/guides/installation' }
		]}
	/>

	<Typography el="h1">Installation</Typography>
	<Typography el="p">
		Get started with @cinderlink/ui-kit in your Svelte 5 project.
	</Typography>

	<Card>
		<Typography el="h2" classes="mb-3">Package Installation</Typography>
		<Typography el="p" classes="mb-4">
			Install the UI kit using your package manager. We recommend pnpm for the best workspace support:
		</Typography>

		<div class="space-y-4">
			<div>
				<Typography el="h4" classes="mb-2">pnpm (recommended)</Typography>
				<CodeEditor bind:code={pnpmInstall} language="auto" readOnly />
			</div>

			<div>
				<Typography el="h4" classes="mb-2">npm</Typography>
				<CodeEditor bind:code={npmInstall} language="auto" readOnly />
			</div>

			<div>
				<Typography el="h4" classes="mb-2">yarn</Typography>
				<CodeEditor bind:code={yarnInstall} language="auto" readOnly />
			</div>
		</div>
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">Requirements</Typography>
		<Typography el="p" classes="mb-3">
			The UI kit requires the following dependencies:
		</Typography>
		<ul class="space-y-2 text-sm">
			<li>• Svelte 5.x</li>
			<li>• UnoCSS (for styling)</li>
			<li>• Vite (recommended build tool)</li>
		</ul>
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">Setup UnoCSS</Typography>
		<Typography el="p" classes="mb-4">
			Configure UnoCSS in your project for proper styling:
		</Typography>

		<div class="space-y-4">
			<div>
				<Typography el="h4" classes="mb-2">Install UnoCSS</Typography>
				<CodeEditor code="npm install -D unocss" language="auto" readOnly />
			</div>

			<div>
				<Typography el="h4" classes="mb-2">Vite Configuration</Typography>
				<CodeEditor bind:code={viteConfig} language="javascript" readOnly />
			</div>

			<div>
				<Typography el="h4" classes="mb-2">UnoCSS Configuration</Typography>
				<CodeEditor bind:code={unoConfig} language="javascript" readOnly />
			</div>
		</div>
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">Basic Usage</Typography>
		<Typography el="p" classes="mb-4">
			Import and use components in your Svelte files:
		</Typography>
		<CodeEditor bind:code={basicUsage} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">Next Steps</Typography>
		<Typography el="p" classes="mb-3">
			Now that you have the UI kit installed, explore:
		</Typography>
		<ul class="space-y-2 text-sm">
			<li>• <a href="/guides/quickstart" class="text-purple-600 hover:text-purple-800">Quick Start Guide</a></li>
			<li>• <a href="/components/content" class="text-purple-600 hover:text-purple-800">Component Library</a></li>
			<li>• <a href="/themes/overview" class="text-purple-600 hover:text-purple-800">Theming System</a></li>
		</ul>
	</Card>
</PageContainer>