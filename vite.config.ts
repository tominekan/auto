import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess  } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import adapter from "@sveltejs/adapter-auto";

// export default defineConfig({
// 	plugins: [sveltekit()]
// });


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
	  adapter: adapter()
	},
	preprocess: [vitePreprocess({})],

	plugins: [sveltekit()]
  };
 export default config;