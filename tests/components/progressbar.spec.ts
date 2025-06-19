import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/indicator/progressbar';

test.describe('ProgressBar component', () => {
	test('renders heading and bar element', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Progress Bar' })).toBeVisible();
		await expect(page.locator('.progress__bar')).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'progressbar-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'progressbar-dark.png');
		await checkA11y(page);
	});
});
