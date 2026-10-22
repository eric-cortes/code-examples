import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import { Button } from ".";
import { Icon } from "../Icon";

const meta: Meta<typeof Button> = {
	component: Button,
	tags: ["autodocs"],
	title: "Design System/Actions/Button",
	parameters: {
		componentSubtitle: "Base UI button with design-system styling",
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
		onClick: fn(),
		testID: "primary-btn",
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getByTestId("primary-btn");
		await expect(button).toBeInTheDocument();
		await expect(button).toHaveTextContent("Primary Button");
		button.click();
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary Button",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button")).toHaveTextContent("Secondary Button");
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		children: "Danger Button",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button")).toHaveTextContent("Danger Button");
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		children: "Info Button",
	},
};
export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline Button",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		children: "Link Button",
	},
};

export const Disabled: Story = {
	args: {
		variant: "primary",
		disabled: true,
		children: "Disabled Button",
		onClick: fn(),
		testID: "disabled-btn",
	},
	play: async ({ canvas, args }) => {
		const button = canvas.getByTestId("disabled-btn");
		await expect(button).toBeDisabled();
		button.click();
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};

export const Loading: Story = {
	args: {
		variant: "primary",
		loading: true,
		children: "Loading Button",
		testID: "loading-btn",
	},
	play: async ({ canvas }) => {
		const button = canvas.getByTestId("loading-btn");
		await expect(button).toBeInTheDocument();
		// Spinner SVG should be visible when loading
		const spinner = button.querySelector("svg.animate-spin");
		await expect(spinner).toBeTruthy();
	},
};

export const WithIcon: Story = {
	args: {
		variant: "primary",
		icon: <Icon icon="addbutton" size="medium" noHover />,
		children: "Button with Icon",
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button")).toHaveTextContent("Button with Icon");
	},
};

export const FullWidth: Story = {
	args: {
		variant: "primary",
		fullWidth: true,
		children: "Full Width Button",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="info">Info</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};
