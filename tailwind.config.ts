import type { Config } from "tailwindcss";

import { colors } from "./.storybook/app-stubs/theme/colors";

const config: Config = {
	content: [
		"./**/*.{ts,tsx,mdx}",
		"!./node_modules/**",
		"!./leica/**",
		"!./storybook-static/**",
		"!./dist/**",
	],
	safelist: Object.keys(colors).map((name) => `text-${name}`),
	theme: {
		extend: {
			colors,
			fontFamily: {
				primary: [
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"sans-serif",
				],
			},
			fontSize: {
				xxl: ["1.75rem", { lineHeight: "2.25rem" }],
			},
			lineHeight: {
				"normal-override": "1.5",
			},
			boxShadow: {
				surface: "0 1px 2px 0 rgb(16 24 40 / 0.06), 0 1px 3px 0 rgb(16 24 40 / 0.1)",
				modal: "0 12px 32px -4px rgb(16 24 40 / 0.18), 0 4px 8px -2px rgb(16 24 40 / 0.08)",
			},
		},
	},
};

export default config;
