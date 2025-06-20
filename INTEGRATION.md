# @cinderlink/ui-kit Integration Guide

This guide explains how to integrate the Cinderlink UI Kit into your project, especially when using UnoCSS and Vite.

## Installation

```bash
bun add @cinderlink/ui-kit
```

## CSS and Theme Setup

The UI Kit includes critical CSS files that define theme variables, glass effects, and base styles. These need to be imported in your application.

### Option 1: Import All Styles (Recommended)

Add this to your main entry file (e.g., `app.ts` or `main.ts`) or your root `+layout.svelte`:

```typescript
// Import UI Kit styles
import '@cinderlink/ui-kit/styles.css';
```

### Option 2: Import Individual CSS Files

If you need more control, import the CSS files individually:

```typescript
// Import glass effect variables
import '@cinderlink/ui-kit/theme/glass.css';

// Import theme variables and base styles
import '@cinderlink/ui-kit/theme/Theme.css';
```

## UnoCSS Configuration

To use the same theme colors and configurations as the UI Kit, update your `uno.config.ts`:

```typescript
import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
// Import the UI Kit's theme configuration
import { themeColors } from '@cinderlink/ui-kit/theme';

export default defineConfig({
	presets: [
		presetUno({
			dark: 'class'
		}),
		presetAttributify({
			prefix: 'un-'
		}),
		presetIcons({
			scale: 1.2,
			warn: true
		}),
		presetTypography()
	],
	extractors: [extractorSvelte()],
	theme: {
		// Extend with UI Kit theme colors
		colors: {
			purple: {
				50: 'hsl(273, 22%, 90%)',
				100: 'hsl(271, 12%, 66%)',
				200: 'hsl(256, 100%, 80%)',
				300: 'hsl(256, 100%, 70%)',
				400: 'hsl(256, 100%, 60%)',
				500: 'hsl(256, 90%, 50%)',
				600: 'hsl(256, 90%, 40%)',
				700: 'hsl(266, 90%, 30%)',
				800: 'hsl(266, 45%, 20%)',
				900: 'hsl(266, 50%, 10%)'
			},
			green: {
				50: 'hsl(160, 94%, 85%)',
				100: 'hsl(160, 94%, 80%)',
				200: 'hsl(160, 94%, 75%)',
				300: 'hsl(160, 94%, 70%)',
				400: 'hsl(160, 94%, 60%)',
				500: 'hsl(160, 94%, 50%)',
				600: 'hsl(160, 94%, 40%)',
				700: 'hsl(160, 94%, 30%)',
				800: 'hsl(160, 94%, 20%)',
				900: 'hsl(160, 94%, 10%)'
			},
			pink: {
				50: 'hsl(305, 96%, 91%)',
				100: 'hsl(305, 96%, 89%)',
				200: 'hsl(305, 96%, 87%)',
				300: 'hsl(305, 96%, 85%)',
				400: 'hsl(305, 96%, 83%)',
				500: 'hsl(305, 96%, 81%)',
				600: 'hsl(305, 96%, 75%)',
				700: 'hsl(305, 86%, 65%)',
				800: 'hsl(305, 76%, 45%)',
				900: 'hsl(305, 66%, 25%)'
			},
			yellow: {
				50: 'hsl(49, 100%, 90%)',
				100: 'hsl(49, 100%, 80%)',
				200: 'hsl(49, 100%, 70%)',
				300: 'hsl(49, 100%, 62%)',
				400: 'hsl(49, 100%, 55%)',
				500: 'hsl(49, 100%, 49%)',
				600: 'hsl(49, 100%, 43%)',
				700: 'hsl(49, 90%, 37%)',
				800: 'hsl(49, 80%, 31%)',
				900: 'hsl(49, 30%, 25%)'
			},
			blue: {
				50: 'hsl(191, 78%, 96%)',
				100: 'hsl(191, 78%, 92%)',
				200: 'hsl(191, 78%, 84%)',
				300: 'hsl(191, 78%, 78%)',
				400: 'hsl(191, 78%, 65%)',
				500: 'hsl(191, 78%, 56%)',
				600: 'hsl(191, 78%, 46%)',
				700: 'hsl(191, 78%, 36%)',
				800: 'hsl(191, 78%, 26%)',
				900: 'hsl(191, 78%, 16%)'
			}
		}
	},
	// Include the UI Kit's safelist items
	safelist: [
		'fill-purple-600',
		'fill-blue-500',
		'fill-green-500',
		'grid-cols-2',
		'grid-cols-3',
		'grid-cols-4',
		'grid-cols-5',
		'grid-cols-6',
		'grid-cols-7',
		'grid-cols-8',
		'grid-cols-9'
	]
});
```

