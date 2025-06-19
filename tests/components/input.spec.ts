import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/input';

test.describe('Input component', () => {
	test('renders heading and input field', async ({ page }) => {
		// debug listeners
		page.on('console', (m) => console.log('BROWSER', m.type(), m.text()));
		page.on('pageerror', (e) => console.log('PAGE ERROR', e.message));

		await gotoAndWait(page, url);
		// gather DOM info
		const info = await page.evaluate(() => ({
			headings: Array.from(document.querySelectorAll('h1,h2,h3')).map((h) => h.textContent),
			readyState: document.readyState
		}));
		console.log('DOM INFO', info);

		const heading = page.locator('h1,h2,h3').filter({ hasText: /input/i }).first();
		await expect(heading).toBeVisible({ timeout: 15000 });
		await expect(page.locator('input').first()).toBeVisible();
	});

	test('visual + a11y light/dark', async ({ page }) => {
		await gotoAndWait(page, url);
		await snap(page, 'input-light.png');
		const toggle = await ensureToggle(page);
		await toggle.click();
		await snap(page, 'input-dark.png');
		await checkA11y(page);
	});
});
