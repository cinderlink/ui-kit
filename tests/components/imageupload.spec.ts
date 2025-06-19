import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/imageupload';

test.describe('ImageUpload component', () => {
	test('renders heading and dropzone', async ({ page }) => {
		await gotoAndWait(page, url);
		await expect(page.getByRole('heading', { name: 'Image Upload' })).toBeVisible();
		await expect(page.locator('input[type="file"], .image-upload')).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'imageupload-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'imageupload-dark.png');
		await checkA11y(page);
	});
});
