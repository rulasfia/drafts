import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), svelte()],
	output: "server",
	prefetch: true,
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
