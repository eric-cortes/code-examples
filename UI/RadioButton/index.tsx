"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useId } from "react";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import type { RadioButtonProps } from "./types";

function CheckedRadioIcon(props: { disabled?: boolean }) {
	const clipId0 = useId();
	const clipId1 = useId();

	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity: props.disabled ? 0.4 : 1 }}
			aria-hidden="true"
			className="pointer-events-none"
		>
			<g clipPath={`url(#${clipId0})`}>
				<g clipPath={`url(#${clipId1})`}>
					<path
						d="M13.773 4.22703C16.409 6.86307 16.409 11.1369 13.773 13.773C11.1369 16.409 6.86305 16.409 4.22703 13.773C1.59099 11.1369 1.59099 6.86305 4.22703 4.22703C6.86307 1.59099 11.1369 1.59099 13.773 4.22703Z"
						fill="none"
						stroke="#F97316"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M11.1213 6.87868C12.2929 8.05026 12.2929 9.94975 11.1213 11.1213C9.94974 12.2929 8.05025 12.2929 6.87868 11.1213C5.70711 9.94974 5.70711 8.05025 6.87868 6.87868C8.05026 5.70711 9.94975 5.70711 11.1213 6.87868Z"
						fill="#F97316"
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

function UncheckedRadioIcon(props: { disabled?: boolean }) {
	const clipId0 = useId();
	const clipId1 = useId();

	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity: props.disabled ? 0.4 : 1 }}
			aria-hidden="true"
			className="pointer-events-none"
		>
			<g clipPath={`url(#${clipId0})`}>
				<g clipPath={`url(#${clipId1})`}>
					<path
						d="M13.773 4.22703C16.409 6.86307 16.409 11.1369 13.773 13.773C11.1369 16.409 6.86305 16.409 4.22703 13.773C1.59099 11.1369 1.59099 6.86305 4.22703 4.22703C6.86307 1.59099 11.1369 1.59099 13.773 4.22703Z"
						stroke="rgba(255,255,255,0.16)"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
					/>
				</g>
			</g>
			<defs>
				<clipPath id={clipId0}>
					<rect width="18" height="18" fill="#EEEFF1" />
				</clipPath>
				<clipPath id={clipId1}>
					<rect width="18" height="18" fill="#EEEFF1" />
				</clipPath>
			</defs>
		</svg>
	);
}

function RadioButton(props: RadioButtonProps) {
	const { label, value, disabled = false, testID, className, ref } = props;

	return (
		<label
			className={cn(
				"flex items-center gap-2 text-[13px] cursor-pointer font-light",
				"data-[checked]:font-normal",
				disabled ? "text-[#7F8898] cursor-not-allowed" : "text-[#D5D9E0]",
				className,
			)}
		>
			<Radio.Root
				ref={ref}
				value={value}
				disabled={disabled}
				aria-label={label}
				className="relative flex items-center justify-center w-[18px] h-[18px] rounded-full outline-none bg-[rgba(24,28,36,0.62)] bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)] backdrop-blur-xl backdrop-saturate-150 border-[0.5px] border-white/[0.08] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[checked]:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.18),inset_0_-0.5px_0_rgba(0,0,0,0.35),0_0_12px_rgba(249,115,22,0.45),0_4px_12px_rgba(0,0,0,0.35)] data-[disabled]:shadow-none"
				{...testIdProps(testID)}
			>
				<div className="absolute inset-0 flex items-center justify-center data-[checked]:hidden">
					<UncheckedRadioIcon disabled={disabled} />
				</div>
				<Radio.Indicator className="absolute inset-0 flex items-center justify-center">
					<CheckedRadioIcon disabled={disabled} />
				</Radio.Indicator>
			</Radio.Root>
			<span>{label}</span>
		</label>
	);
}

const RadioGroup = RadioGroupPrimitive;

export { RadioButton, RadioGroup };
