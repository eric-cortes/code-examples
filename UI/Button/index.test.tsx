/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it, vi } from "vitest";

import { Button } from ".";

describe("Button component", () => {
	it("renders its children as the accessible name", () => {
		render(<Button>Save</Button>);

		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	it("has default type 'button' and accepts a custom type", () => {
		const { rerender } = render(<Button>Save</Button>);

		expect(screen.getByRole("button")).toHaveAttribute("type", "button");

		rerender(<Button type="submit">Save</Button>);

		expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Save</Button>);

		await userEvent.click(screen.getByRole("button"));

		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", async () => {
		const onClick = vi.fn();
		render(
			<Button disabled onClick={onClick}>
				Save
			</Button>,
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(button).toBeDisabled();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("shows a spinner and blocks onClick while loading", async () => {
		const onClick = vi.fn();
		render(
			<Button loading onClick={onClick}>
				Save
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Save" });
		await userEvent.click(button);

		expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
		expect(button).toHaveAttribute("aria-disabled", "true");
		expect(onClick).not.toHaveBeenCalled();
	});

	it("shows a spinner until the onLoadingClick promise settles", async () => {
		let resolve: () => void = () => {};
		const onLoadingClick = vi.fn(
			() =>
				new Promise<void>((res) => {
					resolve = res;
				}),
		);
		render(<Button onLoadingClick={onLoadingClick}>Save</Button>);

		await userEvent.click(screen.getByRole("button"));

		expect(onLoadingClick).toHaveBeenCalledTimes(1);
		expect(await screen.findByRole("status", { name: "Loading" })).toBeInTheDocument();

		resolve();

		await vi.waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
	});
});
