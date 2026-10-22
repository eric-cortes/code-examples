/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { RadioButton, RadioGroup } from ".";

function ControlledGroup(props: { onValueChange?: (value: string) => void }) {
	const [value, setValue] = useState("option1");

	return (
		<RadioGroup
			value={value}
			onValueChange={(next: string) => {
				setValue(next);
				props.onValueChange?.(next);
			}}
		>
			<RadioButton label="Option 1" value="option1" />
			<RadioButton label="Option 2" value="option2" />
			<RadioButton label="Option 3" value="option3" />
		</RadioGroup>
	);
}

describe("RadioButton component", () => {
	it("renders a radiogroup with one radio per option", () => {
		render(<ControlledGroup />);

		expect(screen.getByRole("radiogroup")).toBeInTheDocument();
		expect(screen.getAllByRole("radio")).toHaveLength(3);
		expect(screen.getByRole("radio", { name: "Option 2" })).toBeInTheDocument();
	});

	it("checks the option matching the group value", () => {
		render(<ControlledGroup />);

		expect(screen.getByRole("radio", { name: "Option 1" })).toBeChecked();
		expect(screen.getByRole("radio", { name: "Option 2" })).not.toBeChecked();
	});

	it("calls onValueChange with the selected value", async () => {
		const onValueChange = vi.fn();
		render(<ControlledGroup onValueChange={onValueChange} />);

		await userEvent.click(screen.getByRole("radio", { name: "Option 3" }));

		expect(onValueChange).toHaveBeenCalledWith("option3");
	});

	it("keeps only one radio checked at a time", async () => {
		render(<ControlledGroup />);

		await userEvent.click(screen.getByRole("radio", { name: "Option 2" }));

		expect(screen.getByRole("radio", { name: "Option 2" })).toBeChecked();
		expect(screen.getByRole("radio", { name: "Option 1" })).not.toBeChecked();
		expect(screen.getAllByRole("radio").filter((radio) => radio.getAttribute("aria-checked") === "true")).toHaveLength(1);
	});

	it("does not select a disabled option", async () => {
		const onValueChange = vi.fn();
		render(
			<RadioGroup defaultValue="option1" onValueChange={onValueChange}>
				<RadioButton label="Option 1" value="option1" />
				<RadioButton label="Option 2" value="option2" disabled />
			</RadioGroup>,
		);

		const disabledRadio = screen.getByRole("radio", { name: "Option 2" });
		await userEvent.click(disabledRadio);

		expect(disabledRadio).toHaveAttribute("aria-disabled", "true");
		expect(disabledRadio).not.toBeChecked();
		expect(onValueChange).not.toHaveBeenCalled();
	});
});
