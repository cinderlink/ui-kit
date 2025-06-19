import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/select';

test.describe('Select component', () => {
	test('renders heading and select element', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Select' })).toBeVisible();
		await expect(page.locator('select').first()).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'select-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'select-dark.png');
		await checkA11y(page);
	});
});
