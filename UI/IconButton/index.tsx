"use client";

import { Button } from "@base-ui/react/button";
import { useState } from "react";

import { cva, type VariantProps as CvaVariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import type { VariantProps } from "@/types/ui";
import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Spinner } from "../Spinner";
import { Text } from "../Text";
import type { IconButtonProps } from "./types";

const iconButtonVariants = cva(
	"relative inline-flex items-center justify-center font-primary font-normal border-[0.5px] rounded-full backdrop-blur-xl backdrop-saturate-150 [transition:background-color_300ms_cubic-bezier(0.22,1,0.36,1),box-shadow_300ms_cubic-bezier(0.22,1,0.36,1),border-color_300ms_cubic-bezier(0.22,1,0.36,1),color_300ms_cubic-bezier(0.22,1,0.36,1),transform_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:[transition:none] after:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[rgba(0,0,0,0.05)] after:opacity-0 after:[transition:opacity_300ms_cubic-bezier(0.22,1,0.36,1)] hover:after:opacity-100 disabled:after:hidden data-[disabled]:after:hidden aria-disabled:after:hidden scale-100 active:scale-[97%] active:[transition-duration:0ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_8px_24px_rgba(0,0,0,0.35)]",
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
				default: "p-1.5 h-[32px] w-[32px]",
				small: "p-1 h-[24px] w-[24px]",
				large: "p-2 h-[40px] w-[40px]",
			},
			disabled: {
				true: "opacity-40 cursor-not-allowed ring-0 shadow-none",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "link",
				className: "p-0 h-auto w-auto border-none",
			},
		],
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

type IconButtonVariant = NonNullable<CvaVariantProps<typeof iconButtonVariants>["variant"]>;

function IconButton(props: IconButtonProps) {
	const {
		ref,
		className,
		variant,
		size = "default",
		loading = false,
		onLoadingClick,
		onClick,
		icon,
		disabled,
		testID,
		tooltipText = "",
		tooltipKey = "",
		tooltipPosition = "center",
		type: typeProp,
		containerClassName,
		...rest
	} = props;

	const [isInternalLoading, setIsInternalLoading] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const isNativeButtonType = typeProp === "button" || typeProp === "submit" || typeProp === "reset";
	const variantToUse: VariantProps =
		variant ?? (typeof typeProp === "string" && !isNativeButtonType ? (typeProp as VariantProps) : "primary");

	const showIsLoading = variantToUse !== "info" && (loading || isInternalLoading);
	const isDisabled = (variantToUse !== "info" && disabled) || isInternalLoading || loading;

	// Allow focus on disabled button when loading for accessibility
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

	const isCustomSize = typeof size === "number";
	const customSizeStyle = isCustomSize ? { width: `${size}px`, height: `${size}px` } : {};

	let tooltipPositionClass: string;
	let tooltipArrowClass: string;

	if (tooltipPosition === "left") {
		tooltipPositionClass = "left-0 -translate-x-0";
		tooltipArrowClass = "left-3 rotate-45";
	} else if (tooltipPosition === "right") {
		tooltipPositionClass = "right-0 translate-x-0";
		tooltipArrowClass = "right-3 rotate-45";
	} else {
		tooltipPositionClass = "left-1/2 -translate-x-1/2";
		tooltipArrowClass = "left-1/2 [transform:translateX(-50%)_rotate(45deg)]";
	}

	let spinnerSize = 16;
	let iconSizeClass = "[&_svg]:size-4";

	if (size === "small") {
		spinnerSize = 14;
		iconSizeClass = "[&_svg]:size-3.5";
	} else if (size === "large") {
		spinnerSize = 18;
		iconSizeClass = "[&_svg]:size-[18px]";
	}

	return (
		<div
			className={cn("relative inline-flex", containerClassName)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Button
				ref={ref}
				type={isNativeButtonType ? (typeProp as "button" | "submit" | "reset") : "button"}
				className={cn(
					iconButtonVariants({
						variant: variantToUse as IconButtonVariant,
						size: isCustomSize ? "default" : (size as "default" | "small" | "large"),
						disabled: isDisabled,
					}),
					isCustomSize && "p-0",
					className,
				)}
				onClick={onLoadingClick ? handleClick : onClick}
				disabled={isDisabled}
				focusableWhenDisabled={allowFocus}
				style={{
					...customSizeStyle,
					...(rest.style || {}),
				}}
				aria-label={rest["aria-label"]}
				{...testIdProps(testID)}
				{...rest}
			>
				{showIsLoading ? (
					<div className="absolute inset-0 flex items-center justify-center">
						<Spinner buttonType={variantToUse} size={spinnerSize} />
					</div>
				) : (
					<span className={cn("inline-flex items-center justify-center [&_svg]:shrink-0", iconSizeClass, showIsLoading && "invisible")}>{icon}</span>
				)}
			</Button>

			{tooltipText !== "" && isHovered && (
				<motion.div
					initial={{ opacity: 0, y: -5 }}
					animate={{
						opacity: isHovered ? 1 : 0,
						y: isHovered ? 0 : -5,
					}}
					transition={{ duration: 0.2, delay: isHovered ? 0.2 : 0 }}
					className={cn(
						"absolute top-full mt-3.5 transform bg-[#353B47] border-[0.5px] border-white/[0.08] shadow-none p-2 rounded-md w-40 z-10",
						tooltipPositionClass,
					)}
				>
					<span
						aria-hidden="true"
						className={cn(
							"absolute -top-[5px] size-2.5 bg-[#353B47] border-[0.5px] border-white/[0.08] border-b-0 border-r-0",
							tooltipArrowClass,
						)}
					/>
					<div className="flex items-center justify-center w-full h-full gap-2">
						<Text size="xs" className="text-[#D5D9E0]">
							<span>{tooltipText}</span>
						</Text>
						{tooltipKey !== "" && (
							<div className="border-[0.5px] border-white/[0.12] bg-white/10 px-1.5 py-0.5 rounded">
								<Text size="xs" className="text-[#D5D9E0]">
									{tooltipKey}
								</Text>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</div>
	);
}

export { IconButton, iconButtonVariants };
