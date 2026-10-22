"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import React, { useEffect, useId, useRef, useState } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { mergeRefs } from "@/utils/mergeRefs";
import { testIdProps } from "@/utils/testId";
import { Label } from "../Label";
import { Spacing } from "../Spacing";
import { Text } from "../Text";
import { ColorProps } from "../Text/types";
import type { InputProps } from "./types";

const inputVariants = cva(
	"w-full rounded-xl border-[0.5px] p-2 h-[32px] text-[13px] font-primary font-light focus:outline-none bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] text-[#D5D9E0] placeholder:text-[#7F8898] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_4px_14px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150",
	{
		variants: {
			error: {
				true: "border-[#EF4444] bg-[rgba(48,22,26,0.62)] hover:border-[#EF4444] focus:border-[#EF4444] ring-2 ring-[#EF4444]/60 focus:ring-2 focus:ring-[#EF4444] focus:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(239,68,68,0.4),0_4px_14px_rgba(0,0,0,0.3)]",
				false: "border-white/[0.08] hover:border-white/[0.2] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316] focus:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_14px_rgba(0,0,0,0.3)]",
			},
			disabled: {
				true: "cursor-not-allowed bg-none opacity-40 !text-[#7F8898] shadow-none hover:border-white/[0.08]",
				false: "",
			},
			inline: {
				true: "",
				false: "",
			},
			textCenter: {
				true: "text-center",
				false: "",
			},
		},
		compoundVariants: [
			{
				disabled: true,
				inline: false,
				className: "hover:border-white/[0.08]",
			},
			{
				disabled: true,
				inline: true,
				className: "",
			},
			{
				error: false,
				inline: true,
				className: "",
			},
		],
		defaultVariants: {
			error: false,
			disabled: false,
			inline: false,
			textCenter: false,
		},
	},
);

function Input(props: InputProps) {
	const {
		ref,
		type,
		inputmode = "text",
		label,
		value,
		name,
		placeholder,
		error = false,
		errorMessage,
		inline = false,
		minLength,
		maxLength,
		maxWidth,
		disabled = false,
		required = false,
		onChange,
		onKeyDown,
		autoFocus = false,
		testID,
		onFocus,
		onBlur,
		min,
		max,
		id: idProp,
		minValue,
		tabIndex = 0,
		unit,
		step = 1,
		textCenter = false,
		className,
		...rest
	} = props;

	const generatedId = useId();
	const id = idProp ?? generatedId;
	const inputRef = useRef<HTMLInputElement>(null);
	const mergedRef = mergeRefs(ref, inputRef);

	const [stateValue, setStateValue] = useState(value ?? "");

	useEffect(() => {
		setStateValue(value ?? "");
	}, [value]);

	let unitTextColor: ColorProps = "Secondary/Default";
	if (error) unitTextColor = "Error/Dark";
	else if (!stateValue) unitTextColor = "Secondary/Placeholder";

	const containerStyle = maxWidth !== undefined && maxWidth !== null ? { maxWidth: `${maxWidth}px` } : undefined;

	return (
		<div className="w-full o-input" style={containerStyle}>
			{label !== undefined && label !== null && label !== "" && (
				<>
					<Label htmlFor={id} required={required}>
						{label}
					</Label>
					<Spacing size="xs" />
				</>
			)}
			<div className="relative w-full">
				<InputPrimitive
					{...rest}
					ref={mergedRef}
					type={type}
					inputMode={inputmode}
					id={id}
					value={stateValue}
					name={name}
					placeholder={placeholder}
					onValueChange={(newValue) => {
						setStateValue(newValue);
						onChange?.({
							target: { value: newValue, name, type },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") inputRef.current?.blur();
						onKeyDown?.(e);
					}}
					onFocus={(e) => {
						setTimeout(() => inputRef.current?.select(), 0);
						onFocus?.(e);
					}}
					onBlur={(e) => {
						if (minValue !== undefined && minValue !== null && stateValue === "") {
							setStateValue(minValue);
						}
						onBlur?.(e);
					}}
					minLength={minLength}
					maxLength={maxLength}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					required={required}
					autoFocus={autoFocus}
					tabIndex={tabIndex}
					{...testIdProps(testID)}
					className={cn(
						"o-input--input focus:outline-none",
						unit !== undefined && unit !== null && "pr-10",
						inputVariants({
							error,
							disabled,
							inline,
							textCenter,
						}),
						className,
					)}
					style={containerStyle}
				/>
				{unit !== undefined && (
					<div className="pointer-events-none absolute top-0 right-4 flex h-full items-center justify-center">
						<Text color={unitTextColor}>{unit}</Text>
					</div>
				)}
			</div>
			{error && errorMessage !== undefined && errorMessage !== null && (
				<div>
					<Spacing size="xs" />
					<Text size="sm" color="Error/Dark">
						{errorMessage}
					</Text>
				</div>
			)}
		</div>
	);
}

export { Input, inputVariants };
