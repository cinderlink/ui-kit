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

		// Wait for drawer to expand and individual component links to be visible
		// Content group shows individual components, not a "View Content" link
		await page.waitForTimeout(500); // Give drawer time to expand
		const avatarLink = page.getByRole('link', { name: 'Avatar' });
		await expect(avatarLink).toBeVisible({ timeout: 10000 });

		// Click on Avatar component to verify navigation works
		await avatarLink.click();
		await expect(page).toHaveURL('/components/content/avatar');

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

		// Navigate on mobile - use Getting Started items which have "View" links
		// Handle mobile viewport issues more robustly
		await page.waitForSelector('nav', { timeout: 10000 });

		// Scroll sidebar to top to ensure navigation is accessible
		await page.locator('nav').evaluate((nav) => (nav.scrollTop = 0));

		// Use Getting Started item which doesn't have components array
		const installationDrawer = page
			.locator('.nav-drawer .drawer__toggle')
			.filter({ hasText: 'Installation' });
		await installationDrawer.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500); // Let layout stabilize
		await installationDrawer.click({ force: true });

		// Wait for the drawer to expand and the "View Installation" link to be visible
		await page.waitForTimeout(500); // Give drawer time to expand
		const viewInstallationLink = page.getByRole('link', { name: 'View Installation' });
		await expect(viewInstallationLink).toBeVisible({ timeout: 10000 });
		await viewInstallationLink.click();
		await expect(page).toHaveURL('/guides/installation');
	});
});
