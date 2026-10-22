/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { Toggle } from ".";

function ControlledToggle() {
	const [checked, setChecked] = useState(false);

	return <Toggle label="Email updates" checked={checked} onChange={() => setChecked((prev) => !prev)} />;
}

describe("Toggle component", () => {
	it("renders a switch named after its label", () => {
		render(<Toggle label="Email updates" checked={false} onChange={vi.fn()} />);

		expect(screen.getByRole("switch", { name: "Email updates" })).toBeInTheDocument();
		expect(screen.getByText("Email updates")).toBeInTheDocument();
	});

	it("prefers ariaLabel over label for the accessible name", () => {
		render(<Toggle label="Email updates" ariaLabel="Toggle email updates" checked={false} onChange={vi.fn()} />);

		expect(screen.getByRole("switch", { name: "Toggle email updates" })).toBeInTheDocument();
	});

	it("reflects the checked prop", () => {
		const { rerender } = render(<Toggle label="Email updates" checked={false} onChange={vi.fn()} />);

		expect(screen.getByRole("switch")).not.toBeChecked();

		rerender(<Toggle label="Email updates" checked onChange={vi.fn()} />);

		expect(screen.getByRole("switch")).toBeChecked();
	});

	it("calls onChange when clicked", async () => {
		const onChange = vi.fn();
		render(<Toggle label="Email updates" checked={false} onChange={onChange} />);

		await userEvent.click(screen.getByRole("switch"));

		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it("toggles when used as a controlled component", async () => {
		render(<ControlledToggle />);

		const toggle = screen.getByRole("switch");

		await userEvent.click(toggle);
		expect(toggle).toBeChecked();

		await userEvent.click(toggle);
		expect(toggle).not.toBeChecked();
	});

	it("does not call onChange when disabled", async () => {
		const onChange = vi.fn();
		render(<Toggle label="Email updates" checked={false} onChange={onChange} disabled />);

		const toggle = screen.getByRole("switch");
		await userEvent.click(toggle);

		expect(toggle).toHaveAttribute("aria-disabled", "true");
		expect(onChange).not.toHaveBeenCalled();
	});

	it("shows additionalText only for the toggle-right variant", () => {
		const { rerender } = render(
			<Toggle label="Email updates" checked={false} onChange={vi.fn()} additionalText="Weekly digest" />,
		);

		expect(screen.getByText("Weekly digest")).toBeInTheDocument();

		rerender(
			<Toggle
				label="Email updates"
				checked={false}
				onChange={vi.fn()}
				variant="toggle-left"
				additionalText="Weekly digest"
			/>,
		);

		expect(screen.queryByText("Weekly digest")).not.toBeInTheDocument();
	});
});
