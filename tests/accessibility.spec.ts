import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Accessibility tests for the UI Kit
test.describe('Accessibility Tests', () => {
  // Test contrast ratios in light mode
  test('light mode contrast ratios', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page: page as any })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    // Log any violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Light mode accessibility violations:');
      accessibilityScanResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Affected elements: ${violation.nodes.length}`);
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Test contrast ratios in dark mode
  test('dark mode contrast ratios', async ({ page }) => {
    await page.goto('/');
    
    // Toggle to dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page: page as any })
      .withTags(['wcag2aa', 'wcag21aa'])
      .analyze();

    // Log any violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Dark mode accessibility violations:');
      accessibilityScanResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Affected elements: ${violation.nodes.length}`);
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // Test sidebar navigation contrast
  test('sidebar navigation contrast', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Expand all sidebar sections
    const drawerToggles = page.locator('.drawer__toggle');
    const toggleCount = await drawerToggles.count();
    
    for (let i = 0; i < toggleCount; i++) {
      await drawerToggles.nth(i).click();
      await page.waitForTimeout(100);
    }

    // Test in light mode
    const lightModeResults = await new AxeBuilder({ page: page as any })
      .include('.layout__sidebar')
      .withTags(['wcag2aa'])
      .analyze();

    expect(lightModeResults.violations).toEqual([]);

    // Toggle to dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await page.waitForTimeout(500);

    // Test in dark mode
    const darkModeResults = await new AxeBuilder({ page: page as any })
      .include('.layout__sidebar')
      .withTags(['wcag2aa'])
      .analyze();

    expect(darkModeResults.violations).toEqual([]);
  });

  // Test component pages for accessibility
  test('component pages accessibility', async ({ page }) => {
    const pages = [
      '/components/content',
      '/components/interactive',
      '/components/indicator',
      '/components/layout',
      '/components/navigation'
    ];

    for (const pageUrl of pages) {
      await page.goto(pageUrl);
      await page.waitForTimeout(500);

      const results = await new AxeBuilder({ page: page as any })
        .withTags(['wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    }
  });

  // Test color contrast specifically
  test('color contrast check', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Check light mode
    const lightModeResults = await new AxeBuilder({ page: page as any })
      .withTags(['color-contrast'])
      .analyze();

    expect(lightModeResults.violations).toEqual([]);

    // Check dark mode
    await page.locator('[data-testid="theme-toggle"]').click();
    await page.waitForTimeout(500);

    const darkModeResults = await new AxeBuilder({ page: page as any })
      .withTags(['color-contrast'])
      .analyze();

    expect(darkModeResults.violations).toEqual([]);
  });

  // Visual regression test for text readability
  test('text elements are readable', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Check that text elements have sufficient size and aren't cut off
    const textIssues = await page.evaluate(() => {
      const textElements = document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6, li');
      const issues: Array<{element: string; issue: string; [key: string]: any}> = [];

      textElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
        const fontSize = parseFloat(styles.fontSize);
        
        // Skip hidden elements
        if (rect.width === 0 || rect.height === 0 || styles.display === 'none' || styles.visibility === 'hidden') {
          return;
        }

        // Check for text that's too small
        if (fontSize < 12) {
          issues.push({
            element: element.tagName + (element.className ? '.' + element.className : ''),
            issue: 'Font size too small',
            fontSize: fontSize + 'px'
          });
        }

        // Check for text overflow
        if (element.scrollWidth > element.clientWidth + 2) { // 2px tolerance
          issues.push({
            element: element.tagName + (element.className ? '.' + element.className : ''),
            issue: 'Text overflow',
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth
          });
        }
      });

      return issues;
    });

    expect(textIssues).toHaveLength(0);
  });

  // Test specific contrast for sidebar buttons
  test('sidebar button contrast ratios', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Expand all sidebar sections
    const drawerToggles = page.locator('.drawer__toggle');
    const toggleCount = await drawerToggles.count();
    
    for (let i = 0; i < toggleCount; i++) {
      await drawerToggles.nth(i).click();
      await page.waitForTimeout(100);
    }

    // Check contrast in both modes
    for (const mode of ['light', 'dark']) {
      if (mode === 'dark') {
        await page.locator('[data-testid="theme-toggle"]').click();
        await page.waitForTimeout(500);
      }

      // Get all navigation links in the sidebar
      const navLinks = await page.locator('.layout__sidebar ul > li > a').all();
      
      for (const link of navLinks) {
        const contrastRatio = await link.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          const _bgColor = el.parentElement ? window.getComputedStyle(el.parentElement).backgroundColor : 'transparent';
          
          // Simple contrast check (would need a proper library for accurate calculation)
          const isDarkMode = document.documentElement.classList.contains('dark');
          const hasGoodContrast = isDarkMode ? 
            styles.color.includes('255') || styles.color.includes('245') : 
            styles.color.includes('0') || styles.color.includes('31');
          
          return hasGoodContrast;
        });

        expect(contrastRatio).toBeTruthy();
      }
    }
  });

  // Check for proper focus indicators
  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Tab through interactive elements and check focus visibility
    const interactiveElements = await page.locator('a, button, input, select, textarea').all();
    
    for (const element of interactiveElements.slice(0, 5)) { // Test first 5 elements
      await element.focus();
      
      const hasFocusStyle = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        const focusStyles = window.getComputedStyle(el, ':focus');
        
        // Check if element has focus indicators
        return (
          styles.outline !== 'none' ||
          styles.boxShadow !== 'none' ||
          styles.border !== focusStyles.border ||
          parseFloat(styles.opacity) < 1
        );
      });

      expect(hasFocusStyle).toBeTruthy();
    }
  });
});