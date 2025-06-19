import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E tests only.
 * Component tests have been migrated to Vitest browser mode.
 */
export default defineConfig({
	testDir: './tests/e2e',
	testMatch: '**/*.e2e.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'github' : 'html',
	use: {
		baseURL: process.env.BASE_URL || 'http://localhost:3002',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'on-first-retry',
		// Default viewport for desktop testing
		viewport: { width: 1280, height: 720 }
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		// Mobile testing
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] }
		},
		{
			name: 'mobile-safari',
			use: { ...devices['iPhone 12'] }
		}
	],
	webServer: {
		command: process.env.CI ? 'bun run preview' : 'bun run dev',
		port: process.env.CI ? 4173 : 3002,
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	}
});
