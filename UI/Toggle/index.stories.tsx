import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Toggle } from ".";

const meta: Meta<typeof Toggle> = {
	component: Toggle,
	tags: ["autodocs"],
	title: "Design System/Selection and input/Toggle",
	parameters: {
		componentSubtitle:
			"A switch control using Base UI that allows choosing between two mutually exclusive options (On/Off).",
	},
};

export default meta;

type Story = StoryObj<typeof Toggle>;

// Interactive wrapper for controlled state
function ToggleDemo({
	checked: initialChecked,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onChange,
	...props
}: Partial<React.ComponentProps<typeof Toggle>>) {
	const [checked, setChecked] = useState(initialChecked ?? false);

	return (
		<Toggle
			{...props}
			checked={checked}
			onChange={() => setChecked((prev) => !prev)}
			label={props.label ?? "Get product updates and tips by email"}
		/>
	);
}

export const Default: Story = {
	render: () => <ToggleDemo />,
	play: async ({ canvas }) => {
		const toggle = canvas.getByRole("switch");
		await expect(toggle).toBeInTheDocument();
		await expect(toggle).not.toBeChecked();
		await expect(canvas.getByText("Get product updates and tips by email")).toBeInTheDocument();
		toggle.click();
		await expect(toggle).toBeChecked();
	},
};

export const Checked: Story = {
	render: () => <ToggleDemo checked />,
	play: async ({ canvas }) => {
		const toggle = canvas.getByRole("switch");
		await expect(toggle).toBeChecked();
	},
};

export const ToggleLeft: Story = {
	render: () => <ToggleDemo variant="toggle-left" />,
};

export const LargeSize: Story = {
	render: () => <ToggleDemo size="large" />,
};

export const WithAdditionalText: Story = {
	render: () => <ToggleDemo additionalText="We'll send you updates about new features and tips." />,
	play: async ({ canvas }) => {
		await expect(canvas.getByText("We'll send you updates about new features and tips.")).toBeInTheDocument();
	},
};

export const Disabled: Story = {
	render: () => <ToggleDemo disabled />,
	play: async ({ canvas }) => {
		const toggle = canvas.getByRole("switch");
		await expect(toggle).toHaveAttribute("aria-disabled", "true");
	},
};

export const DisabledChecked: Story = {
	render: () => <ToggleDemo disabled checked />,
	play: async ({ canvas }) => {
		const toggle = canvas.getByRole("switch");
		await expect(toggle).toHaveAttribute("aria-disabled", "true");
		await expect(toggle).toBeChecked();
	},
};

export const FontWeightLight: Story = {
	render: () => <ToggleDemo fontWeight="light" />,
};

function InteractiveDemo() {
	const [notifications, setNotifications] = useState(true);
	const [marketing, setMarketing] = useState(false);
	const [updates, setUpdates] = useState(true);

	return (
		<div className="flex flex-col gap-4 w-80">
			<Toggle
				checked={notifications}
				onChange={() => setNotifications((prev) => !prev)}
				label="Push notifications"
			/>
			<Toggle checked={marketing} onChange={() => setMarketing((prev) => !prev)} label="Marketing emails" />
			<Toggle
				checked={updates}
				onChange={() => setUpdates((prev) => !prev)}
				label="Product updates"
				additionalText="Get notified about new features"
			/>
		</div>
	);
}

export const Interactive: Story = {
	render: () => <InteractiveDemo />,
};
