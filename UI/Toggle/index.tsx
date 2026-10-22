"use client";

import { Switch } from "@base-ui/react/switch";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { labelVariants, switchRootVariants, switchThumbVariants, wrapperVariants } from "./styles";
import type { ToggleProps } from "./types";

const SIZES = {
	small: { root: { width: 30, height: 18 }, thumb: { size: 14, translate: 12 } },
	large: { root: { width: 40, height: 24 }, thumb: { size: 20, translate: 16 } },
} as const;

function Toggle(props: ToggleProps) {
	const {
		checked,
		label,
		variant = "toggle-right",
		size = "small",
		onChange,
		disabled = false,
		ariaLabel,
		additionalText,
		testID,
		fontWeight = "normal",
		className,
	} = props;

	const dimensions = SIZES[size];

	return (
		<div {...testIdProps(testID)}>
			<label className={cn(wrapperVariants({ disabled }), className)} aria-label={ariaLabel}>
				{label && <span className={cn(labelVariants({ variant, size, fontWeight }))}>{label}</span>}
				<Switch.Root
					checked={checked}
					onCheckedChange={() => onChange()}
					disabled={disabled}
					aria-label={ariaLabel ?? label}
					className={cn(switchRootVariants({ variant }))}
					style={(state) => ({
						width: dimensions.root.width,
						height: dimensions.root.height,
						backgroundImage: state.checked ? "linear-gradient(180deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 45%,rgba(0,0,0,0.18) 100%)" : "linear-gradient(180deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.04) 45%,rgba(0,0,0,0.12) 100%)",
						transition: "background-image 200ms ease-out",
					})}
				>
					<Switch.Thumb
						className={cn(switchThumbVariants())}
						style={(state) => ({
							width: dimensions.thumb.size,
							height: dimensions.thumb.size,
							transform: state.checked ? `translateX(${dimensions.thumb.translate}px)` : "translateX(0)",
						})}
					/>
				</Switch.Root>
			</label>
			{additionalText && variant === "toggle-right" && (
				<div className="mt-1">
					<span className="text-xs font-light text-[#7F8898]">{additionalText}</span>
				</div>
			)}
		</div>
	);
}

export { Toggle };
