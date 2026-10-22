/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { IconButton } from ".";

const icon = <span>+</span>;

describe("IconButton component", () => {
	it("uses aria-label as the accessible name and renders the icon", () => {
		render(<IconButton icon={icon} aria-label="Add item" />);

		expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
		expect(screen.getByText("+")).toBeInTheDocument();
	});

	it("has default type 'button' and accepts a native type", () => {
		const { rerender } = render(<IconButton icon={icon} aria-label="Add item" />);

		expect(screen.getByRole("button")).toHaveAttribute("type", "button");

		rerender(<IconButton icon={icon} aria-label="Add item" type="submit" />);

		expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<IconButton icon={icon} aria-label="Add item" onClick={onClick} />);

		await userEvent.click(screen.getByRole("button", { name: "Add item" }));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		render(<IconButton icon={icon} aria-label="Add item" disabled onClick={onClick} />);

		const button = screen.getByRole("button", { name: "Add item" });
		await userEvent.click(button);

		expect(button).toBeDisabled();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("replaces the icon with a spinner and blocks onClick while loading", async () => {
		const onClick = vi.fn();
		render(<IconButton icon={icon} aria-label="Add item" loading onClick={onClick} />);

		const button = screen.getByRole("button", { name: "Add item" });
		await userEvent.click(button);

		expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
		expect(screen.queryByText("+")).not.toBeInTheDocument();
		expect(button).toHaveAttribute("aria-disabled", "true");
		expect(onClick).not.toHaveBeenCalled();
	});

	it("shows tooltipText and tooltipKey on hover", async () => {
		render(<IconButton icon={icon} aria-label="Close" tooltipText="Close modal" tooltipKey="ESC" />);

		expect(screen.queryByText("Close modal")).not.toBeInTheDocument();

		await userEvent.hover(screen.getByRole("button", { name: "Close" }));

		expect(screen.getByText("Close modal")).toBeInTheDocument();
		expect(screen.getByText("ESC")).toBeInTheDocument();
	});
});
