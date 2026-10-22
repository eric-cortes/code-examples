import React, { ReactNode } from "react";

import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export interface TooltipProps extends Partial<WithClassName & WithTestID> {
	/**
	 * The content that triggers the tooltip on hover.
	 */
	children: ReactNode;
	/**
	 * The text content displayed in the tooltip.
	 */
	text: string;
	/**
	 * Optional keyboard shortcut displayed alongside the tooltip text.
	 */
	tooltipKey?: string;
	/**
	 * Position of the tooltip relative to the trigger element.
	 */
	side?: "top" | "bottom" | "left" | "right";
	/**
	 * If true, the tooltip is disabled and won't show.
	 */
	disabled?: boolean;
	/**
	 * Additional inline styles for the tooltip popup.
	 */
	style?: React.CSSProperties;
}
