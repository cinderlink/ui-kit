import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/content/panel';

test.describe('Panel component', () => {
	test('renders heading and sample panel', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Panel' })).toBeVisible();
		await expect(page.locator('.panel')).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'panel-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'panel-dark.png');
		await checkA11y(page);
	});
});
