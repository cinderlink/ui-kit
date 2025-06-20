import { test, expect } from '@playwright/test';

test.describe('Navigation User Journey', () => {
	test('user can navigate through documentation sections', async ({ page }) => {
		// Start at homepage
		await page.goto('/');

		// Verify homepage loads
		await expect(page).toHaveTitle(/@cinderlink\/ui-kit/);
		await expect(page.getByRole('heading', { name: 'Customizable Svelte UI Kit' })).toBeVisible();

		// Navigate to Quick Start guide
		await page.getByRole('link', { name: 'Quick Start' }).click();
		await expect(page).toHaveURL('/guides/quickstart');
		await expect(page.getByRole('heading', { name: 'Quick Start' }).first()).toBeVisible();

		// Navigate to Components section - click on Content which is the first component group
		// Use specific selector for navigation drawer with more robust handling
		await page.waitForSelector('nav', { timeout: 10000 });

		// Scroll to ensure element is in viewport and force click to handle CI differences
		const contentDrawer = page
			.locator('.nav-drawer .drawer__toggle')
			.filter({ hasText: 'Content' });
		await contentDrawer.scrollIntoViewIfNeeded();
		await contentDrawer.click({ force: true });

		// Wait for drawer to expand and content to be visible - be more flexible with selector
		await page.waitForTimeout(500); // Give drawer time to expand
		const viewContentLink = page.getByRole('link', { name: 'View Content' });
		await expect(viewContentLink).toBeVisible({ timeout: 10000 });
		await viewContentLink.click();
		await expect(page).toHaveURL('/components/content');

		// Explore a component
		await page.getByRole('link', { name: 'Button' }).first().click();
		await expect(page).toHaveURL(/\/components\/interactive\/button/);
		await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();

		// Test component interactivity
		const demoButton = page.getByRole('button', { name: 'Click me' }).first();
		await expect(demoButton).toBeVisible();
		await demoButton.click();

		// Navigate to themes
		await page.getByRole('link', { name: 'Themes' }).click();
		await expect(page).toHaveURL(/\/themes/);

		// Test dark mode toggle
		const themeToggle = page.getByRole('button', { name: /theme/i });
		await themeToggle.click();

		// Verify dark mode is applied
		await expect(page.locator('html')).toHaveClass(/dark/);

		// Toggle back to light mode
		await themeToggle.click();
		await expect(page.locator('html')).not.toHaveClass(/dark/);
	});

	test('responsive navigation works on mobile', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Wait for navigation to be available
		await page.waitForSelector('nav', { timeout: 10000 });

		// Navigate on mobile - navigate to a component group
		// Handle mobile viewport issues more robustly
		await page.waitForSelector('nav', { timeout: 10000 });

		// Scroll sidebar to top to ensure navigation is accessible
		await page.locator('nav').evaluate((nav) => (nav.scrollTop = 0));

		// Use more robust mobile interaction
		const interactiveDrawer = page
			.locator('.nav-drawer .drawer__toggle')
			.filter({ hasText: 'Interactive' });
		await interactiveDrawer.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500); // Let layout stabilize
		await interactiveDrawer.click({ force: true });

		// Wait for the drawer to expand and the link to be visible
		await page.waitForTimeout(500); // Give drawer time to expand
		const viewInteractiveLink = page.getByRole('link', { name: 'View Interactive' });
		await expect(viewInteractiveLink).toBeVisible({ timeout: 10000 });
		await viewInteractiveLink.click();
		await expect(page).toHaveURL('/components/interactive');
	});
});
