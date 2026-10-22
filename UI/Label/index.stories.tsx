import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from ".";

const meta: Meta<typeof Label> = {
	component: Label,
	tags: ["autodocs"],
	title: "Design System/Selection and input/Label",
	args: {
		children: "Sample label",
	},
	parameters: {
		componentSubtitle: "Label for form elements built on Base UI Field.Label.",
	},
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
	args: {},
};

export const RequiredLabel: Story = {
	args: {
		required: true,
	},
};

export const WithHtmlFor: Story = {
	args: {
		htmlFor: "email-input",
		children: "Email address",
	},
};
