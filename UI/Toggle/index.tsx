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
						backgroundColor: state.checked ? "#4D8EF3" : "#eeeff1",
						transition: "background-color 200ms ease-out",
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
					<span className="text-sm font-light text-Secondary/Tag-Hints">{additionalText}</span>
				</div>
			)}
		</div>
	);
}

export { Toggle };
