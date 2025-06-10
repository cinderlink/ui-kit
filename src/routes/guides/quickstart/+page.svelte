<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';

	let appLayout = `<!-- App.svelte -->
<` + `script lang="ts">
  import { Theme } from '@cinderlink/ui-kit';
  import type { Snippet } from 'svelte';
  
  interface Props {
    children: Snippet;
  }
  
  let { children }: Props = $props();
<` + `/script>

<Theme>
  {@render children()}
</Theme>`;

	let simpleForm = `<` + `script lang="ts">
  import { Card, Typography, Input, Button } from '@cinderlink/ui-kit';
  
  let name = $state('');
  let email = $state('');
  
  function handleSubmit() {
    console.log({ name, email });
  }
<` + `/script>

<Card>
  <Typography el="h2">Contact Form</Typography>
  
  <div class="space-y-4">
    <Input 
      id="name" 
      label="Name" 
      bind:value={name} 
      placeholder="Enter your name" 
    />
    
    <Input 
      id="email" 
      type="email" 
      label="Email" 
      bind:value={email} 
      placeholder="Enter your email" 
    />
    
    <Button onclick={handleSubmit} variant="default">
      Submit
    </Button>
  </div>
</Card>`;

	let themeExample = `<` + `script lang="ts">
  import { Theme, ThemeToggle, Card, Typography } from '@cinderlink/ui-kit';
<` + `/script>

<Theme>
  <Card>
    <div class="flex justify-between items-center">
      <Typography el="h1">My App</Typography>
      <ThemeToggle />
    </div>
    
    <Typography el="p">
      This content will automatically adapt to light/dark mode!
    </Typography>
  </Card>
</Theme>`;

	let layoutExample = `<` + `script lang="ts">
  import { 
    SidebarLayout, 
    Card, 
    Typography, 
    Button 
  } from '@cinderlink/ui-kit';
<` + `/script>

<SidebarLayout>
  {#snippet sidebar()}
    <nav class="space-y-2">
      <Button href="/dashboard" variant="outlined">Dashboard</Button>
      <Button href="/profile" variant="outlined">Profile</Button>
      <Button href="/settings" variant="outlined">Settings</Button>
    </nav>
  {/snippet}
  
  <main class="p-6">
    <Card>
      <Typography el="h1">Welcome to the Dashboard</Typography>
      <Typography el="p">Your content goes here.</Typography>
    </Card>
  </main>
</SidebarLayout>`;
</script>

<Breadcrumb
	sections={[
		{ label: 'guides', path: '/guides' },
		{ label: 'quickstart', path: '/guides/quickstart' }
	]}
/>

<div class="max-w-4xl mx-auto space-y-6">
	<Typography el="h1">Quick Start</Typography>
	<Typography el="p">
		Build your first UI with @cinderlink/ui-kit in minutes.
	</Typography>

	<Card>
		<Typography el="h2" classes="mb-3">1. Setup Theme Provider</Typography>
		<Typography el="p" classes="mb-4">
			Wrap your app with the Theme component to enable theming and dark mode:
		</Typography>
		<CodeEditor bind:code={appLayout} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">2. Build a Simple Form</Typography>
		<Typography el="p" classes="mb-4">
			Create interactive forms using Input and Button components:
		</Typography>
		<CodeEditor bind:code={simpleForm} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">3. Add Dark Mode Support</Typography>
		<Typography el="p" classes="mb-4">
			Include the ThemeToggle component for automatic dark/light mode switching:
		</Typography>
		<CodeEditor bind:code={themeExample} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">4. Create Layouts</Typography>
		<Typography el="p" classes="mb-4">
			Use layout components to structure your application:
		</Typography>
		<CodeEditor bind:code={layoutExample} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">Key Concepts</Typography>
		<div class="space-y-3">
			<div>
				<Typography el="h4" classes="mb-1">Svelte 5 Runes</Typography>
				<Typography el="p">
					All components use the latest Svelte 5 runes API ($state, $props, $derived, etc.)
				</Typography>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-1">Snippets over Slots</Typography>
				<Typography el="p">
					Components use the new snippets API instead of legacy slots for better type safety.
				</Typography>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-1">UnoCSS Styling</Typography>
				<Typography el="p">
					Built with UnoCSS for utility-first styling with custom theme support.
				</Typography>
			</div>
			
			<div>
				<Typography el="h4" classes="mb-1">TypeScript First</Typography>
				<Typography el="p">
					All components are fully typed with TypeScript interfaces and strict typing.
				</Typography>
			</div>
		</div>
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">What's Next?</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Explore Components</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/components/content" class="text-purple-600 hover:text-purple-800">Content Components</a></li>
					<li>• <a href="/components/interactive" class="text-purple-600 hover:text-purple-800">Interactive Components</a></li>
					<li>• <a href="/components/layout" class="text-purple-600 hover:text-purple-800">Layout Components</a></li>
				</ul>
			</div>
			
			<div class="space-y-2">
				<Typography el="h4">Customize Theming</Typography>
				<ul class="space-y-1 text-sm">
					<li>• <a href="/themes/colors" class="text-purple-600 hover:text-purple-800">Color System</a></li>
					<li>• <a href="/themes/customization" class="text-purple-600 hover:text-purple-800">Custom Themes</a></li>
					<li>• <a href="/guides/examples" class="text-purple-600 hover:text-purple-800">More Examples</a></li>
				</ul>
			</div>
		</div>
	</Card>
</div>