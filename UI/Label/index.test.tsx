/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { Label } from ".";

describe("Label component", () => {
	it("renders its children", () => {
		render(<Label>Username</Label>);

		expect(screen.getByText("Username")).toBeInTheDocument();
	});

	it("associates with a form control through htmlFor", () => {
		render(
			<>
				<Label htmlFor="username">Username</Label>
				<input id="username" />
			</>,
		);

		expect(screen.getByLabelText("Username")).toBe(screen.getByRole("textbox"));
	});

	it("appends an asterisk when required", () => {
		render(<Label required>Username</Label>);

		expect(screen.getByText("Username*")).toBeInTheDocument();
	});

	it("does not append an asterisk by default", () => {
		render(<Label>Username</Label>);

		expect(screen.queryByText("Username*")).not.toBeInTheDocument();
	});

	it("merges a custom className", () => {
		render(<Label className="custom-class">Username</Label>);

		expect(screen.getByText("Username")).toHaveClass("custom-class");
	});
});
