import { chromium } from 'playwright';

(async () => {
	const browser = await chromium.launch({ headless: false }); // Launch in headed mode to see
	const page = await browser.newPage();

	// Navigate to the dev server
	await page.goto('http://localhost:3002');

	// Wait for content to load
	await page.waitForLoadState('networkidle');
	await page.waitForTimeout(1000);

	// Find and click the theme toggle button
	console.log('Looking for theme toggle...');
	const themeToggle = await page.locator('button:has-text("Toggle theme")').first();
	if (await themeToggle.isVisible()) {
		console.log('Found theme toggle, clicking...');
		await themeToggle.click();
		await page.waitForTimeout(1000);
		console.log('Dark mode should now be active');
	} else {
		console.log('Theme toggle not found, trying data-testid...');
		await page.locator('[data-testid="theme-toggle"]').click();
	}

	// Keep browser open for 5 seconds to see the result
	await page.waitForTimeout(5000);

	await browser.close();
})();
