import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/content/card';

test.describe('Card component', () => {
  test('renders heading and sample card', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: 'Card' })).toBeVisible();
    await expect(page.locator('.card')).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'card-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'card-dark.png');
    await checkA11y(page);
  });
});
