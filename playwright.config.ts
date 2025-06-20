import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	testMatch: '**/*.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:3002',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		// Default viewport size
		viewport: { width: 1200, height: 800 }
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
		// TODO: Re-enable webkit testing when Safari compatibility is resolved
		// webkit currently fails due to Svelte 5 runes + UnoCSS compatibility issues
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] }
		// }
	],
	webServer: {
		command: 'bun dev',
		port: 3002,
		reuseExistingServer: !process.env.CI,
		timeout: 120000,
		stderr: 'pipe',
		stdout: 'pipe'
	}
});
