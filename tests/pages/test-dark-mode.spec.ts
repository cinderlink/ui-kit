import { test } from '@playwright/test';
import { gotoAndWait, snap, checkA11y } from '../helpers/utils';

const url = '/test-dark-mode';

test.describe('Dark Mode Demo Page', () => {
  test('toggles theme and matches screenshots', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'dark-demo-light.png');
    await page.locator('[data-testid="theme-toggle"]').click();
    await snap(page, 'dark-demo-dark.png');
    await checkA11y(page);
  });
});