## Vite Configuration

Add UnoCSS to your Vite configuration:

```typescript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
	plugins: [UnoCSS(), sveltekit()]
});
```

## Using the Theme System

### Dark Mode

The UI Kit uses a class-based dark mode system. To enable dark mode:

```typescript
import { Theme } from '@cinderlink/ui-kit';

// In your root layout
<Theme />
```

Or manually toggle dark mode:

```typescript
import { theme } from '@cinderlink/ui-kit';

// Toggle dark mode
theme.toggle();

// Set specific mode
theme.set('dark');
theme.set('light');
```

### Glass Effects

The UI Kit includes a glass design system with CSS variables. Use these classes:

```html
<!-- Basic glass effect -->
<div class="glass">Content</div>

<!-- Frosted glass effect -->
<div class="glass-frosted">Content</div>

<!-- Surface glass effect -->
<div class="glass-surface">Content</div>
```

### Using UI Kit Components

```svelte
<script>
	import { Button, Card, Modal } from '@cinderlink/ui-kit';
</script>

<Card variant="glass">
	<Button variant="primary" size="md">Click me</Button>
</Card>
```

## TypeScript Support

The UI Kit is fully typed. Import types as needed:

```typescript
import type { ButtonProps, CardProps } from '@cinderlink/ui-kit';
```

## Troubleshooting

### Styles not applying

Ensure you've imported the CSS files at the root of your application before any components are rendered.

### UnoCSS conflicts

If you have existing UnoCSS configuration, merge the UI Kit's theme colors into your existing theme configuration rather than replacing it entirely.

### Dark mode not working

Make sure the `Theme` component is mounted at the root of your application, or ensure the `dark` class is properly applied to your `html` element.

## Example Project Setup

Here's a complete example for a SvelteKit project:

1. **Install dependencies:**

   ```bash
   bun add @cinderlink/ui-kit unocss @unocss/extractor-svelte
   ```

2. **Update `vite.config.ts`:**

   ```typescript
   import { defineConfig } from 'vite';
   import { sveltekit } from '@sveltejs/kit/vite';
   import UnoCSS from 'unocss/vite';

   export default defineConfig({
   	plugins: [UnoCSS(), sveltekit()]
   });
   ```

3. **Create `uno.config.ts`** (copy from above)

4. **Update `app.html`:**

   ```html
   <!DOCTYPE html>
   <html lang="en" %sveltekit.htmlclass%>
   	<head>
   		<meta charset="utf-8" />
   		<meta name="viewport" content="width=device-width" />
   		%sveltekit.head%
   	</head>
   	<body>
   		<div id="app">%sveltekit.body%</div>
   	</body>
   </html>
   ```

5. **Update `src/app.css`:**

   ```css
   @import '@unocss/reset/tailwind.css';
   @import '@cinderlink/ui-kit/styles.css';
   ```

6. **Update `src/routes/+layout.svelte`:**

   ```svelte
   <script>
   	import '../app.css';
   	import { Theme } from '@cinderlink/ui-kit';
   </script>

   <Theme />
   <slot />
   ```

Now you can use all UI Kit components with proper theming!
