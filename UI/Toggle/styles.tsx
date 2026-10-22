import { cva } from "class-variance-authority";

export const wrapperVariants = cva(
	"flex items-center justify-between gap-6 font-primary text-[#D5D9E0] font-light select-none",
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

export const labelVariants = cva("flex text-[#D5D9E0]", {
	variants: {
		variant: {
			"toggle-left": "order-2",
			"toggle-right": "order-1",
		},
		size: {
			small: "text-[13px]",
			large: "text-[13px]",
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
		"relative inline-flex items-center rounded-full p-[2px] shrink-0 border-[0.5px] border-white/[0.08] bg-[rgba(24,28,36,0.62)] backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.35)]",
		"outline-none",
		"focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[checked]:ring-2 data-[checked]:ring-[#F97316] data-[checked]:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[disabled]:shadow-none data-[disabled]:ring-0",
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
	"block rounded-full border-[0.5px] bg-[#9AA1AD] border-white/[0.08] data-[checked]:bg-[#D5D9E0] data-[checked]:border-white/[0.25]",
	"shadow-[0_2px_6px_rgba(0,0,0,0.5)]",
	"transition-transform duration-200 ease-out",
]);
