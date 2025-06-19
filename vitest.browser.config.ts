import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import UnoCSS from 'unocss/vite';
import path from 'path';

export default defineConfig({
	plugins: [
		UnoCSS(),
		svelte({
			hot: false,
			preprocess: {
				style: ({ content }) => {
					// Simple passthrough for PostCSS in tests
					return { code: content };
				}
			}
		})
	],
	optimizeDeps: {
		include: [
			'svelte-highlight',
			'svelte-highlight/languages',
			'svelte-highlight/styles/a11y-dark',
			'svelte-highlight/styles/a11y-light',
			'markdown-it',
			'markdown-it-emoji'
		]
	},
	test: {
		globals: true,
		include: ['src/**/*.browser.{test,spec}.{js,ts}'],
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [
				{ browser: 'chromium' }
			],
			headless: true
		}
	},
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$app: path.resolve('./src/app')
		},
		conditions: ['development', 'browser', 'import', 'default']
	}
});