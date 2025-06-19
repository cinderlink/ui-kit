import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/guides/quickstart';

test.describe('Guides – Quick Start', () => {
	test('renders headings', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: /quick start/i })).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'guides-quickstart-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'guides-quickstart-dark.png');
		await checkA11y(page);
	});
});
