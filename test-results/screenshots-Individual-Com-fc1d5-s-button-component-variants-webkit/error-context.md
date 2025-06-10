# Test info

- Name: Individual Component Screenshots >> button component variants
- Location: /Users/aewing/Projects/cinderlink/ui-kit/tests/screenshots.spec.ts:64:2

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/aewing/Library/Caches/ms-playwright/webkit-2158/pw_run.sh
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Component Screenshot Tests', () => {
   4 | 	test.beforeEach(async ({ page }) => {
   5 | 		// Set viewport for consistent screenshots
   6 | 		await page.setViewportSize({ width: 1200, height: 800 });
   7 | 	});
   8 |
   9 | 	test('homepage screenshot', async ({ page }) => {
   10 | 		await page.goto('/');
   11 | 		await expect(page).toHaveScreenshot('homepage.png');
   12 | 	});
   13 |
   14 | 	test('content components page', async ({ page }) => {
   15 | 		await page.goto('/components/content');
   16 | 		await page.waitForLoadState('networkidle');
   17 | 		await expect(page).toHaveScreenshot('content-components.png');
   18 | 	});
   19 |
   20 | 	test('interactive components page', async ({ page }) => {
   21 | 		await page.goto('/components/interactive');
   22 | 		await page.waitForLoadState('networkidle');
   23 | 		await expect(page).toHaveScreenshot('interactive-components.png');
   24 | 	});
   25 |
   26 | 	test('indicator components page', async ({ page }) => {
   27 | 		await page.goto('/components/indicator');
   28 | 		await page.waitForLoadState('networkidle');
   29 | 		await expect(page).toHaveScreenshot('indicator-components.png');
   30 | 	});
   31 |
   32 | 	test('layout components page', async ({ page }) => {
   33 | 		await page.goto('/components/layout');
   34 | 		await page.waitForLoadState('networkidle');
   35 | 		await expect(page).toHaveScreenshot('layout-components.png');
   36 | 	});
   37 |
   38 | 	test('navigation components page', async ({ page }) => {
   39 | 		await page.goto('/components/navigation');
   40 | 		await page.waitForLoadState('networkidle');
   41 | 		await expect(page).toHaveScreenshot('navigation-components.png');
   42 | 	});
   43 |
   44 | 	test('dark mode toggle', async ({ page }) => {
   45 | 		await page.goto('/');
   46 | 		
   47 | 		// Take screenshot in light mode
   48 | 		await expect(page).toHaveScreenshot('light-mode.png');
   49 | 		
   50 | 		// Toggle to dark mode
   51 | 		await page.locator('[data-testid="theme-toggle"]').click();
   52 | 		await page.waitForTimeout(500); // Wait for transition
   53 | 		
   54 | 		// Take screenshot in dark mode
   55 | 		await expect(page).toHaveScreenshot('dark-mode.png');
   56 | 	});
   57 | });
   58 |
   59 | test.describe('Individual Component Screenshots', () => {
   60 | 	test.beforeEach(async ({ page }) => {
   61 | 		await page.setViewportSize({ width: 800, height: 600 });
   62 | 	});
   63 |
>  64 | 	test('button component variants', async ({ page }) => {
      | 	^ Error: browserType.launch: Executable doesn't exist at /Users/aewing/Library/Caches/ms-playwright/webkit-2158/pw_run.sh
   65 | 		await page.goto('/components/interactive/button');
   66 | 		await page.waitForLoadState('networkidle');
   67 | 		await expect(page).toHaveScreenshot('button-variants.png');
   68 | 	});
   69 |
   70 | 	test('card component', async ({ page }) => {
   71 | 		await page.goto('/components/content/card');
   72 | 		await page.waitForLoadState('networkidle');
   73 | 		await expect(page).toHaveScreenshot('card-component.png');
   74 | 	});
   75 |
   76 | 	test('avatar component', async ({ page }) => {
   77 | 		await page.goto('/components/content/avatar');
   78 | 		await page.waitForLoadState('networkidle');
   79 | 		await expect(page).toHaveScreenshot('avatar-component.png');
   80 | 	});
   81 |
   82 | 	test('typography component', async ({ page }) => {
   83 | 		await page.goto('/components/content/typography');
   84 | 		await page.waitForLoadState('networkidle');
   85 | 		await expect(page).toHaveScreenshot('typography-component.png');
   86 | 	});
   87 |
   88 | 	test('notification component', async ({ page }) => {
   89 | 		await page.goto('/components/content/notification');
   90 | 		await page.waitForLoadState('networkidle');
   91 | 		await expect(page).toHaveScreenshot('notification-component.png');
   92 | 	});
   93 |
   94 | 	test('modal component', async ({ page }) => {
   95 | 		await page.goto('/components/interactive/modal');
   96 | 		await page.waitForLoadState('networkidle');
   97 | 		
   98 | 		// Take screenshot of modal trigger
   99 | 		await expect(page).toHaveScreenshot('modal-trigger.png');
  100 | 		
  101 | 		// Open modal and take screenshot
  102 | 		await page.locator('button:has-text("Open Modal")').click();
  103 | 		await page.waitForTimeout(500); // Wait for modal animation
  104 | 		await expect(page).toHaveScreenshot('modal-open.png');
  105 | 	});
  106 |
  107 | 	test('dropdown component', async ({ page }) => {
  108 | 		await page.goto('/components/interactive/dropdown');
  109 | 		await page.waitForLoadState('networkidle');
  110 | 		
  111 | 		// Take screenshot of closed dropdown
  112 | 		await expect(page).toHaveScreenshot('dropdown-closed.png');
  113 | 		
  114 | 		// Open dropdown and take screenshot
  115 | 		await page.locator('[data-testid="dropdown-trigger"]').first().click();
  116 | 		await page.waitForTimeout(300);
  117 | 		await expect(page).toHaveScreenshot('dropdown-open.png');
  118 | 	});
  119 |
  120 | 	test('form inputs', async ({ page }) => {
  121 | 		await page.goto('/components/interactive/input');
  122 | 		await page.waitForLoadState('networkidle');
  123 | 		await expect(page).toHaveScreenshot('form-inputs.png');
  124 | 	});
  125 |
  126 | 	test('status indicators', async ({ page }) => {
  127 | 		await page.goto('/components/indicator/statusindicator');
  128 | 		await page.waitForLoadState('networkidle');
  129 | 		await expect(page).toHaveScreenshot('status-indicators.png');
  130 | 	});
  131 |
  132 | 	test('loading indicator', async ({ page }) => {
  133 | 		await page.goto('/components/indicator/loadingindicator');
  134 | 		await page.waitForLoadState('networkidle');
  135 | 		await expect(page).toHaveScreenshot('loading-indicator.png');
  136 | 	});
  137 | });
```