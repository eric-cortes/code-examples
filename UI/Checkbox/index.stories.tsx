import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	tags: ["autodocs"],
	title: "Design System/Selection and input/Checkbox",
	parameters: {
		componentSubtitle: "Base UI checkbox with design-system styling",
	},
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
		onChange: fn(),
		testID: "checkbox-default",
	},
	play: async ({ canvas, args }) => {
		const checkbox = canvas.getByTestId("checkbox-default");
		await expect(checkbox).toBeInTheDocument();
		await expect(canvas.getByText("Accept terms and conditions")).toBeInTheDocument();
		checkbox.click();
		await expect(args.onChange).toHaveBeenCalled();
	},
};

export const Checked: Story = {
	args: {
		label: "I agree to the terms",
		checked: true,
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("I agree to the terms")).toBeInTheDocument();
	},
};

export const Disabled: Story = {
	args: {
		label: "This option is disabled",
		disabled: true,
		testID: "checkbox-disabled",
	},
	play: async ({ canvas }) => {
		const checkbox = canvas.getByTestId("checkbox-disabled");
		await expect(checkbox).toHaveAttribute("aria-disabled", "true");
	},
};

export const DisabledChecked: Story = {
	args: {
		label: "This option is disabled and checked",
		disabled: true,
		checked: true,
	},
};

export const SizeXS: Story = {
	args: {
		label: "Extra small text",
		size: "xs",
	},
};

export const SizeSM: Story = {
	args: {
		label: "Small text",
		size: "sm",
	},
};

export const SizeBase: Story = {
	args: {
		label: "Base text (default)",
		size: "base",
	},
};

export const WithAdditionalText: Story = {
	args: {
		label: "Subscribe to newsletter",
		additionalText: "You will receive weekly updates about new features",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByText("Subscribe to newsletter")).toBeInTheDocument();
		await expect(canvas.getByText("You will receive weekly updates about new features")).toBeInTheDocument();
	},
};

export const Interactive: Story = {
	render: function Render() {
		const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
			item1: false,
			item2: false,
			item3: false,
		});

		return (
			<div className="flex flex-col gap-3">
				<Checkbox
					label="Option 1"
					checked={checkedItems.item1}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCheckedItems((prev) => ({ ...prev, item1: e.target.checked }))
					}
				/>
				<Checkbox
					label="Option 2"
					checked={checkedItems.item2}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCheckedItems((prev) => ({ ...prev, item2: e.target.checked }))
					}
				/>
				<Checkbox
					label="Option 3"
					checked={checkedItems.item3}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCheckedItems((prev) => ({ ...prev, item3: e.target.checked }))
					}
				/>
			</div>
		);
	},
};
