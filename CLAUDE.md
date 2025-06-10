# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Cinderlink UI Kit (`@cinderlink/ui-kit`), a Svelte 5-based component library that provides reusable UI components for the Cinderlink ecosystem. The library uses the new Svelte 5 runes API (`$props()`, `$state()`, `$effect()`) and is styled with UnoCSS.

## Development Commands

**IMPORTANT**: This project uses pnpm workspaces. Always use `pnpm` instead of `npm` to ensure workspace linking works properly.

```bash
# Development
pnpm dev                 # Start dev server on port 3002
pnpm watch               # Watch mode for package building

# Building
pnpm build               # Build the library package

# Testing
pnpm test                # Run Playwright E2E tests
pnpm test:unit           # Run Vitest unit tests
pnpm test:unit:watch     # Run unit tests in watch mode
pnpm test:coverage       # Run tests with coverage

# Code Quality
pnpm check               # Type checking with svelte-check
pnpm lint                # ESLint for .svelte, .js, .ts files
pnpm format              # Format code with Prettier
pnpm format:check        # Check formatting without changes
```

### Long-Running Processes

When starting long-running processes like the dev server, use screen or tmux for resumable sessions:

```bash
# Using screen (recommended)
screen -S ui-kit-dev
pnpm dev
# Detach with Ctrl+A, D
# Reattach with: screen -r ui-kit-dev

# Using tmux (alternative)
tmux new-session -d -s ui-kit-dev 'pnpm dev'
# Attach with: tmux attach -t ui-kit-dev
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
- **✅ COMPLETED**: All template literal script tag issues resolved, 0 TypeScript errors
- **CRITICAL**: Always use `pnpm` instead of `npm` - this project uses pnpm workspaces
- All components now use Svelte 5 runes syntax (`$props()`, `$state()`, `$effect()`, Snippets API)
- Event handlers use modern `onevent` syntax instead of `on:event`
- Workspace linking set up with framework packages using pnpm
- Build and type checking passes successfully
- When modifying components, continue using Svelte 5 runes syntax
- The library depends on `@cinderlink/core-types` and `@cinderlink/protocol` packages (linked via workspace)
- UnoCSS configuration includes custom extractors for Svelte files
- For long-running processes (dev server), use screen or tmux for resumable sessions

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

## TypeScript Integration with Svelte 5 Runes

### Core TypeScript Setup

1. **Component Script Setup**
```svelte
<script lang="ts">
  // Always use TypeScript in components
</script>
```

2. **tsconfig.json Requirements**
```json
{
  "compilerOptions": {
    "target": "ES2022",           // Minimum ES2022 for runes
    "verbatimModuleSyntax": true, // Required for Svelte 5
    "isolatedModules": true,      // Required for Svelte 5
    "strict": true                // Enable strict type checking
  }
}
```

3. **File Extensions for Runes Outside Components**
- Use `.svelte.ts` or `.svelte.js` to use runes in non-component files
- Required for shared state management with runes

### Runes Type Annotations

#### $state() Typing
```typescript
// Explicit typing
let count = $state<number>(0);
let message = $state<string>('hello');
let items = $state<string[]>([]);

// Type inference (preferred when obvious)
let count = $state(0);           // inferred as number
let message = $state('hello');   // inferred as string
```

#### $derived() Typing
```typescript
let count = $state(0);

// Explicit typing
let doubled = $derived<number>(count * 2);

// Type inference (preferred)
let doubled = $derived(count * 2);           // inferred as number
let isEven = $derived(count % 2 === 0);      // inferred as boolean
```

#### $props() Typing
```typescript
// Interface-based typing (recommended)
interface Props {
  required: string;
  optional?: number;
  callback?: (value: string) => void;
  children?: Snippet;
}

let { required, optional = 42, callback, children }: Props = $props();

// Inline typing (for simple cases)
let { name, age } = $props<{ name: string; age: number }>();
```

#### $effect() Typing
```typescript
// Effects don't need explicit typing (void return)
$effect(() => {
  console.log('Effect runs');
});

// Pre-effect with cleanup
$effect(() => {
  const cleanup = setupSomething();
  
  return () => {
    cleanup();
  };
});
```

#### $bindable() Typing
```typescript
interface Props {
  value: string;
}

let { value = $bindable('') }: Props = $props();
// Type is inferred from the interface
```

### Generic Components
```typescript
<script lang="ts" generics="T extends Record<string, any>">
  interface Props {
    items: T[];
    onSelect: (item: T) => void;
  }
  
  let { items, onSelect }: Props = $props();
</script>
```

### Event Handler Typing
```typescript
// Use standard DOM event types
function handleClick(event: MouseEvent) {
  // TypeScript knows event is MouseEvent
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
}

// Custom event handlers via props
interface Props {
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
}
```

### Shared State with Runes (store.svelte.ts)
```typescript
// file: store.svelte.ts
export class AppState {
  count = $state(0);
  user = $state<User | null>(null);
  
  increment() {
    this.count++;
  }
  
  setUser(user: User) {
    this.user = user;
  }
}

export const appState = new AppState();
```

### Component Type Utilities
```typescript
import type { Component, ComponentProps } from 'svelte';
import MyComponent from './MyComponent.svelte';

// Extract component prop types
type MyComponentProps = ComponentProps<MyComponent>;

// Component type for dynamic components
let currentComponent: Component = MyComponent;
```

### Type Checking Commands

#### svelte-check with Machine-Readable Output
```bash
# Basic machine output
npx svelte-check --output machine

# Verbose machine output (JSON format)
npx svelte-check --output machine-verbose

# Set error threshold
npx svelte-check --threshold error

# Watch mode
npx svelte-check --watch

# Ignore specific files
npx svelte-check --ignore "src/legacy/**"
```

#### Machine Output Format
```bash
# Basic format
1590680326283 ERROR "component.svelte" 1:16 "Type error message"

# Verbose JSON format
1590680326283 {"type":"ERROR","filename":"component.svelte","start":{"line":1,"character":16},"end":{"line":1,"character":23},"message":"Type error","code":2307,"source":"typescript"}
```

### Common TypeScript Issues & Solutions

#### Issue: Runes not recognized
```typescript
// ❌ Wrong - trying to import runes
import { $state } from 'svelte/runes';

// ✅ Correct - runes are language keywords
let count = $state(0);
```

#### Issue: Type conflicts with DOM events
```typescript
// ❌ Wrong - conflicting types
function onclick(event: any) {}

// ✅ Correct - proper event typing
function onclick(event: MouseEvent) {}
```

#### Issue: Props destructuring errors
```typescript
// ❌ Wrong - missing interface
let { value } = $props();

// ✅ Correct - typed interface
interface Props {
  value: string;
}
let { value }: Props = $props();
```

### Migration from Svelte 4 TypeScript
```typescript
// Svelte 4 (legacy)
export let value: string;
$: doubled = value.length * 2;

// Svelte 5 (runes)
interface Props {
  value: string;
}
let { value }: Props = $props();
let doubled = $derived(value.length * 2);
```

### Development Workflow
1. Use `svelte-check` for type validation
2. Configure IDE with Svelte extension
3. Enable strict TypeScript mode
4. Use machine-readable output for CI/CD
5. Prefer type inference over explicit typing when obvious
6. Always type component props interfaces
7. Use `.svelte.ts` for shared state with runes