import type { ReactNode } from "react";

export type SizeType = "xs" | "small" | "medium" | "large";

export type VariantProps =
	| "primary"
	| "secondary"
	| "danger"
	| "info"
	| "link"
	| "ghost"
	| "outline";

export interface WithClassName {
	className: string;
}

export interface WithID {
	id: string;
}

export interface WithChildren {
	children: ReactNode;
}
