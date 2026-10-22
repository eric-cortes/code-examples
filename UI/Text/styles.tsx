import { cva } from "class-variance-authority";

import { ColorProps } from "./types";

export const textVariants = cva("font-primary", {
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			xxl: "text-xxl",
		},
		weight: {
			light: "font-light",
			normal: "font-medium",
			bold: "font-bold",
		},
		alignment: {
			left: "text-left",
			right: "text-right",
			center: "text-center",
			justify: "text-justify",
		},
		uppercase: {
			true: "uppercase",
			false: "",
		},
		underline: {
			true: "underline",
			false: "",
		},
		italic: {
			true: "italic",
			false: "",
		},
		lineHeight: {
			normal: "leading-normal-override",
		},
		truncate: {
			true: "truncate",
			false: "",
		},
	},
	defaultVariants: {
		size: "base",
		weight: "light",
		alignment: "left",
		uppercase: false,
		underline: false,
		italic: false,
		lineHeight: "normal",
		truncate: false,
	},
});

export const getStylesFromColor = (color: ColorProps): string => {
	if (color === "transparent") return "text-transparent";
	return `text-${color}`;
};
