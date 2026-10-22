"use client";

import React from "react";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Label } from "../Label";
import { Spacing } from "../Spacing";
import { getWrapperStyles, textareaVariants } from "./styles";
import type { TextareaProps } from "./types";

function Textarea(props: TextareaProps) {
	const {
		label,
		ariaLabel,
		error = false,
		inline = false,
		onSubmit,
		disabled = false,
		testID,
		className,
		ref,
		onKeyDown,
		...rest
	} = props;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented) return;
		if (event.key === "Enter" && !event.shiftKey && onSubmit) {
			event.preventDefault();
			onSubmit();
		}
	};

	return (
		<div className={cn("o-textarea", getWrapperStyles())} aria-label={ariaLabel}>
			{label && (
				<>
					<Label>{label}</Label>
					<Spacing size="xs" />
				</>
			)}
			<textarea
				ref={ref}
				className={cn(textareaVariants({ error, disabled, inline }), className)}
				disabled={disabled}
				aria-disabled={disabled}
				style={{ outline: "none" }}
				onKeyDown={handleKeyDown}
				{...testIdProps(testID)}
				{...rest}
			/>
		</div>
	);
}

export { Textarea };
