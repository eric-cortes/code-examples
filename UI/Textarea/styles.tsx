import { cva } from "class-variance-authority";

export const textareaVariants = cva(
	`w-full
        rounded-xl
        border-[0.5px]
        block
        transition-border 
        duration-150
        ease-in
        resize-none
        p-2
        text-[13px]
        text-[#D5D9E0]
        font-primary
        font-light
        backdrop-blur-xl backdrop-saturate-150
        bg-[rgba(24,28,36,0.62)]
        bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)]
        shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_4px_14px_rgba(0,0,0,0.3)]
        placeholder:text-[#7F8898]
        hover:border-white/[0.2]
        focus:outline-none
        focus:border-[#F97316]
        focus:ring-2 focus:ring-[#F97316] focus:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_14px_rgba(0,0,0,0.3)]`,
	{
		variants: {
			error: {
				true: "border-[#EF4444] bg-[rgba(48,22,26,0.62)] hover:border-[#EF4444] focus:border-[#EF4444] ring-2 ring-[#EF4444]/60 focus:ring-2 focus:ring-[#EF4444] focus:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(239,68,68,0.4),0_4px_14px_rgba(0,0,0,0.3)]",
				false: "border-white/[0.08]",
			},
			disabled: {
				true: "cursor-not-allowed bg-none opacity-40 shadow-none hover:border-white/[0.08] !text-[#7F8898]",
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
				className: "hover:border-transparent !text-[#7F8898]",
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
