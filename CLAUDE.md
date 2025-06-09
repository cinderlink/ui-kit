# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Cinderlink UI Kit (`@cinderlink/ui-kit`), a Svelte 5-based component library that provides reusable UI components for the Cinderlink ecosystem. The library uses the new Svelte 5 runes API (`$props()`, `$state()`, `$effect()`) and is styled with UnoCSS.

## Development Commands

```bash
# Development
npm run dev              # Start dev server on port 3002
npm run watch            # Watch mode for package building

# Building
npm run build            # Build the library package

# Testing
npm run test             # Run Playwright E2E tests
npm run test:unit        # Run Vitest unit tests
npm run test:unit:watch  # Run unit tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run check            # Type checking with svelte-check
npm run lint             # ESLint for .svelte, .js, .ts files
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
```

## Architecture

### Component Organization
Components are organized by category in `src/lib/`:
- `/content` - UI content components (Avatar, Card, Typography, Notification, etc.)
- `/interactive` - Interactive components (Button, Dropdown, Modal, Input, etc.)
- `/indicator` - Status and loading indicators
- `/layout` - Layout components (Sidebar, CenteredPanelLayout)
- `/navigation` - Navigation components (Breadcrumb)
- `/markup` - Code and markdown display components
- `/data` - Data display components (Datatable)
- `/theme` - Theme management and dark mode support

### Component Structure Pattern
Each component follows this structure:
```
ComponentName/
├── ComponentName.svelte       # Main component using Svelte 5 runes
├── ComponentName.story.svelte # Story file for documentation/examples
├── index.ts                   # Export file
└── types.ts                   # TypeScript interfaces (if needed)
```

### Key Architectural Decisions

1. **Svelte 5 Runes**: All components use the new runes API:
   - `$props()` for component properties
   - `$state()` for reactive state
   - `$effect()` for side effects
   - Snippets API for slots

2. **TypeScript**: Strong typing with interfaces for all component props

3. **UnoCSS**: Utility-first CSS with custom theme colors (purple, green, pink, yellow, blue)

4. **Dark Mode**: Built-in dark mode using class strategy and theme store

5. **Story Files**: Each component has a `.story.svelte` file that serves as live documentation

## Component Development Workflow

1. Create component in appropriate category folder
2. Use Svelte 5 runes syntax (not legacy syntax)
3. Define TypeScript interface for props
4. Create corresponding `.story.svelte` file with usage examples
5. Export from `index.ts` in component folder
6. Update category's main `index.ts` to re-export

## Testing Strategy

- **Unit Tests**: Use Vitest for component logic testing
- **E2E Tests**: Use Playwright for integration testing
- **Test Location**: E2E tests in `/tests`, unit tests alongside components

## Important Notes

- **✅ COMPLETED**: Full migration from Svelte 4 to Svelte 5 runes (version bump from 0.0.29 to 0.2.0)
- All components now use Svelte 5 runes syntax (`$props()`, `$state()`, `$effect()`, Snippets API)
- Event handlers use modern `onevent` syntax instead of `on:event`
- Workspace linking set up with framework packages using pnpm
- Build and type checking passes successfully
- When modifying components, continue using Svelte 5 runes syntax
- The library depends on `@cinderlink/core-types` and `@cinderlink/protocol` packages (linked via workspace)
- UnoCSS configuration includes custom extractors for Svelte files

## Svelte 5 Migration Patterns Used

### Props and State
```typescript
// Props declaration
interface Props {
  value?: string;
  disabled?: boolean;
  children?: Snippet;
}

let { value = '', disabled = false, children }: Props = $props();

// Reactive state
let count = $state(0);

// Derived values  
let doubled = $derived(count * 2);

// Bindable props
let checked = $bindable(false);
```

### Event Handlers
```svelte
<!-- Modern Svelte 5 syntax -->
<button onclick={handleClick}>Click me</button>

<!-- Component events use callback props -->
<MyComponent onsubmit={(data) => console.log(data)} />
```

### Snippets (replaces slots)
```svelte
<!-- Define snippet prop -->
interface Props {
  header?: Snippet;
  children?: Snippet;
}

<!-- Render snippets -->
{#if header}
  {@render header()}
{/if}

{#if children}
  {@render children()}
{/if}
```