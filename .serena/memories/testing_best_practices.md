# Testing Best Practices for Cinderlink UI Kit

## Current Testing Setup
- **Unit Tests**: Vitest with @testing-library/svelte
- **E2E Tests**: Playwright
- **Environment**: jsdom for unit tests
- **Coverage**: V8 provider with text/html reporters

## Vitest Browser Mode Setup

### Basic Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [UnoCSS(), sveltekit()],
  test: {
    // For browser mode:
    browser: {
      enabled: true,
      name: 'chromium',
      headless: true,
      provider: 'playwright' // or 'webdriverio'
    },
    // Or for jsdom mode (current):
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts']
  }
});
```

### Vitest Browser Mode with Svelte 5
For component testing in browser mode, use `vitest-browser-svelte`:
```bash
pnpm add -D vitest-browser-svelte @vitest/browser
```

Example test:
```typescript
import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import Component from './Component.svelte';

test('component behaves correctly', async () => {
  const screen = render(Component, { prop: 'value' });
  
  await screen.getByRole('button').click();
  await expect.element(screen.getByText('Updated')).toBeVisible();
});
```

## Bun Compatibility
When using Bun as package manager:
- Use `bun run test` NOT `bun test` (to use Vitest, not Bun's test runner)
- Bun.lock file indicates project supports Bun
- Commands: `bun install`, `bun run dev`, `bun run test`

## Svelte 5 & SvelteKit 2 Testing Patterns

### 1. Component Test Structure
```typescript
import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Component from './Component.svelte';

describe('Component', () => {
  it('renders with props', () => {
    const { getByText } = render(Component, {
      props: { 
        children: () => 'Content',
        value: 'test'
      }
    });
    expect(getByText('Content')).toBeInTheDocument();
  });
});
```

### 2. Testing Svelte 5 Runes
- Props are passed via `props` object
- Children use snippet syntax: `children: () => 'content'`
- Event handlers are passed as props: `onclick: vi.fn()`
- State changes trigger re-renders automatically

### 3. Mock Strategies
```typescript
// Mock SvelteKit runtime modules
vi.mock('$app/stores', () => ({
  page: { subscribe: vi.fn() }
}));

// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
  json: () => Promise.resolve({ data: 'test' })
});
```

### 4. Testing Philosophy
- **Unit tests**: Test logic in isolation, keep fast
- **Component tests**: Test mounting, interactions, lifecycle
- **Integration tests**: Test component combinations
- **E2E tests**: Test full user workflows

### 5. Best Practices
1. Use Testing Library queries (getByRole, getByText)
2. Avoid testing implementation details
3. Test user behavior, not component internals
4. Use `vi.fn()` for mocking functions
5. Clean up automatically happens before tests
6. Use Vitest's retry mechanism for async operations
7. Organize tests next to components (.test.ts files)
8. Enable coverage reporting for quality metrics

## Running Tests
```bash
# Unit tests
pnpm test:unit
pnpm test:unit:watch
pnpm test:coverage

# E2E tests
pnpm test

# With Bun
bun run test:unit
```

## Migration to Browser Mode
When ready to migrate from jsdom to browser mode:
1. Install browser provider (playwright/webdriverio)
2. Update vitest.config.ts to enable browser mode
3. Replace @testing-library/svelte with vitest-browser-svelte
4. Update test imports and syntax
5. Configure CI to install browser dependencies