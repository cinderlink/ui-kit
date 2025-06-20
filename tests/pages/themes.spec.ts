import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/themes/overview';

test.describe('Themes page', () => {
	test('renders headings and theme cards', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: /theming overview/i })).toBeVisible();
		await expect(page.locator('.theme-card').first()).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'themes-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'themes-dark.png');
		await checkA11y(page);
	});
});
