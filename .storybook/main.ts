import { readdirSync, type Dirent } from "node:fs";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

const stubsDir = fileURLToPath(new URL("./app-stubs/", import.meta.url));
const rootDir = fileURLToPath(new URL("../", import.meta.url));

const EXCLUDED_DIRECTORIES = new Set(["node_modules", "leica", "dist", "storybook-static"]);

const STORY_FILE = /\.stories\.(ts|tsx|mdx)$/;

const isIncluded = (entry: Dirent) =>
	entry.isDirectory() && !entry.name.startsWith(".") && !EXCLUDED_DIRECTORIES.has(entry.name);

const hasStories = (directory: string): boolean =>
	readdirSync(directory, { withFileTypes: true }).some((entry) =>
		entry.isFile() ? STORY_FILE.test(entry.name) : isIncluded(entry) && hasStories(`${directory}/${entry.name}`),
	);

const config: StorybookConfig = {
	stories: async () =>
		readdirSync(rootDir, { withFileTypes: true })
			.filter((entry) => isIncluded(entry) && hasStories(`${rootDir}${entry.name}`))
			.map((entry) => `../${entry.name}/**/*.stories.@(ts|tsx|mdx)`),
	addons: ["@storybook/addon-docs"],
	framework: "@storybook/nextjs-vite",
	viteFinal: async (viteConfig) =>
		mergeConfig(viteConfig, {
			resolve: {
				alias: [{ find: /^@\//, replacement: stubsDir }],
			},
		}),
};

export default config;
