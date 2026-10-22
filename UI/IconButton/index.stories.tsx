import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import { IconButton } from ".";
import { Icon } from "../Icon";

const meta: Meta<typeof IconButton> = {
	component: IconButton,
	tags: ["autodocs"],
	title: "Design System/Actions/IconButton",
	parameters: {
		componentSubtitle: "Base UI icon button with design-system styling and variants",
	},
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="add" size={20} />,
		"aria-label": "Add item",
		onClick: fn(),
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getByRole("button", { name: "Add item" });
		await expect(button).toBeInTheDocument();
		button.click();
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		icon: <Icon icon="add" size={20} />,
		"aria-label": "Add item",
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		icon: <Icon icon="delete" size={20} />,
		"aria-label": "Delete item",
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		icon: <Icon icon="info" size={20} />,
		"aria-label": "Information",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		icon: <Icon icon="cross" size={20} />,
		"aria-label": "Close",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		icon: <Icon icon="link" size={20} />,
		"aria-label": "Open link",
	},
};

export const Disabled: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="add" size={20} />,
		"aria-label": "Add item",
		disabled: true,
	},
	play: async ({ canvas }) => {
		const button = canvas.getByRole("button", { name: "Add item" });
		await expect(button).toBeDisabled();
	},
};

export const SmallSize: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="add" size={16} />,
		size: "small",
		"aria-label": "Add item",
	},
};

export const LargeSize: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="add" size={24} />,
		size: "large",
		"aria-label": "Add item",
	},
};

export const CustomSize: Story = {
	args: {
		variant: "outline",
		icon: <Icon icon="cross" size={24} />,
		size: 48,
		"aria-label": "Close",
	},
};

export const WithTooltip: Story = {
	args: {
		variant: "outline",
		icon: <Icon icon="cross" size={20} />,
		"aria-label": "Close",
		tooltipText: "Close modal",
		tooltipKey: "ESC",
		tooltipPosition: "right",
	},
};

export const WithBackgroundHover: Story = {
	args: {
		variant: "outline",
		icon: <Icon icon="settings" size={20} />,
		"aria-label": "Settings",
	},
};

export const Loading: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="add" size={20} />,
		"aria-label": "Add item",
		loading: true,
	},
	play: async ({ canvas }) => {
		const button = canvas.getByRole("button", { name: "Add item" });
		const spinner = button.querySelector("svg.animate-spin");
		await expect(spinner).toBeTruthy();
	},
};

export const OutlineWithType: Story = {
	args: {
		type: "outline",
		icon: <Icon icon="cross" size={20} />,
		"aria-label": "Close",
	},
};

export const ExplicitColorOverride: Story = {
	args: {
		variant: "danger",
		icon: <Icon icon="delete" color="#000000" size={20} />,
		"aria-label": "Delete item",
	},
};
