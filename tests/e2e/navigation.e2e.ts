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
		await page.waitForSelector('text=Content', { timeout: 10000 });
		await page.getByText('Content').click();
		// Wait for the drawer to expand, then click the View Content link
		await page.waitForSelector('text=View Content', { timeout: 10000 });
		await page.getByRole('link', { name: 'View Content' }).click();
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
		// Wait for the Interactive text to be visible and clickable
		await page.waitForSelector('text=Interactive', { timeout: 10000 });
		
		// Force click since element might be outside viewport on mobile
		await page.getByText('Interactive').click({ force: true });

		// Wait for the drawer to expand and the link to be visible
		await page.waitForSelector('text=View Interactive', { timeout: 10000 });
		await page.getByRole('link', { name: 'View Interactive' }).click();
		await expect(page).toHaveURL('/components/interactive');
	});
});
