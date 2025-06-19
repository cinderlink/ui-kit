# Cinderlink UI Kit - Component Guide

## Overview

The Cinderlink UI Kit provides a comprehensive set of Svelte 5 components built with TypeScript, UnoCSS, and a glass morphism design system. This guide covers component architecture, usage patterns, and development practices.

## Component Architecture

### Svelte 5 Runes

All components use the new Svelte 5 runes API:

```typescript
interface Props {
	value?: string;
	disabled?: boolean;
	children?: Snippet;
}

let { value = $bindable(''), disabled = false, children }: Props = $props();

// Reactive state
let count = $state(0);

// Derived values
let doubled = $derived(count * 2);

// Effects
$effect(() => {
	console.log('Value changed:', value);
});
```

### TypeScript Integration

Components are fully typed with interfaces:

```typescript
interface ButtonProps {
	variant?: 'default' | 'filled' | 'outlined' | 'glass';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	onclick?: (event: MouseEvent) => void;
	children?: Snippet;
}
```

### Component Categories

#### Content Components (`/src/lib/content/`)

- **Avatar**: User profile images with fallbacks
- **Card**: Container with glass effects and variants
- **Drawer**: Collapsible navigation sections
- **Emoji**: Emoji picker and display
- **Notification**: Toast and alert components
- **Panel**: Base container with glass styling
- **Reaction**: Social reaction components
- **Typography**: Text styling and hierarchy

#### Interactive Components (`/src/lib/interactive/`)

- **Button**: Action buttons with variants
- **Dropdown**: Select menus and option lists
- **ImageUpload**: File upload with preview
- **Input**: Form inputs with validation
- **Modal**: Overlay dialogs and popups
- **Select**: Styled select dropdowns
- **Toggle**: Boolean input controls

#### Layout Components (`/src/lib/layout/`)

- **SidebarLayout**: Main application layout
- **Page**: Page wrapper with proper spacing
- **PageContainer**: Centered content container

#### Navigation Components (`/src/lib/navigation/`)

- **Breadcrumb**: Navigation path display

#### Indicator Components (`/src/lib/indicator/`)

- **LoadingIndicator**: Spinner and progress states
- **ProgressBar**: Progress visualization
- **StatusIndicator**: Online/offline states

#### Markup Components (`/src/lib/markup/`)

- **Code**: Syntax highlighted code blocks
- **CodeEditor**: Interactive code editing
- **Markdown**: Markdown rendering
- **Syntax**: Syntax highlighting

#### Data Components (`/src/lib/data/`)

- **Datatable**: Table with sorting and filtering

## Component Patterns

### Basic Component Structure

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'outlined';
		size?: 'sm' | 'md' | 'lg';
		classes?: string;
		children?: Snippet;
	}

	let { variant = 'default', size = 'md', classes = '', children }: Props = $props();

	const computedClasses = $derived(`component component--${variant} component--${size} ${classes}`);
</script>

<div class={computedClasses}>
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.component {
		/* Base styles using CSS variables */
		background: var(--glass-bg-surface);
		border: var(--glass-border);
		border-radius: 0.75rem;
		transition: var(--glass-transition);
	}

	.component--outlined {
		background: transparent;
		border: 2px solid var(--glass-border);
	}

	.component--sm {
		@apply text-sm p-2;
	}
	.component--md {
		@apply text-base p-4;
	}
	.component--lg {
		@apply text-lg p-6;
	}
</style>
```

### Props and Bindable Values

```svelte
<script lang="ts">
	interface Props {
		// Bindable for two-way data binding
		value: string;
		checked: boolean;

		// Optional with defaults
		placeholder?: string;
		disabled?: boolean;

		// Event handlers
		onchange?: (value: string) => void;
		onclick?: (event: MouseEvent) => void;
	}

	let {
		value = $bindable(''),
		checked = $bindable(false),
		placeholder = '',
		disabled = false,
		onchange,
		onclick
	}: Props = $props();
</script>
```

### Snippet Usage (Slots)

```svelte
<script lang="ts">
	interface Props {
		header?: Snippet;
		footer?: Snippet<[{ data: any }]>; // Snippet with parameters
		children?: Snippet;
	}

	let { header, footer, children }: Props = $props();

	const data = { example: 'value' };
</script>

