import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import unoPostcssPlugin from 'unocss/postcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			postcss: {
				plugins: [
					unoPostcssPlugin(), // Using default options, should pick up unocss.config.ts
				],
			},
		}),
	],
	kit: {
		adapter: adapter()
	},
	// compilerOptions: { // Runes are enabled by default in Svelte 5
	//  runes: true
	// }
};

export default config;
