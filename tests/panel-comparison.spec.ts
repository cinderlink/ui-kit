import { test, expect } from '@playwright/test';
import { gotoAndWait, ensureToggle, snap } from './helpers/utils';
import AxeBuilder from '@axe-core/playwright';

const url = '/components/content/panel';

test.describe('Panel Component Comparison', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1400, height: 900 });
    });

    test('panel comparison light mode', async ({ page }) => {
        await gotoAndWait(page, url);
        await snap(page, 'panel-comparison-light.png');
    });

    test('panel comparison dark mode', async ({ page }) => {
        await gotoAndWait(page, url);
        // Ensure toggle is visible (layout hides on xl); shrink viewport then restore
        await page.setViewportSize({ width: 800, height: 900 });
        const toggle = await ensureToggle(page);
        await toggle.click();
        await snap(page, 'panel-comparison-dark.png');
    });

    test('panel accessibility check', async ({ page }) => {
        await gotoAndWait(page, url);
        const lightResults = await new AxeBuilder({ page: page as any }).include('.panel').analyze();
        expect(lightResults.violations).toEqual([]);

        const toggle = await ensureToggle(page);
        await toggle.click();

        const darkResults = await new AxeBuilder({ page: page as any }).include('.panel').analyze();
        expect(darkResults.violations).toEqual([]);
    });

    test('panel hover interactions', async ({ page }) => {
        await gotoAndWait(page, url);
        const interactivePanel = page.locator('.panel--interactive').first();
        await interactivePanel.scrollIntoViewIfNeeded();
        await interactivePanel.waitFor({ state: 'visible', timeout: 5000 });
        await interactivePanel.hover();
        await page.waitForTimeout(200);
        await snap(page, 'panel-hover-effect.png');
    });
});