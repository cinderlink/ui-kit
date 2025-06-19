import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap, checkA11y } from '../helpers/utils';

const url = '/components/interactive/button';

// Assertions and visual checks specific to Button component variants
// Variants rendered in story: Glass (default), Frosted, Outlined, Ghost, Purple, Pink, etc.

test.describe('Button component', () => {
  test('renders main heading', async ({ page }) => {
    await gotoAndWait(page, url);
    await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
  });

  test('all key variant labels visible', async ({ page }) => {
    await gotoAndWait(page, url);
    const labels = [
      'Glass Button',
      'Frosted Glass',
      'Outlined',
      'Ghost Button',
      'Purple',
      'Pink',
      'Green',
      'Blue',
      'Yellow',
      'Red'
    ];
    for (const label of labels) {
      await expect(page.getByText(label, { exact: false })).toBeVisible();
    }
  });

  test('visual + a11y light/dark', async ({ page }) => {
    await gotoAndWait(page, url);
    await snap(page, 'button-light.png');
    const toggle = await ensureToggle(page);
    await toggle.click();
    await snap(page, 'button-dark.png');
    await checkA11y(page);
  });
});