<div class="component">
	{#if header}
		<header>
			{@render header()}
		</header>
	{/if}

	<main>
		{#if children}
			{@render children()}
		{/if}
	</main>

	{#if footer}
		<footer>
			{@render footer(data)}
		</footer>
	{/if}
</div>
```

## Component Examples

### Button Component

```svelte
<!-- Basic usage -->
<Button>Click me</Button>

<!-- With variants -->
<Button variant="filled" size="lg">Large Filled Button</Button>
<Button variant="outlined" disabled>Disabled Button</Button>

<!-- With event handlers -->
<Button onclick={(e) => console.log('Clicked!')}>Handle Click</Button>

<!-- With icons (using snippets) -->
<Button>
	<div class="i-tabler-star"></div>
	Star Button
</Button>
```

### Input Component

```svelte
<script>
	let value = $state('');
	let email = $state('');
	let password = $state('');
</script>

<!-- Text input -->
<Input id="username" type="text" placeholder="Enter username" bind:value />

<!-- Email with validation -->
<Input
	id="email"
	type="email"
	label="Email Address"
	bind:value={email}
	error={!email.includes('@') ? 'Invalid email' : undefined}
/>

<!-- Password input -->
<Input
	id="password"
	type="password"
	label="Password"
	bind:value={password}
	autocomplete="current-password"
/>

<!-- Search with icon -->
<Input id="search" type="search" placeholder="Search..." icon="i-tabler-search" bind:value />
```

### Card Component

```svelte
<!-- Basic card -->
<Card>
	<h3>Card Title</h3>
	<p>Card content goes here.</p>
</Card>

<!-- Card with variants -->
<Card variant="outlined" color="purple">
	<Typography el="h3">Outlined Purple Card</Typography>
	<Typography el="p">With custom styling</Typography>
</Card>

<!-- Interactive card -->
<Card as="button" variant="default" onclick={() => console.log('Card clicked')}>
	<Typography el="h3">Clickable Card</Typography>
	<Typography el="p">This card is interactive</Typography>
</Card>
```

### Modal Component

```svelte
<script>
	let showModal = $state(false);
</script>

<Button onclick={() => (showModal = true)}>Open Modal</Button>

<Modal bind:open={showModal}>
	{#snippet header()}
		<Typography el="h2">Modal Title</Typography>
	{/snippet}

	<Typography el="p">Modal content goes here.</Typography>

	{#snippet footer()}
		<Button variant="outlined" onclick={() => (showModal = false)}>Cancel</Button>
		<Button onclick={() => (showModal = false)}>Confirm</Button>
	{/snippet}
</Modal>
```

## Development Patterns

### Component File Structure

```
ComponentName/
├── ComponentName.svelte       # Main component
├── ComponentName.story.svelte # Story/documentation
├── index.ts                   # Exports
└── types.ts                   # TypeScript types (if complex)
```

### Story Files

Every component has a `.story.svelte` file for documentation:

```svelte
<!-- Button.story.svelte -->
<script>
	import Button from './Button.svelte';
</script>

<div class="story">
	<h1>Button Component</h1>

	<section>
		<h2>Variants</h2>
		<div class="flex gap-4">
			<Button variant="default">Default</Button>
			<Button variant="filled">Filled</Button>
			<Button variant="outlined">Outlined</Button>
		</div>
	</section>

	<section>
		<h2>Sizes</h2>
		<div class="flex gap-4 items-center">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	</section>
</div>
```

### Exports

```typescript
// index.ts
export { default as Button } from './Button.svelte';
export type { ButtonProps } from './Button.svelte';

// Category index.ts
export * from './Button';
export * from './Input';
export * from './Modal';
```

## Testing Components

### Unit Tests (Vitest)

```typescript
import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Button from './Button.svelte';

test('renders button with text', () => {
	render(Button, { children: 'Click me' });
	expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

test('calls onclick handler', async () => {
	const handleClick = vi.fn();
	render(Button, { onclick: handleClick });

	await screen.getByRole('button').click();
	expect(handleClick).toHaveBeenCalled();
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('button component variants', async ({ page }) => {
	await page.goto('/components/interactive/button');

	// Test default variant
	const defaultButton = page.locator('[data-variant="default"]');
	await expect(defaultButton).toBeVisible();

	// Test interaction
	await defaultButton.click();
	await expect(page.locator('.clicked')).toBeVisible();

	// Screenshot test
	await expect(page).toHaveScreenshot('button-variants.png');
});
```

## Performance Optimization

### Component Lazy Loading

```svelte
<script>
	import { lazy } from '$lib/utils/lazy';

	const HeavyComponent = lazy(() => import('./HeavyComponent.svelte'));

	let showHeavy = $state(false);
</script>

{#if showHeavy}
	<HeavyComponent />
{/if}
```

### Efficient Reactivity

```svelte
<script>
	// Good: Derived values update only when dependencies change
	let items = $state([]);
	let filter = $state('');

	let filteredItems = $derived(items.filter((item) => item.name.includes(filter)));

	// Avoid: Creating new arrays in template
	// {#each items.filter(item => item.name.includes(filter)) as item}
</script>
```

## Accessibility Guidelines

### ARIA Labels and Roles

```svelte
<button aria-label="Close dialog" aria-pressed={pressed} role="button">
	<div class="i-tabler-x" aria-hidden="true"></div>
</button>
```

### Keyboard Navigation

```svelte
<script>
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onClick?.(event);
		}
	}
</script>

<div role="button" tabindex="0" onkeydown={handleKeydown} onclick={onClick}>
	Interactive element
</div>
```

### Focus Management

```svelte
<script>
	let buttonRef: HTMLButtonElement;

	function focusButton() {
		buttonRef?.focus();
	}
</script>

<button bind:this={buttonRef}> Focusable button </button>
```

## Common Patterns

### Form Handling

```svelte
<script>
	interface FormData {
		name: string;
		email: string;
		message: string;
	}

	let formData = $state<FormData>({
		name: '',
		email: '',
		message: ''
	});

	let errors = $state<Partial<FormData>>({});

	function validateForm() {
		errors = {};

		if (!formData.name) errors.name = 'Name is required';
		if (!formData.email.includes('@')) errors.email = 'Invalid email';
		if (!formData.message) errors.message = 'Message is required';

		return Object.keys(errors).length === 0;
	}

	function handleSubmit() {
		if (validateForm()) {
			// Submit form
			console.log('Form submitted:', formData);
		}
	}
</script>

<form onsubmit|preventDefault={handleSubmit}>
	<Input id="name" label="Name" bind:value={formData.name} error={errors.name} />

	<Input id="email" type="email" label="Email" bind:value={formData.email} error={errors.email} />

	<Input
		id="message"
		type="textarea"
		label="Message"
		bind:value={formData.message}
		error={errors.message}
	/>

	<Button type="submit">Submit</Button>
</form>
```

### State Management

```svelte
<script>
	// Simple component state
	let count = $state(0);
	let items = $state<Item[]>([]);

	// Derived state
	let total = $derived(items.reduce((sum, item) => sum + item.value, 0));

	// Complex state object
	let appState = $state({
		user: null,
		loading: false,
		error: null
	});

	// Effects for side effects
	$effect(() => {
		if (appState.user) {
			console.log('User logged in:', appState.user.name);
		}
	});
</script>
```

## Migration from Svelte 4

### Component Script Updates

```svelte
<!-- Svelte 4 -->
<script lang="ts">
  export let value: string = '';
  export let disabled: boolean = false;

  $: computedValue = value.toUpperCase();

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', { value });
  }
</script>

<!-- Svelte 5 -->
<script lang="ts">
  interface Props {
    value?: string;
    disabled?: boolean;
    onclick?: (event: { value: string }) => void;
  }

  let { value = $bindable(''), disabled = false, onclick }: Props = $props();

  let computedValue = $derived(value.toUpperCase());

  function handleClick() {
    onclick?.({ value });
  }
</script>
```

### Slot to Snippet Migration

```svelte
<!-- Svelte 5 -->
<script lang="ts">
	interface Props {
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet<[{ data: any }]>;
	}

	let { header, children, footer }: Props = $props();

	const data = { example: 'value' };
</script>

<!-- Svelte 4 -->
<div class="component">
	<slot name="header" />
	<slot />
	<slot name="footer" {data} />
</div>

<div class="component">
	{#if header}
		{@render header()}
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if footer}
		{@render footer(data)}
	{/if}
</div>
```

## Best Practices

1. **Use TypeScript interfaces** for all component props
2. **Implement story files** for documentation and testing
3. **Follow naming conventions** for consistency
4. **Use CSS variables** for theming support
5. **Implement proper accessibility** with ARIA attributes
6. **Test components** with unit and E2E tests
7. **Document complex props** with JSDoc comments
8. **Use bindable props** for two-way data binding
9. **Handle edge cases** gracefully
10. **Optimize for performance** with proper reactivity
