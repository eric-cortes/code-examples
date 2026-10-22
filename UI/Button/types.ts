import React, { PropsWithChildren } from "react";

import type { VariantProps, WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface ButtonProps
	extends Partial<WithClassName & WithTestID>, PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Ref forwarded to the underlying button element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLButtonElement>;
	/**
	 * Specifies the visual variant of the button.
	 * Defaults to "primary".
	 */
	variant?: VariantProps;
	/**
	 * SVG icon as React component
	 */
	icon?: React.ReactElement;
	/**
	 * If set to true, the button will expand to the full width of its container.
	 */
	fullWidth?: boolean;
	/**
	 * If set to true, the button will display a loading indicator, indicating ongoing action.
	 */
	loading?: boolean;
	/**
	 * Callback triggered when the button is clicked in loading state.
	 * May be async; loading state is cleared when the returned promise settles.
	 */
	onLoadingClick?: () => void | Promise<void>;
}
