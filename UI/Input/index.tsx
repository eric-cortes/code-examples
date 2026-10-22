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
	"w-full rounded-lg border p-2 h-[32px] text-base text-Secondary/Default focus:ring-transparent font-primary font-light placeholder-[#9FA1A7] focus:outline-none shadow-inner",
	{
		variants: {
			error: {
				true: "border-Error/Dark focus:border-Error/Dark hover:border-Error/Dark",
				false: "border-Primary/Dark hover:border-Primary/Dark focus:border-Highlight-1/Dark",
			},
			disabled: {
				true: "cursor-not-allowed bg-[#FAFAFA] !text-Secondary/Placeholder",
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
				className: "hover:border-Primary/Medium",
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
