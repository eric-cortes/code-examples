import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from ".";

const meta: Meta<typeof Text> = {
	component: Text,
	tags: ["autodocs"],
	title: "Design System/Typography/Text",
	args: {
		children: "I am a sample text.",
	},
	parameters: {
		componentSubtitle: "Base UI text component using design-system typography styles",
	},
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
	args: {},
};

export const Bold: Story = {
	args: {
		weight: "bold",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Centered: Story = {
	args: {
		alignment: "center",
	},
};
