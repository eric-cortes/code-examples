import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon } from ".";

const meta: Meta<typeof Icon> = {
	component: Icon,
	tags: ["autodocs"],
	title: "Design System/Images and icons/Icon",
	parameters: {
		componentSubtitle: "Base UI icon component with consistent styling and optional tooltip",
	},
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
	args: {
		icon: "checklistpinlocation",
		color: "#000",
		size: "medium",
	},
};

export const SmallIcon: Story = {
	args: {
		icon: "checklistpinlocation",
		color: "#000",
		size: "small",
	},
};

export const LargeIcon: Story = {
	args: {
		icon: "checklistpinlocation",
		color: "#000",
		size: "large",
	},
};

export const WithTooltip: Story = {
	args: {
		icon: "checklistpinlocation",
		color: "#000",
		size: "large",
		tooltipText: "Sample Tooltip",
		tooltipPosition: "right",
	},
};
