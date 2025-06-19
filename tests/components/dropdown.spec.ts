import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/dropdown';

test.describe('Dropdown component', () => {
  test('renders heading and trigger', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: 'Dropdown' })).toBeVisible();
    await expect(page.locator('[data-testid="dropdown-trigger"]')).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'dropdown-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'dropdown-dark.png');
    await checkA11y(page);
  });
});
