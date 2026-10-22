/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { Textarea } from ".";

describe("Textarea component", () => {
	it("renders the label and a textbox", () => {
		render(<Textarea label="Message" />);

		expect(screen.getByText("Message")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("applies ariaLabel to the wrapper", () => {
		render(<Textarea ariaLabel="Message area" />);

		expect(screen.getByLabelText("Message area")).toBeInTheDocument();
	});

	it("calls onSubmit on Enter and does not add a newline", async () => {
		const onSubmit = vi.fn();
		render(<Textarea onSubmit={onSubmit} />);

		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, "hello{Enter}");

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(textarea).toHaveValue("hello");
	});

	it("does not call onSubmit on Shift+Enter and adds a newline", async () => {
		const onSubmit = vi.fn();
		render(<Textarea onSubmit={onSubmit} />);

		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, "hello{Shift>}{Enter}{/Shift}");

		expect(onSubmit).not.toHaveBeenCalled();
		expect(textarea).toHaveValue("hello\n");
	});

	it("skips onSubmit when onKeyDown prevents the default", async () => {
		const onSubmit = vi.fn();
		render(<Textarea onSubmit={onSubmit} onKeyDown={(event) => event.preventDefault()} />);

		await userEvent.type(screen.getByRole("textbox"), "{Enter}");

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("is disabled when disabled is set", () => {
		render(<Textarea disabled />);

		expect(screen.getByRole("textbox")).toBeDisabled();
	});
});
