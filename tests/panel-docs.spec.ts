import { test, expect } from '@playwright/test';

test.describe('Panel Documentation', () => {
	test('panel documentation page', async ({ page }) => {
		await page.setViewportSize({ width: 1400, height: 900 });
		await page.goto('/components/content/panel');
		await page.waitForTimeout(1000);
		await expect(page).toHaveScreenshot('panel-docs-light.png');
	});

	test('panel documentation dark mode', async ({ page }) => {
		await page.setViewportSize({ width: 1400, height: 900 });
		await page.goto('/components/content/panel');
		await page.locator('[data-testid="theme-toggle"]').click();
		await page.waitForTimeout(1000);
		await expect(page).toHaveScreenshot('panel-docs-dark.png');
	});

	test('panel hover effects', async ({ page }) => {
		await page.setViewportSize({ width: 1400, height: 900 });
		await page.goto('/components/content/panel');
		await page.waitForTimeout(1000);

		// Hover over the first interactive panel
		const firstPanel = page.locator('.glass-panel--interactive').first();
		await firstPanel.hover();
		await page.waitForTimeout(500);
		await expect(page).toHaveScreenshot('panel-hover-light.png');

		// Test dark mode hover
		await page.locator('[data-testid="theme-toggle"]').click();
		await firstPanel.hover();
		await page.waitForTimeout(500);
		await expect(page).toHaveScreenshot('panel-hover-dark.png');
	});
});
