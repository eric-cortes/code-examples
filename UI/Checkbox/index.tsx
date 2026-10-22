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
			xs: "text-[11px]",
			sm: "text-xs",
			base: "text-[13px]",
		},
		disabled: {
			true: "text-[#7F8898] cursor-not-allowed",
			false: "text-[#D5D9E0] cursor-pointer",
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
				<rect x="1.5" y="1.5" width="15" height="15" rx="5" fill="none" stroke="#F97316" strokeWidth="1" />
				<g clipPath={`url(#${clipId1})`}>
					<path
						d="M5.75 9.25L8.25 11.75L13.25 5.75"
						stroke="#F97316"
						strokeWidth="1"
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
				<rect x="1.5" y="1.5" width="15" height="15" rx="5" stroke="rgba(255,255,255,0.16)" fill="none" strokeWidth="1" />
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
						"rounded-[6px] outline-none bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] backdrop-blur-xl backdrop-saturate-150 border-[0.5px] border-white/[0.08] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[checked]:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[disabled]:shadow-none",
						disabled && "opacity-40",
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
					<span className="text-xs font-light text-Secondary/Tag-Hints">{additionalText}</span>
				</div>
			)}
		</div>
	);
}

export { Checkbox };
