import React from "react";

import type { VariantProps, WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface IconButtonProps
	extends Partial<WithClassName & WithTestID>, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
	/**
	 * Ref forwarded to the underlying button element (React 19 ref-as-prop).
	 */
	ref?: React.Ref<HTMLButtonElement>;
	/**
	 * Specifies the visual variant of the button.
	 */
	variant?: VariantProps;
	/**
	 * SVG icon as React component
	 */
	icon: React.ReactElement;
	/**
	 * Size of the button (affects width, height, and padding).
	 */
	size?: "default" | "small" | "large" | number;
	/**
	 * If set to true, the button will display a loading indicator.
	 */
	loading?: boolean;
	/**
	 * Callback triggered when the button is clicked in loading state.
	 * May be async; loading state is cleared when the returned promise settles.
	 */
	onLoadingClick?: () => void | Promise<void>;
	/**
	 * This optional field allows adding a tooltip that will appear
	 * when the user hovers over the button.
	 */
	tooltipText?: string;
	/**
	 * Keyboard shortcut displayed in the tooltip
	 */
	tooltipKey?: string;
	/**
	 * Controls the position of the tooltip: "left", "center", or "right".
	 */
	tooltipPosition?: "left" | "center" | "right";
	/**
	 * Additional CSS classes applied to the outer wrapper div.
	 * Use for positioning/layout (e.g., "absolute top-2 right-2").
	 */
	containerClassName?: string;
	/**
	 * Visual variant or native button type. If a non-native value
	 * like "outline" is provided, it will be treated as a visual
	 * variant and will NOT be forwarded to the DOM.
	 */
	type?: VariantProps | "button" | "submit" | "reset";
}
