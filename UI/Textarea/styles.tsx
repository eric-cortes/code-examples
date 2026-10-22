import { cva } from "class-variance-authority";

export const textareaVariants = cva(
	`w-full
        rounded-lg
        border
        block
shadow-inner
        transition-border 
        duration-150
        ease-in
        resize-none
        p-2
        text-base
        text-Secondary/Default
        focus:ring-transparent
        font-primary
        font-light
        placeholder-[#9FA1A7]
        hover:border-Primary/Dark
        focus:border-Highlight-1/Dark`,
	{
		variants: {
			error: {
				true: "border-Error/Dark focus:border-Error/Dark",
				false: "border-Primary/Medium",
			},
			disabled: {
				true: "cursor-not-allowed bg-[#FAFAFA] hover:border-Primary/Medium !text-Secondary/Placeholder",
				false: "",
			},
			inline: {
				true: "border-transparent",
				false: "",
			},
		},
		compoundVariants: [
			{
				disabled: true,
				inline: true,
				className: "hover:border-transparent !text-Secondary/Placeholder",
			},
		],
		defaultVariants: {
			error: false,
			disabled: false,
			inline: false,
		},
	},
);

export const getWrapperStyles = (): string => {
	return "w-full";
};
