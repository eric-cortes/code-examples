import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";

import { Textarea } from ".";

const meta: Meta<typeof Textarea> = {
	component: Textarea,
	tags: ["autodocs"],
	title: "Design System/Selection and input/Textarea",
	args: {
		placeholder: "Enter your text",
		rows: 4,
	},
	parameters: {
		componentSubtitle: "Base UI textarea with design-system styling",
	},
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
	args: {},
	play: async ({ canvas }) => {
		const textarea = canvas.getByPlaceholderText("Enter your text");
		await expect(textarea).toBeInTheDocument();
		await userEvent.click(textarea);
		await userEvent.type(textarea, "Hello world");
		await expect(textarea).toHaveValue("Hello world");
	},
};

export const WithLabel: Story = {
	args: {
		label: "Description",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Description")).toBeInTheDocument();
	},
};

export const Error: Story = {
	args: {
		error: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	play: async ({ canvas }) => {
		const textarea = canvas.getByPlaceholderText("Enter your text");
		await expect(textarea).toBeDisabled();
	},
};
