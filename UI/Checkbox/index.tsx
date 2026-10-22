"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { useId } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import type { CheckboxProps } from "./types";

const labelVariants = cva("flex items-center gap-2 font-light select-none", {
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
		},
		disabled: {
			true: "text-Secondary/Placeholder cursor-not-allowed",
			false: "text-Secondary/Default cursor-pointer",
		},
	},
	defaultVariants: {
		size: "base",
		disabled: false,
	},
});

function CheckIcon() {
	const clipId0 = useId();
	const clipId1 = useId();

	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<g clipPath={`url(#${clipId0})`}>
				<rect x="1.5" y="1.5" width="15" height="15" rx="2" fill="#4D8EF3" stroke="#4D8EF3" strokeWidth="1.5" />
				<g clipPath={`url(#${clipId1})`}>
					<path
						d="M5.75 9.25L8.25 11.75L13.25 5.75"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</g>
			<defs>
				<clipPath id={clipId0}>
					<rect width="18" height="18" fill="white" />
				</clipPath>
				<clipPath id={clipId1}>
					<rect width="18" height="18" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}

function UncheckedIcon() {
	const clipId0 = useId();

	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<g clipPath={`url(#${clipId0})`}>
				<rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="#ACCBFF" fill="#EBF2FF" strokeWidth="1.5" />
			</g>
			<defs>
				<clipPath id={clipId0}>
					<rect width="18" height="18" fill="#EEEFF1" />
				</clipPath>
			</defs>
		</svg>
	);
}

function Checkbox(props: CheckboxProps) {
	const {
		label,
		checked = false,
		disabled = false,
		required = false,
		onChange,
		testID,
		className,
		ref,
		size = "base",
		additionalText,
	} = props;

	return (
		<div className="w-full">
			<label className={cn(labelVariants({ size, disabled }), className)}>
				<CheckboxPrimitive.Root
					ref={ref}
					checked={checked}
					disabled={disabled}
					required={required}
					aria-label={label}
					onCheckedChange={(newChecked) => {
						if (onChange) {
							onChange({
								target: { checked: Boolean(newChecked) },
							} as React.ChangeEvent<HTMLInputElement>);
						}
					}}
					className={cn(
						"relative flex items-center justify-center w-[18px] h-[18px] shrink-0",
						"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-sm",
						disabled && "opacity-60",
					)}
					{...testIdProps(testID)}
				>
					<CheckboxPrimitive.Indicator
						keepMounted
						className="flex items-center justify-center"
						render={(indicatorProps, state) => (
							<span {...indicatorProps}>{state.checked ? <CheckIcon /> : <UncheckedIcon />}</span>
						)}
					/>
				</CheckboxPrimitive.Root>
				{label && <span>{label}</span>}
			</label>
			{additionalText && (
				<div className="ml-[26px] mt-1">
					<span className="text-sm font-light text-Secondary/Tag-Hints">{additionalText}</span>
				</div>
			)}
		</div>
	);
}

export { Checkbox };
