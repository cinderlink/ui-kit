# Code Style and Conventions

## Svelte 5 Patterns

### Component Structure
```typescript
<script lang="ts">
  // 1. Imports
  import type { Snippet } from 'svelte';
  
  // 2. Props interface
  interface Props {
    required: string;
    optional?: number;
    callback?: (value: string) => void;
    children?: Snippet;
  }
  
  // 3. Props destructuring with defaults
  let { required, optional = 42, callback, children }: Props = $props();
  
  // 4. State
  let count = $state(0);
  
  // 5. Derived values
  let doubled = $derived(count * 2);
  
  // 6. Effects
  $effect(() => {
    console.log('Effect runs');
  });
  
  // 7. Functions
  function handleClick(event: MouseEvent) {
    // implementation
  }
</script>
```

### Event Handlers
- Use `onevent` syntax: `<button onclick={handleClick}>`
- NOT `on:event` syntax (legacy)

### Snippets (not slots)
```svelte
{#if children}
  {@render children()}
{/if}
```

## TypeScript Conventions
- Always use TypeScript (`lang="ts"`)
- Define interfaces for all component props
- Use strict mode
- Prefer type inference when obvious
- Use standard DOM event types (MouseEvent, etc.)

## File Organization
```
ComponentName/
├── ComponentName.svelte       # Main component
├── ComponentName.story.svelte # Story/documentation
├── ComponentName.test.ts      # Unit tests
├── index.ts                   # Exports
└── types.ts                   # Types (if needed)
```

## Naming Conventions
- Components: PascalCase (Button.svelte)
- Files: PascalCase for components
- Props: camelCase
- CSS classes: kebab-case with BEM-like prefixes
- Events: lowercase (onclick, onsubmit)

## CSS/Styling
- Use UnoCSS utility classes
- Custom CSS uses `.component-name` prefix
- Dark mode via `dark:` prefix
- Glass morphism effects standard

## Code Formatting
- Tabs for indentation (not spaces)
- Single quotes for strings
- No trailing commas
- 100 character line width
- Prettier enforced via pre-commit hooks

## Testing Patterns
- Unit tests with Vitest + @testing-library/svelte
- Use `describe`, `it`, `expect` from vitest
- Mock functions with `vi.fn()`
- Test accessibility
- E2E tests with Playwright

## Import Order
1. External dependencies
2. Svelte imports
3. Internal framework imports (@cinderlink/*)
4. Local imports
5. Type imports

## Comments
- Minimal comments - code should be self-documenting
- Only add comments for complex logic
- Use JSDoc for public APIs