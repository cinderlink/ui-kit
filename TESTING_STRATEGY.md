# Testing Strategy

## Overview

The Cinderlink UI Kit uses a comprehensive testing strategy that combines fast component testing with thorough end-to-end testing.

## Test Types

### 1. Component Tests (Vitest Browser Mode)

- **Purpose**: Fast feedback during development
- **Scope**: Individual component behavior and interactions
- **Runtime**: 1-3 seconds for entire suite
- **When to run**: On every save during development, on every commit

```bash
# Run component tests
bun run test:browser

# Run with UI
bun run test:browser:ui

# Run in watch mode
bun run test:browser --watch
```

### 2. End-to-End Tests (Playwright)

- **Purpose**: Validate complete user journeys and cross-browser compatibility
- **Scope**: Multi-page flows, integrations, visual regression
- **Runtime**: 30+ seconds (runs in parallel across browsers)
- **When to run**: On PRs, before deployment, after deployment

```bash
# Run E2E tests
bun run test:e2e

# Run with UI
bun run test:e2e:ui

# Run specific browser
bunx playwright test --project=chromium
```

## Test Distribution

- **Component Tests (80-90%)**:

  - Component props and state
  - User interactions
  - Event handling
  - Accessibility attributes
  - Component composition

- **E2E Tests (10-20%)**:
  - Critical user paths
  - Cross-browser visual regression
  - Performance benchmarks
  - Accessibility compliance
  - Deployment smoke tests

## CI/CD Pipeline

### On Every Commit (Fast Feedback)

1. Linting (oxlint)
2. Type checking
3. Component tests (Vitest browser mode)
4. Build validation

### On Pull Requests (Comprehensive)

1. All commit checks
2. E2E tests across browsers (Chrome, Firefox, Safari)
3. Visual regression tests
4. Performance monitoring
5. Bundle size analysis
6. Test coverage reporting

### On Main Branch (Release Ready)

1. All PR checks
2. Performance benchmarks
3. Accessibility audit
4. Package publishing

## Performance Targets

- **Component Tests**: < 5 seconds total
- **E2E Tests**: < 2 minutes total
- **First Paint**: < 1 second
- **Total Bundle Size**: < 500KB
- **Test Coverage**: > 80%

## Writing Tests

### Component Test Example

```typescript
import { render } from 'vitest-browser-svelte';
import { expect, test } from 'vitest';
import Button from './Button.svelte';

test('handles click events', async () => {
	let clicked = false;
	const screen = render(Button, {
		props: {
			onclick: () => {
				clicked = true;
			}
		}
	});

	const button = await screen.getByRole('button');
	await button.click();

	expect(clicked).toBe(true);
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('user completes component exploration', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Components' }).click();
	await expect(page).toHaveURL('/components');
	// ... continue user journey
});
```

## Migration from Playwright Component Testing

We migrated from Playwright component testing to Vitest browser mode for:

- **10-30x faster execution** (1-3s vs 30+s)
- **Better Svelte 5 support** with runes
- **Simpler API** for component testing
- **Unified test runner** with unit tests

Playwright remains for true E2E testing where we need:

- Real browser contexts
- Multi-page navigation
- Network interception
- Cross-browser testing
- Visual regression testing
