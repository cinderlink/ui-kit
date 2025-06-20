# Testing Svelte 5 Components

## Current Status

As of early 2025, testing Svelte 5 components is still evolving. The traditional testing libraries like `@testing-library/svelte` are still catching up with Svelte 5's new runes API and component architecture.

## Challenges

1. **Component API Changes**: Svelte 5 removed the `new Component()` API, which most testing libraries relied on
2. **Snippets**: The new snippets API for slots requires different testing approaches
3. **Runes**: Testing reactive state with `$state()` and `$derived()` requires new patterns

## Current Approaches

### 1. Unit Tests for Logic

Extract business logic into separate functions and test those directly:

```typescript
// utils/calculations.ts
export function calculateTotal(items: Item[]) {
	return items.reduce((sum, item) => sum + item.price, 0);
}

// utils/calculations.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculations';

describe('calculateTotal', () => {
	it('sums item prices', () => {
		expect(calculateTotal([{ price: 10 }, { price: 20 }])).toBe(30);
	});
});
```

### 2. E2E Tests with Playwright

For component behavior testing, use Playwright E2E tests:

```typescript
import { test, expect } from '@playwright/test';

test('button click increments counter', async ({ page }) => {
	await page.goto('/components/interactive/button');
	await page.click('button:has-text("Increment")');
	await expect(page.locator('text=Count: 1')).toBeVisible();
});
```

### 3. Visual Regression Tests

Use Playwright's screenshot testing for visual components:

```typescript
test('button variants', async ({ page }) => {
	await page.goto('/components/interactive/button');
	await expect(page).toHaveScreenshot('button-variants.png');
});
```

## Future Testing Strategy

Once Svelte 5 testing libraries mature, we'll migrate to:

1. **@testing-library/svelte v6+** - When it fully supports Svelte 5
2. **vitest-browser-svelte** - For browser-based component testing
3. **Svelte Testing Library** - Official testing utilities from Svelte team

## Recommendations

1. **Focus on E2E tests** for critical user flows
2. **Extract and test business logic** separately from components
3. **Use visual regression tests** for UI consistency
4. **Wait for library updates** before investing heavily in component unit tests
5. **Keep test stubs** (`.todo()`) for future implementation

## Resources

- [Svelte 5 Testing Docs](https://svelte.dev/docs/svelte/testing)
- [Vitest Browser Mode](https://vitest.dev/guide/browser/)
- [Playwright Component Testing](https://playwright.dev/docs/test-components)
