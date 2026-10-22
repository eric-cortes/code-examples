import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent } from "storybook/test";

import { Input } from ".";

const meta: Meta<typeof Input> = {
	component: Input,
	tags: ["autodocs"],
	title: "Design System/Selection and input/Input",
	args: {},
	parameters: {
		componentSubtitle: "Base UI input with design-system styling and CVA variants",
	},
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
	args: {
		type: "text",
		label: "Username",
		placeholder: "Username",
		onChange: fn(),
		testID: "input-text",
	},
	play: async ({ canvas }) => {
		const input = canvas.getByTestId("input-text");
		await expect(input).toBeInTheDocument();
		await expect(canvas.getByText("Username")).toBeInTheDocument();
		await userEvent.click(input);
		await userEvent.type(input, "john_doe");
		await expect(input).toHaveValue("john_doe");
	},
};

export const Password: Story = {
	args: {
		type: "password",
		label: "Password",
		placeholder: "Username",
		value: "Password",
	},
};

export const Mail: Story = {
	args: {
		type: "email",
		label: "E-Mail",
		placeholder: "E-Mail",
	},
};

export const Disabled: Story = {
	args: {
		type: "text",
		label: "Username",
		placeholder: "Username",
		disabled: true,
		testID: "input-disabled",
	},
	play: async ({ canvas }) => {
		const input = canvas.getByTestId("input-disabled");
		await expect(input).toBeDisabled();
	},
};

export const Error: Story = {
	args: {
		type: "password",
		label: "Password",
		placeholder: "Password",
		error: true,
		errorMessage: "The password must be at least 8 characters long",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("The password must be at least 8 characters long")).toBeInTheDocument();
	},
};

export const Suffix: Story = {
	args: {
		type: "text",
		label: "Zuschlag in %",
		placeholder: "eingeben",
		error: false,
		unit: "%",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("%")).toBeInTheDocument();
	},
};

export const SuffixWithError: Story = {
	args: {
		type: "text",
		label: "Zuschlag in %",
		placeholder: "eingeben",
		error: true,
		errorMessage: "Es ist ein Fehler aufgetreten",
		unit: "%",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Es ist ein Fehler aufgetreten")).toBeInTheDocument();
		await expect(canvas.getByText("%")).toBeInTheDocument();
	},
};

export const Inline: Story = {
	args: {
		type: "text",
		placeholder: "Inline input",
		inline: true,
	},
};

export const TextCenter: Story = {
	args: {
		type: "number",
		placeholder: "0",
		textCenter: true,
	},
};
