import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the dev server
  await page.goto('http://localhost:3002');
  
  // Wait for content to load
  await page.waitForLoadState('networkidle');
  
  // Take light mode screenshot
  await page.screenshot({ path: 'sidebar-light.png', fullPage: false });
  
  // Toggle dark mode
  await page.click('button:has-text("Toggle theme")');
  await page.waitForTimeout(500); // Wait for transition
  
  // Take dark mode screenshot
  await page.screenshot({ path: 'sidebar-dark.png', fullPage: false });
  
  // Close sidebar to test toggle
  await page.click('.sidebar-toggle');
  await page.waitForTimeout(500);
  
  // Take screenshot with sidebar closed
  await page.screenshot({ path: 'sidebar-closed.png', fullPage: false });
  
  await browser.close();
})();