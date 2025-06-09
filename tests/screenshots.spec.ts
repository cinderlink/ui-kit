import { test, expect } from '@playwright/test';

test.describe('Component Screenshot Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Set viewport for consistent screenshots
		await page.setViewportSize({ width: 1200, height: 800 });
	});

	test('homepage screenshot', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveScreenshot('homepage.png');
	});

	test('content components page', async ({ page }) => {
		await page.goto('/components/content');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('content-components.png');
	});

	test('interactive components page', async ({ page }) => {
		await page.goto('/components/interactive');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('interactive-components.png');
	});

	test('indicator components page', async ({ page }) => {
		await page.goto('/components/indicator');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('indicator-components.png');
	});

	test('layout components page', async ({ page }) => {
		await page.goto('/components/layout');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('layout-components.png');
	});

	test('navigation components page', async ({ page }) => {
		await page.goto('/components/navigation');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('navigation-components.png');
	});

	test('dark mode toggle', async ({ page }) => {
		await page.goto('/');
		
		// Take screenshot in light mode
		await expect(page).toHaveScreenshot('light-mode.png');
		
		// Toggle to dark mode
		await page.locator('[data-testid="theme-toggle"]').click();
		await page.waitForTimeout(500); // Wait for transition
		
		// Take screenshot in dark mode
		await expect(page).toHaveScreenshot('dark-mode.png');
	});
});

test.describe('Individual Component Screenshots', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 800, height: 600 });
	});

	test('button component variants', async ({ page }) => {
		await page.goto('/components/interactive/button');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('button-variants.png');
	});

	test('card component', async ({ page }) => {
		await page.goto('/components/content/card');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('card-component.png');
	});

	test('avatar component', async ({ page }) => {
		await page.goto('/components/content/avatar');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('avatar-component.png');
	});

	test('typography component', async ({ page }) => {
		await page.goto('/components/content/typography');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('typography-component.png');
	});

	test('notification component', async ({ page }) => {
		await page.goto('/components/content/notification');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('notification-component.png');
	});

	test('modal component', async ({ page }) => {
		await page.goto('/components/interactive/modal');
		await page.waitForLoadState('networkidle');
		
		// Take screenshot of modal trigger
		await expect(page).toHaveScreenshot('modal-trigger.png');
		
		// Open modal and take screenshot
		await page.locator('button:has-text("Open Modal")').click();
		await page.waitForTimeout(500); // Wait for modal animation
		await expect(page).toHaveScreenshot('modal-open.png');
	});

	test('dropdown component', async ({ page }) => {
		await page.goto('/components/interactive/dropdown');
		await page.waitForLoadState('networkidle');
		
		// Take screenshot of closed dropdown
		await expect(page).toHaveScreenshot('dropdown-closed.png');
		
		// Open dropdown and take screenshot
		await page.locator('[data-testid="dropdown-trigger"]').first().click();
		await page.waitForTimeout(300);
		await expect(page).toHaveScreenshot('dropdown-open.png');
	});

	test('form inputs', async ({ page }) => {
		await page.goto('/components/interactive/input');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('form-inputs.png');
	});

	test('status indicators', async ({ page }) => {
		await page.goto('/components/indicator/statusindicator');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('status-indicators.png');
	});

	test('loading indicator', async ({ page }) => {
		await page.goto('/components/indicator/loadingindicator');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveScreenshot('loading-indicator.png');
	});
});