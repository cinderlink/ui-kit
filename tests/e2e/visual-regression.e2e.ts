import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
	test('homepage renders consistently across browsers', async ({ page, browserName }) => {
		await page.goto('/');

		// Wait for page to fully load
		await page.waitForLoadState('networkidle');

		// Take screenshot for visual regression
		await expect(page).toHaveScreenshot(`homepage-${browserName}.png`, {
			fullPage: true,
			animations: 'disabled'
		});
	});

	test('component gallery visual consistency', async ({ page, browserName }) => {
		await page.goto('/components');
		await page.waitForLoadState('networkidle');

		// Ensure all images are loaded
		await page.waitForTimeout(1000);

		await expect(page).toHaveScreenshot(`components-gallery-${browserName}.png`, {
			fullPage: true,
			animations: 'disabled'
		});
	});

	test('dark mode visual consistency', async ({ page, browserName }) => {
		await page.goto('/');

		// Toggle dark mode
		const themeToggle = page.getByRole('button', { name: /theme/i });
		await themeToggle.click();

		// Wait for theme transition
		await page.waitForTimeout(300);

		await expect(page).toHaveScreenshot(`homepage-dark-${browserName}.png`, {
			fullPage: true,
			animations: 'disabled'
		});
	});

	test.describe('Responsive Design', () => {
		const viewports = [
			{ name: 'mobile', width: 375, height: 667 },
			{ name: 'tablet', width: 768, height: 1024 },
			{ name: 'desktop', width: 1920, height: 1080 }
		];

		for (const viewport of viewports) {
			test(`renders correctly at ${viewport.name} size`, async ({ page }) => {
				await page.setViewportSize({ width: viewport.width, height: viewport.height });
				await page.goto('/');
				await page.waitForLoadState('networkidle');

				await expect(page).toHaveScreenshot(`homepage-${viewport.name}.png`, {
					fullPage: true,
					animations: 'disabled'
				});
			});
		}
	});
});
