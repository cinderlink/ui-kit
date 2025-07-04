import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [UnoCSS(), sveltekit()]
});
