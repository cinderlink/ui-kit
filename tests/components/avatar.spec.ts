import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/content/avatar';

test.describe('Avatar component', () => {
	test('renders heading and avatar image', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Avatar' })).toBeVisible();
		await expect(page.locator('img.avatar')).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'avatar-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'avatar-dark.png');
		await checkA11y(page);
	});
});
