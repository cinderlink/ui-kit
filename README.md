# Cinderlink UI Kit

A modern Svelte 5 component library for the Cinderlink ecosystem.

## 🚀 Features

- **Svelte 5 Ready**: Built with Svelte 5 runes API (`$props()`, `$state()`, `$effect()`)
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Glass Morphism Design**: Beautiful glass effects with backdrop blur and transparency
- **UnoCSS Styling**: Utility-first CSS with custom theme integration
- **Dark Mode**: Built-in dark mode support with automatic theme switching
- **Modular**: Tree-shakeable components organized by category
- **Accessible**: WCAG AA compliant with proper ARIA support
- **Framework Integration**: Designed to work seamlessly with @cinderlink framework packages

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @cinderlink/ui-kit

# Using npm
npm install @cinderlink/ui-kit

# Using yarn
yarn add @cinderlink/ui-kit
```

## 🎯 Quick Start

```svelte
<script>
	import { Button, Card, Typography } from '@cinderlink/ui-kit';

	let count = $state(0);
</script>

<Card>
	{#snippet titleSlot()}
		<Typography el="h2">Counter Example</Typography>
	{/snippet}

	<Typography>Count: {count}</Typography>
	<Button onclick={() => count++}>Increment</Button>
</Card>
```

## 🏗️ Component Categories

### Content Components

- **Avatar** - User avatars with status indicators
- **Card** - Flexible content containers
- **Typography** - Text styling and hierarchy
- **Notification** - Toast and alert components
- **Panel** - Layout panels and surfaces

### Interactive Components

- **Button** - Buttons with various styles and states
- **Input** - Form inputs with validation
- **Modal** - Dialog and overlay components
- **Dropdown** - Select and menu dropdowns
- **Toggle** - Switch and checkbox components

### Layout Components

- **Sidebar** - Navigation sidebars
- **CenteredPanelLayout** - Centered content layouts

### Indicator Components

- **LoadingIndicator** - Loading spinners and progress
- **StatusIndicator** - Status badges and indicators

## 🎨 Theming

The UI kit includes built-in theme support with UnoCSS:

```svelte
<script>
	import { ThemeToggle } from '@cinderlink/ui-kit';
</script>

<ThemeToggle />
```

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test

# Type checking
pnpm check

# Linting
pnpm lint
```

## 📚 Documentation

- **[Theme Guide](./THEME_GUIDE.md)**: Complete guide to the glass morphism design system, theming, and customization
- **[Component Guide](./COMPONENT_GUIDE.md)**: Comprehensive guide to component usage, patterns, and best practices
- **[CLAUDE.md](./CLAUDE.md)**: Development instructions and project architecture for contributors

Visit the component stories at `http://localhost:3002` when running the dev server to see all components with examples and usage patterns.

## 🔗 Framework Integration

This UI kit is designed to work with the Cinderlink framework packages:

- `@cinderlink/core-types` - Core type definitions
- `@cinderlink/protocol` - Protocol implementation
- `@cinderlink/client` - Client framework

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Make your changes
4. Run tests: `pnpm test`
5. Build: `pnpm build`
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
