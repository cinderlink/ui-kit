import type { UserConfig } from 'vite';
import unocss from 'unocss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
	plugins: [
		unocss({
			configFile: 'unocss.config.ts'
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
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
};

export default config;
