/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, tsc/config */
import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { Spinner } from ".";

describe("Spinner component", () => {
	it("renders with the status role and a Loading label", () => {
		render(<Spinner />);

		expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
	});

	it("defaults to size 16 and accepts a custom size", () => {
		const { rerender } = render(<Spinner />);

		expect(screen.getByRole("status")).toHaveAttribute("width", "16");
		expect(screen.getByRole("status")).toHaveAttribute("height", "16");

		rerender(<Spinner size={32} />);

		expect(screen.getByRole("status")).toHaveAttribute("width", "32");
		expect(screen.getByRole("status")).toHaveAttribute("height", "32");
	});

	it("animates by default and not when animated is false", () => {
		const { rerender } = render(<Spinner />);

		expect(screen.getByRole("status")).toHaveClass("animate-spin");

		rerender(<Spinner animated={false} />);

		expect(screen.getByRole("status")).not.toHaveClass("animate-spin");
	});

	it("merges a custom className", () => {
		render(<Spinner className="custom-class" />);

		expect(screen.getByRole("status")).toHaveClass("custom-class", "animate-spin");
	});

	it("uses currentColor by default and a fixed color for a buttonType", () => {
		const { rerender } = render(<Spinner />);

		expect(screen.getByRole("status")).toHaveAttribute("stroke", "currentColor");

		rerender(<Spinner buttonType="primary" />);

		expect(screen.getByRole("status")).toHaveAttribute("stroke", "#fff");
	});
});
