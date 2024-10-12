import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import { remarkImages, remarkLinks } from "./src/utils/remark-plugins.mjs";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), svelte()],
	output: "hybrid",
	prefetch: true,
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	markdown: {
		shikiConfig: {
			theme: "github-dark-default",
		},
		remarkPlugins: [remarkImages, remarkLinks],
	},
});
