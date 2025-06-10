import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit()
	],
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
