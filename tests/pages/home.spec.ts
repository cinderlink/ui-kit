import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/';

test.describe('Home page', () => {
  test('renders hero and sections', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: /customizable svelte ui kit/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /getting started/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /components/i })).toBeVisible();
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'home-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'home-dark.png');
    await checkA11y(page);
  });
});
