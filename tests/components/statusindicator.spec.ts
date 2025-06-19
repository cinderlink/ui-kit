import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/indicator/status';

test.describe('StatusIndicator component', () => {
  test('renders heading and indicator', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: 'Status' })).toBeVisible();
    await expect(page.locator('.status-indicator')).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'statusindicator-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'statusindicator-dark.png');
    await checkA11y(page);
  });
});
