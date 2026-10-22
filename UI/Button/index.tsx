"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useState } from "react";

import { cva, type VariantProps as CvaVariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Spinner } from "../Spinner";
import type { ButtonProps } from "./types";

const buttonVariants = cva(
	"relative inline-flex items-center justify-center font-primary font-normal text-base leading-[30px] border-brand-gray border rounded-lg transition duration-100 ease-out hover:ease-in scale-100 active:scale-[98%]",
	{
		variants: {
			variant: {
				primary: "bg-Highlight-1/DarkAccessible text-White border-black/15 hover:bg-Highlight-1/Dark",
				secondary:
					"bg-Highlight-1/Light border-Highlight-1/Medium/20 text-Highlight-1/DarkAccessible hover:bg-Highlight-1/Medium hover:border-Highlight-1/Dark/20",
				danger: "bg-Highlight-2/Light border-Highlight-2/Medium/25 hover:bg-Highlight-2/Medium text-Error/Dark hover:text-red-700 hover:border-Error/Dark",
				info: "bg-white text-Secondary/Default border-black/10 hover:bg-Primary/Light hover:border-black/15",
				link: "border-none bg-transparent text-Highlight-1/DarkAccessible hover:bg-Highlight-1/Light",
				ghost: "border-none bg-transparent hover:bg-Primary/Light",
				outline: "bg-white border-Secondary/Default hover:bg-Primary/Light hover:border-Secondary/Default",
			},
			size: {
				default: "px-2 py-1.5 h-[32px]",
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
				isDisabled && "opacity-30 cursor-not-allowed",
				fullWidth && "w-full",
				variant !== "link" && variant !== "ghost" && "shadow-surface",
				className,
			)}
			onClick={onLoadingClick ? handleClick : onClick}
			disabled={isDisabled}
			focusableWhenDisabled={allowFocus}
			style={rest.style}
			{...(showIsLoading && typeof children === "string" ? { "aria-label": children } : {})}
			{...testIdProps(testID)}
			{...rest}
		>
			{icon && !showIsLoading && <span className="mr-2">{icon}</span>}
			{showIsLoading && (
				<div className="absolute inset-0 flex items-center justify-center">
					<Spinner buttonType={variant} size={16} />
				</div>
			)}

			<div className={cn(showIsLoading ? "invisible" : "contents")}>{children}</div>
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
