/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it } from "vitest";

import { Tooltip } from ".";

describe("Tooltip component", () => {
	it("renders the trigger and keeps the tooltip hidden initially", () => {
		render(
			<Tooltip text="Helpful tip">
				<button type="button">Hover me</button>
			</Tooltip>,
		);

		expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
		expect(screen.queryByText("Helpful tip")).not.toBeInTheDocument();
	});

	it("shows the tooltip text on hover", async () => {
		render(
			<Tooltip text="Helpful tip">
				<button type="button">Hover me</button>
			</Tooltip>,
		);

		await userEvent.hover(screen.getByRole("button", { name: "Hover me" }));

		expect(await screen.findByText("Helpful tip")).toBeInTheDocument();
	});

	it("shows the tooltip text on keyboard focus", async () => {
		render(
			<Tooltip text="Helpful tip">
				<button type="button">Focus me</button>
			</Tooltip>,
		);

		await userEvent.tab();

		expect(screen.getByRole("button", { name: "Focus me" })).toHaveFocus();
		expect(await screen.findByText("Helpful tip")).toBeInTheDocument();
	});

	it("shows tooltipKey next to the text", async () => {
		render(
			<Tooltip text="Save document" tooltipKey="Ctrl+S">
				<button type="button">Save</button>
			</Tooltip>,
		);

		await userEvent.hover(screen.getByRole("button", { name: "Save" }));

		expect(await screen.findByText("Save document")).toBeInTheDocument();
		expect(screen.getByText("Ctrl+S")).toBeInTheDocument();
	});

	it("renders only the children when disabled", async () => {
		render(
			<Tooltip text="Helpful tip" disabled>
				<button type="button">Hover me</button>
			</Tooltip>,
		);

		await userEvent.hover(screen.getByRole("button", { name: "Hover me" }));

		expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
		expect(screen.queryByText("Helpful tip")).not.toBeInTheDocument();
	});
});
