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
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['tests/**/*', 'src/**/*.browser.{test,spec}.{js,ts}'],
		setupFiles: ['src/setupTests.ts'],
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				url: 'http://localhost:3000'
			}
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			include: ['src/lib/**/*.{ts,svelte}', 'src/**/*.{ts,js}'],
			exclude: ['**/*.{test,spec}.*']
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
