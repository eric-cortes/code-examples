/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { Input } from ".";

describe("Input component", () => {
	it("links the label to the input", () => {
		render(<Input type="text" label="Username" />);

		expect(screen.getByLabelText("Username")).toBe(screen.getByRole("textbox"));
	});

	it("appends a marker to the label and sets required when required", () => {
		render(<Input type="text" label="Username" required />);

		expect(screen.getByLabelText("Username*")).toBeRequired();
	});

	it("calls onChange with the typed value, name and type", async () => {
		const onChange = vi.fn();
		render(<Input type="text" label="Username" name="username" onChange={onChange} />);

		const input = screen.getByLabelText("Username");
		await userEvent.type(input, "ab");

		expect(input).toHaveValue("ab");
		expect(onChange).toHaveBeenCalledTimes(2);
		expect(onChange).toHaveBeenLastCalledWith({
			target: { value: "ab", name: "username", type: "text" },
		});
	});

	it("shows the value prop and follows updates to it", () => {
		const { rerender } = render(<Input type="text" label="Username" value="john" />);

		expect(screen.getByLabelText("Username")).toHaveValue("john");

		rerender(<Input type="text" label="Username" value="jane" />);

		expect(screen.getByLabelText("Username")).toHaveValue("jane");
	});

	it("shows the error message only when error is true", () => {
		const { rerender } = render(<Input type="text" label="Username" errorMessage="Too short" />);

		expect(screen.queryByText("Too short")).not.toBeInTheDocument();

		rerender(<Input type="text" label="Username" error errorMessage="Too short" />);

		expect(screen.getByText("Too short")).toBeInTheDocument();
	});

	it("is disabled when disabled is set", () => {
		render(<Input type="text" label="Username" disabled />);

		expect(screen.getByLabelText("Username")).toBeDisabled();
	});

	it("forwards ref to the input element", () => {
		const ref = createRef<HTMLInputElement>();
		render(<Input type="text" label="Username" ref={ref} />);

		expect(ref.current).toBe(screen.getByLabelText("Username"));
	});
});
