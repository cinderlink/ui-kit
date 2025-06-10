import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config = defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['tests/**/*']
	},
	build: {
		minify: false,
		target: 'esnext'
	},
	optimizeDeps: {
		exclude: ['unocss', 'uno.css'],
		esbuildOptions: {
			target: 'esnext'
		}
	}
});
