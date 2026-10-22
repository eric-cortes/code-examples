/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { Checkbox } from ".";

function ControlledCheckbox() {
	const [checked, setChecked] = useState(false);

	return <Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

describe("Checkbox component", () => {
	it("renders a checkbox named after its label, unchecked by default", () => {
		render(<Checkbox label="Accept terms" />);

		const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

		expect(checkbox).toBeInTheDocument();
		expect(checkbox).not.toBeChecked();
	});

	it("reflects the checked prop", () => {
		render(<Checkbox label="Accept terms" checked />);

		expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked();
	});

	it("calls onChange with the new checked state", async () => {
		const onChange = vi.fn();
		render(<Checkbox label="Accept terms" onChange={onChange} />);

		await userEvent.click(screen.getByRole("checkbox", { name: "Accept terms" }));

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith({ target: { checked: true } });
	});

	it("toggles when used as a controlled component", async () => {
		render(<ControlledCheckbox />);

		const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

		await userEvent.click(checkbox);
		expect(checkbox).toBeChecked();

		await userEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
	});

	it("does not call onChange when disabled", async () => {
		const onChange = vi.fn();
		render(<Checkbox label="Accept terms" disabled onChange={onChange} />);

		const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });
		await userEvent.click(checkbox);

		expect(checkbox).toHaveAttribute("aria-disabled", "true");
		expect(onChange).not.toHaveBeenCalled();
	});

	it("renders additionalText", () => {
		render(<Checkbox label="Accept terms" additionalText="Required to continue" />);

		expect(screen.getByText("Required to continue")).toBeInTheDocument();
	});
});
