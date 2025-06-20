import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/indicator/loading';

test.describe('LoadingIndicator component', () => {
	test('renders heading and spinner', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Loading' })).toBeVisible();
		await expect(page.locator('.loading-indicator')).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'loadingindicator-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'loadingindicator-dark.png');
		await checkA11y(page);
	});
});
