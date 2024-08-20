import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";
import color from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Geist", ...defaultTheme.fontFamily.sans],
				mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [typography],
};
