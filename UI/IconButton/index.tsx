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
	"relative inline-flex items-center justify-center font-primary font-normal border rounded-lg transition duration-100 ease-out hover:ease-in scale-100 active:scale-[98%]",
	{
		variants: {
			variant: {
				primary: "bg-Highlight-1/DarkAccessible text-White border-black/15 hover:bg-Highlight-1/Dark",
				secondary:
					"bg-Highlight-1/Light border-Highlight-1/Medium/20 text-Highlight-1/DarkAccessible hover:bg-Highlight-1/Medium hover:border-Highlight-1/Dark/20",
				danger: "bg-Highlight-2/Light border-Highlight-2/Medium/25 hover:bg-Highlight-2/Medium text-Error/Dark hover:text-red-700 hover:border-Error/Dark",
				info: "bg-Primary/Medium text-Secondary/Default border-black/10 hover:bg-Primary/Dark hover:border-black/15",
				link: "border-none bg-transparent text-Highlight-1/DarkAccessible hover:bg-Highlight-1/Light",
				ghost: "border-none bg-transparent text-Secondary/Default hover:bg-Primary/Light",
				outline:
					"bg-white border-Primary/Medium text-Secondary/Default hover:bg-Primary/Light hover:border-Primary/Dark",
			},
			size: {
				default: "p-1.5 h-[32px] w-[32px]",
				small: "p-1 h-[24px] w-[24px]",
				large: "p-2 h-[40px] w-[40px]",
			},
			disabled: {
				true: "opacity-30 cursor-not-allowed",
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

	if (tooltipPosition === "left") {
		tooltipPositionClass = "left-0 -translate-x-0";
	} else if (tooltipPosition === "right") {
		tooltipPositionClass = "right-0 translate-x-0";
	} else {
		tooltipPositionClass = "left-1/2 -translate-x-1/2";
	}

	let spinnerSize = 20;

	if (size === "small") spinnerSize = 16;
	else if (size === "large") spinnerSize = 24;

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
					variantToUse !== "link" && variantToUse !== "ghost" && "shadow-surface",
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
					<span className={cn(showIsLoading && "invisible")}>{icon}</span>
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
						"absolute top-full mt-2 transform bg-Secondary/Default p-2 rounded-lg w-40 z-10",
						tooltipPositionClass,
					)}
				>
					<div className="flex items-center justify-center w-full h-full gap-2">
						<Text size="sm" color="White">
							<span>{tooltipText}</span>
						</Text>
						{tooltipKey !== "" && (
							<div className="border border-Secondary/Placeholder px-1 py-0.5 rounded-lg">
								<Text size="xs" color="Secondary/Placeholder">
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
