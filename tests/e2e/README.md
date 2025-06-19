# E2E Tests

This directory contains end-to-end tests using Playwright that test complete user journeys, cross-browser compatibility, and deployment validation.

## Test Categories

### 1. User Journey Tests (`navigation.e2e.ts`)

- Complete user flows through the application
- Multi-page interactions
- State persistence across pages

### 2. Visual Regression Tests (`visual-regression.e2e.ts`)

- Cross-browser visual consistency
- Responsive design validation
- Theme switching visual tests

### 3. Performance Tests (`performance.e2e.ts`)

- Page load performance
- Memory leak detection
- Bundle size validation

### 4. Accessibility Tests (`accessibility.e2e.ts`)

- WCAG compliance
- Keyboard navigation
- Screen reader compatibility

## Running E2E Tests

```bash
# Run all E2E tests
bun run test:e2e

# Run E2E tests with UI
bun run test:e2e:ui

# Run specific test file
bunx playwright test tests/e2e/navigation.e2e.ts

# Run tests in specific browser
bunx playwright test --project=chromium

# Run tests in headed mode (see browser)
bunx playwright test --headed

# Debug a specific test
bunx playwright test --debug
```

## Writing E2E Tests

E2E tests should focus on:

- Real user scenarios
- Cross-browser compatibility
- Integration with external services
- Performance benchmarks
- Accessibility compliance

Example:

```typescript
test('user completes onboarding flow', async ({ page }) => {
	// Test complete user journey
	await page.goto('/onboarding');
	// ... multi-step flow
});
```

## CI/CD Integration

E2E tests run on:

- Pull requests (smoke tests)
- Pre-deployment (full suite)
- Post-deployment (validation)

## Component Tests vs E2E Tests

- **Component Tests** (Vitest Browser Mode): Fast, isolated, development feedback
- **E2E Tests** (Playwright): Complete flows, cross-browser, deployment validation
