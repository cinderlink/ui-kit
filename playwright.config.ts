import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm vite build && pnpm vite preview',
		port: 4173
	},
	testDir: 'tests'
};

export default config;
