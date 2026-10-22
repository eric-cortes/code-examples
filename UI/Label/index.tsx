"use client";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { labelVariants } from "./styles";
import type { LabelProps } from "./types";

function Label(props: LabelProps) {
	const { htmlFor, children, required, testID, className } = props;

	return (
		<label htmlFor={htmlFor} className={cn(labelVariants(), className)} {...testIdProps(testID)}>
			{required ? `${children}*` : children}
		</label>
	);
}

export { Label };
