import React from "react";

import { WithClassName } from "@/types/ui";
import { WithTestID } from "@/utils/testId";

export type SizeProps = "xs" | "sm" | "base" | "lg" | "xl" | "xxl";

export type WeightProps = "light" | "normal" | "bold";

export type ColorProps =
	| "White"
	| "Primary/Ultra-Light"
	| "Primary/Light"
	| "Primary/Medium"
	| "Primary/Dark"
	| "Secondary/Placeholder"
	| "Secondary/Tag-Hints"
	| "Secondary/Input-Title"
	| "Secondary/Default"
	| "Highlight-1/Light"
	| "Highlight-1/Medium"
	| "Highlight-1/Dark"
	| "Highlight-1/DarkAccessible"
	| "Highlight-2/Light"
	| "Highlight-2/Medium"
	| "Highlight-2/Dark"
	| "Error/Dark"
	| "Warning/Light"
	| "Warning/Medium"
	| "Warning/Dark"
	| "Warning/DarkAccessible"
	| "Success/Light"
	| "Success/Medium"
	| "Success/Dark"
	| "Success/DarkAccessible"
	| "transparent";

export type AlignmentProps = "left" | "right" | "center" | "justify";

export type LineHeightType = "normal";

export interface TextOwnProps {
	/** This optional field specifies the font size of the text. It expects a value of type SizeProps. */
	size?: SizeProps;
	/** This optional field allows setting the font weight of the text. It expects a value of type WeightProps. */
	weight?: WeightProps;
	/** This optional field specifies the color of the text. It expects a value of type ColorProps. */
	color?: ColorProps;
	/** The alignment prop is optional, and if it is not set, the default alignment of the text will be left.
	 * It expects a value of type AlignmentProps.
	 */
	alignment?: AlignmentProps;
	/**  The uppercase prop is optional, and if set to "true", the text will be displayed in uppercase format. */
	uppercase?: boolean;
	/** This optional field controls whether the text should be underlined.
	 * If set to "true", the text will be underlined; otherwise, it will not be. */
	underline?: boolean;
	/** This optional field controls whether the text should be displayed in italic format.
	 * If set to "true", the text will be italicized; otherwise, it will not be. */
	italic?: boolean;
	lineHeight?: LineHeightType;
	/** This field is for the truncate configuration. It expects boolean type. */
	truncate?: boolean;
}

export type TextProps<T extends React.ElementType = "p"> = TextOwnProps &
	Partial<WithClassName & WithTestID> & {
		/**
		 * The element type to render. Defaults to "p".
		 */
		as?: T;
		/**
		 * Ref forwarded to the underlying element (React 19 ref-as-prop).
		 */
		ref?: React.ComponentPropsWithRef<T>["ref"];
	} & Omit<React.ComponentPropsWithoutRef<T>, keyof TextOwnProps | "as" | "ref" | "className" | "color">;
