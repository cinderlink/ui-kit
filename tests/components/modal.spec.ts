import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/modal';

test.describe('Modal component', () => {
	test('opens and closes modal dialog', async ({ page }) => {
		await gotoAndWait(page, url);
		const trigger = page.getByRole('button', { name: /open modal/i });
		await trigger.click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await page.getByRole('button', { name: /close/i }).click();
		await expect(page.getByRole('dialog')).not.toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'modal-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'modal-dark.png');
		await checkA11y(page);
	});
});
