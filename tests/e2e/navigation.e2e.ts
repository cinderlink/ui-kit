import { test, expect } from '@playwright/test';

test.describe('Navigation User Journey', () => {
	test('user can navigate through documentation sections', async ({ page }) => {
		// Start at homepage
		await page.goto('/');

		// Verify homepage loads
		await expect(page).toHaveTitle(/Cinderlink UI Kit/);
		await expect(page.getByRole('heading', { name: 'Cinderlink UI Kit' })).toBeVisible();

		// Navigate to Quick Start guide
		await page.getByRole('link', { name: 'Quick Start' }).click();
		await expect(page).toHaveURL('/guides/quickstart');
		await expect(page.getByRole('heading', { name: 'Quick Start' })).toBeVisible();

		// Navigate to Components section
		await page.getByRole('link', { name: 'Components' }).click();
		await expect(page).toHaveURL('/components');

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

		// Mobile menu should be hidden initially
		const mobileMenu = page.getByRole('navigation').first();

		// Look for hamburger menu button (if implemented)
		const menuButton = page.getByRole('button', { name: /menu/i });
		if (await menuButton.isVisible()) {
			await menuButton.click();
			await expect(mobileMenu).toBeVisible();
		}

		// Navigate on mobile
		await page.getByRole('link', { name: 'Components' }).click();
		await expect(page).toHaveURL('/components');
	});
});
