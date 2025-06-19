import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/guides/examples';

test.describe('Guides – Examples', () => {
  test('renders headings', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: /examples/i })).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'guides-examples-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'guides-examples-dark.png');
    await checkA11y(page);
  });
});
