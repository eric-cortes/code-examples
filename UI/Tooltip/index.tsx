"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Text } from "../Text";
import { animationStyles } from "./styles";
import type { TooltipProps } from "./types";

function Tooltip(props: TooltipProps) {
	const { children, text, tooltipKey, side = "top", disabled = false, style, className, testID } = props;

	if (disabled) {
		return <>{children}</>;
	}

	return (
		<TooltipPrimitive.Provider delay={200}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger render={<span />} className="cursor-help">
					{children}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<style>{animationStyles}</style>
					<TooltipPrimitive.Positioner side={side} sideOffset={4} className="z-50">
						<TooltipPrimitive.Popup
							className={cn(
								"tooltip-popup",
								"bg-Secondary/Default/90 px-3 py-2 rounded-lg z-50",
								className,
							)}
							style={style}
							{...testIdProps(testID)}
						>
							<div className="flex items-center justify-start gap-2">
								<Text size="sm" color="White" className="break-words whitespace-normal">
									<span className="text-left">{text}</span>
								</Text>
								{tooltipKey && tooltipKey !== "" && (
									<div className="border border-Secondary/Placeholder bg-Primary/Light/70 px-1 py-0.5 rounded flex-shrink-0 shadow-sm">
										<Text size="xs" color="Secondary/Default" weight="normal">
											{tooltipKey}
										</Text>
									</div>
								)}
							</div>
						</TooltipPrimitive.Popup>
					</TooltipPrimitive.Positioner>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}

export { Tooltip };
