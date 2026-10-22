import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from ".";

const meta: Meta<typeof Spinner> = {
	component: Spinner,
	tags: ["autodocs"],
	title: "Design System/Feedback indicators/Spinner",
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Size: Story = {
	args: {
		size: 24,
	},
};

export const NotAnimated: Story = {
	args: {
		animated: false,
	},
};

export const Color: Story = {
	args: {
		className: "text-red-500",
	},
};
