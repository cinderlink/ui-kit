import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

test.describe('Guides – Installation', () => {
  const url = '/guides/installation';

  test('renders headings', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: /installation/i })).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'guides-installation-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'guides-installation-dark.png');
    await checkA11y(page);
  });
});
