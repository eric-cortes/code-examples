import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import { Tooltip } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
	tags: ["autodocs"],
	title: "Design System/Unclassified/Tooltip",
	parameters: {
		componentSubtitle: "Base UI tooltip with design-system styling",
	},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
	args: {
		text: "This is a helpful tooltip",
		side: "top",
		children: <Button variant="primary">Hover me (Top)</Button>,
	},
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole("button");
		await expect(trigger).toBeInTheDocument();
		await userEvent.hover(trigger);
		// Tooltip renders as a portal, so query the whole document
		const body = within(canvasElement.ownerDocument.body);
		await expect(await body.findByText("This is a helpful tooltip")).toBeInTheDocument();
	},
};

export const Bottom: Story = {
	args: {
		text: "This is a helpful tooltip",
		side: "bottom",
		children: <Button variant="primary">Hover me (Bottom)</Button>,
	},
};

export const Left: Story = {
	args: {
		text: "This is a helpful tooltip",
		side: "left",
		children: <Button variant="primary">Hover me (Left)</Button>,
	},
};

export const Right: Story = {
	args: {
		text: "This is a helpful tooltip",
		side: "right",
		children: <Button variant="primary">Hover me (Right)</Button>,
	},
};

export const WithKeyboardShortcut: Story = {
	args: {
		text: "Save document",
		tooltipKey: "⌘S",
		side: "top",
		children: <Button variant="primary">Save</Button>,
	},
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvas.getByRole("button");
		await userEvent.hover(trigger);
		// Tooltip renders as a portal, so query the whole document
		const body = within(canvasElement.ownerDocument.body);
		await expect(await body.findByText("Save document")).toBeInTheDocument();
		await expect(body.getByText("⌘S")).toBeInTheDocument();
	},
};
