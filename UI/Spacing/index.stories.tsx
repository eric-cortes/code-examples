import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spacing } from ".";

const meta: Meta<typeof Spacing> = {
	component: Spacing,
	tags: ["autodocs"],
	title: "Design System/Layout and structure/Spacing",
	decorators: [
		(Story) => (
			<div className="border border-[#000]">
				<Story />
			</div>
		),
	],
	parameters: {
		componentSubtitle: "The Spacing component fine-tunes gaps between UI elements.",
	},
};

export default meta;

type Story = StoryObj<typeof Spacing>;

export const Tiny: Story = {
	args: {
		size: "tiny",
	},
};

export const ExtraSmall: Story = {
	args: {
		size: "xs",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
	},
};
export const Large: Story = {
	args: {
		size: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		size: "xl",
	},
};

export const ExtraExtraLarge: Story = {
	args: {
		size: "xxl",
	},
};
