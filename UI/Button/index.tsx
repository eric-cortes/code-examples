"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useState } from "react";

import { cva, type VariantProps as CvaVariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Spinner } from "../Spinner";
import type { ButtonProps } from "./types";

const buttonVariants = cva(
	"relative inline-flex items-center justify-center font-primary font-normal text-[13px] leading-5 border-[0.5px] rounded-full backdrop-blur-xl backdrop-saturate-150 [transition:background-color_300ms_cubic-bezier(0.22,1,0.36,1),box-shadow_300ms_cubic-bezier(0.22,1,0.36,1),border-color_300ms_cubic-bezier(0.22,1,0.36,1),color_300ms_cubic-bezier(0.22,1,0.36,1),transform_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:[transition:none] after:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[rgba(0,0,0,0.05)] after:opacity-0 after:[transition:opacity_300ms_cubic-bezier(0.22,1,0.36,1)] hover:after:opacity-100 disabled:after:hidden data-[disabled]:after:hidden aria-disabled:after:hidden scale-100 active:scale-[97%] active:[transition-duration:0ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_8px_24px_rgba(0,0,0,0.35)]",
	{
		variants: {
			variant: {
				primary: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.08] ring-2 ring-[#F97316] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_8px_24px_rgba(0,0,0,0.35)]",
				secondary: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.08] ring-2 ring-[#22C55E] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(34,197,94,0.45),0_8px_24px_rgba(0,0,0,0.35)]",
				danger: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.08] ring-2 ring-[#EF4444] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(239,68,68,0.4),0_8px_24px_rgba(0,0,0,0.35)]",
				info: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.08] ring-2 ring-[#3B82F6] hover:border-white/[0.2] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(59,130,246,0.45),0_8px_24px_rgba(0,0,0,0.35)]",
				link: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.08] hover:border-white/[0.2] underline-offset-4 hover:underline shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.35)]",
				ghost: "border-transparent bg-transparent text-[#D5D9E0] shadow-none hover:bg-black/5",
				outline: "bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] hover:bg-[rgba(19,22,29,0.68)] text-[#D5D9E0] border-white/[0.12] ring-2 ring-[#B4BBC7]/90 hover:border-white/[0.2] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(180,187,199,0.32),0_8px_24px_rgba(0,0,0,0.35)]",
			},
			size: {
				default: "px-4 py-1 h-8",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

type ButtonVariant = NonNullable<CvaVariantProps<typeof buttonVariants>["variant"]>;

function Button(props: ButtonProps) {
	const {
		ref,
		className,
		variant = "primary",
		loading = false,
		onLoadingClick,
		fullWidth = false,
		onClick,
		icon,
		disabled,
		testID,
		children,
		...rest
	} = props;

	const [isInternalLoading, setIsInternalLoading] = useState(false);

	const showIsLoading = variant !== "info" && (loading || isInternalLoading);
	const isDisabled = (variant !== "info" && disabled) || isInternalLoading || loading;
	const allowFocus = loading || isInternalLoading;

	const handleClick = async () => {
		if (!onLoadingClick) return;
		setIsInternalLoading(true);
		try {
			await onLoadingClick();
		} finally {
			setIsInternalLoading(false);
		}
	};

	return (
		<ButtonPrimitive
			ref={ref}
			className={cn(
				buttonVariants({ variant: variant as ButtonVariant }),
				isDisabled && "opacity-40 cursor-not-allowed ring-0 shadow-none",
				fullWidth && "w-full",
				className,
			)}
			onClick={onLoadingClick ? handleClick : onClick}
			disabled={isDisabled}
			focusableWhenDisabled={allowFocus}
			{...(showIsLoading && typeof children === "string" ? { "aria-label": children } : {})}
			{...testIdProps(testID)}
			{...rest}
		>
			{icon && !showIsLoading && <span className="mr-2 inline-flex items-center [&_svg]:size-3.5 [&_svg]:shrink-0">{icon}</span>}
			{showIsLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<Spinner buttonType={variant} size={14} />
				</div>
			)}

			<div className={cn(showIsLoading ? "invisible" : "contents")}>{children}</div>
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
