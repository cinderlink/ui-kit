import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/feedback/notification';

test.describe('Notification component', () => {
  test('shows success toast', async ({ page }) => {
    await gotoAndWait(page, url);
    const trigger = page.getByRole('button', { name: /show success/i });
    await trigger.click();
    await expect(page.getByText(/operation successful/i)).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'notification-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'notification-dark.png');
    await checkA11y(page);
  });
});
