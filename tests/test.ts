import { expect, test } from '@playwright/test';

test('index page loads correctly', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
	await expect(page.locator('#brand')).toHaveText('@cinderlink/ui-kit');
});
