"use client";

import React from "react";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { getStylesFromColor, textVariants } from "./styles";
import type { TextProps } from "./types";

function Text<T extends React.ElementType = "p">(props: TextProps<T>) {
	const {
		children,
		size = "base",
		weight = "normal",
		color = "Secondary/Default",
		alignment = "left",
		uppercase = false,
		underline = false,
		italic = false,
		lineHeight = "normal",
		truncate = false,
		testID,
		className,
		as,
		ref,
		...rest
	} = props;

	const Component = as ?? "p";

	return (
		<Component
			ref={ref}
			className={cn(
				textVariants({
					size,
					weight,
					alignment,
					uppercase,
					underline,
					italic,
					lineHeight,
					truncate,
				}),
				getStylesFromColor(color),
				className,
			)}
			{...testIdProps(testID)}
			{...rest}
		>
			{children}
		</Component>
	);
}

export { Text };
