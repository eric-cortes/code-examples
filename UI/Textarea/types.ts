import React from "react";

import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface TextareaProps
	extends Partial<WithClassName & WithTestID>, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	/**
	 * Ref forwarded to the underlying textarea element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLTextAreaElement>;
	/**
	 * A text label displayed above the textarea to indicate its purpose or expected input.
	 */
	label?: string;
	/**
	 * Optional aria-label for the wrapper.
	 */
	ariaLabel?: string;
	/**
	 * A boolean value indicating whether the textarea is in an error state.
	 */
	error?: boolean;
	/**
	 * A boolean value indicating whether the textarea should be displayed inline with other elements.
	 */
	inline?: boolean;
	/**
	 * Callback triggered when Enter is pressed (without Shift).
	 */
	onSubmit?: () => void;
}
