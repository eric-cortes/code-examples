import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { RadioButton, RadioGroup } from ".";

const meta: Meta<typeof RadioButton> = {
	component: RadioButton,
	tags: ["autodocs"],
	title: "Design System/Selection and input/RadioButton",
	parameters: {
		componentSubtitle: "Base UI radio button with design-system styling",
	},
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Checked: Story = {
	render: (args) => (
		<RadioGroup value="option1">
			<RadioButton {...args} />
		</RadioGroup>
	),
	args: {
		label: "Option 1",
		value: "option1",
	},
	play: async ({ canvas }) => {
		const radio = canvas.getByRole("radio");
		await expect(radio).toBeChecked();
		await expect(canvas.getByText("Option 1")).toBeInTheDocument();
	},
};

export const Unchecked: Story = {
	render: (args) => (
		<RadioGroup value="">
			<RadioButton {...args} />
		</RadioGroup>
	),
	args: {
		label: "Option 2",
		value: "option2",
	},
	play: async ({ canvas }) => {
		const radio = canvas.getByRole("radio");
		await expect(radio).not.toBeChecked();
	},
};

export const Disabled: Story = {
	render: (args) => (
		<RadioGroup value="">
			<RadioButton {...args} />
		</RadioGroup>
	),
	args: {
		label: "Disabled Option",
		value: "disabled",
		disabled: true,
	},
	play: async ({ canvas }) => {
		const radio = canvas.getByRole("radio");
		await expect(radio).toHaveAttribute("aria-disabled", "true");
	},
};

export const Interactive: Story = {
	render: function Render() {
		const [selected, setSelected] = useState("option1");

		return (
			<RadioGroup
				value={selected}
				onValueChange={(value: string) => setSelected(value)}
				className="flex flex-col gap-2"
			>
				<RadioButton label="Option 1" value="option1" />
				<RadioButton label="Option 2" value="option2" />
				<RadioButton label="Option 3" value="option3" />
			</RadioGroup>
		);
	},
	play: async ({ canvas }) => {
		const radios = canvas.getAllByRole("radio");
		await expect(radios).toHaveLength(3);
		// First option should be selected by default
		await expect(radios[0]).toBeChecked();
		// Click second option
		radios[1].click();
		await expect(radios[1]).toBeChecked();
		await expect(radios[0]).not.toBeChecked();
	},
};
