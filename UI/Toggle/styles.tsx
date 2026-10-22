import { cva } from "class-variance-authority";

export const wrapperVariants = cva(
	"flex items-center justify-between gap-6 font-primary text-Secondary/Default font-light select-none",
	{
		variants: {
			disabled: {
				true: "cursor-not-allowed opacity-50",
				false: "cursor-pointer",
			},
		},
		defaultVariants: {
			disabled: false,
		},
	},
);

export const labelVariants = cva("flex text-Secondary/Default", {
	variants: {
		variant: {
			"toggle-left": "order-2",
			"toggle-right": "order-1",
		},
		size: {
			small: "text-base",
			large: "text-base",
		},
		fontWeight: {
			normal: "font-normal",
			light: "font-light",
		},
	},
	defaultVariants: {
		variant: "toggle-right",
		size: "small",
		fontWeight: "normal",
	},
});

export const switchRootVariants = cva(
	[
		"relative inline-flex items-center rounded-full p-[2px] shrink-0 shadow-inner",
		"outline-none",
		"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
	],
	{
		variants: {
			variant: {
				"toggle-left": "order-1 ",
				"toggle-right": "order-2",
			},
		},
		defaultVariants: {
			variant: "toggle-right",
		},
	},
);

export const switchThumbVariants = cva([
	"block rounded-full border bg-white border-Primary/Dark data-[checked]:border-Highlight-1/DarkAccessible",
	"shadow-modal",
	"transition-transform duration-200 ease-out",
]);
